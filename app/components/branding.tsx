"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Selector from "./selector";

interface BrandingProps {
  Head: boolean;
}

export default function Branding() {
  const path = usePathname();
  var Head = path === "/";
  return (
    <span className="">
      {Head ? (
        <div className="flex flex-col items-center max-w-m p-0">
          <div className="flex flex-row items-center max-w-m p-12">
            <Image
              loading="eager"
              src="/images/lapsa.png"
              height={256}
              width={256}
              alt=""
            />
            <h3 className={`mb-3 text-4xl font-semibold`}>DecoFox</h3>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-left max-w-m p-0">
          <div className="flex flex-row items-center max-w-m p-12">
            <Image
              loading="eager"
              src="/images/lapsa.png"
              height={128}
              width={128}
              alt=""
            />
            <h1 className={`mb-3 text-2xl font-semibold`}>DecoFox</h1>
          </div>
        </div>
      )}
    </span>
  );
}
