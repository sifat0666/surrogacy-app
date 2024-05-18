import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { connectingDreamsData } from "./connecting-dreams.data";

const ConnectingDreams = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <Box sx={{ pt: { xs: "44px", sm: "120px" } }}>
            <Container maxWidth="xl">
                <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto", textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary.main">
                        CONNECTING DREAMS
                    </Typography>
                    <Typography variant="h3" color="info.main" pt="5px">
                        A Platform for Intended Parents, Surrogates, and Agencies
                    </Typography>
                </Box>
                <Grid container spacing={4} justifyContent="space-between" mt={{ xs: '60px', sm: '32px' }}>
                    {connectingDreamsData?.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                width="100%"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: 'center',
                                    margin: isMobile ? "0 0 60px 0" : "0",
                                }}
                            >
                                <Image
                                    src={item?.img}
                                    alt={item?.title}
                                    style={{
                                        width: isMobile ? "358px" : "100%",
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '10px'

                                    }}
                                />
                                <Typography
                                    variant="h4"
                                    color="info.main"
                                    pt="18px"
                                    classes={{ root: 'font-grotesk' }}
                                >
                                    {item?.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="info.main"
                                    pt={index === 0 ? "25px" : "40px"}
                                    px={{ xs: "10px", sm: "0" }}
                                    textAlign="left"
                                >
                                    {item?.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ConnectingDreams;

const styles = {
    image: { width: "100%" },
    missionGrid: { mt: { xs: "0", sm: "46px" }, textAlign: { xs: "center", sm: "left" } },
    missionWrapGrid: { mt: { xs: "20px", sm: "120px" }, flexDirection: { xs: "column-reverse", sm: "row" } },
};
