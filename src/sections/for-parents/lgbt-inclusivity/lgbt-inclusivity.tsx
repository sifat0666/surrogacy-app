import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import InclusivityImg from "../../../assets/images/parent/inclusivity.png";
import GlobalImg from "../../../assets/images/parent/global.png";

const LgbtInclusivity = () => {
  return (
    <Box sx={{ pt: "60px" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} justifyContent="space-between">
          <Grid item xs={12} md={6} sx={{ mt: { sm: '46px !important' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" color="secondary.main">
              LGBTQ+ INCLUSIVITY
            </Typography>
            <Typography variant="h3" color="info.main" pt="5px">
              LGBTQ+ Surrogacy
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              style={{
                marginRight: "20px",
                textAlign: 'left',
              }}
            >
              We are proud to be an LGBTQ+ friendly surrogate community. Surrogacy is a common and valued option for family building for LGBTQ+ couples and individuals. Throughout the process, you will be shown respect and will be provided with the same choices we provide to any other intended parent.
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              style={{
                marginRight: "20px",
                textAlign: 'left',
              }}
            >
              You'll find that the process is the same for LGBTQ+ intended parents and there is no difference in the time it takes for them to find a match.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box width="100%">
              <Image
                src={InclusivityImg}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                className="fit-cover"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} justifyContent="space-between" sx={{ mt: { xs: "44px", sm: "120px" }, flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
          <Grid item xs={12} md={6}>
            <Box width="100%">
              <Image
                src={GlobalImg}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                className="fit-cover"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: { sm: '46px !important' }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" color="secondary.main">
              GLOBAL COMMUNITY
            </Typography>
            <Typography variant="h3" color="info.main">
              International Surrogacy
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              style={{
                marginRight: "20px",
                textAlign: 'left',
              }}
            >
              We are an international-friendly surrogacy platform that welcomes intended parents from all corners of the globe. Families from other countries often choose surrogacy in the US and Canada as their preferred option.
            </Typography>
            <Typography
              variant="body1"
              color="info.main"
              pt="25px"
              px={{ xs: "10px", sm: "0" }}
              style={{
                marginRight: "20px",
                textAlign: 'left',
              }}
            >
              The process for foreign intended parents is no different than it is for any other intended parent. You will complete the very same steps and have the same rights and choices throughout the entire process. However, as surrogacy laws vary by state, contacting a surrogacy attorney is important to understand local regulations.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
};

export default LgbtInclusivity;

const styles = {
  image: { width: "100%" },
};
