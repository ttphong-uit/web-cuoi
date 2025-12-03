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
      if (videoLoaded && fontsLoaded) {
        setLoaded(true);
      }
    };

    // Check if video is loaded
    if (!video) {
      videoLoaded = true;
      checkAllLoaded();
    } else {
      if (video.readyState >= 3) {
        videoLoaded = true;
        checkAllLoaded();
      } else {
        const handleVideoLoad = () => {
          videoLoaded = true;
          checkAllLoaded();
        };
        video.addEventListener("loadeddata", handleVideoLoad);

        // Cleanup
        return () => {
          video.removeEventListener("loadeddata", handleVideoLoad);
        };
      }
    }

    // Check if fonts are loaded
    if (document.fonts) {
      // Wait for all fonts to be ready
      document.fonts.ready.then(() => {
        // Double-check that our specific fonts are loaded
        const fontsToCheck = [
          '400 16px "Mallong"',
          '400 16px "FaugllinBalseyn"',
          '400 16px "Breathing"',
          '400 16px "Shadows Into Light"',
          '400 16px "Quicksand"',
          '400 16px "Dancing Script"',
        ];

        const allFontsLoaded = fontsToCheck.every((font) => {
          try {
            return document.fonts.check(font);
          } catch (e) {
            // If check fails, assume font is loaded
            return true;
          }
        });

        if (allFontsLoaded) {
          fontsLoaded = true;
          checkAllLoaded();
        } else {
          // Fallback: wait a bit more and try again
          setTimeout(() => {
            fontsLoaded = true;
            checkAllLoaded();
          }, 500);
        }
      });
    } else {
      // Fallback if Font Loading API is not supported
      fontsLoaded = true;
      checkAllLoaded();
    }
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
