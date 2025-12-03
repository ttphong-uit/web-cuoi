"use client";
import * as React from "react";
import AOS from "aos";
import { Cover } from "../_components/Cover";
import { BackgroundWrapper } from "../_components/Background";
import { useMusicContext } from "../_context/MusicContext";
import { SaveTheDate } from "../_components/SaveTheDate";
import { CalendarGroup } from "../_components/CalendarGroup";
import { Timeline2 } from "../_components/Timeline2";
import { RestaurantLocation } from "../_components/RestaurantLocation";
import { OurStory } from "../_components/OurStory";
import { OurAlbum } from "../_components/OurAlbum";
import TimeLine from "../_components/TimeLine";
import { Footer } from "../_components/Footer";
import { RestaurantLocation2 } from "../_components/RestaurantLocation2";
import { WidgetMessage } from "../_components/WidgetMessage";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handler = useMusicContext();
  const aosScrollRef = React.useRef<HTMLDivElement | null>(null);

  // Trigger AOS animations after Cover transition completes

  return (
    <BackgroundWrapper scrollRef={aosScrollRef}>
      <Cover
        onClick={() => {
          setOpen(true);
          handler.playMusic();
          setTimeout(() => {
            aosScrollRef.current?.scrollTo({ top: 10, behavior: "smooth" });
          }, 150);
        }}
        shouldShow={open === false}
      />
      <div className={`${open ? "block" : "hidden"}`}>
        <SaveTheDate />
        <CalendarGroup />
        <TimeLine />
        {/* <Timeline2 /> */}
        <RestaurantLocation2 />
        {/* <OurStory /> */}
        <OurAlbum />
        <Footer />
      </div>
      <WidgetMessage shouldShow={open} />
    </BackgroundWrapper>
  );
};

export default MainPage;
