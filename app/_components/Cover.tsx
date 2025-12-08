import Image from "next/image";
import React from "react";
import desktopImg from "../_assets/images/cover-bg.jpg";
import { useAOSScroller } from "../_context/AOSScroller";
import { useMusicContext } from "../_context/MusicContext";
import { DoubleChevronDown } from "./DoubleChevronDown";

type CoverProps = {
  toggleShowContent?: () => void;
};

export const Cover = ({ toggleShowContent }: CoverProps) => {
  const handler = useMusicContext();
  const [hidden, setHidden] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const { scrollContainer, AOS } = useAOSScroller();
  // Minimum distance for a swipe (in pixels)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;

    if (isSwipeUp) {
      // Call playMusic synchronously within the event handler
      // to satisfy browser autoplay policy
      // handler.playMusic();
      // setHidden(true);
    }
  };

  return (
    <div
      className={`relative w-full z-99999999 transition-all overflow-hidden duration-500
                ${!hidden ? "opacity-100 h-dvh" : "opacity-0 h-0"}
                `}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity") {
          if (scrollContainer) {
            scrollContainer.style.overflow = "auto";
            AOS.refresh();
          }
        }
      }}
    >
      <Image
        src={desktopImg}
        alt="cover"
        className="w-full h-full object-cover object-center"
        priority
        placeholder="blur"
        loading="eager"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5))] will-change-transform">
        <div className=" absolute top-[10%] left-0 w-full text-center">
          <div className="text-white font-quickSand font-thin text-[18px] sm:text-[32px] tracking-[2px]">
            From classmate to soulmate
          </div>
          <div className="text-white font-dancingScript text-[32px] sm:text-[72px] tracking-[2px] sm:tracking-[3px] mt-4">
            Thanh Phong & Hồng Viên
          </div>
        </div>
        <div className="absolute bottom-[20%] left-0 w-full text-center">
          <div className=" text-white font-faugllin text-[32px] tracking-[4px]">
            January
          </div>
          <div className=" text-white font-faugllin text-[38px] tracking-[4px]">
            18.01.2026
          </div>
        </div>
        <div className="absolute bottom-[5%] h-[10vh] w-full">
          <div className="text-white text-center font-quickSand font-thin text-[14px] sm:text-[24px] tracking-[2px]">
            Bấm để xem
          </div>
          <DoubleChevronDown
            className="flex justify-center items-center"
            onClick={() => {
              setHidden(true);
              handler.playMusic();
            }}
          />
        </div>
      </div>
    </div>
  );
};
