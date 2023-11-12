"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ButtonProps {
  Title: string;
  Subtext: string;
  link: string;
  Dir: "left" | "right" | "up" | "down";
  HideSelf: boolean;
}

export default function LinkButton(props: ButtonProps) {
  const directionClassNames: Record<ButtonProps["Dir"], string> = {
    left: "group-hover:translate-x-[-0.75rem]",
    right: "group-hover:translate-x-[0.75rem]",
    up: "group-hover:translate-y-[-0.75rem]",
    down: "group-hover:translate-y-[0.75rem]",
  };

  //Determine if button links to where we already are
  const path = usePathname();
  const tar = props.link.replace(/../, "").replace(/\\/g, "/");
  const test = path === tar;

  if (!props.HideSelf || (props.HideSelf && !test)) {
    return (
      <Link
        href={props.link}
        scroll={false}
        className="group rounded-lg border border-transparent px-5 py-4 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <span
          className={`inline-block transition-transform ${
            directionClassNames[props.Dir]
          } motion-reduce:transform-none`}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>{props.Title} </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {props.Subtext}
          </p>
        </span>
      </Link>
    );
  }
}
