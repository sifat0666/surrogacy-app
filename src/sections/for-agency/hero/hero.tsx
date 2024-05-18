"use client";
import React from "react";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import DesktopImg from "../../../assets/images/agency/agency-desktop-hero-bg.png";
import MobileImg from "../../../assets/images/agency/agency-mobile-hero-bg.png";
import { useRouter } from "next/navigation";


const Hero = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");


  return (
    <Box sx={{ paddingTop: "60px" }}>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between" spacing={5}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                pt: { xs: 0, sm: "46px" },

              }}>
              <Typography
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                variant="h6"
                color="secondary.main"
              >
                EXPERIENCE ALL BENEFITS, NO RISKS
              </Typography>
              <Typography
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                variant="h2"
                color="info.main"
              >
                Reach more Intended Parents & {!isMobile && <br />} Surrogates
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "primary.light",
                  mt: "32px",
                  width: { xs: '100%', sm: 'auto' }
                }}
                onClick={() => router.push("/register")}
              >
                JOIN FOR FREE
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box width='100%'>
              <Image src={isMobile ? MobileImg : DesktopImg} alt="" style={{ width: '100%' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
