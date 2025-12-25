"use client";
import * as React from "react";
import Image from "next/image";
import fallbackBg from "../_assets/images/video-fallback.jpg";

interface IVideoContextProps {
  videoLoaded: boolean;
  videoFailed: boolean;
  playVideo: () => void;
}

const VideoContext = React.createContext<IVideoContextProps>(
  {} as IVideoContextProps
);

export const VideoContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);

  React.useEffect(() => {
    const video = videoRef.current;
    let videoTimeoutId: NodeJS.Timeout | null = null;

    const markVideoLoaded = (success: boolean) => {
      if (videoTimeoutId) clearTimeout(videoTimeoutId);
      setVideoLoaded(true);
      if (!success) setVideoFailed(true);
    };

    const handleVideoReady = () => {
      markVideoLoaded(true);
    };

    const handleVideoError = () => {
      console.error("❌ Video failed to load - using fallback");
      markVideoLoaded(false);
    };

    if (!video) {
      // Should catch this case if ref not attached, but render ensures it is
      console.log("ℹ️ No video element - using fallback");
      markVideoLoaded(false);
      return;
    }

    if (video.readyState >= 2) {
      markVideoLoaded(true);
    } else {
      console.log("⏳ Waiting for video to load");
      video.addEventListener("canplay", handleVideoReady);
      video.addEventListener("loadeddata", handleVideoReady);
      video.addEventListener("error", handleVideoError);

      // Timeout fallback
      videoTimeoutId = setTimeout(() => {
        console.warn("⚠️ Video timeout - using fallback");
        markVideoLoaded(false);
      }, 2000);
    }

    return () => {
      if (videoTimeoutId) clearTimeout(videoTimeoutId);
      if (video) {
        video.removeEventListener("canplay", handleVideoReady);
        video.removeEventListener("loadeddata", handleVideoReady);
        video.removeEventListener("error", handleVideoError);
      }
    };
  }, []);

  const playVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.playsInline = true;
      video.play().catch((err) => {
        console.error("Manual play failed:", err);
      });
    }
  };

  const value = {
    videoLoaded,
    videoFailed,
    playVideo,
  };

  return (
    <VideoContext.Provider value={value}>
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
          <video
            className="object-cover w-full h-full"
            ref={videoRef}
            src="/video/white-background.mp4"
            autoPlay
            muted
            playsInline
            loop
            webkit-playsinline="true"
            x5-playsinline="true"
          />
        )}
      </div>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const ctx = React.useContext(VideoContext);
  if (!ctx) {
    throw new Error(
      "useVideoContext must be used within a VideoContextProvider"
    );
  }
  return ctx;
};
