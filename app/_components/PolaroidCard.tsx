'use client';
import React from 'react';
import Image from 'next/image';

type PolaroidCardProps = {
  imageSrc: string;
  text: string;
  imageAlt?: string;
  className?: string;
}

export const PolaroidCard = ({ imageSrc, text, imageAlt = 'Photo', className = '' }: PolaroidCardProps) => {
  return (
    <div className={`p-4 ${className}`}>
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 mb-4">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Text */}
      <div className="text-center font-faugllin text-xl sm:text-2xl text-[#333] px-2 py-4">
        {text}
      </div>
    </div>
  );
};
