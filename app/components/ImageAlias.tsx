import Image from "next/image";

interface ImageAliasProps {
  Title: string;
  location: string;
}

export default function ImageAlias(info: ImageAliasProps) {
  return (
    <div>
      <div>
        <Image src={info.location} width={500} height={500} alt="memes" />
      </div>
    </div>
  );
}
