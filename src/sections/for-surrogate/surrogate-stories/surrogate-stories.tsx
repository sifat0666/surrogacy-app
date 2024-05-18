import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import SurrogateStoriesImg from "../../../assets/images/surrogate/surrogate-stories.png";
import Image from "next/image";

const SurrogateStories = () => {
  const storiesData = [
    "Becoming a surrogate means giving the gift of life to someone else. When you meet the intended parents, you can sense the challenges they've faced in their journey to parenthood, and you have the opportunity to offer your support and assistance. This experience makes you feel truly special, knowing you can help someone in their time of need.",
    "Seeing the joy on the intended parents' faces as they hold their newborn in their arms and fall in love with their child is an indescribable feeling. Knowing that you played a significant part in making their dreams of parenthood come true fills you with immense pride and warmth.",
    "The bond created through this journey is extraordinary, and being a surrogate leaves you with a sense of fulfillment and happiness like no other. It's an unforgettable and meaningful experience that brings joy to both the intended parents and the surrogate."
  ];
  return (
    <Box sx={{ pt: { xs: "40px", sm: "60px" } }}>
      <Container maxWidth="xl">
        <Grid container spacing={12} justifyContent="space-between" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Grid item xs={12} md={6} sx={{ mt: { xs: "46px !important", sm: 0 } }}>
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              SURROGACY STORIES
            </Typography>
            <Typography variant="h3" color="info.main">What Is It Like to Be a Surrogate?</Typography>
            {storiesData.map((item, index) => (
              <Typography
                variant="body1"
                color="info.main"
                pt="25px"
                px={{ xs: "10px", sm: "0" }}
                style={{
                  textAlign: 'left',
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box><Image src={SurrogateStoriesImg} alt="" style={{ height: "50%", width: '100%' }} /> </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SurrogateStories;
