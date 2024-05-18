import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import WhoAreWeImg from "../../../assets/images/about-us/desktop-who-we-are-img.png";
import MblWhoAreWeImg from "../../../assets/images/about-us/mobile-who-we-are-img.png";

const WhoAreWe = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Box sx={styles.whoAreWeWrap}>
            <Container maxWidth="xl">
                <Box sx={styles.content}>
                    <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
                        <Typography variant="h6" color="secondary.main">
                            ABOUT US
                        </Typography>
                        <Typography variant="h3" color="info.main" pt="12px">
                            Who Are We?
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "info.main",
                                pt: '12px',
                                textAlign: isMobile ? 'left' : 'center',
                            }}>
                            FindSurrogate.com is a group of Intended Parents who have experienced the joy of connecting with many Intended Parents and Surrogates from around the world. We are frequently asked, "Why should I join FindSurrogate.com?" so we want to share our platform's motivation and purpose. We hope that both Intended Parents and Surrogates can resonate with our story. If you do, we extend a warm invitation to join us on this meaningful journey.
                        </Typography>
                    </Box>
                    <Box sx={{ mt: { xs: '64px', sm: '126px' } }}>
                        {isMobile ? (
                            <Image
                                src={MblWhoAreWeImg}
                                alt=""
                                style={{
                                    // use is Mobile to change the width and height
                                    width: '358px',
                                    height: '234px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',

                                }}
                            />
                        ) : (
                            <Image
                                src={WhoAreWeImg}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',

                                }}
                            />
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WhoAreWe;

const styles = {
    whoAreWeWrap: { mt: { xs: '44px', sm: "106px" }, backgroundColor: "grey.100", mb: "20px" },
    content: { textAlign: "center" },
};
