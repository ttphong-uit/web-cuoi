"use client";
import Image from "next/image";
import * as React from "react";
import loadingPlaceholder from "../_assets/images/loading.svg";

interface IBackgroundProps extends React.PropsWithChildren {}

export const BackgroundWrapper: React.FunctionComponent<IBackgroundProps> = ({
  children,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [loaded, setLoaded] = React.useState(false);
  const [scrollHeight, setScrollHeight] = React.useState<number | undefined>(
    undefined
  );
  React.useEffect(() => {
    const video = videoRef.current;
    setScrollHeight(window.innerHeight);
    if (!video) return;
    if (video.readyState >= 3) {
      setLoaded(true);
      return;
    }
    const handle = () => {
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
      <div className="fixed top-0 left-0 bottom-0 right-0 z-0">
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
        id="aos-scroller"
        style={{
          overflow: "hidden",
          height: `${scrollHeight ?? 0}px`,
        }}
        className={`relative ${loaded ? "z-1000" : "z-0"}`}
      >
        {children}
      </div>
    </>
  );
};
