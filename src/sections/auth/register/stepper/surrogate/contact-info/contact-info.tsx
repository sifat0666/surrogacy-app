import React, { useState, useEffect } from "react";
import { FormProvider } from "@/components/rhf";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useRegisterSurrogacyMutation } from "@/services/auth-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner/Spinner";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';



const ContactInfo = ({ handleChange }: { handleChange: () => void }) => {
  const [mutation] = useRegisterSurrogacyMutation();
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);



  const user_data: any = useSelector((state: any) => state.user);
  const route = useRouter();

  const methods = useForm({
    // resolver: yupResolver(
    //   // Yup.object({
    //   //   image: Yup.mixed()
    //   //     .nullable()
    //   //     .test("required", "Image is is required", (value: any) => Boolean(value)),
    //   // })
    // ),
    defaultValues: {
      image: "",
    },
  });


  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {

    if (!values?.image) {
      return toast.error("Almost done! Just need your photo to complete your registration.");
      return;
    }

    setLoading(true);
    const image = values?.image;
    setImage(image);
    const image_url = await UploadImageToCloud(image);


    try {
      const { about, identity, surrogacy } = user_data?.details;

      const formData = new FormData();
      formData.append("user_type", "Surrogate");
      formData.append("name", identity?.name);
      formData.append("email", user_data?.email);
      formData.append("password", user_data?.password);
      formData.append("password_confirmation", user_data?.password_confirmation);
      formData.append("state", identity?.state);
      formData.append("country", identity?.country);
      formData.append("surrogacy_type", surrogacy?.typeSurrogacy);
      formData.append("is_first_surrogacy_journey", surrogacy?.firstSurrogacyJourney);
      formData.append("is_working_with_agency", surrogacy?.workingAgency);
      formData.append("willing_to_help_types", surrogacy?.willingHelp);
      formData.append("type_of_journey", surrogacy?.typeJourney);
      formData.append("intended_parent_location", surrogacy?.intendedParentsLocation);
      formData.append("when_to_start_journey", surrogacy?.startJourney);
      formData.append("relationship_status", about?.relationshipStatus);
      formData.append("date_of_birth", about?.dateBirth);
      formData.append("have_children", about?.children);
      formData.append("height", about?.height);
      formData.append("weight", about?.weight);
      formData.append("is_smoke_or_tobacco", about?.tobacco);
      formData.append("is_willing_to_travel", about?.travel);
      formData.append("images", image_url);

      await mutation(formData).unwrap();
      setLoading(false);
      route.push('/login');
      toast.success("Registration successful!");
    } catch (error: any) {
      setLoading(false);
      console.error("Error submitting form:", error);
      toast.error(error.message || "Registration not successful!");
    }
  };

  const UploadImageToCloud = async (image_file: any) => {
    const image_selected = image_file;
    setImage(image_selected);

    try {
      if (!image_selected) {
        return;
      }
      const formData2 = new FormData();
      formData2.append("file", image_selected);
      formData2.append("upload_preset", "w2fsqv0e");
      try {
        const response = await fetch(' https://api.cloudinary.com/v1_1/dl8ppbbgu/image/upload', {
          method: 'POST',
          body: formData2,
          headers: {
            'X-Requested-With': 'XMLHttpRequest', // This header might be required by Cloudinary
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImage(data.secure_url);
          return data.secure_url;
        } else {
          console.error('Failed to upload image:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

    } catch (error: any) {
      console.log("error", error);
    }
  }

  // useEffect(() => {
  //   const image = methods.watch("image");
  //   if (image && typeof image !== "string") { // Ensure image is not a string
  //     setPreviewImage(URL.createObjectURL(image)); // Convert image to a URL
  //   } else {
  //     setPreviewImage(null); // Clear preview if no image selected
  //   }
  // }, [methods.watch("image")]);

  useEffect(() => {
    const image = methods.watch("image");
    if (image && typeof image !== "string") {
      setPreviewImage(URL.createObjectURL(image));
    } else {
      setPreviewImage(null);
    }
  }, [methods.watch("image")]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      methods.setValue("image", file);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} justifyContent="center" alignItems="center" sx={{ paddingX: { xs: '10px', sm: 0 } }}>
        {loading && <Spinner />}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="caption" fontWeight={700} color="info.main">
              Upload a Photo
            </Typography>
            <Tooltip
              title="It is recommended to upload a profile picture of yourself or your family, preferably a face photo, as this increases trust and reliability. Surrogates are unlikely to contact a member without a profile photo."
              color="red"
              placement="right"
              arrow
            >
              <IconButton>
                <InfoIcon
                  sx={{
                    color: "gray",
                    fontSize: "1rem"
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: "150px",
                marginTop: "10px",
                borderRadius: "50%",
                height: "150px",
                objectFit: "cover",
              }}
              onClick={() => document?.getElementById('imageInput').click()} />
          ) : (
            <RHFUploadSingleFileWithPreview
              name="image"
              accept={{ "image/*": [] }}
              type="image"
              sx={styles.contactWrapper}
              isUploadIcon
            />
          )}
          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>
        <Box>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", width: "100%" }}>
            GET STARTED
          </Button>
        </Box>
      </Stack>
    </FormProvider >
  );
};

export default ContactInfo;

const styles = {
  contactWrapper: {
    mt: "10px",
    "& > div": {
      border: "1px dashed #B0B0B0",
      borderRadius: "100px",
      width: "100px",
      height: "40px",
      padding: "40px 8px",
      "& span": {
        display: "none",
        margin: 0,
        padding: 0,
      },
    },
  },
};
