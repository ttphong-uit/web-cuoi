import type { Metadata } from "next";
import {
  Shadows_Into_Light,
  Quicksand,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

const shadowToLight = Shadows_Into_Light({
  variable: "--font-shadowToLight",
  subsets: ["latin"],
  weight: "400",
});

const quickSand = Quicksand({
  variable: "--font-quickSand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancingScript",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thiệp cưới Thanh Phong & Hồng Viên",
  description:
    "Mời quý vị xem thiệp báo hỷ của tụi mình nhé Thanh Phong & Hồng Viên",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Thiệp cưới Thanh Phong & Hồng Viên",
    description:
      "Mời quý vị xem thiệp báo hỷ của tụi mình nhé Thanh Phong & Hồng Viên",
    images: [
      {
        url: "https://baohyphongvien.vercel.app/thumbnail.png",
        width: 1200,
        height: 675,
      },
    ],
  },
  other: {
    image: "https://baohyphongvien.vercel.app/thumbnail.png",
    thumbnail: "https://baohyphongvien.vercel.app/thumbnail.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload local fonts */}
        <link
          rel="preload"
          href="/fonts/Mallong-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Faugllin-Balseyn-BF65fe58663f431.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Faugllin-Balseyn-Italic-BF65fe586651b90.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Breathing.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${shadowToLight.variable} ${quickSand.variable} ${dancingScript.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
