import Selector from "../components/selector";
export default function engineering() {
  return (
    <main className="flex flex-col items-left justify-between px-24 py-8">
      <div className="mb-32 grid text-center max-w-xs lg:mb-0 lg:grid-cols-1 lg:text-left py-12">
        <Selector
          Title="Projects"
          Subtext="Showcase - Development Blog"
          link="../stories"
          Dir="right"
        />
        <Selector
          Title="Studio Falsebeam"
          Subtext="Game Development"
          link="../stories"
          Dir="right"
        />
        <Selector
          Title="Web Games"
          Subtext="Irresponsible uses of TypeScript"
          link="../engineering/webgames"
          Dir="right"
        />
      </div>
    </main>
  );
}
