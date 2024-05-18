"use client";
import React from "react";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import Sidebar from "./sidebar/sidebar";

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 899px)");
  return (
    <Box sx={{ mt: { xs: "40px", sm: "60px" }, mb: { xs: "44px", sm: "60px" } }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Sidebar />
            </Grid>
          )}
          <Grid item xs={12} md={9}>
            <Box sx={styles.card}>{children}</Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminLayout;

const styles = {
  card: {
    border: { xs: "none", sm: "2px solid #EAEAEA" },
    borderRadius: "6px",
    backgroundColor: "#fff",
    height: "100%",
  },
};
