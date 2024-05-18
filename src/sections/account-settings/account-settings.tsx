"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomTab from "@/components/custom-tab/custom-tab";
import SecuritySetting from "./security-setting/security-setting";
import Membership from "./membership/membership";

import { RootState } from "@/store";
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";




const AccountSettings = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  const handleVerifyEnvelop = async (item: any = null) => { }

  const tabs = [
    { label: "Membership", content: <Membership /> },
    { label: "Security Setting", content: <SecuritySetting /> },
  ];
  return (
    <Box sx={{ py: { xs: "0px", sm: "32px" } }}>
      <Box sx={styles.homeWrapper}>
        <Box>
          <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
            Account Settings
          </Typography>
          <Typography variant="body1" color="info.main">
            Manage your membership and account settings
          </Typography>
        </Box>
      </Box>

      {/* tabs */}
      <Box sx={{ pt: { xs: "10px", sm: "30px" }, px: { xs: 0, sm: "40px" } }}>
        <CustomTab tabs={tabs} />
      </Box>
    </Box>
  );
};

export default AccountSettings;

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

