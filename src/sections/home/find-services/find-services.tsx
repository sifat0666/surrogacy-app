"use client";
import React, { Fragment, useEffect, useState } from "react";
import SurrogatesImage from "../../../assets/images/home/find-surrogates/surrogates-1.png";
import ResourceFinder from "@/components/resource-finder/resource-finder";
import { useHomeQuery } from "@/services/find-services/find-services-api";
import { useFavoritesToggleAddRemoveMutation } from "@/services/favorites/favorites-api";
import LoginModal from "@/sections/auth/login/login-modal/login-modal";
import toast from "react-hot-toast";
import { PremiumModal, VerifyModal } from "@/components/premium-modal/premium-modal";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

import { RootState } from "@/store";
import { useSelector } from 'react-redux';
import { BASE_URL } from "../../../../config";

import { collection, getDocs, query, where, onSnapshot, doc, setDoc, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';


const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);



const FindServicesModal = () => {
  const [favData, setFavData] = useState<any>(null);
  const [removeFavorites, { isError, isSuccess }]: any = useFavoritesToggleAddRemoveMutation();
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any>();
  const [favCalled, setFavCalled] = useState(false);
  // const { data, isLoading }: any = useHomeQuery({});
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth?.user);


  const router = useRouter();

  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
  };

  const handleFavorite = (item: any) => {
    if (isAuthenticated) {
      removeFavorites(item?.id)
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
  const handlePremiumEnvelop = () => {
    if (isAuthenticated) {
      setIsPremiumEnvelopModal(!isPremiumEnvelopModal);
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
        // check if already friend
        let friend_id = item?.id;
        if (item?.agency) {
          friend_id = item?.agency?.id;
        }
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
            console.log("item.1-->", item);
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
            console.log("item.2-->", item);
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
          console.log("item.3-->", user);

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
        let friend_id = item?.id;

        if (item?.agency) {
          friend_id = item?.agency?.id;
        }
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
  }

  const gridConfig = {
    xs: 6,
    md: 4,
    lg: 3,
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
        // get user data
        const data = await response.json();
        console.log("data is here", data)

        setFavData(data);
        setIsLoading(false);
      }
      else {
        const response = await fetch(`${BASE_URL}/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application",
          }
        });
        const data = await response.json();
        console.log("data is here", data)
        setFavData(data);

      }
    };
    fetchData();
  }, [favCalled]);

  return (
    <Box id="find-services">

      {/* find surrogate */}
      <ResourceFinder
        data={favData?.surrogates?.slice(0, 4)}
        title="A NEW WAY TO FIND A SURROGATE"
        heading="Surrogates"
        rootSx={{ pt: { xs: "50px", md: "100px" } }}
        gridConfig={gridConfig}
        loading={isLoading}
        handleFavorite={handleFavorite}
        handleEnvelop={handleVerifyEnvelop}
        handleButton={() => router.push('/find-surrogate')}
        handleUserInfo={handleUserInfo}
      />

      {/* find parents */}
      <ResourceFinder
        data={favData?.intended_parents?.slice(0, 4)}
        title="A NEW WAY TO FIND PARENTS"
        heading="Intended Parents"
        renderColor={renderColor}
        rootSx={{ pt: { xs: "60px", md: "240px" } }}
        gridConfig={gridConfig}
        loading={isLoading}
        handleFavorite={handleFavorite}
        handleEnvelop={handleVerifyEnvelop}
        handleButton={() => router.push('/find-parents')}
        handleUserInfo={handleUserInfo}
      />

      {/* find agency */}
      <ResourceFinder
        data={favData?.agencies?.slice(0, 4)}
        title="A NEW WAY TO FIND AGENCIES"
        heading="Surrogacy Agencies"
        headingColor="primary.dark"
        rootSx={{ pt: { xs: "60px", md: "240px" } }}
        gridConfig={gridConfig}
        loading={isLoading}
        handleFavorite={handleFavorite}
        handleEnvelop={handleVerifyEnvelop}
        handleButton={() => router.push('/find-agency')}
        handleUserInfo={handleUserInfo}
      />

      {/* login modal */}
      <LoginModal open={isLoginModal} onClose={() => setIsLoginModal(!isLoginModal)} />

      {/* premium modal */}
      <PremiumModal
        open={isPremiumEnvelopModal}
        onClose={() => setIsPremiumEnvelopModal(!isPremiumEnvelopModal)}
        handleOnClickModal={() => router.push('/membership')}
      />

      {/* verify modal */}
      <VerifyModal
        open={isVerifyEnvelopModal}
        onClose={() => setIsVerifyEnvelopModal(!isVerifyEnvelopModal)}
      />

    </Box>
  );
};

export default FindServicesModal;
