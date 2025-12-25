"use client";
import * as React from "react";

interface IMusicContextProps {
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMusic: () => void;
  isPlaying: boolean;
  isLoading: boolean;
  audioReady: boolean;
}

const MusicContext: React.Context<IMusicContextProps> = React.createContext(
  {} as IMusicContextProps
);

export const MusicContextProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [audioReady, setAudioReady] = React.useState(false);

  // Listen to audio element events to update state and trigger re-renders
  // This syncs with external controls (dynamic island, browser controls, system media controls)
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if metadata is already loaded
    if (audio.readyState >= 1) {
      setAudioReady(true);
    }

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setAudioReady(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleLoadedMetadata = () => {
      setAudioReady(true);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // Fallback: If audio loading takes too long/fails, mark as ready after 2000ms
    // so the app loading screen doesn't get stuck
    const timeoutId = setTimeout(() => {
      setAudioReady(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const value = {
    playMusic: () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.5;
        setIsLoading(true);
        audio.play().catch(() => {
          setIsLoading(false);
          // Silently fail - user will need to manually start music
        });
      }
    },
    pauseMusic: () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    },
    toggleMusic: () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused) {
        setIsLoading(true);
        audio.play().catch(() => {
          setIsLoading(false);
        });
      } else {
        audio.pause();
      }
    },
    isPlaying,
    isLoading,
    audioReady,
  };

  return (
    <MusicContext.Provider value={value}>
      {props.children}
      <audio
        ref={audioRef}
        src="/music/music-background-3.mp3"
        loop
        preload="metadata"
      />
    </MusicContext.Provider>
  );
};
export const useMusicContext = () => {
  const ctx = React.useContext(MusicContext);
  if (!ctx) {
    throw new Error(
      "useMusicContext must be used within a MusicContextProvider"
    );
  }
  return ctx;
};
