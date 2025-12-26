"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
type AOSScrollerContextType = {
  scrollContainer: HTMLElement | null;
  scrollHeight: number | undefined;
  registerScrollFn: (fn: (event?: Event | undefined) => void) => () => void;
  registerResizeFn: (fn: (event?: Event | undefined) => void) => () => void;
  AOS: typeof AOS;
};

const AOSScrollerContext = React.createContext<AOSScrollerContextType>({
  scrollContainer: null,
  registerScrollFn: (fn: (event?: Event | undefined) => void) => () => {},
  registerResizeFn: (fn: (event?: Event | undefined) => void) => () => {},
  scrollHeight: undefined,
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
  const resizeFnRegistered = React.useRef<{
    [key: string]: (event?: Event) => void;
  }>({});
  const registerScrollFn = React.useCallback((fn: (event?: Event) => void) => {
    const name = "fn_" + Math.random().toString(36).slice(2);
    scrollFnRegistered.current[name] = fn;
    return () => {
      delete scrollFnRegistered.current[name];
    };
  }, []);

  const registerResizeFn = React.useCallback((fn: (event?: Event) => void) => {
    const name = "fn_" + Math.random().toString(36).slice(2);
    resizeFnRegistered.current[name] = fn;
    return () => {
      delete resizeFnRegistered.current[name];
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

      // Handle window resize with debounce
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = (event: Event) => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          setScrollHeight(window.innerHeight);
          AOS.refresh();
          Object.values(resizeFnRegistered.current).forEach((fn) => {
            fn(event);
          });
        }, 150); // 150ms debounce delay
      };

      window.addEventListener("resize", handleResize);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
      };
    }
  }, []);
  return (
    <AOSScrollerContext.Provider
      value={{
        scrollContainer: scrollContainerRef.current,
        registerScrollFn,
        registerResizeFn,
        scrollHeight,
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
