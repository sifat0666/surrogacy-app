'use client'
import React, { use, useState, useEffect } from "react";
import { Box, Button, Card, Container, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import CustomTab from "@/components/custom-tab/custom-tab";
import About from "./about/about";
import AgencySurrogates from "./agency-surrogates/agency-surrogates";
import ProfileImg from "../../assets/images/profile-img.svg";
import LocationIcon from "../../assets/icons/location-icon.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDetailsQuery } from "@/services/users/users-api";
import LoginModal from "../auth/login/login-modal/login-modal";
import { getSessionStorage } from "@/utils/session-storage";
import { usePostChatMutation } from "@/services/chat/chat-api";
import toast from "react-hot-toast";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import SmileIcons from "../../assets/icons/seamless-experience-icon.svg";
import Face1 from "../../assets/icons/emojis/face-1.svg";
import Face2 from "../../assets/icons/emojis/face-2.svg";
import Face3 from "../../assets/icons/emojis/face-3.svg";
import Face4 from "../../assets/icons/emojis/face-4.svg";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { collection, getDocs, query, where, onSnapshot, doc, setDoc, getFirestore, addDoc } from 'firebase/firestore';
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';
import { PremiumModal, VerifyModal } from "@/components/premium-modal/premium-modal";
import Popover from '@mui/material/Popover';

import { useFavoritesToggleAddRemoveMutation, useFavoritesDetailsQuery, useMyFavoritesQuery } from "@/services/favorites/favorites-api";
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from "../../../config";
import BlockModal from "@/components/block-modal";
import ReportModal from "@/components/report-modal";

import {
    getStateNameByCode,
    getCountryNameByCode
} from "@/utils/utilitiy-functions";


const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);


const UserProfile = () => {
    const [removeFavorites, { isError, isSuccess }]: any = useFavoritesToggleAddRemoveMutation();
    const searchParam = useSearchParams().get('id');
    const { data }: any = useDetailsQuery({ id: searchParam });
    const [isLoginModal, setIsLoginModal] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
    const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isWinkOpen, setIsWinkOpen] = useState(false);

    const [favData, setFavData] = useState<any>(null);
    const [favCalled, setFavCalled] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
    const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [decodedGallery, setDecodedGallery] = useState([]);


    const [socialData, setSocialData] = useState<any>({
        favorite: false,
        wink: false,
        follow: false,
        block: false,
    });
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const handleFavorite = () => {
        if (isAuthenticated) {
            removeFavorites(data?.data?.id)
                .then((res: any) => {
                    setFavCalled(!favCalled);
                    toast.success(res?.data?.message);
                })
                .catch((error: any) => {
                });
        } else {
            setIsLoginModal(true);
        }
    };

    const canReplyToRole = (user: any, selectedItem: any) => {
        if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Intended Parent' && selectedItem.agency != null) {
            return true;
        }

        if (user.user_type == 'Surrogate' && user.email_verified_at != null) {
            if (selectedItem?.user_type == 'Intended Parent') {
                setIsVerifyEnvelopModal(true);
                return false;
            }
        }
        if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Surrogate') {
            toast.error("You cannot chat another surrogate.");
            return false;
        }
        if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Intended Parent') {
            setIsVerifyEnvelopModal(true);
            return false;
        }

        // agency validations
        if (user.user_type == 'Agency' && user.stripe_data.active == false) {
            if (user.user_type == 'Agency' && selectedItem?.user_type == 'Surrogate') {
                setIsPremiumEnvelopModal(true);
                return false;
            }
            if (user.user_type == 'Agency' && selectedItem?.user_type == 'Intended Parent') {
                setIsPremiumEnvelopModal(true);
                return false;
            }
        }
        if (user.user_type == 'Agency' && selectedItem?.user_type == 'Agency') {
            toast.error("You cannot chat another agency.");
            return false;
        }


        // parents
        if (user.user_type == 'Intended Parent' && user.stripe_data.active == false) {
            if (user.user_type == 'Intended Parent' && selectedItem?.user_type == 'Surrogate' && selectedItem?.agency == null) {
                setIsPremiumEnvelopModal(true);
                return false;
            }
        }
        if (user.user_type == 'Intended Parent' && selectedItem?.user_type == 'Intended Parent') {
            toast.error("You cannot chat another parent.");
            return false;
        }

        // console.log("user", user);
        // console.log("selectedItem", selectedItem);
        return true;
    };

    const reportUser = async () => {
        if (isAuthenticated) {
            setIsReportModalOpen(!isReportModalOpen);
        } else {
            setIsLoginModal(true);
        }
    }

    useEffect(() => {
        if (data?.data?.id) {
            setSocialData({
                favorite: data?.data?.is_favorite,
            });
        }
    }, [data]);

    const handleChatLogin = async () => {
        if (!isAuthenticated) {
            setIsLoginModal(!isLoginModal);
        } else {
            let canReply = canReplyToRole(user, data?.data);
            if (!canReply) {
                return;
            }
            if (user.user_type == "Intended Parent") {
                let friend_id = data?.data?.id;
                if (data?.data?.agency) {
                    friend_id = data?.data?.agency?.id;
                }
                // check if already friend
                const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", friend_id)); const querySnapshot = await getDocs(q);
                if (querySnapshot.size == 0) {
                    let user_id = user?.id;
                    let friend_id = data?.data?.id;
                    let friend_name = data?.data?.name;
                    if (data?.data?.agency) {
                        friend_id = data?.data?.agency?.id;
                        friend_name = data?.data?.agency?.name;
                    }

                    if (data?.data?.user_type == "Agency") {
                        // save friend to chat_room collection
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: "",
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,

                            is_deleted: false,
                        });
                    } else {
                        // save friend to chat_room collection
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: data?.data?.agency,
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,
                            is_deleted: false,
                        });
                    }




                    // save friend to chat_room collection
                    const chatRoomRef2 = doc(firestoreDb, 'chat_room', `${friend_id}_${user_id}`);
                    await setDoc(chatRoomRef2, {
                        user_id: friend_id,
                        friend_id: user_id,
                        friend_name: user?.name,
                        friend_type: user.user_type,
                        agency_id: user.agency_id,
                        created_at: Date.now(),
                        is_blocked: false,
                        prevMessage: "",
                        image: user?.images,
                        is_deleted: false,
                    });
                }

            } else if (user.user_type == "Surrogate") {
                let friend_id = data?.data?.id;
                if (data?.data?.agency) {
                    friend_id = data?.data?.agency?.id;
                }
                // check if already friend
                const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", friend_id)); const querySnapshot = await getDocs(q);
                if (querySnapshot.size == 0) {
                    let user_id = user?.id;
                    let friend_id = data?.data?.id;
                    let friend_name = data?.data?.name;
                    if (data?.data?.agency) {
                        friend_id = data?.data?.agency?.id;
                        friend_name = data?.data?.agency?.name;
                    }

                    if (data?.data?.user_type == "Agency") {
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: "",
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,
                            is_deleted: false,
                        });
                    } else {
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: data?.data?.agency,
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,
                            is_deleted: false,
                        });
                    }

                    // save friend to chat_room collection
                    const chatRoomRef2 = doc(firestoreDb, 'chat_room', `${friend_id}_${user_id}`);
                    await setDoc(chatRoomRef2, {
                        user_id: friend_id,
                        friend_id: user_id,
                        friend_name: user?.name,
                        friend_type: user.user_type,
                        agency_id: user.agency_id,
                        created_at: Date.now(),
                        is_blocked: false,
                        prevMessage: "",
                        image: user?.images,
                        is_deleted: false,
                    });
                }
            } else if (user.user_type == "Agency") {
                const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", data?.data?.id));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.size == 0) {
                    const user_id = user?.id;
                    const friend_id = data?.data?.id;
                    const friend_name = data?.data?.name;

                    // save friend to chat_room collection
                    if (data?.data?.user_type == "Agency") {
                        // save friend to chat_room collection
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: "",
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,
                            is_deleted: false,
                        });
                    } else {
                        console.log("data.1-->", data?.data);
                        const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
                        await setDoc(chatRoomRef, {
                            user_id: user_id,
                            friend_id: friend_id,
                            friend_name: friend_name,
                            friend_type: data?.data?.user_type,
                            agency_id: data?.data?.agency,
                            created_at: Date.now(),
                            is_blocked: false,
                            prevMessage: "",
                            image: data?.data?.images,
                            is_deleted: false,
                        });
                    }

                    console.log("data.2-->", data?.data);
                    // save friend to chat_room collection
                    const chatRoomRef2 = doc(firestoreDb, 'chat_room', `${friend_id}_${user_id}`);
                    await setDoc(chatRoomRef2, {
                        user_id: friend_id,
                        friend_id: user_id,
                        friend_name: user?.name,
                        friend_type: user.user_type,
                        agency_id: user.agency_id,
                        created_at: new Date(),
                        is_blocked: false,
                        prevMessage: "",
                        image: user?.images,
                        is_deleted: false,
                    });
                }
            }
            try {
                console.log("navigating to chat");
                // const response: any = await postChat({ id: data?.data?.id }).unwrap();
                router.push(`/messages?id=${data?.data?.id}`);
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }



    const handlePremiumEnvelop = () => {
        if (isAuthenticated) {
            setIsPremiumEnvelopModal(!isPremiumEnvelopModal);
        } else {
            setIsLoginModal(true);
        }
    };

    const handleTagFacesClick = (event: any) => {
        setIsWinkOpen(!isWinkOpen);
    };

    const handleClosePopover = () => {
        setIsWinkOpen(false);
    };


    const sendNotification = async (data: any) => {
        const url = `${BASE_URL}/create-notification`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authUserToken}`
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
    };

    const handleImageClick = async (message: any) => {
        let canReply = canReplyToRole(user, data?.data);
        if (!canReply) {
            return;
        }

        const recipientId = data?.data?.id;

        try {
            const user = getSessionStorage("user");
            if (!user?.id || !recipientId) {
                console.error("Sender or receiver ID missing.");
                return;
            }

            const messageData = {
                sender_id: user.id,
                receiver_id: recipientId,
                message: message,
                created_at: Date.now(),
                seen: false,
            };
            // create hash of the two user ids
            const messagesCollection = collection(firestoreDb, 'chats');
            const docRef = await addDoc(messagesCollection, messageData);
            setDoc(doc(messagesCollection, docRef.id), messageData);

            // Send notification
            const notificationData = {
                user_id: recipientId,
                target_user_id: user.id,
                title: "Just sent you a wink",
                description: "Click here to view",
                created_at: Date.now(),
                is_seen: false,
            };
            sendNotification(notificationData);
            setIsWinkOpen(false);
        } catch (error) {
            console.error('Error sending message:', error);
            alert("Failed to send message. Please try again.");
        }
    };

    useEffect(() => {
        //call favourit api to fetch hit home api
        const fetchData = async () => {
            if (authUserToken) {

                const response = await fetch(`${BASE_URL}/user-home`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application",
                        "Authorization": `Bearer ${authUserToken}`,
                    }

                });
                const data_ = await response.json();

                const user_type = data?.data?.user_type;

                if (user_type === "Intended Parent") {
                    const intended_parents = data_?.intended_parents;
                    const intended_parent = intended_parents.find((item: any) => item?.id === data?.data?.id);
                    setSocialData({
                        favorite: intended_parent?.is_favorite,
                    });
                }
                else if (user_type === "Surrogate") {
                    const surrogates = data_?.surrogates;
                    const surrogate = surrogates.find((item: any) => item?.id === data?.data?.id);
                    setSocialData({
                        favorite: surrogate?.is_favorite,
                    });
                }
                else if (user_type === "Agency") {
                    const agencies = data_?.agencies;
                    const agency = agencies.find((item: any) => item?.id === data?.data?.id);
                    setSocialData({
                        favorite: agency?.is_favorite,
                    });
                }
            }
            else {
                const response = await fetch(`${BASE_URL}/home`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application",
                    }
                });
                const data = await response.json();

                setFavData(data);

            }
        };
        fetchData();
    }, [favCalled]);


    const gotoAgencyProfile = () => {
        router.push(`/user-profile?id=${data?.data?.agency?.id}`);
    }

    let tabs;

    if (data?.data?.user_type == "Agency") {
        tabs = [
            { label: "About", content: <About data={data?.data} /> },
            { label: "Agency's Surrogates", content: <AgencySurrogates agency_surrogates={data?.data?.surrogates} /> },
            { label: "Agency's Parents", content: <AgencySurrogates agency_surrogates={data?.data?.intendedParents} /> },
        ];
    } else {
        tabs = [
            { label: "About", content: <About data={data?.data} /> },
            // { label: "", content: null /> },
        ];
    }

    const contactInfo = [
        { label: "Email Address", value: `${data?.data?.contact_email ?? '-'}` },
        { label: "Phone Number", value: `${data?.data?.phone_number ?? '-'}` },
        { label: "Website", value: `${data?.data?.website ?? '-'}` },
    ];
    const isContactInfoPresent = contactInfo.some(item => item?.value !== '-');

    const gallery = data?.data?.gallery;
    useEffect(() => {
        if (gallery) {
            // Parse the JSON string and update the state
            setDecodedGallery(JSON.parse(gallery));
        }
    }, [gallery]);

    return (
        <Box sx={{ mt: { xs: "22px", md: "60px" } }}>
            <Container maxWidth="xl">
                <PremiumModal
                    open={isPremiumEnvelopModal}
                    onClose={handlePremiumEnvelop}
                    handleOnClickModal={() => router.push('/membership')}
                />
                <VerifyModal
                    open={isVerifyEnvelopModal}
                    onClose={() => setIsVerifyEnvelopModal(false)}
                />
                <Grid container spacing={3}>
                    {!isMobile && (
                        <Grid item xs={12} md={8}>
                            <CustomTab tabs={tabs} />
                        </Grid>
                    )}
                    <Grid item xs={12} md={4}>
                        <Stack spacing="24px">
                            {/* profile */}
                            <Card sx={{ p: "22px", textAlign: "center" }}>
                                <Image
                                    src={data?.data?.images ? data?.data?.images : ProfileImg}
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                    width={150}
                                    height={150}
                                    alt=""
                                />
                                <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }} pt="24px">
                                    {data?.data?.name?.split(" ")[0]}
                                </Typography>
                                <Box sx={styles.userProfile}>
                                    <Image src={LocationIcon} alt="" />
                                    <Typography variant="caption" color="info.main">
                                        {`${getStateNameByCode(data?.data?.state)}, ${getCountryNameByCode(data?.data?.country)}`}
                                    </Typography>
                                </Box>
                                <Stack spacing={1} mt="32px" mb="15px" alignItems="center">
                                    <Button variant="contained" sx={{ width: isMobile ? "70%" : "53%", backgroundColor: "#FF414D !important" }} onClick={handleChatLogin}>
                                        <Typography variant="button" color="white" classes={{ root: "font-grotesk" }}>
                                            Message
                                        </Typography>
                                    </Button>
                                    {data?.data?.is_agency_supported && (
                                        <Button variant="contained" sx={{ width: isMobile ? "70%" : "53%", backgroundColor: "white !important", color: "#FF414D !important", border: "1px solid #FF414D" }}
                                            onClick={gotoAgencyProfile}>
                                            <Typography
                                                variant="button"
                                                color="#FF414D"
                                                classes={{
                                                    root: "font-grotesk"
                                                }}>
                                                VIEW AGENCY PROFILE
                                            </Typography>
                                        </Button>
                                    )}
                                </Stack>
                                <Stack sx={{ margin: "8px auto" }} alignItems="center">
                                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "12px", swidth: "80%" }}>
                                        {socialData.favorite ?
                                            <FavoriteIcon
                                                onClick={handleFavorite}
                                                sx={{ color: "#FF414D", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.8rem", cursor: "pointer", border: "1px solid #FF414D" }}
                                            />
                                            :
                                            <FavoriteBorderIcon
                                                onClick={handleFavorite}
                                                sx={{ color: "#FF414D", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.8rem", cursor: "pointer", border: "1px solid #FF414D" }}
                                            />
                                        }
                                        <TagFacesIcon
                                            id="tag-faces"
                                            onClick={handleTagFacesClick}
                                            sx={{ color: "#FF414D", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.8rem", cursor: "pointer", border: "1px solid #FF414D" }} />
                                        <PersonAddIcon
                                            onClick={reportUser}
                                            sx={{ color: "#FF414D", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.8rem", cursor: "pointer", border: "1px solid #FF414D" }} />
                                        <BlockIcon
                                            onClick={() => setIsBlockModalOpen(!isBlockModalOpen)}
                                            sx={{ color: "#FF414D", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.8rem", cursor: "pointer", border: "1px solid #FF414D" }} />
                                        <Popover
                                            open={isWinkOpen}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            style={{ marginTop: "80vh", position: "absolute" }}
                                        >
                                            <Image width={40} style={{ margin: "0 4px" }} src={Face1} onClick={() => handleImageClick("face1")} alt="" />
                                            <Image width={40} style={{ margin: "0 4px" }} src={Face2} onClick={() => handleImageClick("face2")} alt="" />
                                            <Image width={40} style={{ margin: "0 4px" }} src={Face3} onClick={() => handleImageClick("face3")} alt="" />
                                            <Image width={40} style={{ margin: "0 4px" }} src={Face4} onClick={() => handleImageClick("face4")} alt="" />
                                        </Popover>
                                    </Box>
                                </Stack>
                            </Card>

                            {isContactInfoPresent && (
                                <Card sx={{ px: "28px", py: "30px" }}>
                                    <Typography variant="h5" color="secondary.main">
                                        Contact Info
                                    </Typography>
                                    {contactInfo.map((item, index) => (
                                        <Box pt="20px" key={index}>
                                            <Typography variant="subtitle1" color="info.main">
                                                {item?.label}
                                            </Typography>
                                            <Typography variant="body1" color="info.main">
                                                {item?.value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Card>
                            )}
                            {decodedGallery?.length > 0 && (
                                <Card sx={{ px: "28px", py: "30px" }}>
                                    <Typography variant="h5" color="secondary.main">
                                        Gallery
                                    </Typography>
                                    <Grid container spacing={0} >
                                        {decodedGallery?.map((item: any, index: number) => (
                                            <Grid
                                                item

                                                xs={index === 0 ? 12 : 6}
                                                lg={index === 0 ? 12 : 6}
                                                md={index === 0 ? 12 : 6}
                                                key={index}
                                                sx={{ width: '100%', height: '100%' }}
                                            >
                                                <Image
                                                    src={item}
                                                    width={isMobile ? (index === 0 ? 310 : 140) : (index === 0 ? 380 : 190)}
                                                    height={190}
                                                    style={{ borderRadius: "7px", objectFit: "cover", margin: "0 20px" }}
                                                    alt={`Image ${index}`}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>

                                </Card>

                            )}
                            {/* about */}
                            {/* {data?.data?.about && (
                                <Card sx={{ p: "22px" }}>
                                    <Typography variant="h5" color="secondary.main">
                                        About
                                    </Typography>
                                    <Typography variant="body1" color="info.main" sx={{ mt: "10px" }}>
                                        {data?.data?.about}
                                    </Typography>
                                </Card>
                            )} */}
                        </Stack>
                    </Grid>
                    {isMobile && (
                        <Grid item xs={12} md={8}>
                            <CustomTab tabs={tabs} />
                        </Grid>
                    )}
                </Grid>
            </Container>

            {/* login modal */}
            <LoginModal open={isLoginModal} onClose={() => setIsLoginModal(!isLoginModal)} />
            {/* send both users as props */}
            <BlockModal open={isBlockModalOpen} onClose={() => setIsBlockModalOpen(!isBlockModalOpen)} blockedId={data?.data?.id} userId={user.id} />

            <ReportModal open={isReportModalOpen} onClose={() => setIsReportModalOpen(!isReportModalOpen)} userId={""} blockedId={""} />
        </Box >
    );
};

export default UserProfile;

const styles = {
    userProfile: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        justifyContent: "center",
    },
};
