"use client";
import Image from "next/image";
import calendarHeart from "../_assets/images/calendar-heart.png";

export const Calendar = () => {
  return (
    <div className="text-center border border-white rounded-lg p-4 md:p-6">
      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 pb-4 mb-4 text-white/80 font-quickSand text-xs md:text-sm border-b border-white">
        <span className="flex items-center justify-center">T2</span>
        <span className="flex items-center justify-center">T3</span>
        <span className="flex items-center justify-center">T4</span>
        <span className="flex items-center justify-center">T5</span>
        <span className="flex items-center justify-center">T6</span>
        <span className="flex items-center justify-center">T7</span>
        <span className="flex items-center justify-center">CN</span>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          12
        </span>
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          13
        </span>
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          14
        </span>
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          15
        </span>
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          16
        </span>
        <span className="text-white/60 font-quickSand text-sm md:text-base flex items-center justify-center">
          17
        </span>
        <div className="relative flex items-center justify-center">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <Image
              src={calendarHeart}
              alt="Heart"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 object-contain translate-x-[10%] -translate-y-[10%] scale-125"
            />
            <span className="relative z-10 text-white font-quickSand font-bold text-sm md:text-base">
              18
            </span>
          </div>
        </div>
      </div>

      {/* Month */}
      <p className="text-white font-faugllin text-3xl md:text-4xl italic mt-6">
        Tháng 1
      </p>
    </div>
  );
};
