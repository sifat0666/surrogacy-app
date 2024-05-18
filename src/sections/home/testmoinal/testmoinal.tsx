"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Container, Rating, Typography, useMediaQuery } from "@mui/material";
import AvatarImg from "../../../assets/images/home/avatar-img.svg";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import NextIcon from "../../../assets/icons/next-icon.svg";
import PreviousIcon from "../../../assets/icons/previous-icon.svg";

SwiperCore.use([Navigation]);

const Testmonial = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const whyUsData = [
    {
      desc: "The intuitive design made it simple to explore potential parents and contact them. I valued having the autonomy to connect with those I felt a genuine connection with. ",
      name: "Andrea",
      company: "Surrogate, United States",
    },
    {
      desc: "We had such a great experience finding a surrogate in Canada! The search tools were super easy to use. Thanks to that, we were able to find a perfect match and the process was smooth sailing from there.",
      name: "Peter and Lukas",
      company: "Intended Parents, Canada",
    },
    {
      desc: "Thanks to FindSurrogate, my dreams of parenthood became a reality. The information offered by this surrogacy platform made the entire matching process quite easy.",
      name: "Marta",
      company: "Intended Mother, Germany",
    },
    {
      desc: "As a surrogate, I wanted to make a meaningful difference. Using FindSurrogate.com, I connected with a wonderful couple, and we moved forward. All the information and so many intended parents in one place.",
      name: "Helena",
      company: "Surrogate, United States",
    },
    {
      desc: "I appreciated the sense of community on the platform. The ability to communicate with other surrogates in Ontario provided valuable insights and emotional support.",
      name: "Rebecca",
      company: "Surrogate, Canada",
    },
    {
      desc: "Within a short time, we connected with a surrogate in California who was a perfect match for us. It was a great experience.",
      name: "Mandy and Ben",
      company: "Intended Parents, United States",
    },
    {
      desc: "The surrogate verification process on this site was super reassuring for us! It's clear that safety is a priority for this website.",
      name: "Alain",
      company: "Intended Parent, France",
    },
  ];

  return (
    <Box>
      <Container maxWidth="xl">
        <Box
          sx={styles.testmonialWrap}
          style={{
            margin: isMobile ? "30px 0 50px 0" : "70px 0",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="secondary.main">
              TESTIMONIALS
            </Typography>
            <Typography variant="h3" color="info.main">
              What Our Users Say
            </Typography>
            <Typography variant="body1" sx={styles.descWrap}>
              Don’t just take our word for it; here’s what others have to say!
            </Typography>
          </Box>
          <Box sx={styles.navigationContainer}>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {whyUsData.map((item, index) => (
                <SwiperSlide key={index}>
                  <Box sx={styles.cardWrapper}>
                    <Rating value={5} color="warning.dark" />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "primary.dark",
                        pt: "8px",
                        height: "140px",
                      }}>
                      {`"${item?.desc}"`}
                    </Typography>
                    <Box sx={styles.profileWrap}>
                      {/* <Image src={AvatarImg} alt="" /> */}
                      <Box>
                        <Typography variant="h6" color="info.main" style={{ fontSize: "16px" }}>
                          {item?.name}
                        </Typography>
                        <Typography variant="body2" color="primary.dark" style={{ fontSize: "16px" }}>
                          {item?.company}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Box sx={styles.swiperButtonContainer}>
              <Box sx={styles.swiperButton} className="swiper-button-prev">
                <Image src={PreviousIcon} alt="Previous" />
              </Box>
              <Box sx={styles.swiperButton} className="swiper-button-next">
                <Image src={NextIcon} alt="Next" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Testmonial;

const styles = {
  testmonialWrap: {
    "& .swiper": {
      paddingBlock: "46px !important",
    },
    "& .swiper-button-prev, .swiper-button-next": {
      "&::after": {
        display: "none",
      },
    },
  },
  desc: {
    color: "info.main",
    pt: "18px",
    width: "100%",
    maxWidth: "330px",
  },
  descWrap: {
    color: "info.main",
    pt: "6px",
    width: "100%",
    maxWidth: "850px",
    margin: "0 auto",
  },
  cardWrapper: {
    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.10)",
    borderRadius: "12px",
    background: "#fff",
    height: "100%",
    p: "32px",
  },
  profileWrap: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    pt: "28px",
  },
  navigationContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  swiperButtonContainer: {
    position: "absolute",
    bottom: "20px",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
  },
  swiperButton: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    margin: "0 10px", // Adjust as needed
  },
};
