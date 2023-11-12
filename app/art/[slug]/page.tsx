import Image from "next/image";

export default async function artPg({ params }: { params: { slug: string } }) {
  return (
    <div>
      <div className="flex items-center justify-center w-auto h-[calc(100vh-400px)] overflow-hidden">
        <Image
          src={`https://decofoxpersonal.s3.us-west-2.amazonaws.com/${params.slug}`}
          height={0}
          width={0}
          alt=""
          sizes="(width: auto) (height: 100%)"
          quality={100}
          style={{ width: "auto", height: "100%", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
}
