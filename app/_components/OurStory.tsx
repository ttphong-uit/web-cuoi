"use client";
import React from "react";
import { PolaroidCard } from "./PolaroidCard";
import image1 from "@/app/_assets/images/cover-mobile.jpg";

type StoryYear = {
  year: string;
  title: string;
  description: string;
  leftImage: string;
  leftImageText: string;
  rightImage: string;
  rightImageText: string;
};

// Placeholder data - you can fill this in later
const storyYears: StoryYear[] = [
  {
    year: "2016",
    title: "Khởi đầu",
    description: "Câu chuyện của chúng mình bắt đầu...",
    leftImage: image1.src,
    leftImageText: "Ảnh 1",
    rightImage: image1.src,
    rightImageText: "Ảnh 2",
  },
  {
    year: "2017",
    title: "Năm thứ hai",
    description: "Những kỷ niệm đáng nhớ...",
    leftImage: image1.src,
    leftImageText: "Ảnh 3",
    rightImage: image1.src,
    rightImageText: "Ảnh 4",
  },
  {
    year: "2018",
    title: "Năm thứ ba",
    description: "Hành trình tiếp tục...",
    leftImage: image1.src,
    leftImageText: "Ảnh 5",
    rightImage: image1.src,
    rightImageText: "Ảnh 6",
  },
  {
    year: "2019",
    title: "Năm thứ tư",
    description: "Những ngày tháng bên nhau...",
    leftImage: image1.src,
    leftImageText: "Ảnh 7",
    rightImage: image1.src,
    rightImageText: "Ảnh 8",
  },
  {
    year: "2020",
    title: "Năm thứ năm",
    description: "Cùng nhau vượt qua mọi thử thách...",
    leftImage: image1.src,
    leftImageText: "Ảnh 9",
    rightImage: image1.src,
    rightImageText: "Ảnh 10",
  },
  {
    year: "2021",
    title: "Năm thứ sáu",
    description: "Tình yêu ngày càng bền chặt...",
    leftImage: image1.src,
    leftImageText: "Ảnh 11",
    rightImage: image1.src,
    rightImageText: "Ảnh 12",
  },
  {
    year: "2022",
    title: "Năm thứ bảy",
    description: "Những khoảnh khắc hạnh phúc...",
    leftImage: image1.src,
    leftImageText: "Ảnh 13",
    rightImage: image1.src,
    rightImageText: "Ảnh 14",
  },
  {
    year: "2023",
    title: "Năm thứ tám",
    description: "Cùng nhau trưởng thành...",
    leftImage: image1.src,
    leftImageText: "Ảnh 15",
    rightImage: image1.src,
    rightImageText: "Ảnh 16",
  },
  {
    year: "2024",
    title: "Năm thứ chín",
    description: "Chuẩn bị cho một chương mới...",
    leftImage: image1.src,
    leftImageText: "Ảnh 17",
    rightImage: image1.src,
    rightImageText: "Ảnh 18",
  },
  {
    year: "2025",
    title: "Chương mới",
    description: "Bắt đầu hành trình làm vợ chồng...",
    leftImage: image1.src,
    leftImageText: "Ảnh 19",
    rightImage: image1.src,
    rightImageText: "Ảnh 20",
  },
];

export const OurStory = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-transparent">
      {/* Section Title */}
      <h2 className="text-center font-dancingScript text-5xl md:text-6xl mb-16 text-[#333]">
        Câu chuyện của chúng mình
      </h2>

      {/* Timeline */}
      <div className="w-full max-w-[1200px] space-y-16 md:space-y-24">
        {storyYears.map((story, index) => (
          <div key={story.year} className="relative">
            {/* Title and Description */}
            <div className="text-center mb-8">
              <h3 className="font-dancingScript text-3xl md:text-4xl text-[#333] mb-3">
                {story.title}
              </h3>
              <p className="font-quickSand text-sm md:text-base text-[#666] max-w-2xl mx-auto">
                {story.description}
              </p>
            </div>

            {/* Images and Stepper Row */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
              {/* Left Polaroid */}
              <div className="flex justify-center md:justify-end">
                <PolaroidCard
                  imageSrc={story.leftImage}
                  text={story.leftImageText}
                  className="w-full max-w-[250px] rotate-[-3deg]"
                />
              </div>

              {/* Center Stepper */}
              <div className="flex flex-col items-center">
                {/* Connector Line from Previous */}
                {index > 0 && <div className="w-[2px] h-12 bg-[#333] mb-2" />}

                {/* Year Circle */}
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#2a2a2a] border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="font-faugllin text-white text-sm font-bold">
                      {story.year}
                    </span>
                  </div>
                </div>

                {/* Connector Line to Next */}
                {index < storyYears.length - 1 && (
                  <div className="w-[2px] h-12 bg-[#333] mt-2" />
                )}
              </div>

              {/* Right Polaroid */}
              <div className="flex justify-center md:justify-start">
                <PolaroidCard
                  imageSrc={story.rightImage}
                  text={story.rightImageText}
                  className="w-full max-w-[250px] rotate-[3deg]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
