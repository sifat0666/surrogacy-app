"use client";
import React from "react";
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import LogoImg from "../../../assets/images/logo.svg";
import surrogate_logo from "../../../assets/images/surrogate_logo.png";
import Image from "next/image";
import { FormProvider, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { styles } from "./register.styles";
import { CompanyLogo } from "./register.data";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";

import { useCheckEmailMutation } from "@/services/auth-api";
import toast from "react-hot-toast";

const Register = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mutation] = useCheckEmailMutation();
  const navigate = useRouter();
  const dispatch = useDispatch();
  const method = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required("Email is required").email("Please enter valid email"),
      })
    ),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = method;

  const onSubmit = async (values: { email: string }) => {
    const response = await mutation(values).unwrap();
    console.log("response", response);
    if (response?.exists) {
      toast.error("Email already exists");
      return;
    }
    navigate.push("/register/create-password");
    await dispatch(setUserField({ email: values?.email }));
  };

  return (
    <Box>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={6} sx={{ ...styles.authWrap, paddingX: { xs: '20px' } }}>
          <Box>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => navigate.push("/")}
            >
              {/* <Image src={LogoImg} alt="" /> */}
              <Image
                style={{
                  cursor: "pointer",
                  marginTop: isMobile ? "0px" : "10px",
                  width: isMobile ? "180px" : "186px",
                  height: isMobile ? "43px" : "36px",
                  objectFit: "contain",
                }}
                src={surrogate_logo}
                alt="Find Surrogate Logo"
              />
            </Typography>
            <Box sx={{ pt: { xs: '10px', sm: '60px' } }}>
              <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
                Create your free account
              </Typography>
              {/* <Typography variant="body2" color="info.main" pt="5px">
                Join us to Find Surrogate, parents and agencies of your choice.{" "}
              </Typography> */}
              <Box sx={{ pt: "40px" }}>
                <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} direction="column">
                    <RHFTextField type="email" fullWidth name="email" placeholder="Enter email address" />
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
                    <Typography variant="subtitle1" component="span" textAlign="center" color="secondary.main">
                      {`Already have an account ? `}
                      <Link href="/login" style={{ color: "#FF414D", fontWeight: 600 }}>
                        Login
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

export default Register;
