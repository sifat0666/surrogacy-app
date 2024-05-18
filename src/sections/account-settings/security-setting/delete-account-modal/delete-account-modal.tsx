'use client'
import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import Image from "next/image";
import DeleteIcon from "../../../../assets/icons/delete-account-icon.svg";
import Spinner from "@/components/Spinner/Spinner";

interface DeleteAccountInterface {
  isDeleteModal: boolean;
  isLoading: boolean;
  handleDeleteAccount: () => void;
  onClose: () => void;
}

const DeleteAccountModal = (props: DeleteAccountInterface) => {
  const { isDeleteModal, handleDeleteAccount, onClose, isLoading } = props;
  return (
    <Dialog open={isDeleteModal} onClose={handleDeleteAccount} fullWidth maxWidth="xs">
      {isLoading && <Spinner />}
      <DialogTitle textAlign="right" onClick={onClose}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ textAlign: "center", px: "40px", pb: "40px" }}>
        <Image src={DeleteIcon} alt="" />
        <Typography variant="subtitle2" fontWeight={700} color="info.main" pt="24px">
          Permanently delete your account?
        </Typography>
        <Typography variant="caption" color="info.main" pt="8px">
          Once you delete you won’t be able to access this account & its data.
        </Typography>
        <Stack spacing={"24px"} mt="24px">
          <Button variant="contained" sx={{ backgroundColor: "#FF3636 !important" }} onClick={handleDeleteAccount}>
            DELETE
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#F4F4F4 !important", color: "#FF3636" }} onClick={onClose}>
            DON’T DELETE
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DeleteAccountModal;
