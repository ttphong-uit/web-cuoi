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
import { BrideAndGroom } from "../_components/BrideAndGroom";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  return (
    <BackgroundWrapper>
      <Cover />
      <SaveTheDate />
      <CalendarGroup />
      <BrideAndGroom />
      <OurStory />
      <TimeLine />
      <RestaurantLocation2 />
      <OurAlbum />
      <Footer />
      <WidgetMessage />
    </BackgroundWrapper>
  );
};

export default MainPage;
