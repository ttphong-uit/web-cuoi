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

    let videoLoaded = false;
    let fontsLoaded = false;

    const checkAllLoaded = () => {
      console.log("Checking loaded state:", { videoLoaded, fontsLoaded });
      if (videoLoaded && fontsLoaded) {
        console.log("All loaded! Showing content");
        setLoaded(true);
      }
    };

    // Check if video is loaded
    if (!video) {
      console.log("No video element found");
      videoLoaded = true;
      checkAllLoaded();
    } else if (video.readyState >= 3) {
      console.log("Video already loaded");
      videoLoaded = true;
      checkAllLoaded();
    } else {
      console.log("Waiting for video to load");
      const handleVideoLoad = () => {
        console.log("Video loaded");
        videoLoaded = true;
        checkAllLoaded();
      };
      video.addEventListener("loadeddata", handleVideoLoad);
    }

    // Check if fonts are loaded
    // Add a maximum timeout to prevent infinite loading
    const maxWaitTime = 3000; // 3 seconds max
    const fontTimeout = setTimeout(() => {
      console.warn("Font loading timeout - proceeding anyway");
      fontsLoaded = true;
      checkAllLoaded();
    }, maxWaitTime);

    if (document.fonts) {
      // Wait for all fonts to be ready
      document.fonts.ready
        .then(() => {
          clearTimeout(fontTimeout);
          console.log("Fonts ready");
          fontsLoaded = true;
          checkAllLoaded();
        })
        .catch((error) => {
          console.error("Font loading error:", error);
          clearTimeout(fontTimeout);
          fontsLoaded = true;
          checkAllLoaded();
        });
    } else {
      // Fallback if Font Loading API is not supported
      clearTimeout(fontTimeout);
      console.log("Font Loading API not supported");
      fontsLoaded = true;
      checkAllLoaded();
    }

    // Cleanup function
    return () => {
      if (video) {
        video.removeEventListener("loadeddata", () => {});
      }
      clearTimeout(fontTimeout);
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
        <Image src={loadingPlaceholder} alt="loading" loading="eager" />
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
