"use client";
import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import BlockIcon from "../assets/icons/user-login.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import CloseIcon from "../assets/icons/close-icon.svg";
import { collection, getDocs, query, where, onSnapshot, doc, setDoc, getDoc, getFirestore, addDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';
import toast from "react-hot-toast";
import { BASE_URL } from "../../config";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const BlockModal = ({ open, onClose, userId, blockedId }: { open: boolean; onClose: () => void; userId: string, blockedId: string }) => {
    const router = useRouter();
    const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
    const blockUser = async () => {
        // update is_blocked field in chat_room collection
        const chatRoomRef = doc(firestoreDb, 'chat_room', `${userId}_${blockedId}`);
        const chatRoomSnap = await getDoc(chatRoomRef);
        if (chatRoomSnap.exists()) {
            // Update is_blocked field if the document exists
            await updateDoc(chatRoomRef, {
                is_blocked: true
            });
        } else {
            console.log("Chat room does not exist for userId_blockedId");
        }

        // Check if the chat room document exists for blockedId_userId
        const chatRoomRef2 = doc(firestoreDb, 'chat_room', `${blockedId}_${userId}`);
        const chatRoomSnap2 = await getDoc(chatRoomRef2);
        if (chatRoomSnap2.exists()) {
            // Update is_blocked field if the document exists
            await updateDoc(chatRoomRef2, {
                is_blocked: true
            });
        } else {
            console.log("Chat room does not exist for blockedId_userId");
        }

        // set in mysql as well
        fetch(`${BASE_URL}/block-user/${blockedId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authUserToken} `,
            },
        }).then((res) => res.json()).then((data) => {
            console.log("data", data);
        }
        ).catch((err) => {
            console.log("err", err);
        });

        toast.success("User blocked successfully");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle textAlign="right" onClick={onClose}>
                <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} />
            </DialogTitle>
            <Box sx={{ textAlign: "center" }}>
                <Image src={BlockIcon} alt="" />
                <Typography variant="subtitle2" color="info.main" pt="18px" fontWeight={700}>
                    Block User ?
                </Typography>
                <Stack spacing={1} direction="column" pt="2px" pl={2} pr={2}>
                    <Typography variant="caption" color="info.main" pt="8px">
                        You are going to block this user! Here is what will happen:
                    </Typography>
                    <Typography variant="caption" style={{ textAlign: "left" }} pt="8px">
                        - They will not be able to message you
                    </Typography>
                    <Typography variant="caption" style={{ textAlign: "left" }} pt="8px">
                        - They will not be able to find your profile
                    </Typography>
                    <Typography variant="caption" style={{ textAlign: "left" }} pt="8px">
                        - They will not be able to see you in search results
                    </Typography>
                    <Typography variant="caption" style={{ textAlign: "left" }} pt="8px">
                        - They will not be notified that you have blocked them
                    </Typography>
                </Stack>
                {/* centered cancel and block buttons in a row */}
                <Stack spacing={1} direction="row" pt="18px" pl={12} pr={2} pb={4}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={blockUser}>
                        Block
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    );
};

export default BlockModal;
