"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomTab from "@/components/custom-tab/custom-tab";
import SurrogatesUser from "@/components/surrogates-user/surrogates-user";
import { useFavoritesToggleAddRemoveMutation, useFavoritesDetailsQuery, useMyFavoritesQuery } from "@/services/favorites/favorites-api";
import SurrogatesSection from "@/sections/surrogates-section/surrogates-section";


import toast from "react-hot-toast";
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from "next/navigation";
import { BASE_URL } from "../../../config";
import ResourceFinder from "@/components/resource-finder/resource-finder";


const Favorites = () => {


  const [removeFavorites, { isError, isSuccess }]: any = useFavoritesToggleAddRemoveMutation();
  const [favData, setFavData] = useState<any>(null);
  const [favCalled, setFavCalled] = useState(false);
  const [isFilterParents, setIsFilterParents] = useState<boolean>(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authUserToken = useSelector((state: RootState) => state.auth.accessToken);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);


  const { data, isLoading }: any = useFavoritesDetailsQuery({});
  // const [removeFavorites]: any = useFavoritesToggleAddRemoveMutation();
  const { data: myFavorites }: any = useMyFavoritesQuery({});

  const router = useRouter();


  const peopleWhoAddedMeFavorite = myFavorites?.favorites?.data?.map((item: any) => {
    var user = item?.favorited_user;
    return user;
  });



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

  const handleOnClickFilter = () => {
    setIsFilterParents(!isFilterParents);
  };


  const handleVerifyEnvelop = (item: any) => {

    setIsVerifyEnvelopModal(!isVerifyEnvelopModal);
  };

  const handleUserInfo = (item: any) => {
    router.push(`/user-profile?id=${item?.id}`);
  };



  const gridConfig = {
    xs: 6,
    md: 6,
    lg: 6,
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


  const tabs = [
    {
      label: "My Favorites", content:
        <SurrogatesSection
          data={favData}
          isButton={false}
          isDashboard={true}
          isFilter
          loadMoreButton
          heading=""
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
    },
    {
      label: "People who added me favorite", content:
        // <SurrogatesUser
        //   data={peopleWhoAddedMeFavorite}
        //   renderColor={renderColor}
        //   rootSx={{ py: { xs: "28px", md: "44px" } }}
        // />
        <ResourceFinder
          data={peopleWhoAddedMeFavorite}
          isButton={false}
          isFilter={false}
          loadMoreButton
          heading=""
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
    },
  ];

  return (
    <Box sx={{ pt: { xs: "20px", sm: "40px" } }}>
      <Box sx={{ px: { xs: 0, sm: "40px" } }}>
        <Typography variant="h4" classes={{ root: "font-grotesk" }}>
          Favorites
        </Typography>
      </Box>
      <Box sx={{ pt: { xs: "20px", sm: "40px" }, px: { xs: 0, sm: "10px" } }}>
        <CustomTab tabs={tabs} />
      </Box>
    </Box>
  );
};

export default Favorites;
