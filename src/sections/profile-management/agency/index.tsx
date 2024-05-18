import React from "react";
import About from "./about/about";
import ContactDetails from "./contact-details/contact-details";
import CustomTab from "@/components/custom-tab/custom-tab";
import { getSessionStorage } from "@/utils/session-storage";

const AgencyTabsPage = () => {
  const getUsers = getSessionStorage('user');
  const AgencyTabs = [
    { label: "About", content: <About /> },
    { label: "Contact Details", content: <ContactDetails /> },
  ];
  return <CustomTab tabs={AgencyTabs} />;
};

export default AgencyTabsPage;
