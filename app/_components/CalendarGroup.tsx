"use client";
import image1 from "../_assets/images/our-album/2.jpg";
import { PolaroidCard } from "./PolaroidCard";
import { Calendar } from "./Calendar";

export const CalendarGroup = () => {
  return (
    <section
      className="flex items-center justify-center py-6 px-4 bg-transparent"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div
        className="relative bg-[#2a2a2a] rounded-3xl sm:rounded-full w-full max-w-[600px] overflow-hidden flex flex-col items-center gap-8 p-8 sm:p-12"
        style={{
          boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
        }}
      >
        {/* Header Text */}
        <div className="text-center mt-1">
          <h2
            className="text-white font-dancingScript text-4xl md:text-5xl mb-6"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Thân mời!
          </h2>
          <p
            className="text-white/90 font-quickSand text-sm md:text-base leading-relaxed max-w-md mx-auto"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            Ngày đặc biệt này không chỉ là dấu mốc, mà còn là khởi đầu cho hành
            trình xây dựng tổ ấm hạnh phúc 'có 1 không 2' của chúng mình! Chúng
            mình đang háo hức cực kỳ, chỉ mong được cùng mọi người 'bung lụa' và
            chia sẻ niềm vui lớn lao này. Rất mong được đón tiếp các bạn đến
            chung vui trong ngày ý nghĩa này nhé!
          </p>
        </div>
        {/* Calendar */}
        <div className="mt-1" data-aos="zoom-in" data-aos-delay="600">
          <Calendar />
        </div>
        {/* Polaroid Card */}
        <div
          className="mt-1 w-full max-w-[350px] mb-10"
          data-aos="flip-up"
          data-aos-delay="800"
        >
          <PolaroidCard
            imageSrc={image1.src}
            text={`Some souls just understand each other.`}
          />
        </div>
      </div>
    </section>
  );
};
