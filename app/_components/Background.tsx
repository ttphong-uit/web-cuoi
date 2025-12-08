"use client";
import Image from "next/image";
import * as React from "react";
import loadingPlaceholder from "../_assets/images/loading.svg";
import fallbackBg from "../_assets/images/video-fallback.jpg";
import { AOSScrollerProvider } from "../_context/AOSScroller";

interface IBackgroundProps extends React.PropsWithChildren {}

export const BackgroundWrapper: React.FunctionComponent<IBackgroundProps> = ({
  children,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [loaded, setLoaded] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;

    let videoLoaded = false;
    let fontsLoaded = false;

    const checkAllLoaded = () => {
      console.log("Checking loaded state:", { videoLoaded, fontsLoaded });
      if (videoLoaded && fontsLoaded) {
        console.log("All loaded! Showing content");
        setLoaded(true);
      }
    };

    // Video loading timeout - more aggressive for chat apps
    const videoTimeout = setTimeout(() => {
      console.warn("Video loading timeout - using fallback background");
      setVideoFailed(true);
      videoLoaded = true;
      checkAllLoaded();
    }, 2000); // 2 seconds max for video

    // Check if video is loaded
    if (!video) {
      console.log("No video element found - using fallback");
      setVideoFailed(true);
      clearTimeout(videoTimeout);
      videoLoaded = true;
      checkAllLoaded();
    } else if (video.readyState >= 2) {
      // readyState 2 = HAVE_CURRENT_DATA (enough to start playing)
      console.log("Video already loaded");
      clearTimeout(videoTimeout);
      videoLoaded = true;
      checkAllLoaded();
    } else {
      console.log("Waiting for video to load");

      const handleVideoCanPlay = () => {
        console.log("Video can play");
        clearTimeout(videoTimeout);
        videoLoaded = true;
        checkAllLoaded();
      };

      const handleVideoError = () => {
        console.error("Video failed to load - using fallback background");
        setVideoFailed(true);
        clearTimeout(videoTimeout);
        videoLoaded = true;
        checkAllLoaded();
      };

      video.addEventListener("canplay", handleVideoCanPlay);
      video.addEventListener("error", handleVideoError);
      video.addEventListener("loadeddata", handleVideoCanPlay);
    }

    // Check if fonts are loaded
    const fontTimeout = setTimeout(() => {
      console.warn("Font loading timeout - proceeding anyway");
      fontsLoaded = true;
      checkAllLoaded();
    }, 3000); // 3 seconds max for fonts

    if (document.fonts) {
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
      clearTimeout(fontTimeout);
      console.log("Font Loading API not supported");
      fontsLoaded = true;
      checkAllLoaded();
    }

    // Cleanup function
    return () => {
      clearTimeout(videoTimeout);
      clearTimeout(fontTimeout);
      if (video) {
        video.removeEventListener("canplay", () => {});
        video.removeEventListener("loadeddata", () => {});
        video.removeEventListener("error", () => {});
      }
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
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

      {/* Background - Video or Fallback Image */}
      <div className="fixed top-0 left-0 bottom-0 right-0 z-0">
        {videoFailed ? (
          // Fallback static image for chat apps
          <Image
            src={fallbackBg}
            alt="background"
            fill
            className="object-cover"
            priority
            quality={85}
          />
        ) : (
          // Video background for regular browsers
          <video
            className="object-cover w-full h-full"
            ref={videoRef}
            src="/video/white-background.mp4"
            autoPlay
            muted
            playsInline
            loop
          />
        )}
      </div>
      <AOSScrollerProvider isBackgroundReady={loaded}>
        {children}
      </AOSScrollerProvider>
    </>
  );
};
