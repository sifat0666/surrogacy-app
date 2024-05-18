"use client";
import React from "react";
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ParentImg from "../../../assets/images/surrogate/hero-bg.png";
import { useRouter } from "next/navigation";

const Hero = () => {

    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Box sx={{ paddingTop: "60px" }}>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" spacing={5} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ pt: { xs: 0, sm: "46px" } }}>
                            <Typography variant="h6" color="secondary.main">
                                HOW TO BECOME A SURROGATE
                            </Typography>
                            <Typography variant="h2" color="info.main">
                                Help Make a Family's Dream Come True
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
                                height={isMobile ? 235 : 550}
                                style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;
