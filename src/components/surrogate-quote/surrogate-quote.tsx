import React from "react";
import { Box, Container, Grid, Typography, type SxProps } from "@mui/material";
import BlubIcon from "../../assets/icons/blub-icon.svg";
import Image from "next/image";

interface SurrogateQuotesProps {
  rootSx?: SxProps;
  title?: string;
  gridConfigIcon?: {
    xs?: number;
    md?: number;
  },
  gridConfigText?: {
    xs?: number;
    md?: number;
  }
}

const SurrogateQuote = (props: SurrogateQuotesProps) => {
  const { title, rootSx, gridConfigIcon, gridConfigText } = props;
  return (
    <Box sx={{ ...rootSx }}>
      <Container maxWidth="xl">
        <Box sx={styles.content}>
          <Grid container item xs={11.5} md={9} spacing={4} alignItems='center'>
            <Grid item xs={gridConfigIcon?.xs} md={gridConfigIcon?.md}>
              <Box textAlign='center'><Image src={BlubIcon} alt="" /></Box>
            </Grid>
            <Grid item xs={gridConfigText?.xs} md={gridConfigText?.md}>
              <Typography sx={styles.title} component="h2">
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default SurrogateQuote;

const styles = {
  content: {
    backgroundColor: "grey.200",
    borderRadius: '12px',
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    py: "56px",
  },
  title: {
    fontSize: { xs: "24px", md: "35px" },
    fontWeight: 700,
    lineHeight: { xs: "33px", md: "48px" },
    textAlign: "center",
    color: "info.main",
  },
};
