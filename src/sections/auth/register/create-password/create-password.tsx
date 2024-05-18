"use client";
import React from "react";
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import LogoImg from "../../../../assets/images/logo.svg";
import surrogate_logo from "../../../../assets/images/surrogate_logo.png";
import { FormProvider, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { styles } from "../register.styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";
import Link from "next/link";

const CreatePassword = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");


  const navigate = useRouter();
  const dispatch = useDispatch();
  const method = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().required("Password is required"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
      })
    ),
    defaultValues: { email: "", passwordConfirmation: "" },
  });

  const { handleSubmit } = method;

  const onSubmit = async (values: { password: string; passwordConfirmation: string }) => {
    navigate.push('/register/role');
    await dispatch(setUserField({ password: values?.password, password_confirmation: values.passwordConfirmation }));
  };

  return (
    <Box>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={6} sx={{ ...styles.authWrap, paddingX: { xs: '20px' } }}>
          <Box>
            <Image
              style={{
                cursor: "pointer",
                marginTop: isMobile ? "0px" : "10px",
                width: isMobile ? "180px" : "186px",
                height: isMobile ? "40px" : "33px",
                objectFit: "contain",
              }}
              src={surrogate_logo}
              alt="Find Surrogate Logo"
            />
            <Box sx={{ pt: { xs: '10px', sm: '60px' } }}>
              <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
                Create your free account
              </Typography>
              <Typography variant="body2" color="info.main" pt="5px">
                Create your password
              </Typography>
              <Box sx={{ pt: "40px" }}>
                <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} direction="column">
                    <RHFTextField type="password" fullWidth name="password" placeholder="Enter a new password" />
                    <RHFTextField type="password" fullWidth name="passwordConfirmation" placeholder="Enter a confirm password" />
                    <Button variant="contained" type="submit" sx={{ background: "#FF414D !important" }}>
                      CONTINUE
                    </Button>
                    <Typography variant="subtitle1" sx={styles.termsTitle}>
                      By continuing you agree to our
                      <Link href="/terms-of-use" style={{ color: "#FF414D", fontWeight: 600, paddingInline: "4px" }}>
                        Terms of Service
                      </Link>
                      and
                      <Link href="/privacy-policies" style={{ color: "#FF414D", fontWeight: 600, paddingInline: "4px" }}>
                        Privacy policy
                      </Link>
                    </Typography>
                  </Stack>
                </FormProvider>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={6}>
          <Box sx={styles.authBgImg}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePassword;
