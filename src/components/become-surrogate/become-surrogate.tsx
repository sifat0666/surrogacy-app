"use client";
import React from "react";
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

interface BecomeSurrogateProps {
  title?: string;
  desc?: string;
  backgroundImage?: string;
  isJoin?: boolean;
  mobileButtonText?: string;
  desktopMobileText?: string;
  rootSx?: any;
}

const BecomeSurrogate = (props: BecomeSurrogateProps) => {
  const {
    title = "Ready to Become a Parent?",
    desc = "Don’t wait and sign up now!",
    isJoin,
    mobileButtonText = "FIND YOUR MATCH",
    desktopMobileText = "FIND YOUR MATCH",
    rootSx,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();


  return (
    <Box sx={{ ...styles.journeyWrap, ...rootSx }}>
      <Container maxWidth="xl">
        <Box width="100%" maxWidth="800px">
          <Typography variant="h3" color="grey.100">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="grey.100" pt="8px">
            {desc}
          </Typography>
          <Box sx={styles.btnWrapper}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FF414D !important" }}
              onClick={() => router.push("/register")}
            >
              {isMobile ? mobileButtonText : desktopMobileText}
            </Button>
            {isJoin && <Button
              onClick={() => router.push("/register")}
              variant="contained">
              {isMobile ? "BECOME A PARENT" : "BECOME A SURROGATE"}
            </Button>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BecomeSurrogate;

const styles = {
  journeyWrap: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: { xs: "top right", sm: "center" },
    width: "100%",
    height: "500px",
    position: "relative",
    color: "#fff",
    paddingTop: "158px",
    marginTop: "60px",
    "@media (max-width: 768px)": {
      height: "auto",
      paddingBottom: "70px",
    },
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    pt: "32px",
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
      "& button": {
        width: "100%",
      },
    },
  },
};
