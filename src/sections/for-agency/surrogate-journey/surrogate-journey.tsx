import React from "react";
import PromoteIcon from "../../../assets/icons/promote-icon.svg";
import GlobalizeIoon from "../../../assets/icons/globalize-icon.svg";
import AccessibleIcon from "../../../assets/icons/accessible-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const SurrogateJourney = () => {
  const whyUsData = [
    { icon: PromoteIcon, title: "Promote", desc: "Showcase your message to your target audience." },
    { icon: GlobalizeIoon, title: "Globalize", desc: "Expand your agency internationally." },
    { icon: AccessibleIcon, title: "Diversify", desc: "Discover a wider pool of potential Surrogates." },
  ];
  return <AdvantagesSection title="WHAT MAKES US DIFFERENT" subtitle="Why Choose Us?" data={whyUsData} rootSx={{ background: "none", border: 'none' }} wrapSx={{ background: "none" }} isMobileHeading />;
};

export default SurrogateJourney;

