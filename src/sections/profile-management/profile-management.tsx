'use client'
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AgencyTabsPage from "./agency";
import { getSessionStorage } from "@/utils/session-storage";
import ParentsTabsPage from "./parents/index";
import SurrogateTabsPage from "./surrogate";

import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { RootState } from "@/store";




const ProfileManagement = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const getUsers = getSessionStorage('role');
  const router = useRouter();

  const handleVerifyEnvelop = async (item: any = null) => {

  }



  return (
    <Box sx={{ py: { xs: "0px", sm: "32px" } }}>
      <Box sx={styles.homeWrapper}>
        <Box>
          <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
            Profile Management
          </Typography>
          <Typography variant="body1" color="info.main">
            Change your Profile Details
          </Typography>
        </Box>
      </Box>

      {/* tabs */}
      <Box sx={{ pt: { xs: "10px", sm: "30px" }, px: { xs: 0, sm: "40px" } }}>
        {getUsers === 'Intended Parent' ? <ParentsTabsPage /> : getUsers === 'Surrogate' ? <SurrogateTabsPage /> : getUsers === 'Agency' ? <AgencyTabsPage /> : null}
      </Box>
    </Box>
  );
};

export default ProfileManagement;

const styles = {
  homeWrapper: {
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: "32px",
    px: { xs: "0px", sm: "40px" },
    flexDirection: { xs: "column", sm: "row" },
  },
  upgradeBtn: {
    backgroundColor: "primary.light",
    p: "12px 29px",
    width: { xs: "100%", sm: "auto" },
  },
};
