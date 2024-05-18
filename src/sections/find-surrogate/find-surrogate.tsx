"use client";
import React, { useEffect, useState } from "react";
import SurrogatesImage from "../../assets/images/home/find-surrogates/surrogates-1.png";
import ResourceFinder from "@/components/resource-finder/resource-finder";
import { useGetFavoritesQuery, useHomeQuery } from "@/services/find-services/find-services-api";
import { useFavoritesToggleAddRemoveMutation } from "@/services/favorites/favorites-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PremiumModal, VerifyModal } from "@/components/premium-modal/premium-modal";
import LoginModal from "../auth/login/login-modal/login-modal";
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '@/slices/favorites/reducer';

import Spinner from "@/components/Spinner/Spinner";
import { Box } from "@mui/material";
import { set } from "lodash";

import { BASE_URL } from "../../../config";
import FiltersDrawer from "./filters-drawer/filters-drawer";
import { query, collection, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "@/config/firebase-config";




const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);


const FindSurrogate = () => {
  //const { data, isLoading } = useHomeQuery({});
  const [data, setData] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);

  const [removeFavorites, { isError, isSuccess }]: any = useFavoritesToggleAddRemoveMutation();
  const [isFilterParents, setIsFilterParents] = useState<boolean>(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUserId = useSelector((state: RootState) => state.auth.user.id);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const [favCalled, setFavCalled] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(false);


  const renderColor: { [key: string]: string } = {
    verified: "success.main",
    pro: "warning.main",
    "agency user": "warning.light",
  };


  const handleFavorite = (item: any) => {
    if (isAuthenticated) {
      removeFavorites(item?.id)
        .then((res: any) => {
          setFavCalled(!favCalled);
          toast.success(res?.data?.message);
        })
        .catch((error: any) => {
          setIsLoading(false);
        });
    } else {
      setIsLoginModal(true);
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
        setData(data?.surrogates);
        setOriginalData(data?.surrogates);
      }
      else {
        const response = await fetch(`${BASE_URL}/home`, {
          method: "GET",
          headers: {
            "Content-Type": "application",
          }

        });
        const data = await response.json();
        console.log("data ???", data);
        setData(data?.surrogates);
        setOriginalData(data?.surrogates);
      }


    };
    fetchData();
  }
    , [favCalled]);

  const handlePremiumEnvelop = () => {
    setIsPremiumEnvelopModal(!isPremiumEnvelopModal);
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
        let friend_id = item?.id;

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
      } else if (user.user_type == "Surrogate") {
        let friend_id = item?.id;
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

  const gridConfig = {
    xs: 6,
    md: 4,
    lg: 3,
  };


  const handleOnClickFilter = () => {
    setIsFilterParents(!isFilterParents);
  };


  const handleFormValues = (values: any) => {
    // Dynamically update keywords based on form values
    const keywords = {
      dashboard: values.dashboard || "",
      search: values.search || "",
      country: values.country || "",
      state: values.state || "",
      typeSurrogacy: values.typeSurrogacy || "",
      journey: values.journey || "",
      agency: values.agency === "true",
      surrogacyJourney: values.surrogacyJourney === "true",
      intendedParentLocation: values.intendedParentLocation || "",
      agencyRepresented: values.agencyRepresented || ""
    };

    // ceck if all the values are empty
    const allValuesEmptyOrFalse = Object.values(keywords).every(value => value === "" || value === false);

    if (allValuesEmptyOrFalse) {
      console.log("All values are empty or false");
      setData(originalData);
    } else {
      console.log("Some values are not empty or false");

      const filteredData = data?.filter((surrogate: any) => {
        return (
          (!keywords.dashboard || (surrogate?.name && surrogate.name.toLowerCase().includes(keywords.dashboard.toLowerCase()))) &&
          (!keywords.search || (surrogate?.name && surrogate.name.toLowerCase().includes(keywords.search.toLowerCase()))) &&
          (!keywords.country || (surrogate?.country && surrogate.country.toLowerCase() === keywords.country.toLowerCase())) &&
          (!keywords.state || (surrogate?.state && surrogate.state.toLowerCase().includes(keywords.state.toLowerCase()))) &&
          (!keywords.typeSurrogacy || (surrogate?.surrogacy_type && surrogate.surrogacy_type.toLowerCase() === keywords.typeSurrogacy.toLowerCase())) &&
          (!keywords.journey || (surrogate?.when_to_start_journey && surrogate.when_to_start_journey.toLowerCase() === keywords.journey.toLowerCase())) &&
          (!keywords.agency || ((surrogate?.is_agency_supported || surrogate.is_working_with_agency) === keywords.agency)) &&
          (!keywords.surrogacyJourney || (surrogate?.is_first_surrogacy_journey !== null && surrogate.is_first_surrogacy_journey === keywords.surrogacyJourney)) &&
          (!keywords.intendedParentLocation || (surrogate?.surrogate_location && surrogate.surrogate_location.toLowerCase().includes(keywords.intendedParentLocation.toLowerCase()))) &&
          (!keywords.agencyRepresented || (typeof surrogate.agency === 'string' && surrogate.agency.toLowerCase() === keywords.agencyRepresented.toLowerCase()))
        );
      });


      setData(filteredData);
      setIsFilterParents(false);
    }
  };


  return (
    <>
      <ResourceFinder
        data={data}
        isButton={false}
        isFilter
        loadMoreButton
        heading="Surrogates"
        rootSx={{ pt: { xs: "20px", md: "60px" } }}
        gridConfig={gridConfig}
        loading={isLoading}
        renderColor={renderColor}
        handleFilter={handleOnClickFilter}
        handleFavorite={(item: any) => handleFavorite(item)}
        handleEnvelop={handleVerifyEnvelop}
        handleButton={() => router.push("/find-agencies")}
        handleUserInfo={handleUserInfo}
      />

      <FiltersDrawer open={isFilterParents} onClose={handleOnClickFilter} onFormValues={handleFormValues} />

      { /* login modal */}
      <LoginModal open={isLoginModal} onClose={() => setIsLoginModal(!isLoginModal)} />

      { /* premium modal */}
      <PremiumModal open={isPremiumEnvelopModal} onClose={handlePremiumEnvelop} handleOnClickModal={() => router.push("/membership")} />

      { /* verify modal */}
      <VerifyModal open={isVerifyEnvelopModal} onClose={handleVerifyEnvelop} />
    </>
  );
};

export default FindSurrogate;
