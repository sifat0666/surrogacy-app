import React, { Fragment } from "react";
import Hero from "./hero/hero";
import SurrogateJourney from "./surrogate-journey/surrogate-journey";
import WhoAreWe from "./who-are-we/who-are-we";
import HowItWorks from "./how-it-works/how-it-works";
import OnlineVisibility from "./online-visibility/online-visibility";
import SurrogateQuote from "@/components/surrogate-quote/surrogate-quote";
import BecomeSurrogate from "@/components/become-surrogate/become-surrogate";

const ForAgency = () => {
  return (
    <Fragment>
      <Hero />
      <SurrogateJourney />
      <WhoAreWe />
      <HowItWorks />
      <OnlineVisibility />
      <SurrogateQuote
        title="Unlock the Full Potential of Your Digital Marketing Campaigns with Our Powerful Platform"
        rootSx={{ mt: { xs: "44px", sm: "120px" } }}
        gridConfigIcon={{ xs: 12, md: 2 }}
        gridConfigText={{ xs: 12, md: 10 }}
      />
      <BecomeSurrogate
        title="Ready to Connect with More Intended Parents and Surrogates?"
        desc="Join us today to access the opportunities FindSurrogate.com has to offer your agency."
        mobileButtonText="LETS COLLABORATE"
        desktopMobileText="LETS COLLABORATE"
        rootSx={{ backgroundImage: "url(/images/partner-bg.svg)" }}
      />
    </Fragment>
  );
};

export default ForAgency;
