import {
  personalInformationData,
  surrogacyInformationData,
  agencyAboutData,
  parentPersonalInformationData,
  parentSurrogacyInformationData,
  aboutData,
} from "./about.data";

import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

interface CustomInformationProps {
  title?: string;
  description?: string;
  data?: {
    title?: string;
    label?: string;
  }[];
}

const About = ({ data }: any) => {

  // if (data.user_type === "Agency") {
  //   console.log("agencyAboutData", data?.services_provided);
  //   console.log("agencyAboutData", typeof data?.services_provided);
  // }

  return (
    <Box>
      {data?.user_type === "Agency" && (
        <>
          <CustomInformation title="Agency Information" data={agencyAboutData(data)} />
          <CustomInformation title="About" description={`${data?.about ?? ""}`} />
        </>
      )}
      {data?.user_type === "Surrogate" && (
        <>
          <CustomInformation title="Personal Information" data={personalInformationData(data)} />
          <CustomInformation title="Surrogacy Information" data={surrogacyInformationData(data)} />
          <CustomInformation title="About" description={`${data?.about ?? ""}`} />
        </>
      )}
      {data?.user_type === "Intended Parent" && (
        <>
          <CustomInformation title="Personal Information" data={parentPersonalInformationData(data)} />
          <CustomInformation title="Surrogacy Information" data={parentSurrogacyInformationData(data)} />
          <CustomInformation title="About" description={`${data?.about ?? ""}`} />
        </>
      )}
    </Box>
  );
};

export default About;

const CustomInformation = ({ title, data, description }: CustomInformationProps) => {
  return (
    <Box
      sx={styles.content}
    >
      <Typography classes={{ root: "font-grotesk" }} mb="16px">
        {description === "" ? "" : title}
      </Typography>
      {data && (
        <Card
          sx={styles.card}
        >
          <Grid container spacing={4} sx={{ px: { xs: "24px", sm: "36px" } }}>
            {data?.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="body1" fontWeight={700} color="info.main">
                  {item?.title}
                </Typography>
                {Array.isArray(item?.label) ? (
                  <ul>
                    {item?.label.map((label, index) => (
                      <li key={index}>
                        <Typography variant="body2" color="info.main">
                          {label}sdsds
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" color="info.main">
                    {item?.label}
                  </Typography>
                )}
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
    py: { xs: "16px", sm: "24px" }, // Adjusted padding top and bottom
    height: "auto", // Set height to auto to allow the card to adjust based on content
    minHeight: "150px", // Set a minimum height if needed
  },
  description: {
    maxWidth: "795px",
    margin: "0 auto",
    px: { xs: "24px", sm: "13px" },
    py: "16px", // Adjusted padding top and bottom
  },
};
