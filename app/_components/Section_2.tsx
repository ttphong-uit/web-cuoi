'use client';
import React from 'react';
import Image from 'next/image';
import { PolaroidCard } from './PolaroidCard';
import calendarHeart from '../_assets/images/calendar-heart.png';

type Props = {
  imageSrc?: string;
  imageText?: string;
}

export const Section_2 = ({ imageSrc = '', imageText = '' }: Props) => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="relative bg-[#2a2a2a] rounded-[15%] w-full max-w-[800px] aspect-[4/5] flex flex-col items-center justify-between p-12 md:p-16">

        {/* Header Text */}
        <div className="text-center mt-8">
          <h2 className="text-white font-faugllin text-4xl md:text-5xl mb-6">
            Thân mời!
          </h2>
          <p className="text-white/90 font-quickSand text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Ngày này sẽ là khởi đầu cho cuộc sống gia đình hạnh phúc và lâu dài của chúng tôi. Hãy chia sẻ niềm vui này cùng chúng tôi, chúng tôi trân trọng kính mời quý vị đến dự lễ cưới của chúng tôi.
          </p>
        </div>

        {/* Calendar */}
        <div className="text-center">
          {/* Week Days */}
          <div className="flex gap-4 md:gap-6 justify-center mb-4 text-white/80 font-quickSand text-xs md:text-sm">
            <span>T2</span>
            <span>T3</span>
            <span>T4</span>
            <span>T5</span>
            <span>T6</span>
            <span>T7</span>
            <span>CN</span>
          </div>

          {/* Dates */}
          <div className="flex gap-4 md:gap-6 justify-center items-center mb-4">
            <span className="text-white/60 font-quickSand text-sm md:text-base">11</span>
            <span className="text-white/60 font-quickSand text-sm md:text-base">12</span>
            <span className="text-white/60 font-quickSand text-sm md:text-base">13</span>
            <span className="text-white/60 font-quickSand text-sm md:text-base">14</span>
            <span className="text-white/60 font-quickSand text-sm md:text-base">15</span>
            <div className="relative">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src={calendarHeart}
                  alt="Heart"
                  width={48}
                  height={48}
                  className="absolute inset-0 object-contain translate-x-[10%] -translate-y-[10%]"
                />
                <span className="relative z-10 text-white font-quickSand font-bold text-sm md:text-base">18</span>
              </div>
            </div>
            <span className="text-white/60 font-quickSand text-sm md:text-base">19</span>
          </div>

          {/* Month */}
          <p className="text-white font-faugllin text-3xl md:text-4xl italic mt-6">
            Tháng 1
          </p>
        </div>

        {/* Polaroid Card */}
        <div className="mt-auto mb-8">
          <PolaroidCard
            imageSrc={imageSrc}
            text={imageText}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};
