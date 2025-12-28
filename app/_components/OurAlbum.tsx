"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Navigation, Keyboard, Virtual } from "swiper/modules";
import Image, { StaticImageData } from "next/image";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/virtual";

import { PolaroidCard } from "./PolaroidCard";
import image1 from "@/app/_assets/images/our-album/album_1.webp";
import image2 from "@/app/_assets/images/our-album/album_2.webp";
import image3 from "@/app/_assets/images/our-album/album_3.webp";
import image4 from "@/app/_assets/images/our-album/album_4.webp";
import image5 from "@/app/_assets/images/our-album/album_5.webp";
import image6 from "@/app/_assets/images/our-album/album_6.webp";
import image7 from "@/app/_assets/images/our-album/album_7.webp";
import image8 from "@/app/_assets/images/our-album/album_8.webp";
import image9 from "@/app/_assets/images/our-album/album_9.webp";
import image10 from "@/app/_assets/images/our-album/album_10.webp";
import image11 from "@/app/_assets/images/our-album/album_11.webp";
import image12 from "@/app/_assets/images/our-album/album_12.webp";
import image13 from "@/app/_assets/images/our-album/album_13.webp";
import image14 from "@/app/_assets/images/our-album/album_14.webp";
import image15 from "@/app/_assets/images/our-album/album_15.webp";
import image16 from "@/app/_assets/images/our-album/album_16.webp";
import image17 from "@/app/_assets/images/our-album/album_17.webp";
import image18 from "@/app/_assets/images/our-album/album_18.webp";
import image19 from "@/app/_assets/images/our-album/album_19.webp";
import image20 from "@/app/_assets/images/our-album/album_20.webp";
import image21 from "@/app/_assets/images/our-album/album_21.webp";
import image22 from "@/app/_assets/images/our-album/album_22.webp";
import image23 from "@/app/_assets/images/our-album/album_23.webp";
import image24 from "@/app/_assets/images/our-album/album_24.webp";
import image25 from "@/app/_assets/images/our-album/album_25.webp";
import image26 from "@/app/_assets/images/our-album/album_26.webp";
import image27 from "@/app/_assets/images/our-album/album_27.webp";
import image28 from "@/app/_assets/images/our-album/album_28.webp";
import image29 from "@/app/_assets/images/our-album/album_29.webp";
import image30 from "@/app/_assets/images/our-album/album_30.webp";
import image31 from "@/app/_assets/images/our-album/album_31.webp";
import image32 from "@/app/_assets/images/our-album/album_32.webp";

import Button from "./Button";
import { useTranslation } from "@/lib/LanguageProvider";
import { useAOSScroller } from "../_context/AOSScroller";

type AlbumPhoto = {
  image: StaticImageData;
  text: string;
  imageAlt?: string;
};

// Placeholder data - you can fill this in later
const albumPhotos: AlbumPhoto[] = [
  { image: image1, text: "", imageAlt: "Photo 1" },
  { image: image2, text: "", imageAlt: "Photo 2" },
  { image: image3, text: "", imageAlt: "Photo 3" },
  { image: image4, text: "", imageAlt: "Photo 4" },
  { image: image5, text: "", imageAlt: "Photo 5" },
  { image: image6, text: "", imageAlt: "Photo 6" },
  { image: image7, text: "", imageAlt: "Photo 7" },
  { image: image8, text: "", imageAlt: "Photo 8" },
  { image: image9, text: "", imageAlt: "Photo 9" },
  { image: image10, text: "", imageAlt: "Photo 10" },
  { image: image11, text: "", imageAlt: "Photo 11" },
  { image: image12, text: "", imageAlt: "Photo 12" },
  { image: image13, text: "", imageAlt: "Photo 13" },
  { image: image14, text: "", imageAlt: "Photo 14" },
  { image: image15, text: "", imageAlt: "Photo 15" },
  { image: image16, text: "", imageAlt: "Photo 16" },
  { image: image17, text: "", imageAlt: "Photo 17" },
  { image: image18, text: "", imageAlt: "Photo 18" },
  { image: image19, text: "", imageAlt: "Photo 19" },
  { image: image20, text: "", imageAlt: "Photo 20" },
  { image: image21, text: "", imageAlt: "Photo 21" },
  { image: image22, text: "", imageAlt: "Photo 22" },
  { image: image23, text: "", imageAlt: "Photo 23" },
  { image: image24, text: "", imageAlt: "Photo 24" },
  { image: image25, text: "", imageAlt: "Photo 25" },
  { image: image26, text: "", imageAlt: "Photo 26" },
  { image: image27, text: "", imageAlt: "Photo 27" },
  { image: image28, text: "", imageAlt: "Photo 28" },
  { image: image29, text: "", imageAlt: "Photo 29" },
  { image: image30, text: "", imageAlt: "Photo 30" },
  { image: image31, text: "", imageAlt: "Photo 31" },
  { image: image32, text: "", imageAlt: "Photo 32" },
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
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const { scrollContainer, scrollHeight } = useAOSScroller();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Indices of photos to display in the grid
  const displayedIndices = [4, 9, 17, 24];
  const displayedPhotos = displayedIndices.map((index) => albumPhotos[index]);

  const handleOpenModal = () => {
    setLightboxOpen(true);
    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
    }
  };
  const handleCloseModal = () => {
    setLightboxOpen(false);
    if (scrollContainer) {
      scrollContainer.style.overflow = "auto";
    }
  };

  const openLightbox = (originalIndex: number) => {
    setInitialSlide(originalIndex);
    handleOpenModal();
  };

  const handleViewMore = () => {
    setInitialSlide(0);
    handleOpenModal();
  };

  // Navigate to initial slide when swiper is ready
  React.useEffect(() => {
    if (lightboxOpen && swiper) {
      setTimeout(() => {
        swiper.slideToLoop(initialSlide, 0);
      }, 100);
    }
  }, [lightboxOpen, swiper, initialSlide]);

  return (
    <>
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
          {t("ourAlbum.title")}
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
                onClick={() => openLightbox(displayedIndices[index])}
              >
                <PolaroidCard
                  imageSrc={photo.image.src}
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
              {t("ourAlbum.viewMore")}
            </Button>
          </div>
        </div>
      </section>
      {/* Custom Modal with Swiper */}
      {lightboxOpen && (
        <div
          className={`
    fixed top-0 left-0 w-full bg-black/95
    transition-opacity duration-300
    ${lightboxOpen ? "block z-59" : "hidden"}
  `}
          style={{
            height: scrollHeight,
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-60 p-2 text-white hover:text-gray-300 transition-colors rounded-full"
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-60 p-3 text-white/75 hover:text-white transition-colors rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            ref={nextRef}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-60 p-3 text-white/75 hover:text-white transition-colors rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Keyboard, Virtual]}
            onSwiper={setSwiper}
            spaceBetween={30}
            slidesPerView={1}
            initialSlide={initialSlide}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            keyboard={{ enabled: true }}
            loop={true}
            virtual={true}
            className="w-full h-full"
          >
            {albumPhotos.map((photo, index) => (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="h-full w-full flex items-center justify-center p-4 md:p-10"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={photo.image}
                    alt={
                      photo.imageAlt || photo.text || `Album photo ${index + 1}`
                    }
                    fill
                    className="object-contain select-none"
                    sizes="100vw"
                    placeholder="blur"
                    onLoadingComplete={() => {
                      console.log(`Image ${index} loaded successfully`);
                    }}
                    onError={(e) => {
                      console.error(`Image ${index} failed to load:`, e);
                    }}
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
