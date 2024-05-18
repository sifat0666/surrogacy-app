import React, { Fragment } from "react";
import Hero from "./hero/hero";
import SeamLessExperience from "./seamless-experience/seamless-experience";
import WhoAreWe from "./who-are-we/who-are-we";
import HowItWorks from "./how-it-works/how-it-works";
import LgbtInclusivity from "./lgbt-inclusivity/lgbt-inclusivity";
import SurrogateParents from "./surrogate-parents/surrogate-parents";
import SurrogateQuote from "@/components/surrogate-quote/surrogate-quote";
import BecomeSurrogate from "@/components/become-surrogate/become-surrogate";

const ForParentsPage = () => {
  return (
    <Fragment>
      <Hero />
      <SeamLessExperience />
      <WhoAreWe />
      <HowItWorks />
      <LgbtInclusivity />
      <SurrogateParents />
      <SurrogateQuote
        title="Take control of your journey with full transparency and no agency involvement"
        rootSx={{ mt: { xs: "44px", sm: "120px" } }}
        gridConfigIcon={{ xs: 12, md: 2 }}
        gridConfigText={{ xs: 12, md: 10 }}
      />
      <BecomeSurrogate rootSx={{ backgroundImage: "url(/images/partner-bg.svg)" }} />
    </Fragment>
  );
};

export default ForParentsPage;
