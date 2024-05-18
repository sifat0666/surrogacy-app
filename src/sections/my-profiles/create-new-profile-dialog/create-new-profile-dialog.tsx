
import React, { useEffect, useState, useRef, use } from "react";
import { Box, Button, Dialog, DialogTitle, Typography, Grid } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useAgencyRegisterMutation, useUpdateAgencyUserMutation } from "@/services/my-profile/my-profile-api";
import toast from "react-hot-toast";

import { CreateNewProfileFormData } from "./create-new-profile-dialog.data";
import Spinner from "@/components/Spinner/Spinner";

// Importing data specifically for surrogates
import { aboutData as SurrogateAboutData } from "@/sections/auth/register/stepper/surrogate/about/about.data";
import { SurrogacyData as SurrogateSurrogacyData } from "@/sections/auth/register/stepper/surrogate/surrogacy/surrogacy.data";

// Importing data for both parent and surrogate
import { aboutData as ParentAboutData } from "@/sections/auth/register/stepper/parents/about/about.data";
import { SurrogacyData as ParentSurrogacyData } from "@/sections/auth/register/stepper/parents/surrogacy/surrogacy.data";
import { states } from "@/utils/states";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";


import {
  getStatesByCountryCode,
  UploadSingleImageToCloud,
} from "@/utils/utilitiy-functions";



interface CreateNewProfileDialogProps {
  open: boolean;
  onClose: () => void;
  actionType?: string;
  profileObj?: any;
}

interface FormValues {
  image: any;
  name: string;
  last_name: string;
  user_type: string;
  country: string;
  state: string;
  relationshipStatus: string | undefined;
  dateBirth: string;
  children: string;
  height: string;
  weight: string;
  tobacco: string;
  travel: string;
  typeSurrogacy: string;
  firstSurrogacyJourney: string;
  workingAgency: string;
  typeJourney: string;
  willingHelp: string;
  intendedParentsLocation: string;
  startJourney: string;
  surrogateLocation: string;
  frozenEmbroys: string;
  surrogacy_type: string;
}

const CreateNewProfileDialog = (props: CreateNewProfileDialogProps) => {
  const { open, onClose, actionType, profileObj } = props;
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [mutation] = useAgencyRegisterMutation();
  const [updateMutation] = useUpdateAgencyUserMutation();
  const [usertype, setUserType] = useState('');
  const [showModal, setShowModal] = React.useState(true);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(CreateNewProfileFormData);

  const surrogateCountry = {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "country",
      heading: "Country",
      placeholder: "Select Country",
      options: [
        { id: 1, label: "United State", value: "US" },
        { id: 2, label: "Canada", value: "CA" },
      ],
    },
    component: RHFCustomSelect,
  };
  const parentCountry = {
    id: 4,
    otherOptions: {
      name: "country",
      heading: "Select your Country",
      placeholder: "Select one...",
    },
    component: RHFCountrySelect,
  };

  const steps = [
    {
      label: actionType === "add" ? 'Create a New Profile' : 'Update Profile',
      data: formData,
    },
    {
      label: usertype === 'Surrogate' ? 'Surrogate About' : 'Parent About',
      data: usertype === 'Surrogate' ? SurrogateAboutData : ParentAboutData,
    },
    {
      label: usertype === 'Surrogate' ? 'Surrogate Surrogacy Data' : 'Parent Surrogacy Data',
      data: usertype === 'Surrogate' ? SurrogateSurrogacyData : ParentSurrogacyData,
    },
  ];

  const methods = useForm<any>({
    // resolver: yupResolver(
    //   Yup.object({
    //     name: Yup.string(),
    //     last_name: Yup.string(),
    //     user_type: Yup.string(),
    //     country: Yup.string(),
    //     state: Yup.string(),
    //     relationshipStatus: Yup.string(),
    //     dateBirth: Yup.string(),
    //     children: Yup.string(),
    //     height: Yup.string(),
    //     weight: Yup.string(),
    //     tobacco: Yup.string(),
    //     willingTravel: Yup.string(),
    //     typeSurrogacy: Yup.string(),
    //     firstSurrogacyJourney: Yup.string(),
    //     workingAgency: Yup.string(),
    //     typeJourney: Yup.string(),
    //     willingHelp: Yup.string(),
    //     intendedParentsLocation: Yup.string(),
    //     startJourney: Yup.string(),
    //     surrogate_location: Yup.string(),
    //     frozenEmbroys: Yup.string(),
    //     surrogacy_type: Yup.string(),
    //   })
    // ),
  });



  const onSubmit = async (values: FormValues) => {

    if (usertype === 'Intended Parent') {
      if (!values?.typeSurrogacy) {
        return toast.error("Please select Relationship status");
      }
      if (!values?.surrogateLocation) {
        return toast.error("Please select the Surrogate Location");
      }
      if (!values?.firstSurrogacyJourney) {
        return toast.error("Please select if this is user's first surrogacy journey");
      }
      if (!values?.workingAgency) {
        return toast.error("Please select if the user is working with an agency");
      }
      if (!values?.frozenEmbroys) {
        return toast.error("Please select if the user have frozen embryos");
      }
      if (!values?.typeJourney) {
        return toast.error("Please select the type of journey");
      }
    }
    if (usertype === 'Surrogate') {
      if (!values?.typeSurrogacy) {
        return toast.error("Please select the type of surrogacy");
      }
      if (!values?.firstSurrogacyJourney) {
        return toast.error("Please select if this is user's first surrogacy journey");
      }
      if (!values?.workingAgency) {
        return toast.error("Please select if this user is working with an agency");
      }
      if (!values?.willingHelp) {
        return toast.error("Please select if the user is willing to help");
      }
      if (!values?.intendedParentsLocation) {
        return toast.error("Please select the intended parents location");
      }
      if (!values?.startJourney) {
        return toast.error("Please select when to start the journey");
      }
    }

    setLoading(true);
    const image = values?.image;
    setImage(image);
    const image_url = await UploadSingleImageToCloud(image);
    try {
      if (actionType === "add") {
        mutation({
          images: image_url,
          name: values?.name + (values?.last_name ? values?.last_name : ""),
          user_type: values?.user_type,
          country: values?.country,
          state: values?.state,
          relationship_status: values?.relationshipStatus,
          date_of_birth: values?.dateBirth,
          have_children: values?.children,
          height: values?.height,
          weight: values?.weight,
          is_smoke_or_tobacco: values?.tobacco,
          is_willing_to_travel: values?.travel,
          surrogacy_type: values?.typeSurrogacy,
          is_first_surrogacy_journey: values?.firstSurrogacyJourney,
          is_working_with_agency: values?.workingAgency,
          type_of_journey: values?.typeJourney,
          willing_to_help_types: values?.willingHelp,
          intended_parent_location: values?.intendedParentsLocation,
          when_to_start_journey: values?.startJourney,
          surrogate_location: values?.surrogateLocation,
          have_frozen_embryos: values?.frozenEmbroys,
        }).then((res: any) => {
          setShowModal(false);
          setLoading(false);
          onClose();
          setCurrentStep(0);
          toast.success(res?.data?.message);
        });
      } else if (actionType === "edit") {
        updateMutation({
          id: profileObj?.id,
          body: {
            images: image_url,
            name: values?.name + " " + values?.last_name,
            user_type: values?.user_type,
            country: values?.country,
            state: values?.state,
            relationship_status: values?.relationshipStatus,
            date_of_birth: values?.dateBirth,
            have_children: values?.children,
            height: values?.height,
            weight: values?.weight,
            is_smoke_or_tobacco: values?.tobacco,
            is_willing_to_travel: values?.travel,
            surrogacy_type: values?.typeSurrogacy,
            is_first_surrogacy_journey: values?.firstSurrogacyJourney,
            is_working_with_agency: values?.workingAgency,
            type_of_journey: values?.typeJourney,
            willing_to_help_types: values?.willingHelp,
            intended_parent_location: values?.intendedParentsLocation,
            when_to_start_journey: values?.startJourney,
            surrogate_location: values?.surrogateLocation,
            have_frozen_embryos: values?.frozenEmbroys,
          },
        }).then((res: any) => {
          setLoading(false);
          onClose();
          setCurrentStep(0);
          toast.success(res?.data?.message);
        });

      }
    } catch (error: any) {
      let errorMessage = "An error occurred while submitting";
      if (error.data && error.data.message) {
        errorMessage = error.data.message;
      }
      toast.error(errorMessage);
    }
  };

  const { handleSubmit } = methods;

  const handleNext = () => {
    if (currentStep === 0) {
      if (!methods.watch("image")) {
        return toast.error("Please upload an image");
      }
      if (!methods.watch("name")) {
        return toast.error("Please enter First Name");
      }
      if (!methods.watch("user_type")) {
        return toast.error("Please select User type");
      }
      if (!methods.watch("country")) {
        return toast.error("Please select Country");
      }
      if (!methods.watch("state")) {
        return toast.error("Please select State");
      }
    }

    if (currentStep === 1) {
      if (usertype === "Surrogate") {
        if (!methods.watch("relationshipStatus")) {
          return toast.error("Please select Relationship status");
        }
        if (!methods.watch("dateBirth")) {
          return toast.error("Please select Date of Birth");
        }
        if (!methods.watch("children")) {
          return toast.error("Please select Do you have children");
        }
        if (!methods.watch("height")) {
          return toast.error("Please select Height");
        }
        if (!methods.watch("weight")) {
          return toast.error("Please select Weight");
        }
        if (!methods.watch("tobacco")) {
          return toast.error("Please select if the person smoke tobacco");
        }
        if (!methods.watch("travel")) {
          return toast.error("Please select if the person is willing to travel");
        }
      }
      if (usertype === "Intended Parent") {
        if (!methods.watch("relationshipStatus")) {
          return toast.error("Please select Relationship status");
        }
        if (!methods.watch("children")) {
          return toast.error("Please select Do you have children");
        }
        if (!methods.watch("travel")) {
          return toast.error("Please select if the person is willing to travel");
        }
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };


  useEffect(() => {
    methods.reset({
      image: profileObj?.images,
      name: profileObj?.name?.split(" ")[0],
      last_name: profileObj?.name?.split(" ")[1] || "",
      user_type: profileObj?.user_type,
      country: profileObj?.country,
      state: profileObj?.state,
      relationshipStatus: profileObj?.relationship_status,
      dateBirth: profileObj?.date_of_birth,
      children: profileObj?.have_children,
      height: profileObj?.height,
      weight: profileObj?.weight,
      tobacco: profileObj?.is_smoke_or_tobacco,
      travel: profileObj?.is_willing_to_travel,
      surrogacy_type: profileObj?.surrogacy_type,
      firstSurrogacyJourney: profileObj?.is_first_surrogacy_journey,
      workingAgency: profileObj?.is_working_with_agency,
      typeJourney: profileObj?.type_of_journey,
      typeSurrogacy: profileObj?.surrogacy_type,
      willingHelp: profileObj?.willing_to_help_types,
      intendedParentsLocation: profileObj?.intended_parent_location,
      startJourney: profileObj?.when_to_start_journey,
      surrogateLocation: profileObj?.surrogate_location,
      frozenEmbroys: profileObj?.have_frozen_embryos,
    });
  }, [profileObj]);

  useEffect(() => {
    const userType = methods.watch("user_type");
    if (userType === "Surrogate") {
      let updatedFormData: any[] = [...formData];
      updatedFormData[4] = surrogateCountry;
      setFormData(updatedFormData);

      setUserType(userType);
    } else {
      let updatedFormData: any[] = [...formData];
      updatedFormData[4] = parentCountry;
      setFormData(updatedFormData);
      setUserType(userType);
    }

  }, [methods.watch("user_type")]);


  useEffect(() => {
    const selectedCountry = methods.watch("country");
    const states = getStatesByCountryCode(selectedCountry);
    const updatedFormData = formData.map((step: any) => {
      if (step.id === 5) {
        return {
          ...step,
          otherOptions: {
            ...step.otherOptions,
            options: states,
          },
        };
      }
      return step;
    });
    setFormData(updatedFormData);
  }, [methods.watch("country")]);


  return (
    <Box>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign="right" onClick={onClose}>
          <CloseIcon sx={{ color: "grey.500", fontSize: "28px" }} />
        </DialogTitle>
        <Box sx={{ px: { xs: "24px", md: "64px" }, py: { xs: "24px", md: "28px" } }}>
          <Typography variant="h4" color="info.main" fontWeight={700} classes={{ root: "font-grotesk" }}>
            {steps[currentStep].label} {/* Display current step label */}
          </Typography>
          {loading && <Spinner />}
          <Typography variant="body1" color="info.main" pb="6px">
            Fill the data of user profile
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "40px" } }}>
              {steps[currentStep].data?.map((form: any, index: any) => {
                return (
                  <Grid
                    item
                    // make the key unique and more complex andd some more props
                    key={index?.toString() + form?.otherOptions?.name + form?.otherOptions?.heading}
                    xs={12}
                  >
                    <Typography variant="body1" color="info.main" pb="14px">
                      {form?.otherOptions?.heading}
                    </Typography>
                    {form.otherOptions.name === "state" ? (
                      <RHFCustomSelect options={form.otherOptions.options} {...form.otherOptions} />
                    ) : (
                      <form.component size="small" {...form.otherOptions} />
                    )}
                  </Grid>
                );
              })}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: currentStep === 0 ? 'flex-end' : 'space-between', mt: '40px' }}>
              {currentStep > 0 && (
                <Button
                  sx={{
                    border: "1px solid #00C9D4",
                    color: "#00C9D4",
                  }}
                  onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button
                  sx={{
                    border: "1px solid #00C9D4",
                    color: "#00C9D4",
                  }}
                  onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important" }}>
                  {actionType === "add" ? "REGISTER" : "UPDATE"}
                </Button>
              )}
            </Box>
          </FormProvider>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CreateNewProfileDialog;
