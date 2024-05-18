"use client";
import React, { useState } from "react";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { FormProvider } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { securitySettingFormData } from "./security-setting.data";
import DeleteIcon from "../../../assets/icons/delete-icon.svg";
import Image from "next/image";
import { useChangePasswordMutation, useDeleteMutation } from "@/services/auth-api";
import toast from "react-hot-toast";
import DeleteAccountModal from "./delete-account-modal/delete-account-modal";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '@/slices/auth/reducer';
import { clearSessionStorage } from "@/utils/session-storage";


const SecuritySetting = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");


  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [mutation] = useChangePasswordMutation();
  const [deleteMutation] = useDeleteMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const dispatch = useDispatch();
  const { setUser, setUserAnyItem } = authActions;



  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
        currentPassword: Yup.string().required("Required Fields!"),
        newPassword: Yup.string().required("Required Fields!"),
        confirmPassword: Yup.string().oneOf([Yup.ref("newPassword")], "Passwords must match"),
      })
    ),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      mutation({
        current_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      }).then((res: any) => {
        setLoading(false);
        if (res?.data?.status === "validation_error") {
          toast.error(res?.data?.messages[0]);
        }
        else {
          toast.success(res?.data?.message);
        }
      });
    } catch (error: any) {
      setLoading(false);
      toast.error("An error occurred");
      return toast.error("An error occurred");
    }
  };

  const { handleSubmit } = methods;

  const handleDeleteAccount = () => {
    setLoading(true);
    try {
      deleteMutation({}).then((res: any) => {
        toast.success(res?.data?.message);
        setIsDeleteModal(!isDeleteModal);
        dispatch(setUser({}));
        dispatch(setUserAnyItem({}));
        clearSessionStorage();
        localStorage.clear();
        router.push("/login");
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      return toast.error("An error occurred");
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModal(!isDeleteModal);
  }

  return (
    <>
      <Box sx={{ py: { xs: "24px", sm: "60px" } }}>
        <Typography sx={styles.heading} classes={{ root: "font-grotesk" }}>
          Security
        </Typography>
        {loading && <Spinner />}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container xs={12} spacing={3} sx={{ pt: { xs: "24px", sm: "60px" }, maxWidth: { xs: "100%", sm: "50%" } }}>
            {securitySettingFormData?.map((form: any) => {
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
            SAVE CHANGES
          </Button>
        </FormProvider>
        <Box sx={{ borderTop: "1px solid #EAEAEA", mt: { xs: "24px", md: "40px" } }}>
          <Typography variant="subtitle2" sx={styles.deleteAccount}>
            Delete my Account
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: "#FF3636 !important", mt: "24px" }} onClick={() => setIsDeleteModal(!isDeleteModal)}>
            <Image src={DeleteIcon} alt="" />
            &nbsp; DELETE ACCOUNT
          </Button>
        </Box>
      </Box>
      <DeleteAccountModal
        onClose={handleCloseDeleteModal}
        isDeleteModal={isDeleteModal}
        handleDeleteAccount={handleDeleteAccount}
        isLoading={loading}
      />
    </>
  );
};

export default SecuritySetting;

const styles = {
  heading: {
    color: "info.main",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
  },
  deleteAccount: {
    color: "info.main",
    fontWeight: 700,
    pt: { xs: "24px", md: "40px" },
  },
};
