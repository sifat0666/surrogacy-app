import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccessibkleIcon from "../../../assets/icons/accessible-icon.svg";
import SeamlessExperienceIcon from "../../../assets/icons/seamless-experience-icon.svg";
import EmpowermentIcon from "../../../assets/icons/empowerment-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const WeStandFor = () => {
    const whyUsData = [
        { icon: AccessibkleIcon, title: "Safety", desc: "Trust and safety are our top priorities. We take extra measures to make the platform as safe as possible for our members." },
        { icon: SeamlessExperienceIcon, title: "Transparency", desc: "We believe in an open and honest platform that provides our members with all the necessary information to make informed decisions." },
        { icon: AccessibkleIcon, title: "Inclusivity", desc: "We welcome everyone to join FindSurrogate, regardless of their origin, gender, religion, sexuality, etc." },
    ];
    return (
        <AdvantagesSection title="WHAT MAKES US DIFFERENT" subtitle="What We Stand for" data={whyUsData} />
    );
};

export default WeStandFor;
