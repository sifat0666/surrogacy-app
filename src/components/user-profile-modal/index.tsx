import React from "react";
import { Box, Button, Card, Container, Dialog, Grid, Stack, Typography, DialogTitle } from "@mui/material";
import CustomTab from "@/components/custom-tab/custom-tab";
import About from "./about/about";
import CloseIcon from "../../assets/icons/close-icon.svg";
import AgencySurrogates from "./agency-surrogates/agency-surrogates";
import ProfileImg from "../../assets/images/profile-img.svg";
import LocationIcon from "../../assets/icons/location-icon.svg";
import Image from "next/image";

interface UserProfileInterface {
  open: boolean;
  onClose: () => void;
}

const UserProfileModal = (props: UserProfileInterface) => {
  const { open, onClose } = props;

  const tabs = [
    { label: "About", content: <About /> },
    { label: "Agency's Surrogates", content: <AgencySurrogates /> },
    { label: "Agency's Parents", content: "Content for Item Three" },
  ];

  const contactInfo = [
    { label: "Email Address", value: "test@gmail.com" },
    { label: "Phone Number", value: "+123 456 789" },
    { label: "Website", value: "website.com.org" },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle textAlign="right" onClick={onClose}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ mt: { xs: "22px", md: "60px" } }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <CustomTab tabs={tabs} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing="24px">
                {/* profile */}
                <Card sx={{ p: "22px", textAlign: "center" }}>
                  <Image src={ProfileImg} alt="" />
                  <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }} pt="24px">
                    Marta Smith
                  </Typography>
                  <Box sx={styles.userProfile}>
                    <Image src={LocationIcon} alt="" />
                    <Typography variant="caption" color="info.main">
                      Hammarland, Åland Islands
                    </Typography>
                  </Box>
                  <Stack spacing={2} mt="32px" alignItems="center">
                    <Button variant="contained" sx={{ backgroundColor: "#FF414D !important" }}>
                      CHAT WITH MARTA
                    </Button>
                    <Button variant="outlined">CHAT WITH MARTA</Button>
                  </Stack>
                </Card>
                {/* contact info */}
                <Card sx={{ px: "28px", py: "30px" }}>
                  <Typography variant="h5" color="secondary.main">
                    Contact Info
                  </Typography>
                  {contactInfo.map((item, index) => (
                    <Box pt="20px" key={index}>
                      <Typography variant="subtitle1" color="info.main">
                        {item?.label}
                      </Typography>
                      <Typography variant="body1" color="info.main">
                        {item?.value}
                      </Typography>
                    </Box>
                  ))}
                </Card>

                {/* gallery */}
                <Card sx={{ px: "28px", py: "30px" }}>
                  <Typography variant="h5" color="secondary.main">
                    Gallery
                  </Typography>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Dialog>
  );
};

export default UserProfileModal;

const styles = {
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    justifyContent: "center",
  },
};
