"use client";
import * as React from "react";
import { AppLoading } from "../_components/AppLoading";
import { BrideAndGroom } from "../_components/BrideAndGroom";
import { CalendarGroup } from "../_components/CalendarGroup";
import { Cover } from "../_components/Cover";
import { Footer } from "../_components/Footer";
import { OurAlbum } from "../_components/OurAlbum";
import { OurStory } from "../_components/OurStory";
import { RestaurantLocation2 } from "../_components/RestaurantLocation2";
import { SaveTheDate } from "../_components/SaveTheDate";
import TimeLine from "../_components/TimeLine";
import { WidgetMessage } from "../_components/WidgetMessage";

interface IMainPageProps {}

const MainPage: React.FunctionComponent<IMainPageProps> = (props) => {
  return (
    <AppLoading>
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
    </AppLoading>
  );
};

export default MainPage;
