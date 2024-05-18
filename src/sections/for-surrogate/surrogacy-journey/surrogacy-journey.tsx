import React from "react";
import FindMatchingIcon from "../../../assets/icons/find-match-icon.svg";
import CommunityIcon from "../../../assets/icons/community-icon.svg";
import JourneyIcon from "../../../assets/icons/journey-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const SurrogacyJourney = () => {
  const whyUsData = [
    { icon: FindMatchingIcon, title: "Find Your Perfect Match", desc: "Gain exclusive access to an exceptional community of intended parents, making it easier to find a match that meets your specific criteria." },
    { icon: CommunityIcon, title: "Join a Supportive Community", desc: "Become part of our platform and connect with former and current surrogates to receive valuable advice and support." },
    { icon: JourneyIcon, title: "Take Control of Your Journey", desc: "Start conversations with those intended parents you connect with. Your profile is your chance to discuss your terms and compensation needs." },
  ];
  return <AdvantagesSection title="A NEW WAY TO FIND A MATCH" subtitle="Why Choose Us for Your Surrogacy Journey?" data={whyUsData} rootSx={{ background: "none", border: 'none' }} wrapSx={{ background: "none" }} />;
};

export default SurrogacyJourney;
