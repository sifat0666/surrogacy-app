"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CustomTab from "@/components/custom-tab/custom-tab";
import SurrogatesUser from "@/components/surrogates-user/surrogates-user";
import CreateNewProfileDialog from "./create-new-profile-dialog/create-new-profile-dialog";
import { useGetAgencyUserQuery, useUpdateAgencyUserMutation } from "@/services/my-profile/my-profile-api";
import DeleteProfileModal from "./delete-profile-modal/delete-profile-modal";


const MyProfiles = () => {
  const { data }: any = useGetAgencyUserQuery({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionType, setActionType] = useState('add');
  const [profileObj, setProfileObj] = useState<any>({});
  const intendedParentsData = data?.users?.filter((item: any) => item?.user_type === 'Intended Parent');
  const SurrogateData = data?.users?.filter((item: any) => item?.user_type === 'Surrogate');



  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setActionType('add');
    setProfileObj({});
  };

  const handleDeleteProfile = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setProfileObj({});
  }

  const handleActions = (type: string, item: any) => {
    switch (type) {
      case 'Edit':
        toggleDrawer();
        setProfileObj(item);
        setActionType('edit');
        break;
      case 'Delete':
        setProfileObj(item);
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    };

  }

  const tabs = [
    {
      label: "Intended Parents",
      content: <SurrogatesUser
        isDashboard={true}
        data={intendedParentsData}
        isFavorite={false}
        renderColor={renderColor}
        handleActions={handleActions}
        rootSx={{ py: { xs: "28px", md: "44px" } }}
      />
    },
    {
      label: "Surrogates",
      content: <SurrogatesUser
        isDashboard={true}
        data={SurrogateData}
        isFavorite={false}
        renderColor={renderColor}
        handleActions={handleActions}
        rootSx={{ py: { xs: "28px", md: "44px" } }}
      />
    },
  ];

  return (
    <Box sx={{ py: { xs: "0px", sm: "32px" } }}>
      <Box sx={styles.homeWrapper}>
        <Box>
          <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
            My Profiles
          </Typography>
          <Typography variant="body1" color="info.main">
            Here are your profiles.
          </Typography>
        </Box>
        <Button variant="contained" sx={styles.upgradeBtn} onClick={toggleDrawer}>
          CREATE A NEW PROFILE
        </Button>
      </Box>

      {/* tabs */}
      <Box sx={{ pt: { xs: "10px", sm: "30px" }, px: { xs: 0, sm: "40px" } }}>
        <CustomTab tabs={tabs} />
      </Box>

      {/* add dialog */}
      <CreateNewProfileDialog
        open={drawerOpen}
        onClose={toggleDrawer}
        actionType={actionType}
        profileObj={profileObj}
      />

      {/* delete modal */}
      <DeleteProfileModal isDeleteModal={isDeleteModalOpen} handleDeleteProfile={handleDeleteProfile} profileObj={profileObj} />
    </Box>
  );
};

export default MyProfiles;

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
