'use client';
import * as React from 'react';

interface IMusicContextProps {
    playMusic: () => void;
    pauseMusic: () => void;
    toggleMusic: () => void;
    isPlaying: boolean;
}

const MusicContext: React.Context<IMusicContextProps> = React.createContext({} as IMusicContextProps);

export const MusicContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Listen to audio element events to update state and trigger re-renders
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const value = {
        playMusic: () => {
            audioRef.current?.play();
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
            <audio ref={audioRef} src='/music/music-background-2.mp3' loop />
        </MusicContext.Provider>
    );
};
export const useMusicContext = () => {
    const ctx = React.useContext(MusicContext);
    if (!ctx) {
        throw new Error('useMusicContext must be used within a MusicContextProvider');
    }
    return ctx;
};
