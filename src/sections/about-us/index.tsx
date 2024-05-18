"use client";
import React, { Fragment } from "react";
import WhoAreWe from "./who-are-we/who-are-we";
import FindAMatch from "./find-a-match/find-a-match";
import ConnectingDreams from "./connecting-dreams/connecting-dreams";
import BecomeSurrogate from "@/components/become-surrogate/become-surrogate";
import { useMediaQuery } from "@mui/material";
import WeStandFor from "./we-stand-for/we-stand-for";

const AboutUs = () => {
  const isMobile = useMediaQuery("(min-width: 768px)");
  return (
    <Fragment>
      <WhoAreWe />
      <WeStandFor />
      <FindAMatch />
      <ConnectingDreams />
      {isMobile && (
        <BecomeSurrogate
          title="Are You Ready to Become a Surrogate?"
          desc="Join today and help make a family's dream come true."
          rootSx={{ backgroundImage: "url(/images/start-journey-bg.svg)", mt: { xs: "20px", sm: "100px" } }}
        />
      )}
    </Fragment>
  );
};

export default AboutUs;
