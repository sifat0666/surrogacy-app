import React from "react";
import YearsIcon from "../../../assets/icons/years-old-icon.svg";
import SuccessfulIcon from "../../../assets/icons/successful-pregancy-icon.svg";
import GoodHealthIcon from "../../../assets/icons/good-health-icon.svg";
import HealthyIcon from "../../../assets/icons/healthy-icon.svg";
import LifeStyleIcon from "../../../assets/icons/lifestyle-icon.svg";
import AdvantagesSection from "@/components/advantages-section/advantages-section";

const Qualifications = () => {
  const whyUsData = [
    {
      icon: YearsIcon,
      title: "21 - 43 years old",
      gridConfig: {
        xs: 12,
        sm: 4,
        md: 2.4,
      },
    },
    {
      icon: SuccessfulIcon,
      title: "One successful pregancy",
      gridConfig: {
        xs: 12,
        sm: 4,
        md: 2.4,
      },
    },
    {
      icon: GoodHealthIcon,
      title: "In good health",
      gridConfig: {
        xs: 12,
        sm: 4,
        md: 2.4,
      },
    },
    {
      icon: HealthyIcon,
      title: "Healthy BMI",
      gridConfig: {
        xs: 12,
        sm: 4,
        md: 2.4,
      },
    },
    {
      icon: LifeStyleIcon,
      title: "Lifestyle",
      gridConfig: {
        xs: 12,
        sm: 4,
        md: 2.4,
      },
    },
  ];
  return (
    <AdvantagesSection title="BASIC SURROGATE QUALIFICATIONS" subtitle="What Is Required to Become a Surrogate?" data={whyUsData} rootSx={{ background: "none", border: "none" }} isMobileHeading wrapSx={{ pb: { xs: "24px", sm: "74px" } }} />
  );
};

export default Qualifications;
