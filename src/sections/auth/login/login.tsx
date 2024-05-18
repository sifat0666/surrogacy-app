"use client";
import React from "react";
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import LogoImg from "../../../assets/images/logo.svg";
import Image from "next/image";
import { FormProvider, RHFCheckbox, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { styles } from "./login.styles";
import { CompanyLogo } from "./login.data";
import { useLoginMutation } from "@/services/auth-api";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
// import { GoogleLogin } from 'react-google-login';
import { authActions } from '@/slices/auth/reducer';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';
import ProfileImage from "../../../assets/images/auth/auth-bg.svg";
import surrogate_logo from "../../../assets/images/surrogate_logo.png";




const Login = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loginMutation] = useLoginMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const dispatch = useDispatch();
  const { setUser } = authActions;

  const method = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required("Email is required").email("Please enter valid email"),
        password: Yup.string().required("Password is required").min(2).max(25),
      })
    ),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit } = method;

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const { message, status, user, access_token } = await loginMutation({ email: values.email, password: values.password }).unwrap();

      if (status === 'success') {
        // Dispatch action to update user state in Redux
        dispatch(setUser(user));
        toast.success(message || "Sign in successfully!");
        router.push(returnTo || "/dashboard");
      } else if (status === 'error') {
        toast.error(message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong!");
    }
  };

  const responseGoogleSuccess = (response: any) => {
    // Handle successful Google login response
  };

  const responseGoogleFailure = (response: any) => {
    console.error('Google Login Error:', response);
    // Handle failed Google login response
  };

  const responseFacebook = (response: any) => {
    // Handle Facebook login response
  };

  return (
    <Box>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} md={6} sx={{ ...styles.authWrap, paddingX: { xs: '20px' } }}>
          <Box>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
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
                Login to your account
              </Typography>
              {/* <Typography variant="body2" color="info.main" pt="5px">
                Join us to Find Surrogate, parents and agencies of your choice.{" "}
              </Typography> */}
              <Stack spacing={1.2} sx={styles.auth}>
                {/* <GoogleLogin
                  clientId="736943658392-63mit2phkk0c8p4lsmk07kmhkel61t65.apps.googleusercontent.com"
                  buttonText="Continue with Google"
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                  className="login-button"
                /> */}
                {/* <FacebookLogin
                  appId="254615450574865"
                  autoLoad={false}
                  callback={responseFacebook}
                  icon={<FacebookIcon />}
                  fields="name,email"
                  textButton={<Typography component='span' variant="caption" fontWeight={500} color="info.main">Continue with Facebook</Typography>}
                  cssClass="login-button"
                /> */}
              </Stack>
              <Box sx={{ pt: "40px" }}>
                <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} direction="column">
                    <RHFTextField
                      type="email"
                      fullWidth
                      name="email"
                      placeholder="Enter email address"
                    //   StartIcon={<FormEmailIcon sx={{ color: "neutral.500", mr: 1 }} />}
                    />
                    <RHFTextField
                      type="password"
                      fullWidth
                      name="password"
                      placeholder="Enter password"
                    //   StartIcon={<PasswordIcon sx={{ color: "neutral.500", mr: 1 }} />}
                    />
                    {/* <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <RHFCheckbox name="loggedIn" label="Remember me" />
                      <Typography variant="body2" component="span" textAlign="center">
                      </Typography>
                    </Box> */}
                    <Button variant="contained" type="submit" sx={{ background: "#FF414D !important" }}>
                      Login
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
                      {`Don't have an account ? `}
                      <Link href="/register" style={{ color: "#FF414D", fontWeight: 600 }}>
                        Register
                      </Link>
                    </Typography>
                    <Box>
                    </Box>
                  </Stack>
                </FormProvider>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={6}>
          <Box sx={styles.authBgImg} />
          {/* <Image src={ProfileImage} alt='icon' objectFit='contain' objectPosition='' /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
