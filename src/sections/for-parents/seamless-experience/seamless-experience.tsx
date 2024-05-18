import React from "react";
import GamingChangingIoon from "../../../assets/icons/gaming-changing-icon.svg";
import FindMatchingIcon from "../../../assets/icons/find-match-icon.svg";
import AccessibleIcon from "../../../assets/icons/accessible-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const SeamLessExperience = () => {
  const whyUsData = [
    { icon: GamingChangingIoon, title: "A Game Changing Platform", desc: "Our platform revolutionizes the surrogacy matching process, making it easier to find the perfect surrogate and simplifying your journey to parenthood." },
    { icon: FindMatchingIcon, title: "A Faster Way to Find a Surrogate", desc: "Connect with hundreds of surrogates, either independent or partnered with fertility providers, based on your specific matching criteria." },
    { icon: AccessibleIcon, title: "An Accessible Option", desc: "We want to make surrogacy accessible for intended parents while valuing the surrogate's effort. We offer full transparency, empowering informed decisions, with zero hidden fees." },
  ];
  return <AdvantagesSection title="A STREAMLINED MATCHING PROCESS" subtitle="Why Choose Us for Your Surrogacy Journey?" data={whyUsData} rootSx={{ background: "none", border: 'none' }} wrapSx={{ background: "none" }} isMobileHeading />;
};

export default SeamLessExperience;

