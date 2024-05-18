import React from "react";
import ProcessSection from "@/components/process-section/process-section";

const HowItWorks = () => {
  const howItsWorksData = [
    {
      title: "Search",
      desc: "Explore our database of surrogates, intended parents, and agencies. Filter based on your needs.",
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
      desc: "Interested in someone? Reach out to them directly through our secure messaging system.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 4,
      },
    },
  ];
  return <ProcessSection title="EASILY FIND, CONNECT AND MATCH" data={howItsWorksData} headingDesktop="How It Works?" headingMobile="Connecting Parents & Surrogates" />;
};

export default HowItWorks;
