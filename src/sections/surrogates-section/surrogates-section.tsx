import React, { useEffect } from "react";
import { Box, Button, Container, Grid, Typography, Skeleton, useMediaQuery } from "@mui/material";
import Image from "next/image";
import HeartIcon from "../../assets/icons/heart-icon.svg";
import MessageIcon from "../../assets/icons/message-icon.svg";
import LocationIcon from "../../assets/icons/location-icon.svg";
import FiltersIcon from "../../assets/icons/filters-icon.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styles } from "./surrogates-section.style";
import SurrogatesImage from "../../assets/images/home/find-surrogates/surrogates-1.png";
import { Surrogate, SurrogatesSectionProps } from "./surrogates-section.types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux';


const SurrogatesSection = (props: SurrogatesSectionProps) => {
    let {
        data,
        title,
        heading,
        titleColor = "secondary.main",
        headingColor = "info.main",
        cardShadowColor = "0px 4px 12px 0px #0000001A",
        buttonColor = "#FF414D !important",
        buttonText = "View All",
        isButton = true,
        isHeadingWrap = true,
        loadMoreButton,
        loadMoreButtonColor = "#FF414D !important",
        isFilter,
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
    const authUserId = useSelector((state: RootState) => state.auth.user.id);
    const authUserToken = useSelector((state: RootState) => state.auth.accessToken);

    // Filter the data to include only favorite items
    const favoriteData = ((data as Surrogate[] & { surrogates: Surrogate[] })?.surrogates || []).filter((item: any) => item?.is_favorite);
    const favoriteIntendedParents = ((data as Surrogate[] & { intended_parents: Surrogate[] })?.intended_parents || []).filter((item: any) => item?.is_favorite);
    const favoriteAgencies = ((data as Surrogate[] & { agencies: Surrogate[] })?.agencies || []).filter((item: any) => item?.is_favorite);

    // Combine favorite data from all sources into a single array
    const allFavoriteData = [...favoriteData, ...favoriteIntendedParents, ...favoriteAgencies];

    // if the all favorite data is less tan 9, then do not show the load more button
    if (allFavoriteData.length <= 9) {
        loadMoreButton = false;
    }

    console.log("allFavoriteData", allFavoriteData);

    return (
        <Box sx={{ pt: "100px", ...rootSx }}>
            <Container maxWidth="xl">
                {/* heading */}
                {isHeadingWrap && (
                    <Box sx={styles.headingWrap}>
                        <Box>
                            <Typography variant="h3" sx={{ color: headingColor, pt: "10px" }}>
                                {heading}
                            </Typography>
                            {/* <Typography>
                                Meet the latest surrogates who've become part of our platform.
                            </Typography> */}
                        </Box>
                        {isButton && (
                            <Button variant="contained" sx={{ backgroundColor: buttonColor, width: { xs: "100%", sm: "auto" } }} onClick={handleButton}>
                                {buttonText}
                            </Button>
                        )}
                    </Box>
                )}

                {/* data */}
                <Grid container spacing={2} sx={{ pt: { xs: "70px", sm: "22px" } }}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <Grid item xs={6} md={4} lg={4} key={index}>
                                <Skeleton variant="rounded" width="100%" height={390} />
                            </Grid>
                        ))
                        : allFavoriteData?.map((item, index) => ( // Render only favorite items
                            <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                                <Box sx={{
                                    ...styles.cardWrap, boxShadow: cardShadowColor,
                                    height: `${isDashboard ? (isMobile ? "360px" : "330px") : (isMobile ? "335px" : "430px")}`,
                                }}>
                                    <Image
                                        src={item?.images ? item?.images : SurrogatesImage}
                                        alt=""
                                        onClick={() => handleUserInfo(item)}
                                        width={300}
                                        height={isDashboard ? 180 : (isMobile ? 180 : 300)}
                                        style={{
                                            cursor: "pointer",
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
                                    <Box sx={{ px: "12px", pb: "34px" }}>
                                        <Typography variant="subtitle2" sx={styles.title} onClick={() => handleUserInfo(item)}>
                                            {item?.name}
                                        </Typography>
                                        <Typography variant="caption" sx={styles.desc}>
                                            {item?.surrogacy_type}
                                        </Typography>
                                        <Box sx={styles.locationWrap}>
                                            <Image src={LocationIcon} alt="" />
                                            <Typography variant="caption" sx={{ color: "grey.800" }}>
                                                {`${item?.state}, ${item?.country}`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                </Grid>
                {/* load more button */}
                {loadMoreButton && (
                    <Box sx={styles.loadMoreBtn}>
                        <Button variant="contained" sx={{ backgroundColor: loadMoreButtonColor, width: { xs: "100%", sm: "inherit" } }}>
                            Load More
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default SurrogatesSection;
