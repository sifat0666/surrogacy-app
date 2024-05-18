'use client'
import React, { useState, useEffect } from "react";
import { useCancelMemeberMutation } from "@/services/account-settings/account-settings-api";
import { useDetailsQuery } from "@/services/users/users-api";
import { getSessionStorage } from "@/utils/session-storage";
import { Box, Button, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import DeleteMemberModal from "./delete-member-modal/delete-member-modal";
import { useRouter } from "next/navigation";


import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/store";
import { authActions } from '@/slices/auth/reducer';

import { BASE_URL } from "../../../../config";

import CustomModal from "@/components/custom-modal/custom-modal";
import { VerifyModal } from "@/components/premium-modal/premium-modal";

const Membership = () => {

  const [stripePlans, setStripePlans] = useState<any>([]);
  const [isCancelMembership, setIsCancelMembership] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const dispatch = useDispatch();
  const { setUser, setUserAnyItem } = authActions;
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showCustomModal2, setShowCustomModal2] = useState(false);
  const router = useRouter();

  let daysRemaining = user?.stripe_data?.timeDifferenceDays || 0;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysRemaining);
  const formattedExpirationDate = expirationDate.toDateString();

  const current_plan = user?.stripe_data?.current_plan;

  let totalDays = 0;
  if (current_plan?.description === "Monthly Plan") {
    totalDays = 31;
  } else if (current_plan?.description === "Quarterly Plan") {
    totalDays = 93;
  } else if (current_plan?.description === "Yearly Plan") {
    totalDays = 365;
  } else {
    totalDays = 0;
  }

  const percentageRemaining = (daysRemaining / totalDays) * 100;

  if (percentageRemaining < 0) {
    totalDays = 0;
    daysRemaining = 0;
  }



  // use usefetch api to get the pln from the server https://api.surrogacy.com/api/v1/pricing-plans
  useEffect(() => {
    const fetchData = async () => {
      if (authUserToken) {

        const response = await fetch(`${BASE_URL}/pricing-plans`, {
          method: "GET",
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${authUserToken}`,
          }

        });
        const data = await response.json();
        setStripePlans(data.plans);
        const user_stripe_plan_id: any = user?.stripe_data?.plans;

        const stripe_plans = data.plans;
        const user_stripe_plan = stripe_plans?.find((plan: any) => plan.stripe_plan === user_stripe_plan_id);

        dispatch(setUser({
          ...user,
          stripe_data: {
            ...user.stripe_data,
            current_plan: user_stripe_plan,
          }
        }));
      }
    }
    fetchData();
  }, []);


  const closeCancelMembershipModal = () => {
    setIsCancelMembership(false);
  }

  const handleCloseMembership = () => {
    if (isAuthenticated) {
      if (user?.stripe_data?.active) {
        if (user?.stripe_data?.cancel_at_period_end) {
          setShowCustomModal(true);
        } else {
          setIsCancelMembership(true);
        }
      } else {
        setShowCustomModal2(true);
      }
    }
  }


  const handleDone = () => {
    // setIsCancelMembership(true);
    setShowCustomModal(false);
    setShowCustomModal2(false);
  };

  const handleCloseDeleteModal = () => {
    setShowCustomModal(false);
  };

  // Function to log the updated user stripe data
  const logUpdatedUserStripeData = (data: any) => {
    dispatch(setUserAnyItem({
      // just update the stripe_data object only the rest of the user object remains the same
      stripe_data: {
        ...user?.stripe_data,
        ...data
      }
    }));
  };



  const handleVerifyModalClose = () => {
    setIsVerifyEnvelopModal(false);
  }

  return (
    <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
      <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
        Membership
      </Typography>
      <Grid container spacing={3} alignItems="center" mt="40px">
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" color="info.main">
              Current Plan
            </Typography>
            <Typography variant="body2" color="info.main" pt="8px">
              Your current plan is {" "} {user?.stripe_data?.current_plan?.description || "Free User"}
            </Typography>
          </Box>
          {user?.stripe_data?.active && (
            <Box pt="16px">
              <Typography variant="h6" color="info.main">
                Active until {" "} {formattedExpirationDate}
              </Typography>
              <Typography variant="body2" color="info.main" pt="8px">
                We will send you a notification upon subscription expiration
              </Typography>
            </Box>
          )}
        </Grid>
        {user?.stripe_data?.active && (

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" color="info.main">
                We need your attention!
              </Typography>
              {user?.stripe_data?.cancel_at_period_end && (
                <Typography
                  variant="body2"
                  color="info.main"
                  pt="8px"
                  style={{ color: "white", backgroundColor: "#FF414D", border: "1px solid #FF414D", borderRadius: "6px", padding: "8px", marginTop: "8px" }}
                >
                  Subscription will be canceled at  {""} {formattedExpirationDate}
                </Typography>
              )}
              <Typography variant="body2" color="info.main" pt="8px">
                Your plan requires update.
              </Typography>
            </Box>
            <Box pt="16px">
              <Typography variant="subtitle1" color="secondary.main" fontSize={14}>
                Days
              </Typography>
              <LinearProgress variant="determinate" value={percentageRemaining} classes={{ root: "linear-progress" }} sx={styles.linearProgress} />
              <Typography variant="subtitle1" color="secondary.main" pt="8px" fontSize={12}>
                {daysRemaining} of {totalDays} days remaining
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      <Stack spacing={2} alignItems='center' direction='row' mt="24px">
        {user?.user_type == "Surrogate" ? (
          <Button variant="contained" color="primary" onClick={handleCloseMembership}>VERIFY NOW</Button>
        ) : (
          <>
            {!user?.stripe_data?.active && (
              <Button
                variant="contained"
                sx={{ backgroundColor: '#FF414D !important' }}
                onClick={() => router.push('/membership')}
              >
                UPGRADE PLAN
              </Button>
            )}
          </>
        )}
        {!user?.stripe_data?.cancel_at_period_end && user?.stripe_data?.active && (
          <Button variant="outlined" onClick={handleCloseMembership}>CANCEL SUBSCRIPTION</Button>
        )}
      </Stack>
      <CustomModal
        isOpen={showCustomModal}
        handleClose={handleCloseDeleteModal}
        heading="You have already canceled your subscription"
        description="Subscription will be canceled at"
        doneButtonText="Done"
        date={formattedExpirationDate}
        handleDone={handleDone}
      />
      <CustomModal
        isOpen={showCustomModal2}
        handleClose={handleCloseDeleteModal}
        heading="You have not subscribed to any plan"
        description="Please subscribe to a plan to continue using the platform"
        doneButtonText="Done"
        date=""
        handleDone={handleDone}
      />
      <VerifyModal
        open={isVerifyEnvelopModal}
        onClose={handleVerifyModalClose}
      />
      <DeleteMemberModal
        isCancelMembership={isCancelMembership}
        handleCloseMembership={handleCloseMembership}
        closeCancelMembershipModal={closeCancelMembershipModal}
        logUpdatedUserStripeData={logUpdatedUserStripeData} // Pass the function as prop

      />
    </Box>
  );
};

export default Membership;

const styles = {
  heading: {
    color: "info.main",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
  },
  headingWrapper: {
    mt: { xs: "24px", md: "40px" },
    backgroundColor: "info.main",
    px: { xs: 0, md: "20px" },
    py: "24px",
    borderRadius: "6px",
  },
  linearProgress: {
    mt: "8px",
    "&.linear-progress": {
      height: "6px",
      bacground: "#ECF9FB",
      "& .MuiLinearProgress-bar": {
        backgroundColor: "primary.light",
      },
    },
  },
};
