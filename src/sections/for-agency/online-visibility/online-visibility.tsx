"use client";
import React from "react";
import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import VisibilityImg from "../../../assets/images/agency/visibility-img.png";
import Image from "next/image";

const OnlineVisibility = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");


    const visibilityData = [
        { title: "Showcase", desc: "Maximize your agency's online presence by setting up a dedicated page" },
        { title: "Share", desc: "Feature your surrogates’ profiles on our platform" },
        { title: "Promote", desc: "We will run effective digital campaigns to ensure you reach your target audience" },
        { title: "Attract", desc: "Get targeted leads that are relevant to your business" },
    ];

    return (
        <Box sx={{ pt: { xs: "44px", sm: "60px" } }}>
            <Container maxWidth="xl">
                <Grid container spacing={5} justifyContent="space-between">
                    <Grid item xs={12} md={6} sx={{ mt: { xs: "46px !important", sm: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h6" sx={{ color: "secondary.main" }}>
                            ENHANCE YOUR ONLINE VISIBILITY
                        </Typography>
                        <Typography variant="h3" color="info.main">
                            Reach Intended Parents <br /> from Across the Globe
                        </Typography>
                        <Grid container spacing={5} mt="15px" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            {visibilityData.map((item, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Box sx={styles.countWrap}>
                                        <Typography variant="h4" sx={styles.count}>{`0${index + 1}`}</Typography>
                                    </Box>
                                    <Typography variant="subtitle2" fontWeight={700} pt="25px" color="info.main">
                                        {item?.title}
                                    </Typography>
                                    <Typography variant="body2" pt="20px" color="info.main">
                                        {item?.desc}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            width="100%"
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                src={VisibilityImg}
                                alt=""
                                style={{
                                    width: isMobile ? "358px" : "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",

                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

const styles = {
    count: {
        backgroundColor: "#FF414D !important",
        borderRadius: "12px",
        width: "56px",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
    countWrap: {
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-start" },
        alignItems: "center",
    }
};

export default OnlineVisibility;