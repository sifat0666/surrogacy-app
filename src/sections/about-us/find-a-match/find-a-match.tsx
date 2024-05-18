import { Box, Container, Grid, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import SurrogacyConnectionImg from "../../../assets/images/about-us/surrogacy-connection.png";
import OurMissionImg from "../../../assets/images/about-us/our-mission.png";
import { connectionsDescriptionData, missionData } from "./find-a-match.data";

const FindAMatch = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box sx={{ pt: { xs: '44px', sm: "120px" } }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={6} sx={{ mt: { sm: "46px !important" }, textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h6" color="secondary.main">
              A NEW WAY TO FIND A MATCH
            </Typography>
            <Typography variant="h3" color="info.main" pt="5px">
              Empowering Surrogacy Connections
            </Typography>
            {connectionsDescriptionData.map((item, index) => (
              <Typography
                variant="body1"
                color="info.main"
                pt={index === 0 ? "25px" : "40px"}
                px={{ xs: "10px", sm: "0" }}
                textAlign="left"
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              width="100%"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={SurrogacyConnectionImg}
                alt=""
                style={{
                  borderRadius: "10px",
                  width: isMobile ? "358px" : "100%",
                  height: isMobile ? "234px" : "100%",
                }}
                className="fit-cover"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={5} justifyContent="space-between" sx={styles.missionWrapGrid}>
          <Grid item xs={12} md={6}>
            <Box
              width="100%"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={OurMissionImg}
                alt=""
                style={{
                  borderRadius: "10px",
                  width: isMobile ? "358px" : "100%",
                  height: isMobile ? "234px" : "100%",
                }}
                className="fit-cover"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={styles.missionGrid}>
            <Typography variant="h6" color="secondary.main">
              SURROGACY MADE SIMPLE
            </Typography>
            <Typography variant="h3" color="info.main">
              Our Mission
            </Typography>
            {missionData.map((item, index) => (
              <Typography
                variant="body1"
                color="info.main"
                pt={index === 0 ? "25px" : "40px"}
                px={{ xs: "10px", sm: "0" }}
                textAlign="left"
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FindAMatch;

const styles = {
  missionGrid: { mt: { xs: '0', sm: "46px" }, textAlign: { xs: "center", sm: "left" } },
  missionWrapGrid: { mt: { xs: "20px", sm: "120px" }, flexDirection: { xs: "column-reverse", sm: "row" } }
};
