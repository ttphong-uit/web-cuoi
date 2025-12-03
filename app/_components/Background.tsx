"use client";
import Image from "next/image";
import * as React from "react";
import loadingPlaceholder from "../_assets/images/loading.svg";
import { useRef } from "react";

interface IBackgroundProps extends React.PropsWithChildren {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export const BackgroundWrapper: React.FunctionComponent<IBackgroundProps> = ({
  scrollRef,
  children,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) {
      setLoaded(true);
      return;
    }
    const handle = () => {
      console.log("READY from event");
      setLoaded(true);
    };
    video.addEventListener("loadeddata", handle);
    return () => {
      video.removeEventListener("loadeddata", handle);
    };
  }, []);

  return (
    <>
      <div
        className={`
                fixed
                top-0
                left-0
                bottom-0
                right-0
                z-99999
                flex
                justify-center
                items-center
                bg-white
                ${loaded ? "hidden" : "block"}
                `}
      >
        <Image src={loadingPlaceholder} alt="loading" priority />
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 z-0">
        <video
          className="object-cover w-full h-full"
          ref={videoRef}
          src="/video/white-background.mp4"
          autoPlay
          muted
          playsInline
          loop
        />
      </div>
      <div
        ref={scrollRef}
        className={`h-dvh relative overflow-auto aos-scroll-container ${
          loaded ? "z-1000" : "z-0"
        }`}
      >
        {children}
      </div>
    </>
  );
};
