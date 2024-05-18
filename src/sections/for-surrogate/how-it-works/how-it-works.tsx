import React from "react";
import ProcessSection from "@/components/process-section/process-section";


const HowItWorks = () => {


  const howItsWorksData = [
    {
      title: "Explore",
      desc: "Browse our database of surrogates, intended parents, and agencies.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 4,
      },
    },
    {
      title: "Join",
      desc: "Become a member to unlock access to their complete profiles.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 4,
      },
    },
    {
      title: "Match",
      desc: "Interested in someone who could be a great match? Reach out to them directly.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 4,
      },
    },
  ];
  return <ProcessSection isJoinBtn title="EASILY FIND, CONNECT AND MATCH" data={howItsWorksData} headingDesktop="How It Works?" headingMobile="How It Works?" />;
};

export default HowItWorks;
