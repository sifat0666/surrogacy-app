import React, { useState, useEffect } from "react";
import { Box, Button, Container, Grid, Typography, Skeleton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import Image from "next/image";
import HeartIcon from "../../assets/icons/heart-icon.svg";
import MessageIcon from "../../assets/icons/message-icon.svg";
import LocationIcon from "../../assets/icons/location-icon.svg";
import FiltersIcon from "../../assets/icons/filters-icon.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styles } from "./resource-finder.style";
import SurrogatesImage from "../../assets/images/home/find-surrogates/surrogates-1.png";
import { FindSurrogateProps } from "./resource-finder.types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';

import {
  getStateNameByCode,
  getCountryNameByCode
} from "@/utils/utilitiy-functions";


const ResourceFinder = (props: FindSurrogateProps) => {
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<string>("newest");

  const {
    data,
    title,
    heading,
    subheading,
    titleColor = "secondary.main",
    headingColor = "info.main",
    cardShadowColor = "0px 4px 12px 0px #0000001A",
    buttonColor = "#FF414D !important",
    buttonText = "View All",
    isButton = true,
    isHeadingWrap = true,
    loadMoreButton,
    loadMoreButtonColor = "#FF414D !important",
    isFilter = false,
    handleFilter,
    gridConfig,
    rootSx,
    renderColor,
    handleButton,
    handleFavorite,
    handleEnvelop,
    handleUserInfo,
    loading = false,
    isDashboard = false,
  } = props;

  const isMobile = useMediaQuery("(max-width:1020px)");
  const [cardsToShow, setCardsToShow] = useState(12);
  const cardsToLoad = 12;

  const handleLoadMore = () => {
    setCardsToShow(cardsToShow + cardsToLoad);
  };

  const isAuthenticated = useSelector((state: RootState) => state?.auth?.isAuthenticated);
  const authUserId = useSelector((state: RootState) => state?.auth?.user?.id);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const authUserToken = useSelector((state: RootState) => state?.auth?.accessToken);
  const [filteredData, setFilteredData] = useState<any>([]);

  const isDataEmpty = data === null || data?.length === 0;

  useEffect(() => {

    if (isAuthenticated) {
      let filteredData = data?.filter((item: any) => item?.id !== user?.id);
      setFilteredData(filteredData);
    }
    else {
      setFilteredData(data);
    }
  }, [data]);


  const handleSortClose = (option: string) => {
    setSortOption(option);
    setSortAnchorEl(null);

    // Perform sorting based on the selected option
    let sortedData = [...filteredData]; // Create a copy of filteredData to sort
    if (option === "newest") {
      sortedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (option === "oldest") {
      sortedData.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
    setFilteredData(sortedData);

  };

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
    console.log("sortOption", sortOption);

    // sort data based on sort option
    if (sortOption === "newest") {
      const data = filteredData?.sort((a: any, b: any) => {
        console.log("a.created_at", new Date(a.created_at).getTime());
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setFilteredData(data);
    } else if (sortOption === "oldest") {
      const data = filteredData?.sort((a: any, b: any) => {
        console.log("a.created_at", new Date(a.created_at).getTime());
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
      setFilteredData(data);
    }

    console.log("filteredData", filteredData);

  };


  const visibleData = filteredData?.slice(0, cardsToShow);


  return (
    <Box sx={{ ...rootSx }}>
      <Container maxWidth="xl">
        <Typography variant="h6" sx={{ ...styles.finderTitle, color: titleColor }}>
          {title}
        </Typography>
        {/* heading */}
        {isHeadingWrap && (
          <Box sx={styles.headingWrap}>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            }} >
              <Typography variant="h3" sx={{ color: headingColor, pt: "10px" }}>
                {heading}
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.800" }}>
              </Typography>
            </Box>
            {isButton && (
              <Button variant="contained" sx={{ mb: "35px", backgroundColor: buttonColor, width: { xs: "100%", sm: "auto" } }} onClick={handleButton}>
                {buttonText}
              </Button>
            )}
          </Box>
        )}
        {/* filter */}
        {isFilter ? (
          <Box sx={{ mt: { xs: "50px", sm: "80px" } }}>
            <Box sx={styles.filterWrap}>
              <Box sx={styles.filter} onClick={handleFilter}>
                <Typography variant="body2" color="info.main">
                  Filters
                </Typography>
                <Image src={FiltersIcon} alt="" />
              </Box>
              <Button sx={styles.filter} onClick={handleSortClick}>
                <Typography variant="body2" color="info.main">
                  Sort by
                </Typography>
                <KeyboardArrowDownIcon sx={{ color: "info.main" }} />
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose(sortOption)}
              >
                <MenuItem onClick={() => handleSortClose("newest")}>Newest</MenuItem>
                <MenuItem onClick={() => handleSortClose("oldest")}>Oldest</MenuItem>
              </Menu>
            </Box>
            <Box sx={{ ...styles.filterWrap, mt: "24px" }}>
              <Button variant="contained" sx={styles.tagsBtn}>
                Tag
              </Button>
              <Typography variant="caption" color="secondary.main">
                Showing 0 of 100
              </Typography>
            </Box>
          </Box>
        ) : null}
        {/* data */}
        {isDataEmpty ? (
          <Typography variant="body1" sx={{ textAlign: "center", my: 10 }}>
            No results found.
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{
            pt: { xs: "10px", sm: "22px" },
            pb: { xs: "10px", sm: "40px" },
            px: { xs: 0, sm: 2 },
          }}>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={6} md={3} lg={3} key={index}>
                  <Skeleton variant="rounded" width="100%" height={390} />
                </Grid>
              ))
              : visibleData?.map((item: any, index: any) => (
                <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                  <Box
                    sx={{
                      ...styles.cardWrap, boxShadow: cardShadowColor,
                      height: `${isDashboard ? (isMobile ? "360px" : "330px") : (isMobile ? "335px" : "430px")}`,
                    }}
                  >
                    <Image
                      src={item?.images ? item?.images : SurrogatesImage}
                      className="cursor-pointer"
                      onClick={() => handleUserInfo(item)}
                      width={300}
                      height={isDashboard ? 180 : (isMobile ? 180 : 300)}
                      alt=""
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <Box sx={styles.icons}>
                      {item?.is_favorite ? (
                        <FavoriteIcon sx={{ color: "red", padding: "6px", background: "white", borderRadius: "6px", fontSize: "1.2rem", cursor: "pointer" }} onClick={() => handleFavorite(item)} />
                      ) : (
                        <Image src={HeartIcon} alt="" className="cursor-pointer fill" onClick={() => handleFavorite(item)} />
                      )}
                      <Image src={MessageIcon} alt="" className="cursor-pointer" onClick={() => handleEnvelop(item)} />
                    </Box>
                    {item?.status && (
                      <Box sx={{ ...styles.icons, left: 0, alignItems: "flex-start" }}>
                        <Typography variant="subtitle2" sx={{ ...styles.status, backgroundColor: renderColor[item?.status] }}>
                          {item?.status}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ px: "12px", pb: "20px" }}>
                      <Typography variant="subtitle1" sx={styles.title} onClick={() => handleUserInfo(item)}>
                        {item?.name}
                      </Typography>
                      <Typography variant="caption" sx={styles.desc}>
                        {item?.surrogacy_type ? item?.surrogacy_type : ""}
                      </Typography>
                      <Box sx={styles.locationWrap}>
                        <Image src={LocationIcon} alt="" />
                        <Typography variant="caption" sx={{ color: "grey.800", fontSize: "0.8rem" }}>
                          {`${getStateNameByCode(item?.state)}, ${getCountryNameByCode(item?.country)}`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            {filteredData?.length > cardsToShow && (
              <Box sx={styles.loadMoreBtn}>
                <Button variant="contained" sx={{ backgroundColor: loadMoreButtonColor, width: { xs: "100%", sm: "inherit" }, margin: "5px 15px" }} onClick={handleLoadMore}>
                  Load More
                </Button>
              </Box>

            )}
          </Grid>
        )}
      </Container>
    </Box >
  );
};

export default ResourceFinder;
