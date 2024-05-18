"use client";
import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { surrogacyInformationFormData } from "./surrogacy-information.data";
import { useUpdateProfileSurrogateSurrogacyMutation } from "@/services/profile-management/profile-management-api";

import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";


import { RootState } from "@/store";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from '@/slices/auth/reducer';

const SurrogacyInformation = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [mutation] = useUpdateProfileSurrogateSurrogacyMutation();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { setUser } = authActions;


  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        typeSurrogacy: Yup.string().required("Required Fields!"),
        surrogateLocation: Yup.string().required("Required Fields!"),
        typeJourney: Yup.string().required("Required Fields!"),
        firstSurrogacyJourney: Yup.string().required("Required Fields!"),
        workingAgency: Yup.string().required("Required Fields!"),
        frozenEmbroys: Yup.string().required("Required Fields!"),
        startJourney: Yup.string().required("Required Fields!"),
      })
    ),
    defaultValues: {
      typeSurrogacy: authUser?.surrogacy_type,
      surrogateLocation: authUser?.surrogate_location,
      typeJourney: authUser?.type_of_journey,
      firstSurrogacyJourney: authUser?.is_first_surrogacy_journey,
      workingAgency: authUser?.is_working_with_agency,
      frozenEmbroys: authUser?.have_frozen_embryos,
      startJourney: authUser?.when_to_start_journey,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await mutation({
        surrogacy_type: values?.typeSurrogacy,
        is_first_surrogacy_journey: values?.firstSurrogacyJourney,
        is_working_with_agency: values?.workingAgency,
        have_frozen_embryos: values?.frozenEmbroys,
        surrogate_location: values?.surrogateLocation,
        type_of_journey: values?.typeJourney,
        when_to_start_journey: values?.startJourney,
      }).then((res: any) => {
        setLoading(false);
        toast.success(res.data.message);
        dispatch(setUser({
          ...authUser,
          surrogacy_type: values?.typeSurrogacy,
          is_first_surrogacy_journey: values?.firstSurrogacyJourney,
          is_working_with_agency: values?.workingAgency,
          have_frozen_embryos: values?.frozenEmbroys,
          surrogate_location: values?.surrogateLocation,
          type_of_journey: values?.typeJourney,
          when_to_start_journey: values?.startJourney,
        }));
      });
    } catch (error: any) {
      toast.success(error.message || "Update Profile not Successfully");
    }
  };

  const { handleSubmit } = methods;

  return (
    <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
      <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
        Surrogacy Information
      </Typography>
      {loading && <Spinner />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "60px" } }}>
          {surrogacyInformationFormData?.map((form: any, index: number) => {
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

export default SurrogacyInformation;

const styles = {
  heading: {
    color: "info.main",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
  },
  button: {
    fontWeight: 400,
    padding: "8px 16px",
    textTransform: "capitalize",
    marginLeft: "0 !important",
    gap: "30px",
  },
  buttonWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};
