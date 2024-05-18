import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import CloseIcon from "../../../../assets/icons/close-icon.svg";
import DeleteIcon from "../../../../assets/icons/delete-account-icon.svg";
import Image from "next/image";
import { useCancelMemeberMutation } from "@/services/account-settings/account-settings-api";
import toast from "react-hot-toast";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

import Spinner from "@/components/Spinner/Spinner";


import { cancel_subscription } from "@/lib/stripe";

interface DeleteMemberInterface {
  isCancelMembership: boolean;
  handleCloseMembership: () => void;
  closeCancelMembershipModal?: () => void;
  logUpdatedUserStripeData?: (updatedUserStripeData: any) => void;
}

const DeleteMemberModal = (props: DeleteMemberInterface) => {
  const { isCancelMembership, handleCloseMembership, closeCancelMembershipModal, logUpdatedUserStripeData } = props;

  const user = useSelector((state: RootState) => state.auth.user);
  const [cancelMember] = useCancelMemeberMutation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCancelMembership = async () => {
    setIsLoading(true);
    try {
      const data = await cancel_subscription(user?.stripe_data?.customerId);
      // if data is null, then throw an error
      if (!data) {
        toast.error("Something went wrong. Please try again later.");
      } else {
        const updatedUserStripeData = {
          cancel_at_period_end: data?.cancel_at_period_end,
          cancel_at: data?.cancel_at,
        };
        if (logUpdatedUserStripeData) {
          logUpdatedUserStripeData(updatedUserStripeData);
        }
        setIsLoading(false);
        toast.success("Member cancel successful");
      }

      handleCloseMembership();
    } catch (error: any) {
      toast.error(error.message || "Member cancel not successful");
    }
  };

  return (
    <Dialog open={isCancelMembership} onClose={handleCloseMembership} fullWidth maxWidth="xs">
      <DialogTitle textAlign="right" onClick={closeCancelMembershipModal}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      {isLoading && <Spinner />}
      <Box sx={{ textAlign: "center", px: "40px", pb: "40px" }}>
        <Image src={DeleteIcon} alt="" />
        <Typography variant="subtitle2" fontWeight={700} color="info.main" pt="24px">
          You are about to cancel your membership
        </Typography>
        <Typography variant="caption" color="info.main" pt="8px">
          Your subscription will be cancelled at the end of your current billing period
        </Typography>
        <Stack spacing={"24px"} mt="24px">
          <Button variant="contained" sx={{ backgroundColor: "#FF3636 !important" }} onClick={handleCancelMembership}>
            CANCEL
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#F4F4F4 !important", color: "#FF3636" }} onClick={closeCancelMembershipModal}>
            DON’T CANCEL
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DeleteMemberModal;
