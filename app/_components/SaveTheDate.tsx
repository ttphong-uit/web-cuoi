"use client";
import Image from "next/image";
import { useEffect } from "react";
import iconPause from "../_assets/images/icon-pause.png";
import iconPlay from "../_assets/images/icon-play.png";
import { useMusicContext } from "../_context/MusicContext";
import { useToggleElementByScroll } from "../_hook/useToggleElementByScroll";

type Props = {};

export const SaveTheDate = (props: Props) => {
  const { toggleMusic, isPlaying, pauseMusic } = useMusicContext();
  const { isShow, sectionRef } = useToggleElementByScroll();
  // Handle tab visibility - pause music when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // Pause music when tab/app goes to background
        pauseMusic();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, pauseMusic]);

  return (
    <>
      <section
        ref={sectionRef}
        className="min-h-[80dvh] pt-[5vh] flex items-center justify-center relative"
        data-aos="fade-up"
      >
        <div className="text-center relative z-10 p-8">
          {/* Play/Pause Button - Hidden when fixed version is shown */}
          <button
            className={`bg-transparent border-none cursor-pointer mb-[5vh] sm:mb-[10vh] p-0 transition-all duration-300 hover:scale-110 active:scale-95`}
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <div className="relative">
              <Image
                src={isPlaying ? iconPlay : iconPause}
                alt={isPlaying ? "Play" : "Pause"}
                width={60}
                height={60}
                placeholder="blur"
                loading="eager"
                className="relative z-10"
              />
            </div>
          </button>

          {/* Save the Date Text */}
          <div
            className="flex flex-col gap-0 mb-[5vh] sm:mb-[10vh] font-quickSand"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-2xl font-thin text-[#333] leading-none">
              SAVE
            </span>
            <span className="text-[2rem] italic font-light font-faugllin text-[#999] leading-8.5 -mb-2">
              the
            </span>
            <span className="text-2xl font-thin text-[#333] leading-none">
              DATE
            </span>
          </div>

          {/* Names */}
          <div
            className="mb-[5vh] sm:mb-[7vh] font-dancingScript"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <h1 className="text-[48px] sm:text-[82px] font-light italic text-[#333] leading-none">
              Thanh Phong
            </h1>
            <div className="text-[36px] sm:text-[64px] font-light text-[#999] leading-none">
              &
            </div>
            <h1 className="text-[48px] sm:text-[82px] font-light italic text-[#333] leading-none">
              Hồng Viên
            </h1>
          </div>

          {/* Date */}
          <div
            className="text-[1.3rem] font-normal tracking-[0.2em] text-[#333] mt-8 font-faugllin"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            18.01.2026
          </div>
        </div>
      </section>

      {/* Fixed Music Button - Shows when scrolled past section */}
      <button
        className={`fixed bottom-[calc(16px+8px+32px)] md:bottom-[calc(16px+8px+48px)]  right-[16px] bg-white/90 backdrop-blur-sm border-none cursor-pointer p-2 rounded-full shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 z-55 ${
          isShow
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <div className="relative">
          <Image
            src={isPlaying ? iconPlay : iconPause}
            alt={isPlaying ? "Play" : "Pause"}
            width={24}
            height={24}
            placeholder="blur"
            loading="eager"
            className={`relative z-10 ${
              isShow && isPlaying ? "animate-spin" : ""
            }`}
          />
        </div>
      </button>
    </>
  );
};
