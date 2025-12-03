import React from "react";
import Image from "next/image";
import timeline1 from "../_assets/images/timeline-1.svg";
import timeline2 from "../_assets/images/timeline-2.svg";
import timeline3 from "../_assets/images/timeline-3.svg";
import timelineArrow1 from "../_assets/images/timeline-arrow-1.svg";
import timelineArrow2 from "../_assets/images/timeline-arrow-2.svg";

interface TimelineEvent {
  title: string;
  time: string;
  description: string;
  icon: any;
}

const TimeLine: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      title: "Đón khách",
      time: "17:30",
      description:
        "Những phút giây đầu tiên thật nhẹ nhàng để quý vị chụp hình, trò chuyện và chia sẻ niềm vui cùng chúng mình.",
      icon: timeline1,
    },
    {
      title: "Nghi thức báo hỷ",
      time: "18:30",
      description:
        "Quý vị sẽ cùng chúng mình ghi dấu khoảnh khắc ý nghĩa, đánh dấu một chặng đường mới của hai đứa mình.",
      icon: timeline2,
    },
    {
      title: "Tiệc chung vui",
      time: "19:00",
      description:
        "Cùng nhau tận hưởng những khoảnh khắc đáng nhớ nhất trong ngày, cùng nâng ly và quẩy hết mình nha!",
      icon: timeline3,
    },
  ];

  return (
    <section className="flex items-center justify-center bg-transparent">
      <div className="w-full max-w-[600px] overflow-hidden rounded-[24px] p-4 px-2 md:p-8 md:px-4">
        <h2 className="text-center text-5xl md:text-6xl font-dancingScript text-[#272727] mb-12">
          Chương trình
        </h2>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              {/* Timeline Event */}
              <div className="flex items-center gap-6 mb-6">
                {/* Icon */}
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <Image
                    src={event.icon}
                    alt={event.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-dancingScript text-[#272727] mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-dancingScript text-[#7F1023] mb-2">
                    {event.time}
                  </p>
                  <p className="text-sm md:text-base font-quickSand text-[#666] leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Arrow between events */}
              {index < events.length - 1 && (
                <div className="flex justify-center my-4">
                  <Image
                    src={index % 2 === 0 ? timelineArrow1 : timelineArrow2}
                    alt="arrow"
                    width={60}
                    height={80}
                    style={{ width: "auto", height: "auto" }}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
