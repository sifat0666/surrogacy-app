"use client";
import React from "react";
import { Box, Container, Grid, List, ListItem, Typography, useMediaQuery } from "@mui/material";
import LogoImg from "../../../assets/images/logo.svg";
import surrogate_logo from "../../../assets/images/surrogate_logo.png";
import { footerData, policyPageData } from "./footer.data";
import Image from "next/image";
import Link from "next/link";
import { Url } from "url";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box sx={styles.footerWrap}>
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="space-between" sx={{ pb: { xs: "40px", sm: "140px" } }}>
          <Grid item xs={12} sm={4} md={5} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Link href="/" style={{ cursor: "pointer" }}>
              {/* <Image
                src={LogoImg ? LogoImg : AvatarImg}
                alt="Find Surrogate Logo"
              /> */}
              <Image
                style={{
                  cursor: "pointer",
                  width: isMobile ? "180px" : "230px",
                  height: isMobile ? "43px" : "55px",
                  objectFit: "contain",
                }}
                src={surrogate_logo}
                alt="Find Surrogate Logo"
              />
            </Link>
            <Typography variant="body2" color="info.main" pt="24px">
              Surrogacy made Simple.
            </Typography>
          </Grid>
          {isMobile ? (null) : (
            (
              <Grid item xs={12} sm={8} md={7}>
                <Grid container spacing={3} justifyContent="space-between">
                  {footerData?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                      <Typography variant="h6" color="secondary.main" pb="10px">
                        {item?.title}
                      </Typography>
                      <List>
                        {item?.links &&
                          item?.links.map((list: { url: string; text: string; img?: any }, i: number) => (
                            <Link href={list.url} style={styles.list} key={i}>
                              {list?.img && <Image src={list?.img} alt={item?.title} />}
                              <Typography variant="subtitle1" sx={{ fontSize: "14px", color: index === 2 ? "primary.light" : "info.main", cursor: "pointer" }}>
                                {list.text}
                              </Typography>
                            </Link>
                          ))}
                      </List>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )
          )}
        </Grid>

        {isMobile ? (null) : (
          <Box sx={styles.copyright}>
            <Typography variant="body2" color="info.main">
              © 2023 Find Surrogates.com. All rights reserved.
            </Typography>
            <Box sx={styles.policy}>
              {policyPageData?.map((item, index) => (
                <Link href={item.url} style={styles.pagesLink} key={index}>
                  {item?.text}
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Footer;

const styles = {
  footerWrap: {
    borderTop: "1px solid #002D40",
    py: { xs: "20px", sm: "80px" },
  },
  list: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
    color: "#002D40",
    whiteSpace: "nowrap",
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: 500,
    textDecoration: "none",
  },
  copyright: {
    borderTop: "1px solid #002D40",
    pt: "33px",
    display: "flex",
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    gap: "12px",
    textAlign: "center",
  },
  policy: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  pagesLink: {
    color: "#002D40",
    whiteSpace: "nowrap",
    fontSize: "14px",
    lineHeight: "24px",
    textDecoration: "none",
  },
};
