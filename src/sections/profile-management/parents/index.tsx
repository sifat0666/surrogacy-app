import React from "react";
import About from "./about/about";
import ContactDetails from "./contact-details/contact-details";
import CustomTab from "@/components/custom-tab/custom-tab";
import SurrogacyInformation from "./surrogacy-information/surrogacy-information";

const ParentsTabsPage = () => {
  const AgencyTabs = [
    { label: "About", content: <About /> },
    { label: "Surrogacy Information", content: <SurrogacyInformation /> },
    { label: "Contact Details", content: <ContactDetails /> },
  ];
  return <CustomTab tabs={AgencyTabs} />;
};

export default ParentsTabsPage;
