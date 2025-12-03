import desktopImg from "../_assets/images/cover-desktop-2.jpg";
import Image from "next/image";
import Button from "./Button";
import React, { useEffect } from "react";
import { useMusicContext } from "../_context/MusicContext";
import Aos from "aos";

type CoverProps = {
  toggleShowContent?: () => void;
};

export const Cover = ({ toggleShowContent }: CoverProps) => {
  const handler = useMusicContext();
  const [hidden, setHidden] = React.useState(false);
  useEffect(() => {
    document.body.setAttribute("style", "overflow: hidden");
    document.documentElement.scrollTop = 0;
    return () => {
      document.documentElement.scrollTop = 0;
      document.body.removeAttribute("style");
    };
  }, []);

  return (
    <div
      className={`w-full relative z-99999999 transition-opacity transition-height duration-100 ease-in-out
                ${!hidden ? "opacity-100 h-dvh" : "opacity-0 h-0"}
                `}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity") {
          document.body.removeAttribute("style");
          Aos.refresh();
        }
      }}
    >
      <Image
        src={desktopImg}
        alt="cover"
        className="w-full h-full object-cover object-center"
        priority
        placeholder="blur"
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
        <Button
          color="white"
          shape="square"
          variant="outlined"
          className="min-w-[250px] absolute bottom-[10%] left-[50%] translate-x-[-50%]"
          onClick={() => {
            setHidden(true);
            handler.playMusic();
          }}
        >
          Bấm để xem...
        </Button>
      </div>
    </div>
  );
};
