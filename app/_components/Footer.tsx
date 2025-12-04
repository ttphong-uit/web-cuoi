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
      className="relative flex items-center justify-center py-6 px-4 pb-20 md:pb-6 bg-[#272727] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundHeart.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-[#272727]/80"></div>

      <div
        className="relative z-10 w-full max-w-4xl text-center"
        data-aos="fade-up"
      >
        {/* Title */}
        <h2
          className="font-dancingScript text-4xl md:text-5xl text-[#F5EFE7] mb-2"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Ngày chung "ĐÔI"
        </h2>
        <p
          className="font-quickSand text-lg md:text-xl text-[#F5EFE7]/80 mb-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Còn lại...
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-6">
          <div
            className="flex flex-col items-center"
            data-aos="flip-up"
            data-aos-delay="500"
          >
            <div className="bg-[#F5EFE7] rounded-2xl w-15 h-15 md:w-20 md:h-20 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-4xl text-[#272727]">
                {timeLeft.days}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              ngày
            </span>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="flip-up"
            data-aos-delay="600"
          >
            <div className="bg-[#F5EFE7] rounded-2xl w-15 h-15 md:w-20 md:h-20 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-4xl text-[#272727]">
                {timeLeft.hours}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              giờ
            </span>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="flip-up"
            data-aos-delay="700"
          >
            <div className="bg-[#F5EFE7] rounded-2xl w-15 h-15 md:w-20 md:h-20 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-4xl text-[#272727]">
                {timeLeft.minutes}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              phút
            </span>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="flip-up"
            data-aos-delay="800"
          >
            <div className="bg-[#F5EFE7] rounded-2xl w-15 h-15 md:w-20 md:h-20 flex items-center justify-center mb-2">
              <span className="font-dancingScript text-3xl md:text-4xl text-[#272727]">
                {timeLeft.seconds}
              </span>
            </div>
            <span className="font-quickSand text-sm md:text-base text-[#F5EFE7]/70">
              giây
            </span>
          </div>
        </div>

        {/* Message with Cake Icon */}
        <div
          className="flex flex-col items-center gap-3"
          data-aos="zoom-in"
          data-aos-delay="1000"
        >
          <p className="font-dancingScript text-3xl md:text-4xl text-[#F5EFE7]">
            Với tình yêu,
          </p>
          <p className="font-dancingScript text-3xl md:text-4xl text-[#F5EFE7]">
            Thanh Phong & Hồng Viên!
          </p>

          {/* Cake Icons - Decorative corners */}
          <div className="absolute bottom-[8%] left-[2%] sm:bottom-[10%] sm:left-[5%] -rotate-12">
            <Image
              src={cakeIcon}
              alt="Wedding Cake"
              width={150}
              height={200}
              className="w-16 h-auto sm:w-20 md:w-24 opacity-80"
            />
          </div>
          <div className="absolute bottom-[8%] right-[2%] sm:bottom-[10%] sm:right-[5%] rotate-12">
            <Image
              src={cakeIcon}
              alt="Wedding Cake"
              width={150}
              height={200}
              className="w-16 h-auto sm:w-20 md:w-24 opacity-80"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
