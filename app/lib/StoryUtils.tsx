import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const storyDirectory = path.join(process.cwd(), "documents/stories");
const imageDirectory = "/images/art/";
const gameDirectory = path.join(process.cwd(), "app/components/games");
const s3Directory = "https://decofoxpersonal.s3.us-west-2.amazonaws.com/";
//const modelDirectory = path.join(process.cwd(), "app/components/games");
const modelDirectory = path.resolve("./public", "models/archive/");
const modelDirectory2 = "/models/archive";

export function fetchAllWebGames() {
  //We have other non-tsx support files in the games directory, like CSS and stuff
  const compNames = fs.readdirSync(gameDirectory).filter(function (cName) {
    return cName.includes(".tsx");
  });

  return compNames.map((cName) => {
    const slugV = cName.replace(/\.tsx$/, "");
    const fullPathV = path.join(gameDirectory, cName);

    return {
      params: {
        slug: slugV,
        fullPath: fullPathV,
      },
    };
  });
}

export function fetchAllImages() {
  const imgNames = fs.readdirSync(imageDirectory);
  return imgNames.map((img) => {
    const fullPathV = path.join(imageDirectory, img);
    return {
      params: {
        fullPath: fullPathV,
      },
    };
  });
}

export function fetchAllStoryIds() {
  const fileNames = fs.readdirSync(storyDirectory);

  return fileNames.map((fileName) => {
    const slugV = fileName.replace(/\.md$/, "");
    const fullPathV = path.join(storyDirectory, fileName);

    const contents = fs.readFileSync(fullPathV, "utf8");
    const matterResult = matter(contents);
    return {
      params: {
        slug: slugV,
        fullPath: fullPathV,
        storyTitle: matterResult.data.title,
        storyGenre: matterResult.data.genre,
      },
    };
  });
}

export type storyProps = {
  Title: string;
  content: string;
  type: string;
};

export async function fetchStoryData(slug: string) {
  const fullPath = path.join(storyDirectory, `${slug}.md`);
  const storyContents = "";
  try {
    const contents = fs.readFileSync(fullPath, "utf8");
    //Hack to eliminate the weird backslash notation the converter likes to throw sometimes
    const formatted = contents.replace(/\\/g, "").replace(/>/g, "🠶");
    const matterResult = matter(formatted);
    const parsedResult = await remark()
      .use(remarkHtml)
      .process(matterResult.content);
    //formatting replaces here, like hyphen-dash
    const storyContents = parsedResult.toString().replace(/--/g, "—");
    const title = matterResult.data.title;
    const type = matterResult.data.type;
    return {
      slug,
      storyContents,
      title,
      type,
    };
  } catch (err) {
    return {
      slug: "Story Not Found",
      storyContents: "Story Not Found",
    };
  }
}

export async function fetchModels() {
  const fileNames = fs.readdirSync(modelDirectory).filter(function (cName) {
    return cName.includes(".gltf");
  });

  return fileNames.map((fileName): S3Entry => {
    const slugV = fileName.replace(/\.gltf$/, "");
    const fullPathV = path.join(modelDirectory2, fileName).replace(/\\/g, "/");
    return {
      params: {
        address: fullPathV,
        slug: slugV,
      },
    };
  });
}

export type S3Entry = {
  params: {
    address: string;
    slug: string;
  };
};

export let fetchS3Links = async function (subDirectory?: string) {
  //Configure S3----
  const configFile = fs.readFileSync(
    path.join(process.cwd(), "ignore/S3.json"),
    "utf8"
  );
  const configContent = JSON.parse(configFile);
  const client = new S3Client({
    region: "us-west-2",
    credentials: {
      accessKeyId: configContent.key,
      secretAccessKey: configContent.secret,
    },
  });
  //----

  var sd = subDirectory ? subDirectory : "";
  const command = new ListObjectsV2Command({
    Bucket: "decofoxpersonal",
  });
  const contents = await client.send(command);
  return contents.Contents?.map((c): S3Entry => {
    const address = s3Directory + `${sd}` + c.Key;
    return {
      params: {
        address: address,
        slug: c.Key as string,
      },
    };
  });
};
