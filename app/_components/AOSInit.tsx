"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
      offset: 80,
      easing: "ease-in-out",
      disable: false,
      startEvent: "DOMContentLoaded",
      throttleDelay: 99,
      debounceDelay: 50,
      anchorPlacement: "top-bottom",
    });

    // Force AOS refresh after initialization
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // Handle scroll on custom container
    const scrollContainer = document.querySelector("#aos-scroller");
    if (scrollContainer) {
      const handleScroll = () => {
        AOS.refresh();
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return null;
}
