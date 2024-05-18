"use client";
import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { faqData } from "./faq.data";
import RHFAccordion from "@/components/rhf-accordion/rhf-accordion";

const Faq = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ pt: "106px", textAlign: "center", pb: { xs: '20px', sm: '110px' } }}>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
          <Typography variant="h6" color="secondary">
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          <Typography variant="h3" color="info.main">
            Do You Have Questions?
          </Typography>
          <Typography variant="body1" color="info.main">
            We have answers!
          </Typography>
          <Box sx={{ pt: "60px" }}>
            <RHFAccordion data={faqData} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Faq;

