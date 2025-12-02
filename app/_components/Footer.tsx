"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import cakeIcon from "../_assets/images/cake-1.svg";
import backgroundHeart from "../_assets/images/background-dark-heart.svg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Footer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date("2026-01-18T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-[#272727] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundHeart.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-[#272727]/80"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        {/* Title */}
        <h2 className="font-dancingScript text-5xl md:text-7xl text-[#F5EFE7] mb-4">
          Mùa chung "ĐÔI"
        </h2>
        <p className="font-quickSand text-lg md:text-xl text-[#F5EFE7]/80 mb-12">
          Còn lại...
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-[#F5EFE7] rounded-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-5xl text-[#272727]">
                {timeLeft.days}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              ngày
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#F5EFE7] rounded-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-5xl text-[#272727]">
                {timeLeft.hours}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              giờ
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#F5EFE7] rounded-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-5xl text-[#272727]">
                {timeLeft.minutes}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              phút
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#F5EFE7] rounded-2xl w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-5xl text-[#272727]">
                {timeLeft.seconds}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              giây
            </span>
          </div>
        </div>

        {/* Message with Cake Icon */}
        <div className="flex flex-col items-center gap-6">
          <p className="font-dancingScript text-3xl md:text-5xl text-[#F5EFE7]">
            Với tình yêu,
          </p>
          <p className="font-dancingScript text-3xl md:text-5xl text-[#F5EFE7]">
            Thanh Phong & Hồng Viên!
          </p>

          {/* Cake Icon */}
          <div className="mt-8">
            <Image
              src={cakeIcon}
              alt="Wedding Cake"
              width={150}
              height={200}
              className="w-32 h-auto md:w-40 opacity-90"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
