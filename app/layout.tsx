import type { Metadata } from "next";
import {
  Shadows_Into_Light,
  Quicksand,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";
import AOSInit from "./_components/AOSInit";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shadowToLight.variable} ${quickSand.variable} ${dancingScript.variable}`}
      >
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
