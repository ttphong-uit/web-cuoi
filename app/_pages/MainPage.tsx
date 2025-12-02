"use client";
import * as React from "react";
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

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handler = useMusicContext();
  return (
    <BackgroundWrapper>
      <Cover
        onClick={() => {
          setOpen(true);
          handler.playMusic();
        }}
        shouldShow={open === false}
      />
      {open && (
        <>
          <SaveTheDate />
          <CalendarGroup />
          <TimeLine />
          {/* <Timeline2 /> */}
          <RestaurantLocation />
          {/* <OurStory /> */}
          <OurAlbum />
          <Footer />
        </>
      )}
    </BackgroundWrapper>
  );
};

export default MainPage;
