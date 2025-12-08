"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
type AOSScrollerContextType = {
  scrollContainer: HTMLElement | null;
  registerScrollFn: (fn: (event?: Event | undefined) => void) => () => void;
  AOS: typeof AOS;
};

const AOSScrollerContext = React.createContext<AOSScrollerContextType>({
  scrollContainer: null,
  registerScrollFn: (fn: (event?: Event | undefined) => void) => () => {},
  AOS,
});

export const AOSScrollerProvider = ({
  children,
  isBackgroundReady,
}: {
  children: React.ReactNode;
  isBackgroundReady: boolean;
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = React.useState<number | undefined>(
    undefined
  );
  const scrollFnRegistered = React.useRef<{
    [key: string]: (event?: Event) => void;
  }>({});
  const registerScrollFn = React.useCallback((fn: (event?: Event) => void) => {
    const name = fn.name || "fn_" + Math.random().toString(36).slice(2);
    scrollFnRegistered.current[name] = fn;
    return () => {
      delete scrollFnRegistered.current[name];
    };
  }, []);

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
    setScrollHeight(window.innerHeight);
    // Force AOS refresh after initialization
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    // Handle scroll on custom container
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleScroll = (event: Event) => {
        AOS.refresh();
        Object.values(scrollFnRegistered.current).forEach((fn) => {
          fn(event);
        });
      };
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <AOSScrollerContext.Provider
      value={{
        scrollContainer: scrollContainerRef.current,
        registerScrollFn,
        AOS,
      }}
    >
      <div
        id="aos-scroller"
        ref={scrollContainerRef}
        style={{
          overflow: "hidden",
          height: `${scrollHeight ?? 0}px`,
        }}
        className={`relative ${isBackgroundReady ? "z-1000" : "z-0"}`}
      >
        {children}
      </div>
    </AOSScrollerContext.Provider>
  );
};

export const useAOSScroller = () => {
  const ctx = React.useContext(AOSScrollerContext);
  if (!ctx) {
    throw new Error(
      "useAOSScroller must be used within an AOSScrollerProvider"
    );
  }
  return ctx;
};
