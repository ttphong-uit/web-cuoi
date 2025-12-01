'use client';
import * as React from 'react';

interface IMusicContextProps {
    playMusic: () => void;
    pauseMusic: () => void;
}

const MusicContext: React.Context<IMusicContextProps> = React.createContext({} as IMusicContextProps);

export const MusicContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const value = {
        playMusic: () => {
            audioRef.current?.play();
        },
        pauseMusic: () => {
            audioRef.current?.pause();
        },
    };
    return (
        <MusicContext.Provider value={value}>
            {props.children}
            <audio ref={audioRef} src='/music/music-background-2.mp3' />
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
