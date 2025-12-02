"use client";
import { PolaroidCard } from "./PolaroidCard";
import image1 from "@/app/_assets/images/cover-desktop.jpg";

type AlbumPhoto = {
  imageSrc: string;
  text: string;
  imageAlt?: string;
};

// Placeholder data - you can fill this in later
const albumPhotos: AlbumPhoto[] = [
  {
    imageSrc: image1.src,
    text: "Ảnh 1",
    imageAlt: "Photo 1",
  },
  {
    imageSrc: image1.src,
    text: "Ảnh 2",
    imageAlt: "Photo 2",
  },
  {
    imageSrc: image1.src,
    text: "Ảnh 3",
    imageAlt: "Photo 3",
  },
  {
    imageSrc: image1.src,
    text: "Ảnh 4",
    imageAlt: "Photo 4",
  },
  {
    imageSrc: image1.src,
    text: "Ảnh 5",
    imageAlt: "Photo 5",
  },
  {
    imageSrc: image1.src,
    text: "Ảnh 6",
    imageAlt: "Photo 6",
  },
];

// Array of varied rotations for a more natural, scattered look
const rotations = [
  "rotate-[-4deg]",
  "rotate-[2deg]",
  "rotate-[-1deg]",
  "rotate-[3deg]",
  "rotate-[-2deg]",
  "rotate-[5deg]",
  "rotate-[-3deg]",
  "rotate-[1deg]",
  "rotate-[-5deg]",
  "rotate-[4deg]",
  "rotate-[-1deg]",
  "rotate-[2deg]",
];

// Helper function to get rotation class based on index
const getRotationClass = (index: number): string => {
  return rotations[index % rotations.length];
};

export const OurAlbum = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-transparent">
      {/* Section Title */}
      <h2 className="text-center font-dancingScript text-5xl md:text-6xl mb-16 text-[#333]">
        Album của chúng mình
      </h2>

      {/* Photo Grid */}
      <div className="w-full max-w-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {albumPhotos.map((photo, index) => (
            <div key={index} className="flex justify-center">
              <PolaroidCard
                imageSrc={photo.imageSrc}
                text={photo.text}
                imageAlt={photo.imageAlt}
                className={`w-full max-w-[280px] ${getRotationClass(index)}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
