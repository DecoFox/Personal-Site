import StoryPage from "../components/StoryPage";
import { GetStaticProps, GetStaticPaths } from "next";
import fs, { Dir } from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";

const Directory = path.join(process.cwd(), "documents/stories");

export function getStories() {
  const names = fs.readdirSync(Directory);
  const allStoryData = names.map((name) => {
    const id = name.replace(/\.txt$/, "");
    const filepath = path.join(Directory, name);
    const content = fs.readFileSync(filepath, "utf-8");

    return {
      id,
    };
  });
}
/*
interface Iparams extends ParsedUrlQuery {
  id: string;
}
*/
interface StoryDataType {
  id: string;
  content: string;
}

export function getStory(name: string) {
  const filepath = path.join(Directory, name);
  const content = fs.readFileSync(filepath, "utf-8");
  const id = name;

  const stry: StoryDataType = { id: name, content: content };

  return {
    stry,
  };
}

export async function getStaticPaths() {
  const storyPaths = getStories();
  return {
    paths: storyPaths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  //const id = getStory((context.params as Iparams).id);
  const StoryData = getStory(context.params?.id as string);

  return {
    props: {
      thisStoryData: StoryData,
    },
  };
};

export default function arbStory(props: { thisStoryData: StoryDataType }) {
  return <div>{props.thisStoryData.id}</div>;
}
