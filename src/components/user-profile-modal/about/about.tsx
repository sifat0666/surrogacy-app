import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { personalInformationData, surrogacyInformationData } from "./about.data";

interface CustomInformationProps {
  title?: string;
  description?: string;
  data?: {
    title?: string;
    label?: string;
  }[];
}

const About = () => {
  return (
    <Box> 
      <CustomInformation title="Personal Information" data={personalInformationData} />
      <CustomInformation title="Surrogacy Information" data={surrogacyInformationData} />
      <CustomInformation
        title="About"
        description="Lorem ipsum dolor sit amet consectetur. At turpis rhoncus aliquet consequat lorem lorem sit vitae. Suspendisse nulla nunc quam tincidunt et tempus dui ac. Posuere consectetur tellus eleifend at nisi neque gravida et gravida. Sagittis nunc tincidunt parturient in vel nibh lacinia ullamcorper volutpat."
      />
    </Box>
  );
};

export default About;

const CustomInformation = ({ title, data, description }: CustomInformationProps) => {
  return (
    <Box sx={styles.content}>
      <Typography classes={{ root: "font-grotesk" }} mb="16px">
        {title}
      </Typography>
      {data && (
        <Card sx={styles.card}>
          <Grid container spacing={4} sx={{ px: { xs: "24px", sm: "36px" } }}>
            {data?.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="body1" fontWeight={700} color="info.main">
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="info.main">
                  {item?.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
      {description && (
        <Card sx={{ width: "100%", py: { xs: "28px", sm: "13px" } }}>
          <Box sx={styles.description}>
            <Typography variant="body2" color="info.main">
              {description}
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  );
};

const styles = {
  content: {
    "& > p": {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "33px",
      color: "info.main",
    },
    my: { xs: "20px", sm: "48px" },
  },
  card: {
    py: { xs: "28px", sm: "40px" },
    height: "100%",
    minHeight: "350px",
  },
  description: {
    maxWidth: "795px",
    margin: "0 auto",
    px: { xs: "24px", sm: "13px" }
  },
};
