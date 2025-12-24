"use client";
import Image from "next/image";
import * as React from "react";
import loadingPlaceholder from "../_assets/images/loading.svg";
import fallbackBg from "../_assets/images/video-fallback.jpg";
import { AOSScrollerProvider } from "../_context/AOSScroller";
import { useAssetLoader } from "../_hook/useAssetLoader";
import { useMusicContext } from "../_context/MusicContext";

// Import BrideAndGroom images
import bridePortrait from "../_assets/images/birde-and-groom/bride-portrait.webp";
import groomPortrait from "../_assets/images/birde-and-groom/groom-portrait.webp";

// Import Our Story images
import story2016 from "../_assets/images/our-story/2016.webp";
import story2017 from "../_assets/images/our-story/2017.jpg";
import story2018 from "../_assets/images/our-story/2018.jpg";
import story2019 from "../_assets/images/our-story/2019.jpg";
import story2020 from "../_assets/images/our-story/2020.jpg";
import story2021 from "../_assets/images/our-story/2021.webp";
import story2022 from "../_assets/images/our-story/2022.jpg";
import story2023 from "../_assets/images/our-story/2023.webp";
import story2024 from "../_assets/images/our-story/2024.webp";
import story2025 from "../_assets/images/our-story/2025.jpg";
import story2026 from "../_assets/images/our-story/2026.webp";

// Import Our Album images
import album1 from "../_assets/images/our-album/1.jpg";
import album2 from "../_assets/images/our-album/2.jpg";
import album3 from "../_assets/images/our-album/3.jpg";
import album4 from "../_assets/images/our-album/4.jpg";

interface IBackgroundProps extends React.PropsWithChildren {}

export const AppLoading: React.FunctionComponent<IBackgroundProps> = ({
  children,
}) => {
  // Get audio ready state from MusicContext
  const { audioReady } = useMusicContext();

  // Danh sách các images quan trọng cần preload trước khi hiển thị trang
  const preloadImages: string[] = [
    // // BrideAndGroom images
    // bridePortrait.src,
    // groomPortrait.src,
    // // Our Story images (all years)
    // story2016.src,
    // story2017.src,
    // story2018.src,
    // story2019.src,
    // story2020.src,
    // story2021.src,
    // story2022.src,
    // story2023.src,
    // story2024.src,
    // story2025.src,
    // story2026.src,
    // // Our Album images (first 4)
    // album1.src,
    // album2.src,
    // album3.src,
    // album4.src,
  ];
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const [loaded, setLoaded] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [assetsLoaded, setAssetsLoaded] = React.useState(false);

  // Initialize asset loader with images to preload
  const { loadAssets } = useAssetLoader({
    imagePaths: preloadImages,
    fontTimeout: 3000,
    imageTimeout: 5000,
  });

  // Check if all resources are ready when any dependency changes
  React.useEffect(() => {
    if (videoLoaded && assetsLoaded && audioReady) {
      setLoaded(true);
    }
  }, [videoLoaded, assetsLoaded, audioReady]);

  React.useEffect(() => {
    const video = videoRef.current;
    let videoTimeoutId: NodeJS.Timeout | null = null;

    // Mark video as loaded (with or without success)
    const markVideoLoaded = (success: boolean) => {
      if (videoTimeoutId) clearTimeout(videoTimeoutId);
      setVideoLoaded(true);
      if (!success) setVideoFailed(true);
    };

    // Video event handlers
    const handleVideoReady = () => {
      markVideoLoaded(true);
    };

    const handleVideoError = () => {
      console.error("❌ Video failed to load - using fallback");
      markVideoLoaded(false);
    };

    // Setup video loading
    const setupVideoLoading = () => {
      if (!video) {
        console.log("ℹ️ No video element - using fallback");
        markVideoLoaded(false);
        return;
      }

      if (video.readyState >= 2) {
        markVideoLoaded(true);
        return;
      }

      console.log("⏳ Waiting for video to load");
      video.addEventListener("canplay", handleVideoReady);
      video.addEventListener("loadeddata", handleVideoReady);
      video.addEventListener("error", handleVideoError);

      // Timeout fallback
      videoTimeoutId = setTimeout(() => {
        console.warn("⚠️ Video timeout - using fallback");
        markVideoLoaded(false);
      }, 2000);
    };

    // Load assets (fonts + images)
    const loadAllAssets = async () => {
      try {
        await loadAssets();
        setAssetsLoaded(true);
      } catch (error) {
        console.error("❌ Error loading assets:", error);
        setAssetsLoaded(true);
      }
    };

    // Start loading
    setupVideoLoading();
    loadAllAssets();

    // Cleanup
    return () => {
      if (videoTimeoutId) clearTimeout(videoTimeoutId);
      if (video) {
        video.removeEventListener("canplay", handleVideoReady);
        video.removeEventListener("loadeddata", handleVideoReady);
        video.removeEventListener("error", handleVideoError);
      }
    };
  }, [loadAssets]);

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
