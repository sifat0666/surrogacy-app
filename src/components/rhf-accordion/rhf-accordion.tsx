"use client";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Box, type SxProps, Typography } from "@mui/material";

interface FaqProps {
  title: string;
  summary: string;
}

interface RHFAccordionProps {
  data?: FaqProps[];
  rootSx?: SxProps;
}

const RHFAccordion = ({ data, rootSx }: RHFAccordionProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleChange = (panelIndex: number) => (event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panelIndex : null);
  };

  return (
    <Box sx={{ ...rootSx }}>
      {data?.map((item, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)} sx={{ ...styles.accordion, mb: "25px" }} classes={{ root: "accordion" }} key={index}>
          <AccordionSummary
            expandIcon={expanded === index ? <CloseIcon sx={{ ...styles.icon, fontSize: "18px" }} /> : <AddIcon sx={styles.icon} />}
            aria-controls="panel1-content"
            id={`panel${index}-header`}
            classes={{ root: expanded !== index ? "expanded" : "not-expanded" }}
          >
            <Typography variant={expanded === index ? "body2" : "body1"} fontWeight={500} color="info.main" textAlign='left'>
              {`${index + 1}. ${item?.title}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "3px 6px", textAlign: "left" }}>
            <Typography variant="body2" color="info.main">
              {item?.summary}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default RHFAccordion;

const styles = {
  accordion: {
    backgroundColor: "grey.100",
    boxShadow: "0px 2px 6px 2px #0000001A",
    borderRadius: "6px",
    "&.accordion": {
      "&::before": {
        display: "none",
      },
    },
    "& .not-expanded": {
      padding: "3px 6px",
      minHeight: "unset !important",
    },
    "& .expanded": {
      padding: "11px 12px",
      minHeight: "unset !important",
    },
    "& .Mui-expanded": {
      margin: "0px !important",
    },
  },
  icon: {
    color: "primary.dark",
    fontSize: "25px",
  },
};
