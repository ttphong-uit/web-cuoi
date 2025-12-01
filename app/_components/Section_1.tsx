'use client';
import React from 'react';
import Image from 'next/image';
import { useMusicContext } from '../_context/MusicContext';
import iconPlay from '../_assets/images/icon-play.png';
import iconPause from '../_assets/images/icon-pause.png';

type Props = {}

export const Section_1 = (props: Props) => {
  const { toggleMusic, isPlaying } = useMusicContext();

  return (
    <section className="min-h-[80vh] flex items-center justify-center relative">
      <div className="text-center relative z-10 p-8">
        {/* Play/Pause Button */}
        <button
          className="bg-transparent border-none cursor-pointer mb-[10vh] p-0 transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <Image
            src={isPlaying ? iconPlay : iconPause}
            alt={isPlaying ? 'Play' : 'Pause'}
            width={60}
            height={60}
          />
        </button>

        {/* Save the Date Text */}
        <div className="flex flex-col gap-0 mb-[10vh] font-quickSand">
          <span className="text-2xl font-thin text-[#333] leading-none">SAVE</span>
          <span className="text-[2rem] italic font-light font-faugllin text-[#999] leading-[2.125rem] ml-[0.625rem] mb-[-0.5rem]">the</span>
          <span className="text-2xl font-thin text-[#333] leading-none">DATE</span>
        </div>

        {/* Names */}
        <div className="mb-[10vh] font-faugllin">
          <h1 className="text-[64px] font-light italic text-[#333] leading-none">Thanh Phong</h1>
          <div className="text-[64px] font-light text-[#999] leading-none">&</div>
          <h1 className="text-[64px] font-light italic text-[#333] leading-none">Hồng Viên</h1>
        </div>

        {/* Date */}
        <div className="text-[1.3rem] font-normal tracking-[0.2em] text-[#333] mt-8 font-faugllin">18.01.2026</div>
      </div>
    </section>
  );
}