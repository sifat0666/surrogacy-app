'use client'
import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import Image from "next/image";
import DeleteIcon from "../../../assets/icons/delete-account-icon.svg";
import { useDeleteAgencyUserMutation } from "@/services/my-profile/my-profile-api";
import toast from "react-hot-toast";

interface DeleteProfileInterface {
  isDeleteModal: boolean;
  handleDeleteProfile: () => void;
  profileObj: any
}

const DeleteProfileModal = (props: DeleteProfileInterface) => {
  const { isDeleteModal, handleDeleteProfile, profileObj } = props;
  const [deleteMutation] = useDeleteAgencyUserMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation({ id: profileObj?.id }).unwrap();
      handleDeleteProfile();
      toast.success("Delete profile successful!");
    } catch (error: any) {
      toast.error(error.message || "Delete profile not successful!");
    }
  };

  return (
    <Dialog open={isDeleteModal} onClose={handleDeleteProfile} fullWidth maxWidth="xs">
      <DialogTitle textAlign="right" onClick={handleDeleteProfile}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ textAlign: "center", px: "40px", pb: "40px" }}>
        <Image src={DeleteIcon} alt="" />
        <Typography variant="subtitle2" fontWeight={700} color="info.main" pt="24px">
          Are you sure you want to delete this profile?
        </Typography>
        <Typography variant="caption" color="info.main" pt="8px">
          Once you delete you won’t be able to access this account & its data.
        </Typography>
        <Stack spacing={"24px"} mt="24px">
          <Button variant="contained" sx={{ backgroundColor: "#FF3636 !important" }} onClick={handleDelete}>
            DELETE
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#F4F4F4 !important", color: "#FF3636" }} onClick={handleDeleteProfile}>
            DON’T DELETE
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DeleteProfileModal;
