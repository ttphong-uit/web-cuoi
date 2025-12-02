"use client";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import locationFrame1 from "../_assets/images/location-frame-1.svg";
import locationFrame2 from "../_assets/images/location-frame-2.svg";

export const RestaurantLocation = () => {
  return (
    <section className="flex items-center justify-center sm:py-8 sm:px-4 bg-transparent">
      <div className="relative w-full max-w-[600px] bg-[#2a2a2a] sm:rounded-4xl">
        {/* Background wrapper with beige color and rounded corners */}
        <div className="pt-12 pb-4 px-4 sm:pt-24 sm:pb-8 sm:px-12 ">
          {/* Background Frame Container */}
          <div className="relative">
            {/* Frame 1 - Top decoration */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 sm:w-48 md:w-56 z-0">
              <Image
                src={locationFrame1}
                alt="Decorative frame top"
                width={210}
                height={133}
                className="w-full h-auto"
              />
            </div>
            {/* Frame 2 - Main border frame */}
            <div className="relative w-full aspect-171/250">
              {/* SVG Frame as border */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={locationFrame2}
                  alt="Decorative border frame"
                  width={171}
                  height={250}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content inside the frame */}
              <div className="relative z-10 flex flex-col items-center justify-evenly px-[10%] pt-[35%] pb-[15%] sm:px-14 md:px-16 w-full aspect-171/250">
                {/* Venue Name */}
                <h2 className="text-center font-dancingScript text-5xl sm:text-6xl mb-4 sm:mb-6 text-white">
                  Địa điểm
                </h2>
                <h3 className="text-white font-quickSand text-xl sm:text-xl md:text-2xl text-center mb-3 sm:mb-4 px-2">
                  Trung Tâm Hội Nghị & Tiệc Cưới Le Jardin
                </h3>
                <h3 className="text-white font-quickSand text-xl sm:text-xl md:text-2xl text-center mb-3 sm:mb-4 px-2">
                  Sảnh FUCHSIA A5
                </h3>

                {/* Address */}
                <p className="text-white/90 font-quickSand text-xs sm:text-sm md:text-base text-center mb-4 sm:mb-6 max-w-xs sm:max-w-sm px-2">
                  195 QL13, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh
                </p>

                {/* View on Map Button */}
                <a
                  href="https://maps.app.goo.gl/dSkaBAJDc9rSQgNbA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    color="white"
                    shape="rounded"
                    variant="outlined"
                    className="text-sm sm:text-base"
                  >
                    Xem trên bản đồ
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
