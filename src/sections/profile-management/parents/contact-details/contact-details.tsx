"use client";
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { contactDetailsFormData } from "./contact-details.data";
import { useUpdateProfileContactMutation } from "@/services/profile-management/profile-management-api";
import toast from "react-hot-toast";

import { RootState } from "@/store";
import Spinner from "@/components/Spinner/Spinner";
import { PremiumModal } from "@/components/premium-modal/premium-modal";



import { useSelector, useDispatch } from "react-redux";
import { authActions } from '@/slices/auth/reducer';

const ContactDetails = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [mutation] = useUpdateProfileContactMutation();
  const [loading, setLoading] = useState(false);
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);


  const dispatch = useDispatch();
  const { setUser } = authActions;



  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        // email: Yup.string(),
        // phone: Yup.string(),
        // website: Yup.string(),
      })
    ),
    defaultValues: {
      email: authUser?.email,
      phone: authUser?.phone_number,
      website: authUser?.website,
    },
  });

  const onSubmit = async (values: any) => {

    console.log("Stripe data", authUser?.stripe_data);

    if (authUser?.stripe_data?.active) {
      setLoading(true);
      try {
        await mutation({
          contact_email: values?.email,
          phone_number: values?.phone,
          website: values?.website,
        }).then((res: any) => {
          setLoading(false);
          toast.success(res.data.message);
          dispatch(setUser({
            ...authUser,
            contact_email: values?.email,
            phone_number: values?.phone,
            website: values?.website,
          }));
        });
      } catch (error: any) {
        toast.success(error.message || "Update Profile not Successfully");
      }
    } else {
      setIsPremiumEnvelopModal(true);
    }
  };

  const { handleSubmit } = methods;

  return (
    <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
      <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
        Contact Details
      </Typography>
      {loading && <Spinner />}
      <PremiumModal
        open={isPremiumEnvelopModal}
        onClose={() => setIsPremiumEnvelopModal(false)}
      />
      {authUser?.stripe_data?.active === false && (
        <Box sx={styles.headingWrapper}>
          <Typography variant="subtitle2" color="grey.100" fontWeight={700}>
            Do you want to add your contact details on your profile?
          </Typography>
          <Typography variant="body2" color="grey.100" pb="6px">
            To share contact info on your profile,
            <Typography variant="h6" component="span">
              {` upgrade to Premium now!`}
            </Typography>
          </Typography>
        </Box>
      )}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "40px" } }}>
          {contactDetailsFormData?.map((form: any) => {
            return (
              <Grid item key={form?.id} xs={12} md={form?.gridLength}>
                <Typography variant="h5" color="info.main" pb="14px" fontWeight={500}>
                  {form?.otherOptions?.heading}
                </Typography>
                <form.component size="small" {...form.otherOptions} />
              </Grid>
            );
          })}
        </Grid>
        <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", mt: "30px" }}>
          Save Changes
        </Button>
      </FormProvider>
    </Box>
  );
};

export default ContactDetails;

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
};
