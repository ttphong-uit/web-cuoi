import { MusicContextProvider } from "../_context/MusicContext";
import { VideoContextProvider } from "../_context/VideoContext";
import { LanguageProvider } from "@/lib/LanguageProvider";
import MainPage from "../_pages/MainPage";

type LangPageProps = {
  params: Promise<{ lang: string }>;
};

export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;

  return (
    <main>
      <LanguageProvider lang={lang}>
        <MusicContextProvider>
          <VideoContextProvider>
            <MainPage />
          </VideoContextProvider>
        </MusicContextProvider>
      </LanguageProvider>
    </main>
  );
}

export function generateStaticParams() {
  return [{ lang: "en" }];
}
