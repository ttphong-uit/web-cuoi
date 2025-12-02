"use client";
import React from "react";

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
};

const events: TimelineEvent[] = [
  {
    time: "17:30",
    title: "Đón khách",
    description:
      "Những phút giây đầu tiên thật nhẹ nhàng để quý vị chụp hình, trò chuyện và chia sẻ niềm vui cùng chúng mình.",
  },
  {
    time: "18:30",
    title: "Nghi thức báo hỷ",
    description:
      "Quý vị sẽ cùng chúng mình ghi dấu khoảnh khắc ý nghĩa, đánh dấu một chặng đường mới của hai đứa mình.",
  },
  {
    time: "19:00",
    title: "Tiệc chung vui",
    description:
      "Cùng nhau tận hưởng những khoảnh khắc đáng nhớ nhất trong ngày, cùng nâng ly và quẩy hết mình nha!",
  },
];

export const Timeline2 = () => {
  return (
    <section className="flex items-center justify-center py-8 px-4 bg-transparent">
      <div className="w-full max-w-[800px]">
        {/* Title */}
        <h2 className="text-center font-dancingScript text-5xl md:text-6xl mb-16 text-[#333]">
          Chương trình
        </h2>

        {/* Timeline */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Title */}
              <h3 className="font-dancingScript text-3xl md:text-4xl text-[#333] mb-2">
                {event.title}
              </h3>

              {/* Time */}
              <div className="font-dancingScript text-2xl md:text-3xl text-[#333] mb-4">
                {event.time}
              </div>

              {/* Description */}
              <p className="font-quickSand text-sm md:text-base text-[#666] max-w-md leading-relaxed">
                {event.description}
              </p>

              {/* Divider (not for last item) */}
              {index < events.length - 1 && (
                <div className="w-16 h-[1px] bg-[#333] mt-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
