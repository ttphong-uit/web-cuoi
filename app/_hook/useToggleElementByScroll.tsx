import React, { useEffect, useRef, useState } from "react";
import { useAOSScroller } from "../_context/AOSScroller";

type UseToggleElementByScrollProps = {
  threshold?: number;
};

export const useToggleElementByScroll = <T extends HTMLElement>(
  props?: UseToggleElementByScrollProps
) => {
  const threshold = props?.threshold || 300;
  const [isShow, setIsShow] = useState(false);
  const sectionRef = useRef<T>(null);
  const { registerScrollFn } = useAOSScroller();

  useEffect(() => {
    const unRegisterScrollFn = registerScrollFn((event) => {
      const scrollContainer = event?.target as HTMLDivElement | undefined;
      if (sectionRef.current) {
        const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
        // When section scrolls out of view, fix the button
        setIsShow(sectionBottom < threshold);
      }
      if (scrollContainer) {
        setIsShow(scrollContainer.scrollTop >= threshold);
      }
    });
    return unRegisterScrollFn;
  }, [threshold]);

  return {
    isShow,
    sectionRef,
  };
};
