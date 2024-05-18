"use client";
import React, { Fragment, useState, useEffect, use } from "react";
import { Box, Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, useMediaQuery } from "@mui/material";
import SurrogatesImage from "../../assets/images/home/find-surrogates/surrogates-1.png";
import SurrogatesUser from "@/components/surrogates-user/surrogates-user";
import { useDetailsQuery } from "@/services/users/users-api";
import { getSessionStorage } from "@/utils/session-storage";
import { styles } from "./dashboard.styles";
import { useRouter } from "next/navigation";
import CreateNewProfileDialog from "../my-profiles/create-new-profile-dialog/create-new-profile-dialog";
import { useGetAgencyUserQuery } from "@/services/my-profile/my-profile-api";
import AvatarImg from "../../assets/images/avatar.svg";
import LikeIcon from "../../assets/icons/likes-icon.svg";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';
import { useGetSurrogatesQuery } from "@/services/find-services/find-services-api";
import SurrogatesSection from "@/sections/surrogates-section/surrogates-section";
import ResourceFinder from "@/components/resource-finder/resource-finder";
import { Surrogate, SurrogatesSectionProps } from "@/sections/surrogates-section/surrogates-section.types";

import { BASE_URL } from "../../../config";
import { authActions } from '@/slices/auth/reducer';

import { useFavoritesToggleAddRemoveMutation, useMyFavoritesQuery } from "@/services/favorites/favorites-api";

import { getCustomerByEmail } from "@/lib/stripe";
import { collection, getDocs, query, where, onSnapshot, doc, setDoc, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';
import { PremiumModal, VerifyModal } from "@/components/premium-modal/premium-modal";

import { getCountryNameByCode } from "@/utils/utilitiy-functions";


const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

const AdminHomePage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: myFavorites }: any = useMyFavoritesQuery({});
  const [removeFavorites, { isError, isSuccess }]: any = useFavoritesToggleAddRemoveMutation();
  const authUserId = useSelector((state: RootState) => state.auth.user.id);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [favData, setFavData] = useState<any>(null);
  const [favCalled, setFavCalled] = useState(false);
  const [isAddNewProfile, setIsAddNewProfile] = useState(false);
  const sessionStorage = getSessionStorage("user");
  const { data }: any = useDetailsQuery({ id: sessionStorage?.id });
  const { data: getAgencyUser }: any = useGetAgencyUserQuery({});
  const { data: getSurrogate }: any = useGetSurrogatesQuery({});
  const userRole = getSessionStorage('role');
  const [isFilterParents, setIsFilterParents] = useState<boolean>(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [actionType, setActionType] = useState('add');
  const [profileObj, setProfileObj] = useState<any>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [mostRecentChatData, setMostRecentChatData] = useState<any[]>([]);

  console.log("getAgencyUser", getAgencyUser);

  const router = useRouter();
  const dispatch = useDispatch();
  const { setUser, setUserAnyItem } = authActions;

  const fetchMostRecentChatData = async () => {
    const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where('is_blocked', '==', false));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    // most recent chat data limit 1
    const mostRecentChatData = data.sort((a: any, b: any) => b.created_at - a.created_at).slice(0, 3);
    console.log("mostRecentChatData", mostRecentChatData);
    setMostRecentChatData(mostRecentChatData);
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchMostRecentChatData();
    }
  }, [isAuthenticated]);

  useEffect(() => {

    const getStripeCustomer = async () => {
      const customer = await getCustomerByEmail(user?.email);
      if (customer) {
        const currentPeriodEndTimestamp = customer?.subscription_ends ?? 0;
        let daysRemaining;

        if (currentPeriodEndTimestamp > 0) {
          const now = new Date().getTime();
          const endDateInMilliseconds = currentPeriodEndTimestamp * 1000;
          const difference = endDateInMilliseconds - now;

          daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

          if (isNaN(daysRemaining)) {
            console.error("Error: Invalid subscription end timestamp");
          }
        } else {
        }

        const stripe_data = {
          active: customer.active,
          customerId: customer.customerId,
          plans: customer.plans?.id ?? null,
          timeDifferenceDays: daysRemaining,
          cancel_at_period_end: customer.subscriptions?.cancel_at_period_end ?? false,
          cancel_at: customer.subscriptions?.cancel_at ?? null,
        };

        dispatch(setUserAnyItem(
          {
            stripe_data: stripe_data
          }
        ));
      }
    };

    if (isAuthenticated) {
      getStripeCustomer();
    }
  }, []);


  useEffect(() => {

    const favoritesUser = myFavorites?.favorites?.data;
    dispatch(setUserAnyItem(
      {
        ...user,
        users_who_favorited_me: favoritesUser
      }
    ));
  }, [myFavorites]);



  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
    "agency user": "warning.light",
  };


  const handleAddNewProfile = () => {
    setIsAddNewProfile(!isAddNewProfile);
  };

  const handleOnClickFilter = () => {
    setIsFilterParents(!isFilterParents);
  };

  const canReplyToRole = (user: any, selectedItem: any) => {
    if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Intended Parent' && selectedItem.agency != null) {
      return true;
    }
    if (user?.user_type == 'Surrogate' && user?.email_verified_at != null) {
      if (selectedItem?.user_type == 'Intended Parent') {
        setIsVerifyEnvelopModal(true);
        return false;
      }
    }
    if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Surrogate') {
      toast.error("You cannot chat another surrogate.");
      return false;
    }
    if (user.user_type == 'Surrogate' && selectedItem?.user_type == 'Intended Parent' && selectedItem?.agency == null) {
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
      setIsPremiumEnvelopModal(true);
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
      toast.error("You cannot start chat with Intended Parent.");
      return false;
    }

    return true;
  };
  const handleVerifyEnvelop = async (item: any = null) => {
    let canReply = canReplyToRole(user, item);
    if (!canReply) {
      return;
    }
    if (!isAuthenticated) {
      setIsLoginModal(!isLoginModal);
    } else {
      if (user.user_type == "Intended Parent") {
        let friend_id = item.id;
        if (item?.agency) {
          friend_id = item?.agency?.id;
        }
        // check if already friend
        const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", friend_id)); const querySnapshot = await getDocs(q);
        if (querySnapshot.size == 0) {
          let user_id = user?.id;
          let friend_id = item?.id;
          let friend_name = item?.name;

          if (item?.agency) {
            friend_id = item?.agency?.id;
            friend_name = item?.agency?.name;
          }

          if (item?.user_type == "Agency") {
            // save friend to chat_room collection
            const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
            await setDoc(chatRoomRef, {
              user_id: user_id,
              friend_id: friend_id,
              friend_name: friend_name,
              friend_type: item?.user_type,
              agency_id: "",
              created_at: Date.now(),
              is_blocked: false,
              prevMessage: "",
              image: item?.images,
            });
          } else {
            // save friend to chat_room collection
            const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
            await setDoc(chatRoomRef, {
              user_id: user_id,
              friend_id: friend_id,
              friend_name: friend_name,
              friend_type: item?.user_type,
              agency_id: item?.agency,
              created_at: Date.now(),
              is_blocked: false,
              prevMessage: "",
              image: item?.images,
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
        // check if already friend
        const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", item?.id)); const querySnapshot = await getDocs(q);
        if (querySnapshot.size == 0) {
          let user_id = user?.id;
          let friend_id = item?.id;
          let friend_name = item?.name;

          if (item?.agency) {
            friend_id = item?.agency?.id;
            friend_name = item?.agency?.name;
          }
          if (item?.user_type == "Agency") {
            // save friend to chat_room collection
            const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
            await setDoc(chatRoomRef, {
              user_id: user_id,
              friend_id: friend_id,
              friend_name: friend_name,
              friend_type: item?.user_type,
              agency_id: "",
              created_at: Date.now(),
              is_blocked: false,
              prevMessage: "",
              image: item?.images,
              is_deleted: false,
            });
          } else {

            // save friend to chat_room collection
            const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
            await setDoc(chatRoomRef, {
              user_id: user_id,
              friend_id: friend_id,
              friend_name: friend_name,
              friend_type: item?.user_type,
              agency_id: item?.agency,
              created_at: Date.now(),
              is_blocked: false,
              prevMessage: "",
              image: item?.images,
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
        if (user?.stripe_data?.active == true) {
          // check if already friend
          const q = query(collection(firestoreDb, 'chat_room'), where("user_id", "==", user.id), where("friend_id", "==", item?.id));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.size == 0) {
            const user_id = user?.id;
            const friend_id = item?.id;
            const friend_name = item?.name;
            // save friend to chat_room collection
            const chatRoomRef = doc(firestoreDb, 'chat_room', `${user_id}_${friend_id}`);
            await setDoc(chatRoomRef, {
              user_id: user_id,
              friend_id: friend_id,
              friend_name: friend_name,
              friend_type: item?.user_type,
              agency_id: "",
              created_at: Date.now(),
              is_blocked: false,
              prevMessage: "",
              image: item?.images,
              is_deleted: false,
            });

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


        } else {
          setIsPremiumEnvelopModal(true);
          return;
        }
      }
      try {
        router.push(`/messages?id=${item?.id}`);
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  };

  const handleUserInfo = (item: any) => {

    if (isAuthenticated) {
      router.push(`/user-profile?id=${item?.id}`);
    }
    else {
      setIsLoginModal(true);
    }
  };

  const handleFavorite = (item: any) => {


    if (isAuthenticated) {
      removeFavorites(item?.id)
        .then((res: any) => {
          toast.success(res?.data?.message);
        });
      setFavCalled(!favCalled);
    } else {
      // setIsLoginModal(true);
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
            Authorization: `Bearer ${authUserToken}`,
          }

        });
        const data = await response.json();
        setFavData(data);

        // Filter the data to include only favorite items
        const favoriteData = ((data as Surrogate[] & { surrogates: Surrogate[] })?.surrogates || []).filter((item: any) => item?.is_favorite);
        const favoriteIntendedParents = ((data as Surrogate[] & { intended_parents: Surrogate[] })?.intended_parents || []).filter((item: any) => item?.is_favorite);
        const favoriteAgencies = ((data as Surrogate[] & { agencies: Surrogate[] })?.agencies || []).filter((item: any) => item?.is_favorite);

        // Combine favorite data from all sources into a single array
        const allFavoriteData = [...favoriteData, ...favoriteIntendedParents, ...favoriteAgencies];

        dispatch(setUserAnyItem(
          {
            ...user,
            favorites_user: allFavoriteData
          }
        ));


      }
      else {
        const response = await fetch(`${BASE_URL}/user-home`, {
          method: "GET",
          headers: {
            "Content-Type": "application",
          }

        });
        const data = await response.json();

      }
    };
    fetchData();
  }, [favCalled]);


  const gridConfig = {
    xs: 6,
    md: 6,
    lg: 6,
  };

  const handleVerifyModalClose = () => {
    setIsVerifyEnvelopModal(false);
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    setActionType('add');
    setProfileObj({});
  };

  const handleActions = (type: string, item: any) => {
    switch (type) {
      case 'Edit':
        toggleDrawer();
        setProfileObj(item);
        setActionType('edit');
        break;
      case 'Delete':
        setProfileObj(item);
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    };

  }

  return (
    <Box sx={{ py: { xs: "0px", sm: "32px" } }}>
      {/* verify modal */}
      <VerifyModal
        open={isVerifyEnvelopModal}
        onClose={handleVerifyModalClose}
      />
      <PremiumModal
        open={isPremiumEnvelopModal}
        onClose={() => setIsPremiumEnvelopModal(false)}
      />
      <CreateNewProfileDialog
        open={drawerOpen}
        onClose={toggleDrawer}
        actionType={actionType}
        profileObj={profileObj}
      />
      <Box
        sx={{ px: { xs: "20px", sm: "40px" }, pb: { xs: "20px", sm: "40px" } }}
        style={{
          width: "90%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: "25px",
          pb: "50px",
          borderBottom: "1px solid #EAEAEA",
        }}>
        <Box>
          <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
            {`Good Morning ${user?.name}`}
          </Typography>
          <Typography variant="body1" color="info.main">
            Here is the overview of what’s going on.
          </Typography>
        </Box>
        {user?.user_type === "Surrogate" ? (
          <Box>
            <Typography variant="h6" color="info.main">
              Your Membership Status
            </Typography>
            <Typography variant="body2" color="secondary.main" py="8px">
              Not Verified
            </Typography>
            <Button variant="contained"
              sx={styles.upgradeBtn} onClick={handleVerifyEnvelop}>
              VERIFY NOW
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" color="info.main">
              Your Membership Status
            </Typography>
            {user?.stripe_data?.active ? (
              <Typography variant="body2" color="success.main" py="8px">
                Premium Member
              </Typography>
            ) : (
              <>
                <Typography variant="body2" color="secondary.main" py="8px">
                  Free User
                </Typography>
                <Button variant="contained" sx={styles.upgradeBtn} onClick={() => router.push("/membership")}>
                  UPGRADE NOW
                </Button>
              </>
            )}
          </Box>

        )}
      </Box >
      {/* New Surrogates */}
      {
        userRole === 'Surrogate' && (
          <ResourceFinder
            isDashboard={true}
            data={favData?.intended_parents.slice(0, 4)}
            isButton={false}
            isFilter={false}
            loadMoreButton
            heading="New Intended Parents"
            subheading="Meet the latest intended parents who've become part of our community"
            rootSx={{ pt: { xs: "20px", md: "60px" } }}
            gridConfig={gridConfig}
            loading={isLoading}
            renderColor={renderColor}
            handleFilter={handleOnClickFilter}
            handleFavorite={handleFavorite}
            handleEnvelop={handleVerifyEnvelop}
            handleButton={() => router.push("/find-agencies")}
            handleUserInfo={handleUserInfo}
          />

        )
      }
      {
        userRole === 'Intended Parent' && (
          <>
            <ResourceFinder
              data={favData?.surrogates.slice(0, 4)}
              isDashboard={true}
              isButton={false}
              isFilter={false}
              loadMoreButton
              heading="New Surrogates"
              subheading="Meet the latest surrogates who've become part of our community"
              rootSx={{ pt: { xs: "20px", md: "60px" } }}
              gridConfig={gridConfig}
              loading={isLoading}
              renderColor={renderColor}
              handleFilter={handleOnClickFilter}
              handleFavorite={handleFavorite}
              handleEnvelop={handleVerifyEnvelop}
              handleButton={() => router.push("/find-agencies")}
              handleUserInfo={handleUserInfo}
            />
          </>
        )
      }
      {/* listing */}
      {
        userRole === 'Agency' && (
          <>
            <ResourceFinder
              data={favData?.surrogates.slice(0, 4)}
              isButton={false}
              isDashboard={true}
              isFilter={false}
              loadMoreButton
              heading="New Surrogates"
              subheading="Meet the latest surrogates who've become part of our community"
              rootSx={{ pt: { xs: "20px", md: "60px" } }}
              gridConfig={gridConfig}
              loading={isLoading}
              renderColor={renderColor}
              handleFilter={handleOnClickFilter}
              handleFavorite={handleFavorite}
              handleEnvelop={handleVerifyEnvelop}
              handleButton={() => router.push("/find-agencies")}
              handleUserInfo={handleUserInfo}
            />

            <Box sx={styles.listingWrapper}>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} color="info.main">
                  My Listings
                </Typography>
                <Typography variant="body1" color="info.main">
                  Here is overview of the listings you created for your clients.
                </Typography>
              </Box>
              {!isMobile && (
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" size="small" sx={styles.button} onClick={() => router.push("/my-profile")}>
                    VIEW ALL
                  </Button>
                  <Button variant="contained" size="small" sx={{ ...styles.button, backgroundColor: "#FF414D !important" }} onClick={toggleDrawer}>
                    ADD NEW PROFILE
                  </Button>
                </Stack>
              )}
            </Box>

            <DashboardListingTable isMobile={isMobile} data={getAgencyUser?.users} />
          </>
        )
      }
      {/* message */}

      {
        mostRecentChatData.length > 0 && (
          <Box sx={styles.userTypeData}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "info.main" }}>
              My Messages
            </Typography>
            <Typography variant="body1" color="info.main" pt="5px">
              People from recent conversations
            </Typography>
            {mostRecentChatData.map((item: any, index: number) => (
              <Box key={index} sx={styles.userTypeMessage}>
                <Stack spacing={2} direction='row' alignItems='center'>
                  {item?.image ? (
                    <Image
                      src={item?.image}
                      alt=""
                      width={44}
                      height={44}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image src={AvatarImg} alt="" width={44} height={44} />
                  )}
                  <Typography variant="caption" color="info.main" fontWeight={700} pt="5px">
                    {item?.friend_name}
                  </Typography>
                </Stack>
                <Link href={`/messages?id=${item?.friend_id}`} style={styles.messageBtn}>Message</Link>
              </Box>
            ))}
          </Box>
        )
      }
      {/* likes */}
      <Box sx={styles.userTypeData}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "info.main" }}>
          Likes
        </Typography>
        <Typography variant="body1" color="info.main" pt="5px">
          My favorites and who favorited me

        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.userTypeLikes} onClick={() => router.push('/favorites')}>
              <Stack spacing={2} direction='row' alignItems='center'>
                <Image src={LikeIcon} alt="" width={44} height={44} />
                <Typography variant="subtitle2" color="info.main" fontWeight={700}>
                  {user?.users_who_favorited_me?.length ?? 0}
                </Typography>
              </Stack>
              <Typography variant="body1" color="info.main" pt="10px">
                People Who Liked You
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.userTypeLikes} onClick={() => router.push('/favorites')}>
              <Stack spacing={2} direction='row' alignItems='center'>
                <Image src={LikeIcon} alt="" width={44} height={44} />
                <Typography variant="subtitle2" color="info.main" fontWeight={700}>
                  {user?.favorites_user?.length ?? 0}
                </Typography>
              </Stack>
              <Typography variant="body1" color="info.main" pt="10px">
                Profiles You Liked
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={styles.userTypeData}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "info.main" }}>
          Quick Links
        </Typography>
        <Typography variant="body1" color="info.main" pt="5px">
          Quick links to important sections

        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.userTypeLikes}>
              <Stack spacing={2} direction='row' alignItems='center'>
                <QuestionMarkIcon
                  sx={{
                    color: "#FF414D",
                    backgroundColor: "#F4F4F4",
                    padding: "10px",
                    borderRadius: "5%",
                    fontSize: "2rem"
                  }}
                />
                <Typography variant="subtitle2" color="info.main" fontWeight={700}>
                  Frequently Asked Questions
                </Typography>
              </Stack>
              <Typography
                sx={{
                  marginTop: "20px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  width: "20%",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  border: "1px solid #FF414D",
                  color: "#FF414D"
                }}
                onClick={() => router.push('/faq')}
              >
                See FAQs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={styles.userTypeLikes}>
              <Stack spacing={2} direction='row' alignItems='center'>
                <AccountCircleIcon
                  sx={{
                    color: "#FF414D",
                    backgroundColor: "#F4F4F4",
                    padding: "10px",
                    borderRadius: "5%",
                    fontSize: "2rem"
                  }}
                />
                <Typography variant="subtitle2" color="info.main" fontWeight={700}>
                  My Profile
                </Typography>
              </Stack>
              <Typography
                sx={{
                  width: isMobile ? "40%" : "30%",
                  marginTop: "20px",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                  border: "1px solid #FF414D",
                  color: "#FF414D"
                }}
                onClick={() => router.push(`/user-profile?id=${user?.id}`)}
              >
                View my profile
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
};

export default AdminHomePage;

const DashboardListingTable = ({ isMobile, data }: any) => {

  return (
    <Box>
      {!isMobile ? ( // Desktop layout
        <Box sx={{ mx: { xs: "0px", sm: "40px" } }}>
          <TableContainer sx={{ border: "1px solid #EAEAEA", borderRadius: "6px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Profile Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Data not found
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.slice(0, 5).map((row: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{getCountryNameByCode(row?.country)}</TableCell>
                      <TableCell>{row?.user_type}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : ( // Mobile layout
        <Box>
          {data?.length > 0 ? (
            data?.slice(0, 5).map((row: any, index: any) => (
              <Box key={index} sx={{ border: "1px solid #EAEAEA", borderRadius: "6px", p: "16px", mb: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "16px",
                    borderBottom: "1px solid #EAEAEA",
                  }}
                >
                  <Typography variant="body2" fontWeight={700} color="info.main" textTransform="capitalize" mb={1}>
                    Name
                  </Typography>
                  <Typography variant="body2" color="info.main" mb={1}>
                    {row?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "16px",
                    borderBottom: "1px solid #EAEAEA",
                  }}
                >
                  <Typography variant="body2" fontWeight={700} color="info.main" textTransform="capitalize" mb={1}>
                    Country
                  </Typography>
                  <Typography variant="body2" color="info.main" mb={1}>
                    {getCountryNameByCode(row?.country)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "16px",
                  }}
                >
                  <Typography variant="body2" fontWeight={700} color="info.main" textTransform="capitalize" mb={1}>
                    Profile Type
                  </Typography>
                  <Typography variant="body2" color="info.main" mb={1}>
                    {row?.user_type}
                  </Typography>
                </Box>
                {/* <Button variant="outlined" sx={{ width: "100%", p: "8px 24px", mt: "8px" }}>
                  Edit
                </Button> */}
              </Box>
            ))
          ) : (
            <Box>
              <Typography variant="body2" fontWeight={700} color="secondary.main">
                Data not found
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

function setUserAnyItem(arg0: { stripe_data: { active: boolean; customerId: string | null; plans: string | null; timeDifferenceDays: number; }; }): any {
  throw new Error("Function not implemented.");
}
