import { fetchAllStoryIds, fetchStoryData } from "@/app/lib/StoryUtils";
import StoryContent from "@/app/components/StoryContent";

export default async function Story({ params }: { params: { slug: string } }) {
  const stry = await fetchStoryData(params.slug);
  return (
    <StoryContent
      Title={stry.title}
      content={stry.storyContents}
      type={stry.type}
    />
  );
}
