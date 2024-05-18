"use client";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { aboutFormData, aboutFormData_2 } from "./about.data";
import { useAgencyAboutMutation } from "@/services/profile-management/profile-management-api";
import { RootState } from "@/store";
import Spinner from "@/components/Spinner/Spinner";

import toast from "react-hot-toast";
import { states } from "@/utils/states";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '@/slices/auth/reducer';

import { UploadSingleImageToCloud, UploadLostOfImagesToCloud, parseStringToArray } from "@/utils/utilitiy-functions";

const About = () => {

  const [UpdateAbout] = useAgencyAboutMutation();
  const [loading, setLoading] = useState(false);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [image, setImage] = useState<any>(null);
  const [formDate, setFormData] = useState<any>();

  const dispatch = useDispatch();
  const { setUser } = authActions;

  // object ['Case Management', 'Counseling & Support', 'Billing Management']
  // null
  // string  Counseling & Support,Egg Donation,Escrow Management,Legal Counsel
  // string ["Counseling & Support","Egg Donation","Escrow Management","Legal Counsel"]

  // the input can be of the following types
  function extractStringArray(input) {
    if (typeof input === 'object' && Array.isArray(input)) {
      // Case: input is an array of strings
      return input.filter(item => typeof item === 'string');
    } else if (input === null) {
      // Case: input is null
      return [];
    } else if (typeof input === 'string') {
      // Case: input is a comma-separated string or JSON string
      let array = [];
      try {
        array = JSON.parse(input.replace(/'/g, '"'));
      } catch (error) {
        array = input.split(',').map(item => item.trim());
      }
      return array.filter(item => typeof item === 'string');
    } else {
      // Invalid input type
      return [];
    }
  }
  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        // image: Yup.mixed(),
        //   .nullable()
        // //   .test("required", "Image is is required", (value: any) => Boolean(value)),
        // listimages: Yup.array().of(Yup.string()),
        // name: Yup.string().required("Required Fields!"),
        // country: Yup.string().required("Required Fields!"),
        // state: Yup.string().required("Required Fields!"),
        // assistedGroups: Yup.string().required("Required Fields!"),
        // services_provider: Yup.array().of(Yup.string()),
        // surrogate_matching_time: Yup.string().required("Required Fields!"),
        // journey_length: Yup.string().required("Required Fields!"),
        // membership_affilations: Yup.array().of(Yup.string()),
        // about: Yup.string(),
      })
    ),
    defaultValues: {
      image: authUser?.images,
      listimages: authUser?.gallery,
      name: authUser?.name,
      country: authUser?.country,
      state: authUser?.state,
      assistedGroups: authUser?.assisted_groups,
      surrogate_matching_time: authUser?.surrogate_matching_time,
      journey_length: authUser?.journey_length,
      services_provider: extractStringArray(authUser?.services_provided),
      membership_affilations: extractStringArray(authUser?.membership_affilations),
      about: authUser?.about,
    },


  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    let galleryImages: any;

    if (values?.listimages?.length > 0) {
      if (authUser.gallery === values?.listimages) {
        galleryImages = values?.listimages;
      } else {
        galleryImages = await UploadLostOfImagesToCloud(values?.listimages);
      }
    }
    const image = values?.image;
    setImage(image);
    const image_url = await UploadSingleImageToCloud(image);



    UpdateAbout({
      images: image_url,
      gallery: galleryImages,
      name: values?.name,
      country: values?.country,
      state: values?.state,
      assisted_groups: values?.assistedGroups,
      about: values?.about,
      services_provided: values?.services_provider,
      surrogate_matching_time: values?.surrogate_matching_time,
      journey_length: values?.journey_length,
      membership_affilations: values?.membership_affilations,

    }).then((res) => {
      setLoading(false);
      if ('data' in res) {
        const responseData = res.data as { message: string };
        toast.success(responseData.message);
        dispatch(setUser({
          ...authUser,
          gallery: galleryImages,
          images: image_url,
          name: values?.name,
          country: values?.country,
          state: values?.state,
          assisted_groups: values?.assistedGroups,
          services_provided: values?.services_provider,
          surrogate_matching_time: values?.surrogate_matching_time,
          journey_length: values?.journey_length,
          membership_affilations: values?.membership_affilations,
          about: values?.about,
        }));
      }
    });
  };

  const { handleSubmit } = methods;



  function getStatesByCountryCode(countryCode: any) {
    const filteredStates = states.filter((state: any) => state.country_code === countryCode);
    return filteredStates.map((state: any) => ({ label: state.name, value: state.state_code }));
  }


  let CurrentFormData: any = useRef(null); // Using useRef instead of a variable

  useEffect(() => {
    if (authUser) {
      if (authUser.user_type === "Surrogate" || (authUser.user_type === "Agency" || authUser.user_type === "Intended Parent") && authUser.stripe_data.active === true) {
        setFormData(aboutFormData_2);
        CurrentFormData.current = [...aboutFormData_2]; // Using ref.current to update the value
      } else {
        setFormData(aboutFormData);
        CurrentFormData.current = [...aboutFormData]; // Using ref.current to update the value
      }
    }
  }, [authUser]);

  useEffect(() => {
    let states = getStatesByCountryCode(methods.watch("country"));

    const uniqueStatesSet = new Set(states.map(state => state.value));
    const uniqueStates = Array.from(uniqueStatesSet).map(value => states.find(state => state.value === value));
    states = uniqueStates;

    if (CurrentFormData.current && CurrentFormData.current[3] && CurrentFormData.current[3].otherOptions) {
      CurrentFormData.current[3].otherOptions.options = [...states];
      setFormData([...CurrentFormData.current]);
    }
  }, [methods.watch("country")]);



  return (
    <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
      <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
        About
      </Typography>
      {loading && <Spinner />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "60px" } }}>
          {formDate?.map((form: any, index: number) => {
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

        <Alert severity="info" style={{ marginTop: "10px", borderRadius: "8px" }}>
          For your own safety, please do not include any personal contact information in your profile.
        </Alert>
        <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", mt: "30px" }}>
          Save Changes
        </Button>
      </FormProvider>
    </Box>
  );
};

export default About;
const styles = {
  heading: {
    color: "info.main",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
  },
};
