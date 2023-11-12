import { storyProps } from "../lib/StoryUtils";

export default function StoryContent(props: storyProps) {
  return (
    <div className="pb-6">
      <div className="text-center pb-3 text-2xl">{props.Title}</div>
      <span className="flex justify-left w-[40vw] rounded-lg border h-[calc(100vh-270px)] border-neutral-700 bg-neutral-900 overflow-auto px-6 py-6">
        <div
          className={`${props.type === "greentext" ? "text-lime-300" : ""}`}
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
      </span>
    </div>
  );
}
