"use client";
import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import UserLoginIcon from "../../../../assets/icons/user-login.svg";
import Image from "next/image";
import { FormProvider, RHFCheckbox, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { styles } from "../login.styles";
import { useLoginMutation } from "@/services/auth-api";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import CloseIcon from "../../../../assets/icons/close-icon.svg";

const LoginModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [loginMutation] = useLoginMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

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
      const { message } = await loginMutation({ email: values.email, password: values.password }).unwrap();
      toast.success(message || "Sign in successfully!");
      // router.push(returnTo || "/dashboard");
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong!");
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="right" onClick={onClose}>
        <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
      </DialogTitle>
      <Box sx={{ textAlign: "center" }}>
        <Image src={UserLoginIcon} alt="" />
        <Typography variant="subtitle2" color="info.main" pt="18px" fontWeight={700}>
          Member-Only Access
        </Typography>
        <Typography variant="caption" color="info.main" pt="8px">
          Log in to enjoy exclusive features
        </Typography>
        <Box sx={{ p: "40px" }}>
          <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} direction="column">
              <RHFTextField type="email" fullWidth name="email" placeholder="Enter email address" />
              <RHFTextField type="password" fullWidth name="password" placeholder="Enter password" />
              <Button variant="contained" type="submit">
                Login
              </Button>
              <Typography variant="subtitle1" component="span" textAlign="center" color="secondary.main">
                {`Don't have an account ? `}
                <Link href="/register" style={{ color: "#FF414D", fontWeight: 600 }}>
                  Register
                </Link>
              </Typography>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
