import React from "react";
import ProcessSection from "@/components/process-section/process-section";

const HowItWorks = () => {
  const howItsWorksData = [
    {
      title: "Explore",
      desc: "Explore our extensive database of potential surrogates.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 6,
      },
    },
    {
      title: "Recruit",
      desc: "Interested in someone? Connect easily with potential candidates using our message system.",
      gridConfig: {
        xs: 12,
        sm: 6,
        md: 6,
      },
    },
  ];
  return <ProcessSection isJoinBtn title="EXPAND YOUR SURROGATE DATABASE" data={howItsWorksData} headingDesktop="How It Works?" headingMobile="How It Works?" buttonText="JOIN OUR PLATFORM NOW" />;
};

export default HowItWorks;
