"use client";
import { useState } from "react";
import { PolaroidCard } from "./PolaroidCard";
import image1 from "@/app/_assets/images/our-album/1.jpg";
import image2 from "@/app/_assets/images/our-album/2.jpg";
import image3 from "@/app/_assets/images/our-album/3.jpg";
import image4 from "@/app/_assets/images/our-album/4.jpg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Button from "./Button";

type AlbumPhoto = {
  imageSrc: string;
  text: string;
  imageAlt?: string;
};

// Placeholder data - you can fill this in later
const albumPhotos: AlbumPhoto[] = [
  {
    imageSrc: image1.src,
    text: "",
    imageAlt: "Photo 1",
  },
  {
    imageSrc: image2.src,
    text: "",
    imageAlt: "Photo 2",
  },
  {
    imageSrc: image3.src,
    text: "",
    imageAlt: "Photo 3",
  },
  {
    imageSrc: image4.src,
    text: "",
    imageAlt: "Photo 4",
  },
];

// Desktop only - Array of varied rotations for a more natural, scattered look
const rotations = [
  "md:rotate-[-4deg]",
  "md:rotate-[2deg]",
  "md:rotate-[-1deg]",
  "md:rotate-[3deg]",
  "md:rotate-[-2deg]",
  "md:rotate-[5deg]",
  "md:rotate-[-3deg]",
  "md:rotate-[1deg]",
  "md:rotate-[-5deg]",
  "md:rotate-[4deg]",
  "md:rotate-[-1deg]",
  "md:rotate-[2deg]",
];

// Helper function to get rotation class based on index (desktop only)
const getRotationClass = (index: number): string => {
  return rotations[index % rotations.length];
};

export const OurAlbum = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Show only 4 items by default
  const displayedPhotos = albumPhotos.slice(0, 4);

  // Prepare lightbox slides
  const lightboxSlides = albumPhotos.map((photo) => ({
    src: photo.imageSrc,
    alt: photo.imageAlt || photo.text,
    title: photo.text,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleViewMore = () => {
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-transparent"
      data-aos="fade-up"
    >
      {/* Section Title */}
      <h2
        className="text-center font-dancingScript text-5xl md:text-6xl mb-16 text-[#333]"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        Album của "chúng mình"
      </h2>

      {/* Photo Grid */}
      <div className="w-full max-w-[800px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {displayedPhotos.map((photo, index) => (
            <div
              key={index}
              className="flex justify-center cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={`${200 + index * 100}`}
              onClick={() => openLightbox(index)}
            >
              <PolaroidCard
                imageSrc={photo.imageSrc}
                text={photo.text}
                imageAlt={photo.imageAlt}
                className={`w-full max-w-[320px] transition-transform hover:scale-105 ${getRotationClass(
                  index
                )}`}
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Button
            data-aos="zoom-in"
            data-aos-delay="600"
            variant="filled"
            color="white"
            shape="rounded"
            className="sm:min-w-[250px] hover:scale-105"
            onClick={handleViewMore}
          >
            Xem thêm
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        carousel={{
          finite: false,
          preload: 2,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
          },
        }}
      />
    </section>
  );
};
