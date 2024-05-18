import { Box, Container, Typography } from "@mui/material";
import React from "react";

const WhoAreWe = () => {
    const whoAreWeData = [
        "Are you a surrogacy agency seeking to expand your outreach? If so, look no further! FindSurrogate is an exclusive platform which enables you to showcase your services to thousands of intended parents and surrogates.",
        "We bring together all individuals involved in the surrogacy journey, from intended parents and surrogates to agencies. Our top priority is to create a seamless experience for everyone involved in the process of creating new families."
    ];
    return (
        <Box sx={styles.whoAreWeWrap}>
            <Container maxWidth="xl">
                <Box sx={styles.content}>
                    <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto" }}>
                        <Typography variant="h6" color="secondary.main">
                            WHO ARE WE?
                        </Typography>
                        <Typography variant="h3" color="info.main" pt="12px">
                            New Ways to Connect with IPs & Surrogates
                        </Typography>
                        {whoAreWeData.map((item, index) => (
                            <Typography
                                variant="body1"
                                color="info.main"
                                pt="25px"
                                px={{ xs: "10px", sm: "0" }}
                                textAlign="left"
                                letterSpacing="0.5px"
                            >
                                {item}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default WhoAreWe;

const styles = {
    whoAreWeWrap: { mt: "60px", backgroundColor: "grey.100", mb: "20px" },
    content: { backgroundColor: "grey.200", py: { xs: "26px", sm: "46px" }, textAlign: "center", borderRadius: "12px", px: "12px", },
};
