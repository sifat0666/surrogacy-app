import { Box, Container, Typography } from "@mui/material";
import React from "react";

const WhoAreWe = () => {
    const whoAreWeData = [
        "Are you searching for a surrogate? Don't let the process overwhelm you. Whether you choose to work with an agency or go independent, it's crucial to establish meaningful connections and get noticed. We understand that it can be challenging and time consuming, but unlike many other platforms, we are here to make it simpler for you.",
        "Our goal is to help intended parents stand out and, at the same time, to be the go-to destination for surrogates seeking their perfect match. To do so, we offer powerful online matching tools designed with your needs in mind. We aim for parents and surrogates to easily find their perfect partner based on what matters most to them. So why wait? Join us today and let us help you find your ideal match!",
    ];
    return (
        <Box sx={styles.whoAreWeWrap}>
            <Container maxWidth="xl">
                <Box sx={styles.content}>
                    <Typography variant="h6" color="secondary.main">
                        WHO ARE WE?
                    </Typography>
                    <Typography variant="h3" color="info.main" pt="12px">
                        Get Noticed in the Crowd
                    </Typography>
                    {whoAreWeData.map((item, index) => (
                        <Typography
                            variant="body1"
                            sx={{ ...styles.desc, pt: index === 0 ? '12px' : 0 }}
                            key={index}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default WhoAreWe;

const styles = {
    whoAreWeWrap: { mt: "60px", backgroundColor: "grey.100", mb: { xs: '20px', sm: '60px' } },
    content: { backgroundColor: "grey.200", py: { xs: '26px', sm: "46px" }, textAlign: "center", borderRadius: '12px', px: '12px' },
    desc: { color: "info.main", width: '100%', maxWidth: '850px', margin: '0 auto', textAlign: 'left' }
};
