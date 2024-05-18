"use client";
import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography, Grid, Alert } from "@mui/material";
import BlockIcon from "../assets/icons/user-login.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "../assets/icons/close-icon.svg";
import { collection, getDocs, query, where, onSnapshot, doc, setDoc, getFirestore, addDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "@/components/rhf";
import * as Yup from "yup";
import { reportUSerFormData } from './about.data'

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const ReportModal = ({ open, onClose }: { open: boolean; onClose: () => void; userId: string, blockedId: string }) => {
    const router = useRouter();


    const blockUser = () => {
        toast.success("User blocked successfully");
        onClose();
    };

    const methods = useForm<any>({
        resolver: yupResolver(
            Yup.object({
                name: Yup.string().required("Required Fields!"),
                country: Yup.string().required("Required Fields!"),
                state: Yup.string().required("Required Fields!"),
            })
        ),
        defaultValues: {
            image: "",
            listimages: "",
            name: ""
        },
    });

    const onSubmit = async (data: any) => {
    }

    const { handleSubmit } = methods;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
        >
            <Box
                style={{
                    padding: "0px 20px 30px 20px",
                }}
            >
                <DialogTitle textAlign="right" onClick={onClose}>
                    <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
                </DialogTitle>
                <Box sx={{ textAlign: "center" }}>
                    <Image src={BlockIcon} alt="" />
                    <Typography variant="subtitle2" color="info.main" pt="18px" fontWeight={700}>
                        Report User
                    </Typography>
                    Why do you want to report this user?
                </Box>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "60px" } }}>
                        {reportUSerFormData?.map((form: any, index: number) => {
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
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ backgroundColor: "#FF414D !important", mt: "30px" }}
                        onClick={onClose}
                    >
                        Save Changes
                    </Button>
                </FormProvider>
            </Box>
        </Dialog>
    );
};

export default ReportModal;
