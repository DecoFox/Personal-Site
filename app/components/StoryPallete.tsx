import Link from "next/link";
import Selector, { ComplexSelector } from "./selector";
import { fetchAllStoryIds, fetchAllWebGames } from "../lib/StoryUtils";
import path from "path";
import { fetchS3Links } from "../lib/StoryUtils";

export default function StoryPallete() {
  const stories = fetchAllStoryIds();

  return (
    <span className="flex flex-col w-fit items-left justify-between px-24 py-8 max-w-lg max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <span className="mb-32 grid text-center max-w-xs lg:mb-0 lg:grid-cols-1 lg:text-left">
        {stories.map((story) => (
          <Selector
            key={story.params.slug}
            Title={story.params.storyTitle}
            Subtext={story.params.storyGenre}
            link={path.join("/stories/", story.params.slug)}
            Dir="right"
          />
        ))}
      </span>
    </span>
  );
}

export function GamePallete() {
  const games = fetchAllWebGames();

  return (
    <span className="absolute flex flex-col items-left justify-between px-24 py-8 max-w-lg max-h-[50vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <span className="mb-32 grid text-center max-w-xs lg:mb-0 lg:grid-cols-1 lg:text-left">
        {games.map((game) => (
          <Selector
            key={game.params.slug}
            Title={game.params.slug}
            Subtext=""
            link={path.join("/engineering/webgames/", game.params.slug)}
            Dir="right"
          />
        ))}
      </span>
    </span>
  );
}

