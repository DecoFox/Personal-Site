import { ImagePallate } from "../components/ClientPallete";
import { fetchS3Links } from "../lib/StoryUtils";
import { fetchModels } from "../lib/StoryUtils";

//<ImagePallate />
export default async function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imgEntries = await fetchS3Links();
  const modelEntries = await fetchModels();

  /*
  for (let i = 0; i < imgEntries!.length - 1; i++) {
    console.log(imgEntries![i]);
  }
  */

  /*
  const test = [
    { params: { address: "test", slug: "test" } },
    { params: { address: "test", slug: "test" } },
    { params: { address: "test", slug: "test" } },
    { params: { address: "test", slug: "test" } },
  ];
  */

  return (
    <section>
      <div>
        <ImagePallate itemEntriesA={imgEntries!} itemEntriesB={modelEntries!} />
      </div>
      <div></div>
      <div>{children}</div>
    </section>
  );
}
//<ImagePallate entries={imgEntries} />
//{ params: {address:string; slug:string;};}[]
