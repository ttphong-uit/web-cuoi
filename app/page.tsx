import { MusicContextProvider } from './_context/MusicContext';
import MainPage from './_pages/MainPage';

export default function Home() {
    return (
        <main>
            <MusicContextProvider>
                <MainPage />
            </MusicContextProvider>
        </main>
    );
}
