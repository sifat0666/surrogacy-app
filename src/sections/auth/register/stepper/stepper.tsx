"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, LinearProgress, Typography, useMediaQuery } from "@mui/material";
import surrogate_logo from "../../../../assets/images/surrogate_logo.png";

import { useRouter, useSearchParams } from "next/navigation";
import Role from "./role/role";
import { styles } from "./stepper.styles";
import LogoImg from "../../../../assets/images/logo.svg";
import Image from "next/image";
import SurrogacyPage from "./surrogate";
import AgencyPage from "./agency";
import IndependentParentsPage from "./parents";



const RegisterStepper = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const router = useRouter();
  const searchParams = useSearchParams().get('type');
  const step = useSearchParams().get('step') ?? 10;
  const [steps, setSteps] = useState(step)
  const roleType = ["agency", "surrogate", "independent-parent"]

  const handleStepChange = (type: string, value: number) => {
    router.push(`?type=${type}&step=${value}`);
  };

  useEffect(() => {
    setSteps(step)
  }, [step])


  const renderComponentWithRole: any = {
    'agency': <AgencyPage />,
    'surrogate': <SurrogacyPage />,
    'independent-parent': <IndependentParentsPage />
  }


  return (
    <Box sx={styles.progress}>
      <Container maxWidth="xl">
        <Box sx={styles.linearProgress}>
          <LinearProgress variant="determinate" value={Number(steps)} classes={{ root: "linearProgress" }} />
          <Typography variant="caption" sx={styles.percentage}>{`${steps}%`}</Typography>
        </Box>
        <Grid container item xs={12} md={6} justifyContent="center" margin="0 auto">
          <Box sx={styles.bgWrapper}>
            <Box sx={{ width: "100%", maxWidth: "600px", margin: '0 auto', textAlign: 'center' }}>
              <Box sx={{ pb: "36px", textAlign: "center" }}>
                <Image
                  style={{
                    cursor: "pointer",
                    marginTop: isMobile ? "0px" : "10px",
                    width: isMobile ? "180px" : "186px",
                    height: isMobile ? "43px" : "36px",
                    objectFit: "contain",
                  }}
                  src={surrogate_logo}
                  alt="Find Surrogate Logo"
                />
              </Box>
              <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
                Welcome to FindSurrogate
              </Typography>
              {Number(steps) < 90 && (
                <Typography variant="body2" color="info.main" pt="10px" pb="40px">
                  Tell us about yourself so we can improve your experience.
                </Typography>
              )}
              {Number(steps) === 90 && (
                <Typography variant="body2" color="info.main" pt="10px" pb="40px">
                  Profile photos are an important way to get to know each other.
                </Typography>
              )}

              <Box>
                {searchParams && roleType.includes(searchParams) ? renderComponentWithRole[searchParams] :
                  <Role handleChange={(type) => { handleStepChange(type, 0) }} />
                }
              </Box>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterStepper;
