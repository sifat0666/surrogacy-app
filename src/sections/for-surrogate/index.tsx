import React, { Fragment } from "react";
import Hero from "./hero/hero";
import SurrogacyJourney from "./surrogacy-journey/surrogacy-journey";
import Qualifications from "./qualifications/qualifications";
import HowItWorks from "./how-it-works/how-it-works";
import SurrogateStories from "./surrogate-stories/surrogate-stories";
import SurrogateQuote from "@/components/surrogate-quote/surrogate-quote";
import BecomeSurrogate from "@/components/become-surrogate/become-surrogate";

const ForSurrogate = () => {
  return (
    <Fragment>
      <Hero />
      <SurrogacyJourney />
      <Qualifications />
      <HowItWorks />
      <SurrogateStories />
      <SurrogateQuote title="Start Your Journey Today! It’s Free, Easy, and Comes with No Obligations" rootSx={{ mt: { xs: "44px", sm: "120px" } }} gridConfigIcon={{ xs: 12, md: 2 }} gridConfigText={{ xs: 12, md: 10 }} />
      <BecomeSurrogate title="Are You Ready to Become a Surrogate?" desc="Join today and help make a family's dream come true." rootSx={{ backgroundImage: "url(/images/partner-bg.svg)" }} />
    </Fragment>
  );
};

export default ForSurrogate;
