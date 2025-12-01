import desktopImg from "../_assets/images/cover-desktop-2.jpg";
import Image from "next/image";
import Button from "./Button";
import React from "react";

type CoverProps = {
  onClick?: () => void;
  shouldShow?: boolean;
};

export const Cover = ({ onClick, shouldShow }: CoverProps) => {
  const [hidden, setHidden] = React.useState(!shouldShow);
  return (
    <div
      className={`w-full h-dvh transition-opacity duration-300 ease-in-out
                ${shouldShow ? "opacity-100" : "opacity-0"}
                ${hidden ? "hidden" : "flex"}`}
      onTransitionEnd={(event) => {
        if (event.propertyName === "opacity" && !shouldShow) {
          setHidden(true);
        }
      }}
    >
      <Image
        src={desktopImg}
        alt="cover"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5))] will-change-transform">
        <div className=" absolute top-[10%] left-0 w-full text-center">
          <div className="text-white font-quickSand font-thin text-[18px] sm:text-[32px] tracking-[2px]">
            Welcome to our wedding
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
          onClick={onClick}
        >
          Bấm để xem...
        </Button>
      </div>
    </div>
  );
};
