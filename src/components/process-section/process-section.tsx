"use client";
import React from "react";
import { Box, Button, Container, Grid, type SxProps, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";


interface ProcessItem {
  title: string;
  desc: string;
  gridConfig?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
};
interface ProcessProps {
  title?: string;
  headingMobile?: string;
  headingDesktop?: string;
  data: ProcessItem[];
  isJoinBtn?: boolean;
  buttonText?: string;
  rootSx?: SxProps;
}

const ProcessSection = (props: ProcessProps) => {
  const { title, headingMobile, headingDesktop, data, isJoinBtn, rootSx, buttonText = "JOIN OUR COMMUNITY NOW" } = props;

  const isMobile = useMediaQuery("(max-width:768px)");
  const router = useRouter();

  return (
    <Box sx={{ ...styles.worksWrap, ...rootSx }}>
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ color: "secondary.main", textAlign: { sm: "left", xs: "center" } }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={styles.heading}>
          {isMobile ? headingMobile : headingDesktop}
        </Typography>
        {isJoinBtn && (
          <Button
            variant="contained"
            sx={styles.button}
            onClick={() => router.push("/register")}
          >
            {buttonText}
          </Button>
        )}
        <Grid container sx={{ pt: "32px" }} spacing={8} justifyContent="space-between">
          {data.map((item, index) => (
            <Grid item xs={item?.gridConfig?.xs} sm={item?.gridConfig?.xs} md={item?.gridConfig?.md} key={index}>
              <Box>
                <Typography variant="h4" sx={styles.count}>{`0${index + 1}`}</Typography>
                <Typography variant="h4" sx={{ color: "grey.100", pt: "10px" }}>
                  {item?.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "grey.100", pt: "10px" }}>
                  {item?.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProcessSection;

const styles = {
  count: {
    backgroundColor: "neutral.main",
    borderRadius: "12px",
    width: "56px",
    height: "56px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  heading: {
    color: "grey.100",
    pt: "10px",
    textAlign: { sm: "left", xs: "center" },
  },
  worksWrap: {
    pt: { xs: "44px", sm: "60px" },
    backgroundColor: "info.main",
    py: "106px",
    width: "100%",
    pb: { xs: "25px", sm: "106px" },
  },
  button: {
    backgroundColor: "primary.light",
    mt: { xs: "32px", sm: "12px" },
    width: { xs: "100%", sm: "auto" },
    mb: { xs: "20px", sm: 0 },
  },
};
