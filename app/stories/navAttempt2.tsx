import { fetchAllStoryIds, fetchStoryData } from "../lib/StoryUtils";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import path from "path";
import fs from "fs/promises";
import { ParsedUrlQuery } from "querystring";
import { InferGetStaticPropsType } from "next";
import { NextPage } from "next";
import { PageProps } from "@/.next/types/app/layout";

/*
type Props = {
  post: string;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}
*/

interface StoryDat {
  slug: string;
  contents: string;
}

/*
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const dat: StoryDat = fetchStoryData(params?.slug as string);
  return {
    props: {
      dat,
    },
  };
}
*/

/*
export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const dat = fetchStoryData(params?.slug as string);
  return {
    props: {
      dat,
    },
  };
};
*/

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;
  const dat = fetchStoryData(params?.slug as string);
  return {
    props: {
      stories: [
        {
          slug: "eel",
          content: "the quick brown eel",
        },
        {
          slug: "fox",
          content: "the quick brown fox",
        },
      ],
    },
  };
};

/*
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
    const params = context.params!       // ! is a non-null assertion 
    const post = fetchStoryData(params.slug)
    return {
       props: { post }
    }
}
*/

export const getStaticPaths = () => {
  const paths = fetchAllStoryIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Story(props: PageProps) {
  return (
    <div>
      <div>yeet</div>
    </div>
  );
}
