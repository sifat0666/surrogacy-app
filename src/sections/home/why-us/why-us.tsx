import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import FastMachingIcon from "../../../assets/icons/fast-maching-icon.svg";
import SeamlessExperienceIcon from "../../../assets/icons/seamless-experience-icon.svg";
import EmpowermentIcon from "../../../assets/icons/empowerment-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const WhyUs = () => {
  const whyUsData = [
    { icon: FastMachingIcon, title: "Faster Matching", desc: "Explore our large database to find your perfect surrogate or intended parent match." },
    { icon: SeamlessExperienceIcon, title: "Seamless Experience", desc: "Easily connect with all parties involved on our user-friendly platform and simplify your journey." },
    { icon: EmpowermentIcon, title: "Empowerment", desc: "Have full control of your journey thanks to the information and options our community provides." },
  ];
  return (
    <AdvantagesSection title="Why us?" subtitle="What Set Us Apart" data={whyUsData} />
  );
};

export default WhyUs;
