"use client";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleExploreMembers = () => {
    const element = document.getElementById("find-services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={styles.heroWrapper}>
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
          A NEW WAY TO FIND A SURROGATE
        </Typography>
        <Typography variant="h2">Independent Surrogacy Made Simple</Typography>
        <Typography variant="h5" pt="10px">
          Improving the matching experience for Surrogates and Intended Parents
        </Typography>
        <Box sx={styles.btnWrapper}>
          <Button variant="contained" onClick={() => router.push("/register")}>
            JOIN US
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#FF414D !important" }} onClick={handleExploreMembers}>
            EXPLORE MEMBERS
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  heroWrapper: {
    backgroundImage: `url('/images/home-bg.svg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "600px",
    position: "relative",
    textAlign: "center",
    color: "#fff",
    paddingTop: "106px",
    "@media (max-width: 768px)": {
      height: "auto",
      paddingBottom: "106px",
    },
  },
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    mt: "32px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      "& button": {
        width: "100%",
      },
    },
  },
};

export default Hero;
