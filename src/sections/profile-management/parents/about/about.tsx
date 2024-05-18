"use client";
import React, { useEffect, useState, useRef } from "react";
import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { aboutFormData, aboutFormData_2 } from "./about.data";
import { useAgencyAboutMutation } from "@/services/profile-management/profile-management-api";

import Spinner from "@/components/Spinner/Spinner";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from '@/slices/auth/reducer';

import { states } from "@/utils/states";
import { UploadSingleImageToCloud, UploadLostOfImagesToCloud } from "@/utils/utilitiy-functions";
import { Console } from "console";

const About = () => {

  const authUser = useSelector((state: RootState) => state.auth.user);
  const [UpdateAbout] = useAgencyAboutMutation();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<any>(null);
  const [formDate, setFormData] = useState<any>();

  const dispatch = useDispatch();
  const { setUser } = authActions;

  console.log("Auth User", authUser);
  // full an em is Linda Guzman prin tthe last name
  let last_name = authUser?.name?.split(" ")[1] ? authUser?.name?.split(" ")[1] : "";
  console.log("Last Name", last_name);

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required("Required Fields!"),
        lastname: Yup.string(),
        country: Yup.string().required("Required Fields!"),
        state: Yup.string().required("Required Fields!"),
        relationshipStatus: Yup.string().required("Required Fields!"),
        children: Yup.string().required("Required Fields!"),
        travel: Yup.string().required("Required Fields!"),
        images: Yup.mixed(),
      })
    ),
    defaultValues: {
      image: authUser?.images,
      name: authUser?.name?.split(" ")[0],
      last_name: authUser?.name?.split(" ")[1],
      country: authUser?.country,
      state: authUser?.state,
      relationshipStatus: authUser?.relationship_status,
      children: authUser?.have_children,
      travel: authUser?.is_willing_to_travel,
      about: authUser?.about,
      // profile_image: authUser?.profile_image
    },
  });

  const { handleSubmit } = methods;



  const onSubmit = async (values: any) => {

    setLoading(true);
    let galleryImages: any;
    if (values?.listimages?.length > 0) {
      if (authUser.gallery === values?.listimages) {
        galleryImages = values?.listimages;
      } else {
        galleryImages = await UploadLostOfImagesToCloud(values.listimages);
      }
    }

    const image = values?.image;
    setImage(image);
    const image_url = await UploadSingleImageToCloud(image);


    UpdateAbout({
      images: image_url,
      gallery: galleryImages,
      // check if this name should not be undefilened and anull if so pass the empty string 
      name: values?.name + (values?.last_name ? values?.last_name : ""),
      country: values?.country,
      state: values?.state,
      relationship_status: values?.relationshipStatus,
      have_children: values?.children,
      is_willing_to_travel: values?.travel,
      about: values?.about,

    }).then((res: any) => {
      setLoading(false);
      toast.success(res.data.message);
      dispatch(setUser({
        ...authUser,
        images: image_url,
        gallery: galleryImages,
        name: values?.name + values?.last_name,
        country: values?.country,
        state: values?.state,
        assisted_groups: values?.assistedGroups,
        about: values?.about,
      }));
    });
  };

  function getStatesByCountryCode(countryCode: any) {
    const filteredStates = states.filter((state: any) => state.country_code === countryCode);
    return filteredStates.map((state: any) => ({ label: state.name, value: state.state_code }));
  }

  let CurrentFormData: any = useRef(null);

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

    const uniqueStatesSet = new Set(states.map((state: any) => state.value));
    const uniqueStates = Array.from(uniqueStatesSet).map(value => states.find((state: any) => state.value === value)) as { label: any; value: any; }[];;
    states = uniqueStates;

    if (CurrentFormData.current && CurrentFormData.current[4] && CurrentFormData.current[4].otherOptions) {
      CurrentFormData.current[4].otherOptions.options = [...states];
      setFormData([...CurrentFormData.current]);
    }
  }, [methods.watch("country")]);




  return (
    <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
      <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
        About
        {loading && <Spinner />}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* <input onChange={onImageChange} name="profile_image" type="file" id="" /> */}
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
