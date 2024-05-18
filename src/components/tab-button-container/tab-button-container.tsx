"use client";
import React, { useState } from "react";
import { Button, Box, type SxProps, Typography } from "@mui/material";

interface TabButtonProps {
  labels?: string[];
  dataMap?: any;
  rootSx?: SxProps;
  rootWrapSx?: SxProps;
  rootContainerSx?: SxProps;
  onButtonClick?: any;
  rootBtnSx?: any;
  heading?: string;
}

const TabButtonContainer: React.FC<TabButtonProps> = ({ labels = [], dataMap = [], rootSx, onButtonClick, rootBtnSx, rootWrapSx, rootContainerSx, heading }) => {
  const [activeButton, setActiveButton] = useState<string | null>(labels[0] || null);


  return (
    <Box sx={{ ...rootContainerSx }}>
      <Typography variant="h5" color="info.main" pb="20px" fontWeight={500}>
        {heading}
      </Typography>
      <Box sx={{ ...rootWrapSx }}>
        {labels?.map((label, index) => (
          <Button
            key={index}
            variant={activeButton === label ? "contained" : "outlined"}
            style={{ margin: 10, textTransform: 'capitalize', backgroundColor: activeButton === label ? "#FF414D" : "", ...rootBtnSx }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Box sx={{ ...rootSx }}>{activeButton && <Box>{dataMap[activeButton]}</Box>}</Box>
    </Box>
  );
};

export default TabButtonContainer;
