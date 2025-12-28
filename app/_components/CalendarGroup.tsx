"use client";
import image2 from "../_assets/images/our-album/album_2.webp";
import { PolaroidCard } from "./PolaroidCard";
import { Calendar } from "./Calendar";
import { useTranslation } from "@/lib/LanguageProvider";

export const CalendarGroup = () => {
  const { t } = useTranslation();
  return (
    <section
      className="flex items-center justify-center py-6 px-4 bg-transparent"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div
        className="relative bg-[#2a2a2a] rounded-3xl sm:rounded-full w-full max-w-[600px] overflow-hidden flex flex-col items-center gap-8 p-8 sm:p-12"
        style={{
          boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
        }}
      >
        {/* Header Text */}
        <div className="text-center mt-1">
          <h2
            className="text-white font-dancingScript text-4xl md:text-5xl mb-6"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            {t("calendar.title")}
          </h2>
          <p
            className="text-white/90 font-quickSand text-sm md:text-base leading-relaxed max-w-md mx-auto"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            {t("calendar.invitation")}
          </p>
        </div>
        {/* Calendar */}
        <div className="mt-1" data-aos="zoom-in" data-aos-delay="600">
          <Calendar />
        </div>
        {/* Polaroid Card */}
        <div
          className="mt-1 w-full max-w-[350px] mb-10"
          data-aos="flip-up"
          data-aos-delay="800"
        >
          <PolaroidCard
            imageSrc={image2.src}
            text={t("calendar.polaroidQuote")}
          />
        </div>
      </div>
    </section>
  );
};
