"use client";
import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import RHFAccordion from "@/components/rhf-accordion/rhf-accordion";
import { faqsParentsData, faqsProfessionalData, faqsSurrogateData } from "./faqs.data";
import TabButtonContainer from "@/components/tab-button-container/tab-button-container";
import { RootState } from "@/store";
import { useSelector } from 'react-redux';
import Link from "next/link";

const Faqs = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const user = useSelector((state: RootState) => state.auth.user);
  const user_type = user?.user_type;

  // Define labels and dataMap based on user_type
  let labels = [] as any;
  let dataMap = {} as any;

  console.log("user_type", user_type);
  // Check user_type and set labels and dataMap accordingly
  if (user_type === "Intended Parent") {
    labels = ["Intended Parent"];
    dataMap["Intended Parent"] = <RHFAccordion data={faqsParentsData} rootSx={{ mt: '32px' }} />;
  } else if (user_type === "Surrogate") {
    console.log("Surrogate");
    labels = ["Surrogate"];
    dataMap["Surrogate"] = <RHFAccordion data={faqsSurrogateData} rootSx={{ mt: '32px' }} />;
  } else if (user_type === "Agency") {
    labels = ["Professionals"];
    dataMap["Professionals"] = <RHFAccordion data={faqsProfessionalData} rootSx={{ mt: '32px' }} />;
  }
  else {
    labels = ["Intended Parent", "Surrogate", "Professionals"];
    dataMap["Intended Parent"] = <RHFAccordion data={faqsParentsData} rootSx={{ mt: '32px' }} />;
    dataMap["Surrogate"] = <RHFAccordion data={faqsSurrogateData} rootSx={{ mt: '32px' }} />;
    dataMap["Professionals"] = <RHFAccordion data={faqsProfessionalData} rootSx={{ mt: '32px' }} />;
  }

  return (
    <Box sx={{ pt: "106px", textAlign: "center", pb: "24px" }}>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
          <Typography variant="h6" color="secondary">
            FAQS
          </Typography>
          <Typography variant="h3" color="info.main">
            Frequently Asked Questions
          </Typography>
          <Typography sx={{ color: "gray" }}>
            If you can’t find the answer you are looking for here, please
            <Link
              style={{
                color: "#FF414D",
                textDecoration: "none",
                padding: "0 6px",
                fontWeight: 600,
              }}
              href="/contact" >
              contact us
            </Link>
          </Typography>
          <Box sx={{ mt: "32px" }}>
            {labels.length > 0 && (
              <TabButtonContainer labels={labels} dataMap={dataMap} />
            )}
          </Box>
        </Box>
      </Container >
    </Box >
  );
};

export default Faqs;