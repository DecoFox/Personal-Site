import Image from "next/image";
import Selector from "./components/selector";

export default function Home() {
  return (
    <main className="flex flex-col items-left justify-between px-24 py-8">
      <div className="mb-32 grid text-center max-w-xs lg:mb-0 lg:grid-cols-1 lg:text-left">
        <Selector
          Title="Engineering"
          Subtext="C# - HLSL - Java - Lua - TypeScript"
          link="../engineering"
          Dir="right"
        />
        <Selector
          Title="Stories"
          Subtext="Science Fiction - Fantasy - Furry"
          link="../stories"
          Dir="right"
        />
        <Selector
          Title="Artwork"
          Subtext="3D - 2D - Technical"
          link="../art"
          Dir="right"
        />
      </div>
    </main>
  );
}
