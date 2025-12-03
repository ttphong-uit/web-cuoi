"use client";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import restaurantIcon from "../_assets/images/restaurant.webp";

export const RestaurantLocation2 = () => {
  return (
    <section
      className="flex items-center justify-center py-12 px-4 bg-transparent"
      data-aos="zoom-in"
    >
      <div
        className="relative w-full max-w-[500px] aspect-square bg-[#2a2a2a] rounded-3xl sm:rounded-full flex flex-col items-center justify-center p-8 sm:p-12"
        style={{
          boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
        }}
      >
        {/* Title */}
        <h2 className="text-center font-dancingScript text-5xl sm:text-6xl mb-6 text-white">
          Địa điểm
        </h2>

        {/* Restaurant Icon/Illustration */}
        <div className="w-48 h-32 sm:w-56 sm:h-36 mb-6 relative">
          <Image
            src={restaurantIcon}
            alt="Restaurant illustration"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-contain"
            placeholder="blur"
          />
        </div>

        {/* Venue Name */}
        <h3 className="text-white/80 font-quickSand text-xs sm:text-sm text-center mb-2 uppercase tracking-wider">
          Trung Tâm Hội Nghị & Tiệc Cưới
        </h3>
        <h3 className="text-white font-quickSand text-xl sm:text-2xl text-center mb-4 font-semibold">
          Le Jardin
        </h3>
        <h4 className="text-white font-quickSand text-base sm:text-lg text-center mb-4">
          Sảnh FUCHSIA A5
        </h4>

        {/* Address */}
        <p className="text-white/90 font-quickSand text-sm sm:text-base text-center mb-6 max-w-xs">
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
            className="text-sm sm:text-base px-8"
          >
            Xem trên bản đồ
          </Button>
        </a>
      </div>
    </section>
  );
};
