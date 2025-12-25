"use client";
import React, { useState, useEffect } from "react";
import { PolaroidCard } from "./PolaroidCard";
import { useTranslation } from "@/lib/LanguageProvider";
import image2016 from "@/app/_assets/images/our-story/2016.webp";
import image2017 from "@/app/_assets/images/our-story/2017.jpg";
import image2018 from "@/app/_assets/images/our-story/2018.jpg";
import image2019 from "@/app/_assets/images/our-story/2019.jpg";
import image2020 from "@/app/_assets/images/our-story/2020.jpg";
import image2021 from "@/app/_assets/images/our-story/2021.webp";
import image2022 from "@/app/_assets/images/our-story/2022.jpg";
import image2023 from "@/app/_assets/images/our-story/2023.webp";
import image2024 from "@/app/_assets/images/our-story/2024.webp";
import image2025 from "@/app/_assets/images/our-story/2025.jpg";
import image2026 from "@/app/_assets/images/our-story/2026.jpg";

type StoryYear = {
  year: string;
  image: string;
  imageText: string;
};

const storyYears: StoryYear[] = [
  {
    year: "2016",
    image: image2016.src,
    imageText: "",
  },
  {
    year: "2017",
    image: image2017.src,
    imageText: "",
  },
  {
    year: "2018",
    image: image2018.src,
    imageText: "",
  },
  {
    year: "2019",
    image: image2019.src,
    imageText: "",
  },
  {
    year: "2020",
    image: image2020.src,
    imageText: "",
  },
  {
    year: "2021",
    image: image2021.src,
    imageText: "",
  },
  {
    year: "2022",
    image: image2022.src,
    imageText: "",
  },
  {
    year: "2023",
    image: image2023.src,
    imageText: "",
  },
  {
    year: "2024",
    image: image2024.src,
    imageText: "",
  },
  {
    year: "2025",
    image: image2025.src,
    imageText: "",
  },
  {
    year: "2026",
    image: image2026.src, // Placeholder, có thể thay bằng ảnh cưới sau
    imageText: "",
  },
];

export const OurStory = () => {
  const { t } = useTranslation();
  const [journeyDuration, setJourneyDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  useEffect(() => {
    const startDate = new Date("2016-12-21");
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    let days = currentDate.getDate() - startDate.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    setJourneyDuration({ years, months, days });
  }, []);

  return (
    <section className="min-h-screen max-w-[800px] mx-auto flex flex-col items-center justify-center py-8 px-4 bg-transparent overflow-hidden">
      {/* Section Title */}
      <h2
        className="text-center font-dancingScript text-5xl md:text-6xl mb-4 text-[#333]"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        {t("ourStory.title", {
          years: journeyDuration.years,
          months: journeyDuration.months,
          days: journeyDuration.days,
        })}
      </h2>
      <p
        className="text-center font-quickSand text-sm md:text-base text-[#666] mb-16 italic"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="200"
      >
        {t("ourStory.subtitle")}
      </p>

      {/* Timeline */}
      <div className="w-full max-w-[900px] relative">
        {/* Vertical Timeline Line - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#333] transform -translate-x-1/2" />

        <div className="space-y-8 md:space-y-16">
          {storyYears.map((story, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={story.year}
                className="relative"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={Math.min(index * 50, 200)}
              >
                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col items-center gap-4">
                  {/* Year Circle */}
                  <div
                    className="w-16 h-16 rounded-full bg-[#2a2a2a] border-4 border-white shadow-lg flex items-center justify-center z-10"
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay={Math.min(index * 50, 200)}
                  >
                    <span className="font-faugllin mt-1 text-white text-sm font-bold">
                      {story.year}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="text-center">
                    <h3 className="font-dancingScript text-2xl md:text-3xl text-[#333] mb-2">
                      {t(`ourStory.years.${story.year}.title`)}
                    </h3>
                    <p className="font-quickSand text-sm text-[#666] max-w-md mx-auto mb-4">
                      {t(`ourStory.years.${story.year}.description`)}
                    </p>
                  </div>

                  {/* Image */}
                  <div
                    className="w-full px-4"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay={Math.min(index * 50 + 100, 300)}
                  >
                    <PolaroidCard
                      imageSrc={story.image}
                      text={story.imageText}
                      className="w-full"
                    />
                  </div>

                  {/* Connector to next (mobile) */}
                  {index < storyYears.length - 1 && (
                    <div className="w-[2px] h-8 bg-[#333]" />
                  )}
                </div>

                {/* Desktop Layout - Alternating */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-8 items-center">
                    {isLeft ? (
                      <>
                        {/* Left Side - Content */}
                        <div
                          className="text-right pr-8 pt-2"
                          data-aos="fade-right"
                          data-aos-duration="600"
                          data-aos-delay={Math.min(index * 50, 200)}
                        >
                          <h3 className="font-dancingScript text-3xl md:text-4xl text-[#333] mb-2 sm:mb-4">
                            {t(`ourStory.years.${story.year}.title`)}
                          </h3>
                          <p className="font-quickSand text-sm md:text-base md:text-justify text-[#666] mb-4">
                            {t(`ourStory.years.${story.year}.description`)}
                          </p>
                          <div className="flex justify-end">
                            <div
                              className="w-full"
                              data-aos="fade-up"
                              data-aos-duration="600"
                              data-aos-delay={Math.min(index * 50 + 100, 300)}
                            >
                              <PolaroidCard
                                imageSrc={story.image}
                                text={story.imageText}
                                className="max-w-[400px] w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Side - Empty */}
                        <div />
                      </>
                    ) : (
                      <>
                        {/* Left Side - Empty */}
                        <div />

                        {/* Right Side - Content */}
                        <div
                          className="text-left pl-8 pt-2"
                          data-aos="fade-left"
                          data-aos-duration="600"
                          data-aos-delay={Math.min(index * 50, 200)}
                        >
                          <h3 className="font-dancingScript text-3xl md:text-4xl text-[#333] mb-2 sm:mb-4">
                            {t(`ourStory.years.${story.year}.title`)}
                          </h3>
                          <p className="font-quickSand text-sm md:text-base sm:text-justify text-[#666] mb-4">
                            {t(`ourStory.years.${story.year}.description`)}
                          </p>
                          <div className="flex justify-start">
                            <div
                              className="w-full"
                              data-aos="fade-up"
                              data-aos-duration="600"
                              data-aos-delay={Math.min(index * 50 + 100, 300)}
                            >
                              <PolaroidCard
                                imageSrc={story.image}
                                text={story.imageText}
                                className="max-w-[400px] w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Year Circle - Center */}
                  <div
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-2"
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay={Math.min(index * 50, 200)}
                  >
                    <div className="w-20 h-20 rounded-full bg-[#2a2a2a] border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="font-faugllin mt-1 text-white text-base font-bold">
                        {story.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
