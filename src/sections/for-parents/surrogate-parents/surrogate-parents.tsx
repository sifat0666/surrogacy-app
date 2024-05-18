"use client";
import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CanadaIcon from "../../../assets/icons/surrogate-canada-icon.svg";
import UsaIcon from "../../../assets/icons/surrogate-usa-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SurrogateParents = () => {

  const router = useRouter();
  const surrogateParentsData = [
    {
      icon: UsaIcon,
      title: "Find a Surrogate in the US",
      desc: "Surrogacy in the United States offers a hopeful path to parenthood. As intended parents, the journey of surrogacy allows you to fulfill your dream of having a child and experiencing the joys of parenthood. Find the perfect surrogate to help you bring your dreams to life. Discover the possibilities of surrogacy in the US and take the first step towards creating your loving family today.",
    },
    {
      icon: CanadaIcon,
      title: "Find a Surrogate in the Canada",
      desc: "Explore the compassionate world of surrogacy in Canada, where intended parents and surrogates come together to create families filled with hope and love. If you are an intended parent in search of a surrogate, start your journey towards parenthood. Find your surrogate in Canada and embrace this life-changing experience.",
    },
  ];
  return (
    <Box sx={{ mt: "120px" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {surrogateParentsData.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={styles.parentsWrap}>
                <Image src={item?.icon} alt="" />
                <Typography
                  variant="h4"
                  fontSize="24px"
                  pt="8px"
                  lineHeight='33px'
                >
                  {item?.title}
                </Typography>
                <Typography variant="body2" sx={styles.desc}>
                  {item?.desc}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#FF414D !important',
                    mt: `${index === 0 ? "16px" : "36px"}`,
                  }}
                  onClick={() => router.push("/register")}
                >
                  JOIN US
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SurrogateParents;

const styles = {
  parentsWrap: {
    backgroundColor: "info.main",
    width: "95%",
    py: "64px",
    textAlign: "center",
    borderRadius: "12px",
    color: "grey.100",
    px: '10px'
  },
  desc: {
    textAlign: "left",
    pt: "16px",
    width: "100%",
    maxWidth: "524px",
    margin: "0 auto"
  },
};
