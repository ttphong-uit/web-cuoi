"use client";
import Image from "next/image";
import groomImg from "@/app/_assets/images/birde-and-groom/groom-portrait.webp";
import brideImg from "@/app/_assets/images/our-album/album_8.webp";
import { useTranslation } from "@/lib/LanguageProvider";

export const BrideAndGroom = () => {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen py-8 px-4 bg-transparent overflow-hidden">
      {/* Bride Section */}
      <div
        className="max-w-[800px] mx-auto mb-12"
        data-aos="fade-in"
        data-aos-once="true"
        data-aos-duration="600"
      >
        <div
          className="bg-[#2a2a2a] rounded-[24px] p-8 md:p-12 overflow-hidden"
          data-aos="fade-right"
          data-aos-once="true"
          data-aos-duration="800"
          style={{
            boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
            {/* Bride Information - Left Side (6/10) */}
            <div
              className="md:col-span-6 text-white order-2 md:order-1"
              data-aos="fade-in"
              data-aos-once="true"
              data-aos-duration="600"
              data-aos-delay="800"
            >
              <h2 className="font-dancingScript text-4xl md:text-5xl mb-4 text-[#F5EFE7]">
                {t("brideAndGroom.bride.title")}
              </h2>

              <div className="space-y-4 font-quickSand ">
                <div>
                  <h3 className="text-2xl font-dancingScript md:text-4xl font-semibold mb-2 text-[#F5EFE7]">
                    {t("brideAndGroom.bride.name")}
                  </h3>
                </div>

                <div className="space-y-2 text-[#D4C5B9]">
                  <p
                    className="text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: t("brideAndGroom.bride.info", {
                        father: `<strong>${t(
                          "brideAndGroom.bride.father"
                        )}</strong>`,
                        mother: `<strong>${t(
                          "brideAndGroom.bride.mother"
                        )}</strong>`,
                      }),
                    }}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-[#4a4a4a]">
                  <p className="text-sm md:text-base leading-relaxed text-[#D4C5B9] italic">
                    {t("brideAndGroom.bride.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* Bride Image - Right Side (4/10) */}
            <div
              className="md:col-span-4 order-1 md:order-2"
              data-aos="fade-left"
              data-aos-once="true"
              data-aos-duration="600"
              data-aos-delay="500"
            >
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={brideImg}
                  alt="Cô dâu"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Groom Section */}
      <div
        className="max-w-[800px] mx-auto"
        data-aos="fade-in"
        data-aos-once="true"
        data-aos-duration="600"
      >
        <div
          className="bg-[#2a2a2a] rounded-[24px] p-8 md:p-12 overflow-hidden"
          data-aos="fade-left"
          data-aos-once="true"
          data-aos-duration="800"
          style={{
            boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center">
            {/* Groom Image - Left Side (4/10) */}
            <div
              className="md:col-span-4 order-1"
              data-aos="fade-right"
              data-aos-once="true"
              data-aos-duration="600"
              data-aos-delay="500"
            >
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={groomImg}
                  alt="Chú rể"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Groom Information - Right Side (6/10) */}
            <div
              className="md:col-span-6 text-white order-2"
              data-aos="fade-in"
              data-aos-once="true"
              data-aos-duration="600"
              data-aos-delay="800"
            >
              <h2 className="font-dancingScript text-4xl md:text-5xl mb-4 text-[#F5EFE7]">
                {t("brideAndGroom.groom.title")}
              </h2>

              <div className="space-y-4 font-quickSand">
                <div>
                  <h3 className="text-2xl font-dancingScript md:text-4xl font-semibold mb-2 text-[#F5EFE7]">
                    {t("brideAndGroom.groom.name")}
                  </h3>
                </div>

                <div className="space-y-2 text-[#D4C5B9]">
                  <p
                    className="text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: t("brideAndGroom.groom.info", {
                        father: `<strong>${t(
                          "brideAndGroom.groom.father"
                        )}</strong>`,
                        mother: `<strong>${t(
                          "brideAndGroom.groom.mother"
                        )}</strong>`,
                      }),
                    }}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-[#4a4a4a]">
                  <p className="text-sm md:text-base leading-relaxed text-[#D4C5B9] italic">
                    {t("brideAndGroom.groom.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
