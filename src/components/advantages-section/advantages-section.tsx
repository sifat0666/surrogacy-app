"use client";
import React from "react";
import { Box, Container, Grid, GridTypeMap, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface ItemProps {
  icon: string;
  title: string;
  desc?: string;
  gridConfig?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
}

interface AdvantagesSectionProps {
  title?: string;
  subtitle?: string;
  data: ItemProps[];
  rootSx?: React.CSSProperties;
  wrapSx?: any;
  isMobileHeading?: boolean
}

const AdvantagesSection = (props: AdvantagesSectionProps) => {
  const { title, subtitle, isMobileHeading, data, rootSx, wrapSx } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box sx={{ backgroundColor: "grey.100", border: "1px solid #F4F4F4", mt: "40px", ...rootSx }}>
      <Container maxWidth="xl">
        <Box sx={{ ...styles.whyUsWrap, ...wrapSx }}>
          <Box sx={{ pb: { xs: '90px', md: 0 } }}>
            <Typography variant="h6" color="secondary.main" sx={{ textTransform: "uppercase" }}>
              {title}
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              color="info.main"
              pt="5px"
            >
              {subtitle}
            </Typography>
          </Box>
          <Grid container spacing={isMobile ? 3 : 0} sx={{ pt: { xs: "0", sm: "70px" } }} justifyContent={{ xs: "center", md: "space-between" }}>
            {data.map((item, index) => (
              <Grid item xs={item?.gridConfig?.xs} sm={item?.gridConfig?.sm} md={item?.gridConfig?.md} key={index}>
                <Image src={item?.icon} alt={item?.title} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "info.main", pt: "3px" }}>
                  {item?.title}
                </Typography>
                <Typography variant="body2" sx={styles.desc}>
                  {item?.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container >
    </Box >
  );
};

const styles = {
  whyUsWrap: {
    my: "60px",
    backgroundColor: "grey.200",
    pt: { xs: "26px", sm: "46px" },
    pb: { xs: "26px", sm: "98px" },
    textAlign: "center",
    borderRadius: "12px",
    px: { xs: '12px', sm: '24px' }
  },
  desc: {
    color: "info.main",
    pt: "18px",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
};

export default AdvantagesSection;
