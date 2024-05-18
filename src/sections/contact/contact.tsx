"use client";
import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ContactFormData } from "./contact.data";
import { FormProvider, RHFCheckbox } from "@/components/rhf";
import { usePostContactMutation } from "@/services/contact/contact-api";
import toast from "react-hot-toast";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ContactInterface {
  firstName: string;
  lastName: string;
  email: string;
  chooseTopic: string;
  message: string;
  acceptTerms?: boolean;
}

const Contact = () => {
  const [mutation] = usePostContactMutation();

  const socialMediaData = [
    {
      icon: <EmailIcon style={{ color: "#FF414D" }} />,
      title: "hello@findsurrogate.com"
    },
    {
      icon: <LocationOnIcon style={{ color: "#FF414D" }} />,
      title: "611 North Brand Boulevard Glendale, CA 91203"
    },
  ];

  const methods = useForm<ContactInterface>({
    resolver: yupResolver(
      Yup.object().shape({
        firstName: Yup.string().required("Required Field!"),
        lastName: Yup.string().required("Required Field!"),
        email: Yup.string().required("Required Field!").email("Please enter valid email"),
        message: Yup.string().required("Required Field!"),
        acceptTerms: Yup.boolean()
          .oneOf([true], "You must accept the terms and conditions"),
      })
    ),
    defaultValues: { firstName: "", lastName: "", email: "", chooseTopic: "", message: "", acceptTerms: false },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: ContactInterface) => {
    console.log(values);
    try {
      await mutation({
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        topic: values?.chooseTopic,
        message: values?.message,
        acceptTerms: values?.acceptTerms,
      }).unwrap();
      toast.success("Successfully submitted");
    } catch (error: any) {
      toast.error("An error occurred while submitting");
    }
  };

  return (
    <Box sx={{ mt: { xs: "44px", sm: "60px" }, mb: { xs: "20px", md: "60px" } }}>
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" color="info.main">
              Get in touch
            </Typography>
            <Typography variant="body1" color="info.main" pt="24px">
              Our team would love to hear from you.
            </Typography>
            <Box mt="30px">
              {socialMediaData.map((item, index) => (
                <Box sx={styles.social} key={index}>
                  <Typography
                    variant="subtitle1"
                    color="info.main"
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    {item?.icon}
                    {item?.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={"24px"}>
                {ContactFormData?.map((form: any) => {
                  return (
                    <Box>
                      <Typography variant="body1" color="info.main" pb="8px" fontWeight={500} textAlign="left">
                        {form?.otherOptions?.heading}
                      </Typography>
                      <form.component size="small" {...form.otherOptions} />
                    </Box>
                  );
                })}
                <RHFCheckbox name="acceptTerms" label="I accept the Terms" />
              </Stack>
              <Button variant="contained" type="submit" sx={styles.button}>
                SEND MESSAGE
              </Button>
            </FormProvider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;

const styles = {
  social: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    pt: "10px",
  },
  button: {
    backgroundColor: "#FF414D !important",
    mt: "24px",
    width: { xs: '100%', md: 'inherit' }
  }
};
