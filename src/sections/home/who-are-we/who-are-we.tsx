"use client";
import React from "react";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import WhoWeAreImg from "../../../assets/images/home/who-we-are-img.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WhoAreWe = () => {
  const isMobile = useMediaQuery("(min-width:768px)");
  const router = useRouter();

  return (
    <Box sx={{ pt: "60px", pb: { xs: '20px', sm: '40px' } }}>
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={styles.heading}
            >
              WHO ARE WE?
            </Typography>
            <Typography variant="h3" sx={{ color: "info.main", textAlign: { sm: "left", xs: "center" } }}>
              Connecting Parents & <br /> Surrogates
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              textAlign="left"
            >
              FindSurrogate.com is an independent platform that brings surrogates, intended parents, and reputable agencies together. Our goal is to simplify the matching process, making it easy and stress-free for you.
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              textAlign="left"
            >
              Your safety and that of your family are our top priority. This is why we have implemented measures such as ID verification, secure messaging, and payments.
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              textAlign="left"
            >
              Experience less stress and more peace of mind with transparent profiles, helpful tools, and reliable support from our team
            </Typography>
            {isMobile && (
              <Box sx={styles.btnWrapper}>
                <Button
                  variant="contained"
                  onClick={() => router.push("/register")}
                >
                  JOIN US
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/about-us")}
                >
                  ABOUT US
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: isMobile ? "100%" : "400px",
              }}
            >
              <Image
                src={WhoWeAreImg}
                alt=""
                style={{
                  width: "100%"
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
};

export default WhoAreWe;

const styles = {
  btnWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    mt: "32px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      "& button": {
        width: "100%",
      },
    },
  },
  heading: {
    textTransform: "uppercase",
    color: "secondary.main",
    textAlign: { sm: "left", xs: "center" },
  },
};
