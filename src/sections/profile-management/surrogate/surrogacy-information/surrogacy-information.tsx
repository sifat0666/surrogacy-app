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

import dayjs from "dayjs";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '@/slices/auth/reducer';

import Spinner from "@/components/Spinner/Spinner";


const SurrogacyInformation = () => {

  const [mutation] = useUpdateProfileSurrogateSurrogacyMutation();
  const [loading, setLoading] = useState(false);


  const authUser = useSelector((state: RootState) => state.auth.user);


  const dispatch = useDispatch();
  const { setUser } = authActions;


  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        typeSurrogacy: Yup.string().required("Required Fields!"),
        firstSurrogacyJourney: Yup.string().required("Required Fields!"),
        workingAgency: Yup.string().required("Required Fields!"),
        willingHelp: Yup.string().required("Required Fields!"),
        intendedParentsLocation: Yup.string().required("Required Fields!"),
        startJourney: Yup.string().required("Required Fields!"),
      })
    ),
    defaultValues: {
      typeSurrogacy: authUser.surrogacy_type,
      firstSurrogacyJourney: authUser.is_first_surrogacy_journey,
      workingAgency: authUser.is_working_with_agency,
      willingHelp: authUser.willing_to_help_types,
      intendedParentsLocation: authUser.intended_parent_location,
      startJourney: authUser.when_to_start_journey,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    mutation({
      surrogacy_type: values?.typeSurrogacy,
      is_first_surrogacy_journey: values?.firstSurrogacyJourney,
      is_working_with_agency: values?.workingAgency,
      willing_to_help_types: values?.willingHelp,
      intended_parent_location: values?.intendedParentsLocation,
      when_to_start_journey: values?.startJourney
    }).then((response) => {
      toast.success("Update Surrogacy Information Successfully");
      dispatch(setUser({
        ...authUser,
        surrogacy_type: values?.typeSurrogacy,
        is_first_surrogacy_journey: values?.firstSurrogacyJourney,
        is_working_with_agency: values?.workingAgency,
        willing_to_help_types: values?.willingHelp,
        intended_parent_location: values?.intendedParentsLocation,
        when_to_start_journey: values?.startJourney
      }));

      setLoading(false);
    });
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
