"use client";
import React from "react";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ParentImg from "../../../assets/images/parent/hero-bg.png";
import { useRouter } from "next/navigation";

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();


  return (
    <Box sx={{ paddingTop: "60px" }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" spacing={5} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pt: { xs: 0, sm: "46px" } }}>
              <Typography variant="h6" color="secondary.main">
                BECOMING A PARENT THROUGH SURROGACY
              </Typography>
              <Typography variant="h2" color="info.main">
                A Better Way to Find Surrogates
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
              <Image
                src={ParentImg}
                alt=""
                style={{
                  width: '100%',
                  height: isMobile ? '230px' : '100%',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
