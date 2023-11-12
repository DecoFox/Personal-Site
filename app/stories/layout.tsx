import StoryPallete from "../components/StoryPallete";
//Note the left-30vw. This is centering the text box, as the text box is positioned at center (50 vw) and is known to be 40vw wide. Since it's positioned from the corner,
//we actually want 50vw - half of 40 vw, or 50-20=30.
export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="absolute">
        <StoryPallete />
      </div>
      <div className="absolute left-[30vw] top-[100px]">{children}</div>
    </section>
  );
}
