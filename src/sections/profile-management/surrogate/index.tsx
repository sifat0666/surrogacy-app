import React from "react";
import About from "./about/about";
import SurrogacyInformation from "./surrogacy-information/surrogacy-information";
import CustomTab from "@/components/custom-tab/custom-tab";

const SurrogateTabsPage = () => {
  const SurrogateTabs = [
    { label: "About", content: <About /> },
    { label: "Surrogacy Information", content: <SurrogacyInformation /> },
  ];
  return <CustomTab tabs={SurrogateTabs} />;
};

export default SurrogateTabsPage;
