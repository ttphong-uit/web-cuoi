"use client";
import image1 from "../_assets/images/cover-mobile.jpg";
import { PolaroidCard } from "./PolaroidCard";
import { Calendar } from "./Calendar";

export const Section_2 = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="relative bg-[#2a2a2a] rounded-2xl w-full max-w-[576px] flex flex-col items-center gap-8 p-4 md:p-16">
        {/* Header Text */}
        <div className="text-center mt-1">
          <h2 className="text-white font-dancingScript text-4xl md:text-5xl mb-6">
            Thân mời!
          </h2>
          <p className="text-white/90 font-quickSand text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Ngày đặc biệt này sẽ mở ra hành trình xây dựng một gia đình hạnh
            phúc của chúng mình. Chúng mình háo hức muốn chia sẻ niềm vui ấy và
            trân trọng kính mời quý vị đến chung vui cùng chúng mình trong ngày
            thật ý nghĩa này.
          </p>
        </div>
        {/* Calendar */}
        <div className="mt-1">
          <Calendar />
        </div>
        {/* Polaroid Card */}
        <div className="mt-1 w-[80%]">
          <PolaroidCard imageSrc={image1.src} text={""} />
        </div>
      </div>
    </section>
  );
};
