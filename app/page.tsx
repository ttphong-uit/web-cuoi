import { MusicContextProvider } from "./_context/MusicContext";
import { LanguageProvider } from "@/lib/LanguageProvider";
import MainPage from "./_pages/MainPage";

export default function Home({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  // Since params is a Promise in Next.js 15+, we need to use React.use()
  // But for simplicity with client components, we'll default to 'vi'
  // and handle language switching differently

  return (
    <main>
      <LanguageProvider lang="vi">
        <MusicContextProvider>
          <MainPage />
        </MusicContextProvider>
      </LanguageProvider>
    </main>
  );
}
