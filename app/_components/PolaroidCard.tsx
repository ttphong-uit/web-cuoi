"use client";
import Image from "next/image";

type PolaroidCardProps = {
  imageSrc: string;
  text: string;
  imageAlt?: string;
  className?: string;
};

export const PolaroidCard = ({
  imageSrc,
  text,
  imageAlt = "Photo",
  className = "",
}: PolaroidCardProps) => {
  return (
    <div className={`p-2 bg-gray-100 ${className} `}>
      {/* Image Container */}
      <div className="relative min-w-[150px] w-full  aspect-square shadow-neutral-400 shadow-[2px_2px_5px_0px] bg-gray-100 mb-1 ">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="text-center font-quickSand text-xl sm:text-2xl text-[#333] px-2 py-4">
        {text}
      </div>
    </div>
  );
};
