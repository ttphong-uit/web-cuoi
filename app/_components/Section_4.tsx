"use client";
import React from "react";
import Button from "./Button";

export const Section_4 = () => {
  return (
    <section className="flex items-center justify-center py-8 px-4 bg-transparent">
      <div className="w-full max-w-[800px]">
        {/* Title */}

        {/* Content Card */}
        <div className="bg-[#2a2a2a] rounded-[24px] w-full max-w-[576px] mx-auto flex flex-col items-center justify-center p-8 md:p-12">
          {/* Venue Name */}
          <h2 className="text-center font-dancingScript text-5xl md:text-6xl mb-8 text-white">
            Địa điểm
          </h2>
          <h3 className="text-white font-dancingScript text-2xl md:text-3xl text-center mb-6">
            Trung Tâm Hội Nghị & Tiệc Cưới Le Jardin
          </h3>

          {/* Address */}
          <p className="text-white/90 font-quickSand text-sm md:text-base text-center mb-8 max-w-md">
            195 QL13, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh
          </p>

          {/* Map Container */}
          <div className="w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.703235658427!2d106.71122587488333!3d10.834007489318267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e20c7bb9e1%3A0x1cb3a4c2be7255b5!2zVHJ1bmcgVMOibSBI4buZaSBOZ2jhu4sgJiBUaeG7h2MgQ8aw4bubaSBMZSBKYXJkaW4!5e0!3m2!1sen!2s!4v1764598619984!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Le Jardin Location"
            />
          </div>

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
              className="font-thin"
            >
              Xem trên bản đồ
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
