"use client";
import * as React from "react";

interface IMusicContextProps {
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMusic: () => void;
  isPlaying: boolean;
}

const MusicContext: React.Context<IMusicContextProps> = React.createContext(
  {} as IMusicContextProps
);

export const MusicContextProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Listen to audio element events to update state and trigger re-renders
  // This syncs with external controls (dynamic island, browser controls, system media controls)
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      console.log("Music playing");
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log("Music paused");
      setIsPlaying(false);
    };
    const handleEnded = () => {
      console.log("Music ended");
      setIsPlaying(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const value = {
    playMusic: () => {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch((error) => {
          console.warn("Autoplay was prevented:", error);
          // Silently fail - user will need to manually start music
        });
      }
    },
    pauseMusic: () => {
      audioRef.current?.pause();
    },
    toggleMusic: () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    isPlaying,
  };

  return (
    <MusicContext.Provider value={value}>
      {props.children}
      <audio ref={audioRef} src="/music/Canon_in_D.mp3" loop />
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
