import Image from 'next/image';
import * as React from 'react';
import loadingPlaceholder from '../_assets/images/loading.svg';
import { AOSScrollerProvider } from '../_context/AOSScroller';
import { useMusicContext } from '../_context/MusicContext';
import { useVideoContext } from '../_context/VideoContext';
import { useAssetLoader } from '../_hook/useAssetLoader';

interface IBackgroundProps extends React.PropsWithChildren {}

export const AppLoading: React.FunctionComponent<IBackgroundProps> = ({ children }) => {
    // Get audio ready state from MusicContext
    const { audioReady } = useMusicContext();
    const { videoLoaded } = useVideoContext();

    // Danh sách các images quan trọng cần preload trước khi hiển thị trang
    const preloadImages: string[] = [];

    const [loaded, setLoaded] = React.useState(false);
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
        // Load assets (fonts + images)
        const loadAllAssets = async () => {
            try {
                await loadAssets();
                setAssetsLoaded(true);
            } catch (error) {
                console.error('❌ Error loading assets:', error);
                setAssetsLoaded(true);
            }
        };

        // Start loading
        loadAllAssets();
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
                ${loaded ? 'hidden' : 'block'}
                `}
            >
                <Image src={loadingPlaceholder} alt='loading' loading='eager' />
            </div>

            <AOSScrollerProvider isBackgroundReady={loaded}>{children}</AOSScrollerProvider>
        </>
    );
};
