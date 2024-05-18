"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Tab {
  label: string;
  content: any;
}

interface CustomTabProps {
  tabs: Tab[];
}

const CustomTab = ({ tabs }: CustomTabProps) => {
  const [value, setValue] = useState<number>(0);

  if (!tabs.length) {
    return null;
  }

  useEffect(() => {
    if (tabs.length === 1) {
      setValue(0);
    }
  }, [tabs]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{ sx: styles.tabIndicator }}
          classes={{ flexContainer: "muiTabsContainer" }}
          sx={styles.tabsContiner}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} classes={{ root: "muiTab" }} />
          ))}
        </Tabs>
      </Box>
      {/* Render tab panels dynamically */}
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default CustomTab;

const styles = {
  tabsContiner: {
    "& .muiTabsContainer": {
      "@media (max-width: 768px)": {
        width: "100%",
        maxWidth: "100%",
        flexDirection: "column",
      },
    },
  },
  tabIndicator: {
    background: "#FF414D",
    height: "4px",
    "@media (max-width: 768px)": {
      height: "0px",
    },
  },
};
