import React from "react";
import Image from "next/image";
import timeline1 from "../_assets/images/timeline-1.svg";
import timeline2 from "../_assets/images/timeline-2.svg";
import timeline3 from "../_assets/images/timeline-3.svg";
import timelineArrow1 from "../_assets/images/timeline-arrow-1.svg";
import timelineArrow2 from "../_assets/images/timeline-arrow-2.svg";
import { useTranslation } from "@/lib/LanguageProvider";

interface TimelineEvent {
  key: string;
  icon: any;
}

const TimeLine: React.FC = () => {
  const { t } = useTranslation();
  const events: TimelineEvent[] = [
    {
      key: "welcome",
      icon: timeline1,
    },
    {
      key: "ceremony",
      icon: timeline2,
    },
    {
      key: "party",
      icon: timeline3,
    },
  ];

  return (
    <section className="flex items-center justify-center bg-transparent">
      <div className="w-full max-w-[600px] overflow-hidden rounded-[24px] p-4 px-2 md:p-8 md:px-4">
        <h2 className="text-center text-5xl md:text-6xl font-dancingScript text-[#272727] mb-12">
          {t("timeline.title")}
        </h2>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={index} className="relative" data-aos="fade-up">
              {/* Timeline Event */}
              <div className="flex items-center gap-6 mb-6">
                {/* Icon */}
                <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                  <Image
                    src={event.icon}
                    alt={t(`timeline.events.${event.key}.title`)}
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-dancingScript text-[#272727] mb-1">
                    {t(`timeline.events.${event.key}.title`)}
                  </h3>
                  <p className="text-xl md:text-2xl font-dancingScript text-[#7F1023] mb-2">
                    {t(`timeline.events.${event.key}.time`)}
                  </p>
                  <p className="text-sm md:text-base font-quickSand text-[#666] leading-relaxed">
                    {t(`timeline.events.${event.key}.description`)}
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
