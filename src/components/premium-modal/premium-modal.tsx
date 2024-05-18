import React from "react";
import { Box, Button, Dialog, DialogTitle, Typography } from "@mui/material";
import CloseIcon from "../../assets/icons/close-icon.svg";
import PremiumIcon from "../../assets/icons/premium-icon.svg";
import VerifyIcon from "../../assets/icons/verify-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  handleOnClickModal?: () => void;
  handleVerifyModalClose?: () => void;
}

export function PremiumModal(props: PremiumModalProps) {

  const { open, onClose, handleOnClickModal } = props;
  const router = useRouter();


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="right" onClick={onClose}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ textAlign: "center", p: "40px" }}>
        <Image src={PremiumIcon} alt="" />
        <Typography variant="subtitle2" color="grey.500" pt="24px">
          Upgrade to Premium!
        </Typography>
        <Typography variant="caption" color="grey.500" pt="8px" component="p">
          In order to contact this member, you need to upgrade to premium.
        </Typography>
        <Button variant="contained" sx={styles.button} onClick={() => router.push("/membership")}>
          UPGRADE TO PREMIUM
        </Button>
      </Box>
    </Dialog>
  );
}

export function VerifyModal(props: PremiumModalProps) {
  const { open, onClose, handleOnClickModal, handleVerifyModalClose } = props;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="right" onClick={onClose}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ textAlign: "center", p: "40px" }}>
        <Image src={VerifyIcon} alt="" />
        <Typography variant="subtitle2" color="grey.500" pt="24px">
          Verify your ID please!
        </Typography>
        <Typography variant="caption" color="grey.500" pt="8px" component="p">
          In order to view this profile, kindly verify your ID. It takes less than a minute.
        </Typography>
        <Button variant="contained" sx={styles.button} onClick={onClose}>
          VERIFY MY ID
        </Button>
      </Box>
    </Dialog>
  );
}

const styles = {
  button: {
    backgroundColor: "#FF414D !important",
    mt: "24px",
    fontSize: "14px",
    width: "100%",
  },
};
