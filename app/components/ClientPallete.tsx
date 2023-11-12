"use client";
import { ComplexSelector } from "./selector";
import { useState } from "react";
import { S3Entry } from "../lib/StoryUtils";

export interface iItemPallate {
  itemEntriesA: S3Entry[];
  itemEntriesB: S3Entry[];
}

export function ImagePallate(props: iItemPallate) {
  const [dType, setD] = useState(true);

  function handleClick() {
    setD(!dType);
  }

  return (
    <div>
      <section className="absolute w-[70vw] left-[calc(50vw-35vw)] bottom-[120px]">
        <section className="flex flex-nowrap px-24 py-2 items-center whitespace-nowrap justify-between overflow-x-scroll overflow-y-clip transition-all max-h-[0] hover:max-h-[250px] border border-transparent dark:border-neutral-700 bg-neutral-800/30 rounded-lg">
          <span className="mb-1">
            {dType
              ? props.itemEntriesA.map((e: S3Entry) => (
                  <ComplexSelector
                    key={e.params.address}
                    Title="test"
                    Subtext="test"
                    link={`/art/${e.params.slug}`}
                    Dir="right"
                    ImageDir={e.params.address}
                  />
                ))
              : props.itemEntriesB.map((e: S3Entry) => (
                  <ComplexSelector
                    key={e.params.address}
                    Title="test"
                    Subtext="test"
                    link={`/art/models/${e.params.slug}`}
                    Dir="right"
                  />
                ))}
          </span>
        </section>
        <div className="absolute right-[75vw] bottom-[-15px]">
          <button
            className="group border border-transparent dark:border-neutral-700 bg-neutral-800/30 rounded-lg px-5 py-4"
            onClick={handleClick}
          >
            {dType ? "3D" : "2D"}
          </button>
        </div>
      </section>
    </div>
  );
}
