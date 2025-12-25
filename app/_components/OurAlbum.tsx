'use client';
import { useState } from 'react';
import { PolaroidCard } from './PolaroidCard';
import image1 from '@/app/_assets/images/our-album/album_1.jpg';
import image2 from '@/app/_assets/images/our-album/album_2.jpg';
import image3 from '@/app/_assets/images/our-album/album_3.jpg';
import image4 from '@/app/_assets/images/our-album/album_4.jpg';
import image5 from '@/app/_assets/images/our-album/album_5.jpg';
import image6 from '@/app/_assets/images/our-album/album_6.jpg';
import image7 from '@/app/_assets/images/our-album/album_7.jpg';
import image8 from '@/app/_assets/images/our-album/album_8.jpg';
import image9 from '@/app/_assets/images/our-album/album_9.jpg';
import image10 from '@/app/_assets/images/our-album/album_10.jpg';
import image11 from '@/app/_assets/images/our-album/album_11.jpg';
import image12 from '@/app/_assets/images/our-album/album_12.jpg';
import image13 from '@/app/_assets/images/our-album/album_13.jpg';
import image14 from '@/app/_assets/images/our-album/album_14.jpg';
import image15 from '@/app/_assets/images/our-album/album_15.jpg';
import image16 from '@/app/_assets/images/our-album/album_16.jpg';
import image17 from '@/app/_assets/images/our-album/album_17.jpg';
import image18 from '@/app/_assets/images/our-album/album_18.jpg';
import image19 from '@/app/_assets/images/our-album/album_19.jpg';
import image20 from '@/app/_assets/images/our-album/album_20.jpg';
import image21 from '@/app/_assets/images/our-album/album_21.jpg';
import image22 from '@/app/_assets/images/our-album/album_22.jpg';
import image23 from '@/app/_assets/images/our-album/album_23.jpg';
import image24 from '@/app/_assets/images/our-album/album_24.jpg';
import image25 from '@/app/_assets/images/our-album/album_25.jpg';
import image26 from '@/app/_assets/images/our-album/album_26.jpg';
import image27 from '@/app/_assets/images/our-album/album_27.jpg';
import image28 from '@/app/_assets/images/our-album/album_28.jpg';
import image29 from '@/app/_assets/images/our-album/album_29.jpg';
import image30 from '@/app/_assets/images/our-album/album_30.jpg';
import image31 from '@/app/_assets/images/our-album/album_31.jpg';
import image32 from '@/app/_assets/images/our-album/album_32.jpg';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Button from './Button';
import { useTranslation } from '@/lib/LanguageProvider';

type AlbumPhoto = {
    imageSrc: string;
    text: string;
    imageAlt?: string;
};

// Placeholder data - you can fill this in later
const albumPhotos: AlbumPhoto[] = [
    { imageSrc: image1.src, text: '', imageAlt: 'Photo 1' },
    { imageSrc: image2.src, text: '', imageAlt: 'Photo 2' },
    { imageSrc: image3.src, text: '', imageAlt: 'Photo 3' },
    { imageSrc: image4.src, text: '', imageAlt: 'Photo 4' },
    { imageSrc: image5.src, text: '', imageAlt: 'Photo 5' },
    { imageSrc: image6.src, text: '', imageAlt: 'Photo 6' },
    { imageSrc: image7.src, text: '', imageAlt: 'Photo 7' },
    { imageSrc: image8.src, text: '', imageAlt: 'Photo 8' },
    { imageSrc: image9.src, text: '', imageAlt: 'Photo 9' },
    { imageSrc: image10.src, text: '', imageAlt: 'Photo 10' },
    { imageSrc: image11.src, text: '', imageAlt: 'Photo 11' },
    { imageSrc: image12.src, text: '', imageAlt: 'Photo 12' },
    { imageSrc: image13.src, text: '', imageAlt: 'Photo 13' },
    { imageSrc: image14.src, text: '', imageAlt: 'Photo 14' },
    { imageSrc: image15.src, text: '', imageAlt: 'Photo 15' },
    { imageSrc: image16.src, text: '', imageAlt: 'Photo 16' },
    { imageSrc: image17.src, text: '', imageAlt: 'Photo 17' },
    { imageSrc: image18.src, text: '', imageAlt: 'Photo 18' },
    { imageSrc: image19.src, text: '', imageAlt: 'Photo 19' },
    { imageSrc: image20.src, text: '', imageAlt: 'Photo 20' },
    { imageSrc: image21.src, text: '', imageAlt: 'Photo 21' },
    { imageSrc: image22.src, text: '', imageAlt: 'Photo 22' },
    { imageSrc: image23.src, text: '', imageAlt: 'Photo 23' },
    { imageSrc: image24.src, text: '', imageAlt: 'Photo 24' },
    { imageSrc: image25.src, text: '', imageAlt: 'Photo 25' },
    { imageSrc: image26.src, text: '', imageAlt: 'Photo 26' },
    { imageSrc: image27.src, text: '', imageAlt: 'Photo 27' },
    { imageSrc: image28.src, text: '', imageAlt: 'Photo 28' },
    { imageSrc: image29.src, text: '', imageAlt: 'Photo 29' },
    { imageSrc: image30.src, text: '', imageAlt: 'Photo 30' },
    { imageSrc: image31.src, text: '', imageAlt: 'Photo 31' },
    { imageSrc: image32.src, text: '', imageAlt: 'Photo 32' },
];

// Desktop only - Array of varied rotations for a more natural, scattered look
const rotations = [
    'md:rotate-[-4deg]',
    'md:rotate-[2deg]',
    'md:rotate-[-1deg]',
    'md:rotate-[3deg]',
    'md:rotate-[-2deg]',
    'md:rotate-[5deg]',
    'md:rotate-[-3deg]',
    'md:rotate-[1deg]',
    'md:rotate-[-5deg]',
    'md:rotate-[4deg]',
    'md:rotate-[-1deg]',
    'md:rotate-[2deg]',
];

// Helper function to get rotation class based on index (desktop only)
const getRotationClass = (index: number): string => {
    return rotations[index % rotations.length];
};

export const OurAlbum = () => {
    const { t } = useTranslation();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Show only 4 items by default
    const displayedPhotos = [albumPhotos[4], albumPhotos[9], albumPhotos[17], albumPhotos[29]];

    // Prepare lightbox slides
    const lightboxSlides = albumPhotos.map((photo) => ({
        src: photo.imageSrc,
        alt: photo.imageAlt || photo.text,
        title: photo.text,
    }));

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const handleViewMore = () => {
        setLightboxIndex(0);
        setLightboxOpen(true);
    };

    return (
        <section
            className='min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-transparent'
            data-aos='fade-up'
        >
            {/* Section Title */}
            <h2
                className='text-center font-dancingScript text-5xl md:text-6xl mb-16 text-[#333]'
                data-aos='fade-down'
                data-aos-delay='200'
            >
                {t('ourAlbum.title')}
            </h2>

            {/* Photo Grid */}
            <div className='w-full max-w-[800px]'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                    {displayedPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className='flex justify-center cursor-pointer'
                            data-aos='fade-up'
                            data-aos-delay={`${200 + index * 100}`}
                            onClick={() => openLightbox(index)}
                        >
                            <PolaroidCard
                                imageSrc={photo.imageSrc}
                                text={photo.text}
                                imageAlt={photo.imageAlt}
                                className={`w-full max-w-[320px] transition-transform hover:scale-105 ${getRotationClass(
                                    index,
                                )}`}
                            />
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className='flex justify-center mt-12'>
                    <Button
                        data-aos='zoom-in'
                        data-aos-delay='600'
                        variant='filled'
                        color='white'
                        shape='rounded'
                        className='sm:min-w-[250px] hover:scale-105'
                        onClick={handleViewMore}
                    >
                        {t('ourAlbum.viewMore')}
                    </Button>
                </div>
            </div>

            {/* Lightbox Modal */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxSlides}
                carousel={{
                    finite: false,
                    preload: 2,
                }}
                controller={{
                    closeOnBackdropClick: true,
                }}
                styles={{
                    container: {
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    },
                }}
            />
        </section>
    );
};
