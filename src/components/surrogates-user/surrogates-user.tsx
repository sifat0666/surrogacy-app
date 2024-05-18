'use client'
import React, { useState } from "react";
import { Box, Grid, Typography, Skeleton, Popover, List, ListItem, useMediaQuery } from "@mui/material";
import HeartIcon from "../../assets/icons/heart-icon.svg";
import MessageIcon from "../../assets/icons/message-icon.svg";
import LocationIcon from "../../assets/icons/location-icon.svg";
import Image from "next/image";
import MenuIcon from "../../assets/icons/profile-menu-icon.svg";
import { styles } from "./surrogates-user.styles";
import { surrogatesData } from "./surrogates.data";
import SurrogatesImage from "../../assets/images/home/find-surrogates/surrogates-1.png";
import { useRouter } from "next/navigation";

import {
  getStateNameByCode,
  getCountryNameByCode
} from "@/utils/utilitiy-functions";


interface Surrogate {
  images: string;
  id?: number;
  name?: string;
  about?: string | undefined | null;
  country?: string;
  state?: string;
  status?: string;
}

interface SurrogatesUserProps {
  isDashboard?: boolean;
  data?: Surrogate[];
  description?: string;
  heading?: string;
  titleColor?: string;
  cardShadowColor?: string;
  rootSx?: any;
  renderColor?: any;
  isHeadingWrap?: boolean;
  loading?: boolean;
  isFavorite?: boolean;
  isFavoriteUser?: boolean;
  handleFavorite?: any;
  show_popover?: boolean;
  handleActions?: (title: string, item: any) => void;
}

const SurrogatesUser = (props: SurrogatesUserProps) => {
  const {
    isDashboard = false,
    data,
    description,
    isFavorite = true,
    isFavoriteUser = false,
    heading,
    loading,
    handleFavorite,
    titleColor = "secondary.main",
    cardShadowColor = "0px 4px 12px 0px #0000001A",
    isHeadingWrap,
    handleActions,
    rootSx,
    renderColor,
    show_popover = true
  } = props;

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:1020px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const open = Boolean(anchorEl);

  const renderPopover = (userItem: Surrogate) => (
    <Popover
      open={open && selectedItemId === userItem?.id}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List style={{ padding: "7px 15px" }}>
        <ListItem
          style={{ padding: "7px 0" }}
          sx={styles.menuItem}
          onClick={() => handleActions && handleActions("Edit", userItem)}
        >
          <Image src={surrogatesData[0]?.icon} alt="Edit Icon" />
          <Typography variant="body1" color="info.main">Edit</Typography>
        </ListItem>
        <ListItem
          sx={styles.menuItem}
          onClick={() => handleActions && handleActions("Delete", userItem)}
        >
          <Image src={surrogatesData[1]?.icon} alt="Delete Icon" />
          <Typography variant="body1" color="info.main">Delete</Typography>
        </ListItem>
      </List>
    </Popover>
  );



  return (
    <Box sx={{ ...rootSx }}>
      {isHeadingWrap && (
        <Box sx={{ mb: "10px" }}>
          <Typography variant="subtitle2" fontWeight={700} color="info.main">
            {heading}
          </Typography>
          <Typography variant="body1" color="info.main" pt="4px">
            {description}
          </Typography>
        </Box>
      )}
      {loading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid item xs={6} md={4} lg={3} key={index + '6789'}>
              <Skeleton variant="rounded" width="100%" height={390} />
            </Grid>
          ))}
        </Grid>
      ) : data && data.length > 0 ? (
        <Grid container spacing={2}>
          {data?.map((userItem: Surrogate) => (
            <Grid item xs={6} md={3} key={userItem?.id}>
              <Box
                sx={{ ...styles.cardWrap, boxShadow: cardShadowColor }}
                style={{
                  height: `${isDashboard ? (isMobile ? "360px" : "330px") : (isMobile ? "455px" : "430px")}`,
                }}
              >
                <Image
                  src={userItem?.images || SurrogatesImage}
                  width={300}
                  height={isDashboard ? 180 : 300}
                  alt=""
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                {isFavoriteUser && isFavorite ? (
                  <Box sx={styles.icons}>
                    <button className="cursor-pointer" onClick={() => handleFavorite && handleFavorite(userItem)}>
                      <Image alt="heart-icon" src={HeartIcon} />
                    </button>
                    <button className="cursor-pointer">
                      <Image alt="message-icon" src={MessageIcon} />
                    </button>
                  </Box>
                ) : (
                  <Box sx={styles.icons}>
                    {show_popover && (
                      <Box>
                        <button
                          style={{ border: "none", background: "none", padding: "0px", margin: "0px" }}
                          className="cursor-pointer"
                          onClick={(event) => handleClick(event, userItem?.id || 0)}>
                          <Image alt="menu-icon" src={MenuIcon} />
                        </button>
                        {renderPopover(userItem)}
                      </Box>
                    )}
                  </Box>
                )}
                {userItem?.status && (
                  <Box sx={{ ...styles.icons, left: 0, alignItems: "flex-start", width: 'max-content' }}>
                    <Typography variant="subtitle2" sx={{ ...styles.status, backgroundColor: renderColor[userItem?.status] }}>
                      {userItem?.status}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ px: "12px", pb: "34px" }}>
                  <Typography variant="subtitle2" style={{ cursor: "pointer" }} sx={styles.title} onClick={() => router.push(`/user-profile?id=${userItem?.id}`)}>
                    {userItem?.name}
                  </Typography>
                  <Box sx={styles.locationWrap}>
                    <Image src={LocationIcon} alt="" />
                    <Typography variant="caption" sx={{ color: "grey.800" }}>
                      {`${getStateNameByCode(userItem?.state)} ${getCountryNameByCode(userItem?.country)}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          No data available
        </Typography>
      )
      }
    </Box >
  );
};

export default SurrogatesUser;
