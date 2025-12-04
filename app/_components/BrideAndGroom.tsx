"use client";
import React from "react";
import Image from "next/image";
import brideImg from "@/app/_assets/images/bride-portrait.png";
import groomImg from "@/app/_assets/images/groom-portrait.png";

export const BrideAndGroom = () => {
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
                Cô Dâu
              </h2>

              <div className="space-y-4 font-quickSand">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#F5EFE7]">
                    Huỳnh Thị Hồng Viên
                  </h3>
                  <p className="text-sm md:text-base text-[#D4C5B9]">
                    Con gái của ông <strong>Huỳnh Văn Bốn</strong> và bà{" "}
                    <strong>Ngô Thị Minh</strong>
                  </p>
                </div>

                <div className="space-y-2 text-[#D4C5B9]">
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">Tuổi:</span>{" "}
                    26 tuổi
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">
                      Nghề nghiệp:
                    </span>{" "}
                    Tester
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">Là:</span> Út
                    nữ
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">
                      Sở thích:
                    </span>{" "}
                    Cầu lông, Nấu ăn, Làm đẹp...
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#4a4a4a]">
                  <p className="text-sm md:text-base leading-relaxed text-[#D4C5B9] italic">
                    "Một người phụ nữ dịu dàng, hiền lành với trái tim nhân hậu.
                    Luôn mang đến niềm vui và sự ấm áp cho mọi người xung quanh.
                    Yêu thích sự giản dị và trân trọng những khoảnh khắc nhỏ bé
                    trong cuộc sống."
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
                Chú Rể
              </h2>

              <div className="space-y-4 font-quickSand">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#F5EFE7]">
                    Trần Thanh Phong
                  </h3>
                  <p className="text-sm md:text-base text-[#D4C5B9]">
                    Con trai của ông <strong>Trần Thanh Lịch</strong> và bà{" "}
                    <strong>Trần Thị Thùy Linh</strong>
                  </p>
                </div>

                <div className="space-y-2 text-[#D4C5B9]">
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">Tuổi:</span>{" "}
                    26 tuổi
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">
                      Nghề nghiệp:
                    </span>{" "}
                    Developer quèn
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">Là:</span> Út
                    nam
                  </p>
                  <p className="text-sm md:text-base">
                    <span className="font-semibold text-[#F5EFE7]">
                      Sở thích:
                    </span>{" "}
                    Cầu lông, game, guitar...
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-[#4a4a4a]">
                  <p className="text-sm md:text-base leading-relaxed text-[#D4C5B9] italic">
                    "Một người đàn ông trách nhiệm, chín chắn với tính cách hài
                    hước. Luôn nỗ lực hết mình trong công việc và quan tâm đến
                    gia đình. Yêu thích công nghệ và luôn tìm kiếm những điều
                    mới mẻ trong cuộc sống."
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
