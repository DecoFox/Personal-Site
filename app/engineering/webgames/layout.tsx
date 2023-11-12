import { GamePallete } from "@/app/components/StoryPallete";
export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="py-4">
        <GamePallete />
      </div>
      {children}
    </section>
  );
}
