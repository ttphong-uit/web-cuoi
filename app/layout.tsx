import type { Metadata } from 'next';
import { Shadows_Into_Light, Quicksand } from 'next/font/google';
import './globals.css';

const shadowToLight = Shadows_Into_Light({
    variable: '--font-shadowToLight',
    subsets: ['latin'],
    weight: '400',
});

const quickSand = Quicksand({
    variable: '--font-quickSand',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Thiệp cưới Thanh Phong & Hồng Viên',
    description: 'Thiệp cưới của chúng tôi Thanh Phong & Hồng Viên',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${shadowToLight.variable} ${quickSand.variable}`}>{children}</body>
        </html>
    );
}
