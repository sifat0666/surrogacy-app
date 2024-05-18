import React, { Fragment } from "react";
import Hero from "./hero/hero";
import WhoAreWe from "./who-are-we/who-are-we";
import HowItWorks from "./how-it-works/how-it-works";
import WhyUs from "./why-us/why-us";
import Testmonial from "./testmoinal/testmoinal";
import BecomeSurrogate from "@/components/become-surrogate/become-surrogate";
import Faq from "./faq/faq";
import FindServices from "./find-services/find-services";

const HomePage = () => {
  return (
    <Fragment>
      <Hero />
      <WhoAreWe />
      <HowItWorks />
      <FindServices />
      <WhyUs />
      <Testmonial />
      <BecomeSurrogate
        title="Ready to Start Your Journey?"
        desc="Don't wait and sign up now!"
        mobileButtonText="BECOME A SURROGATE"
        desktopMobileText="BECOME A PARENT"
        isJoin
        rootSx={{ backgroundImage: "url(/images/start-journey-bg.svg)", mt: { xs: '20px', sm: '130px' } }}
      />
      <Faq />
    </Fragment>
  );
};

export default HomePage;
