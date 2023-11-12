import dynamic from "next/dynamic";

export default function Game({ params }: { params: { slug: string } }) {
  const Component = dynamic(
    () => import(`@/app/components/games/${params.slug}`),
    {
      //ssr: true,
      loading: () => <p> Loading...</p>,
    }
  );
  /*
  const Component = dynamic(
    () =>
      import(`@/app/components/games/${params.slug}`).catch((err) => {
        return () => <p>Game not found</p>;
      }),
    {
      //ssr: true,
      loading: () => <p> Loading...</p>,
    }
  );
  */

  return (
    <div className="pb-6">
      <Component />
    </div>
  );
}
