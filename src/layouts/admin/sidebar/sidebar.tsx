"use client";
import React, { useEffect, useState } from "react";
import { Box, List, type SxProps, Typography, LinearProgress } from "@mui/material";
import AvatarImg from "../../../assets/images/avatar.svg";
import Image from "next/image";
import Link from "next/link";
import { sidebarMenuData } from "./sidebar.data";
import { styles } from "./sidebar.styles";
import LogoutIcon from "../../../assets/icons/logout-icon.svg";
import { clearSessionStorage, getSessionStorage } from "@/utils/session-storage";
import { useDetailsQuery } from "@/services/users/users-api";
import { useRouter, usePathname } from "next/navigation";
import { useLogoutMutation } from "@/services/auth-api";
import toast from "react-hot-toast";
import { clearLocalStorage } from "@/utils/local-storage";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';


interface SidebarInterface {
  rootSx?: any;
}

const Sidebar = (props: SidebarInterface) => {
  const { rootSx } = props;
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [sidebarMenuDataState, setSidebarMenuDataState] = useState(sidebarMenuData);

  const authUser = useSelector((state: RootState) => state.auth.user);

  const user: any = getSessionStorage("user");
  const { data }: any = useDetailsQuery({ id: user?.id });
  const [logoutMutation] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const index = sidebarMenuData.findIndex(item => item?.path === pathname);
    setActiveItemIndex(index);
  }, [pathname]);


  useEffect(() => {
    if (data?.data?.user_type === "Surrogate" || data?.data?.user_type === "Intended Parent") {
      setSidebarMenuDataState(sidebarMenuData.filter(item => item?.heading !== 'My Profiles'));
    }


  }, [data]);



  const handleItemClick = (index: number) => {
    setActiveItemIndex(index);
  };

  const handleMenuClick = () => {
    logoutMutation({}).unwrap()
      .then((data: any) => {
        window.location.href = "/login";
        toast.success(data?.message || "Successfully logged out");
        clearSessionStorage();
        clearLocalStorage();
      });
  };


  return (
    <Box sx={{ ...styles.siderbarWrapper, ...rootSx }}>
      <Box>
        {/* profile */}
        <Box sx={styles.profile}>
          <Image
            src={authUser?.images ?? AvatarImg}
            alt=""
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              overflow: "hidden",
              objectPosition: "center",
            }}
            width={50}
            height={50}
          />
          <Box>
            <Typography variant="h5" color="info.main">
              {authUser?.name}
            </Typography>
            <Typography variant="body2" color="info.main">
              {authUser?.user_type ?? "-"}
            </Typography>
          </Box>
        </Box>
        {/* complete profile */}
        <Box sx={styles.completeProfileWrap}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LinearProgress variant="determinate" value={80} classes={{ root: "linear-progress" }} sx={styles.linearProgress} />
            <Typography style={{ color: "#FF414D", fontSize: "14px", fontWeight: 500 }}>
              80%
            </Typography>
          </Box>
          <Link href="" style={styles.completeProfile} onClick={() => router.push("/profile-management")}>
            Complete your Profile
          </Link>
        </Box>

        {/* menu */}
        <Box sx={styles.menu}>
          <List>
            {sidebarMenuDataState?.map((item, index) => (
              <Link
                href={item?.path}
                className={`listItem ${index === activeItemIndex ? "activeListItem" : ""}`}
                onClick={() => {
                  handleItemClick(index);
                }}
                key={index}
              >
                <Image src={item?.icon} alt={item?.heading} className={index === activeItemIndex ? "activeImage" : "regularImage"} />
                <Typography variant="body1" color={index === activeItemIndex ? "grey.100" : "info.main"}>
                  {item?.heading}
                </Typography>
              </Link>
            ))}
            {(user?.user_type === "Intended Parent" || user?.user_type === "Agency") && (
              <Link
                href="/find-surrogate"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                  padding: "10px 24px",
                  gap: "10px",
                  textDecoration: "none",
                  color: "#002E3F",
                  cursor: "pointer",
                }}
              >
                <SearchIcon />
                <Typography sx={styles.linkHover} variant="body1" >
                  Surrogates
                </Typography>
              </Link>
            )}
            {(user?.user_type === "Surrogate" || user?.user_type === "Agency") && (
              <Link
                href="/find-parents"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                  padding: "10px 24px",
                  gap: "10px",
                  textDecoration: "none",
                  color: "#002E3F",
                  cursor: "pointer",
                }}
              >
                <SearchIcon />
                <Typography sx={styles.linkHover} variant="body1" >
                  Intended Parent
                </Typography>
              </Link>
            )}
            {(user?.user_type === "Surrogate" || user?.user_type === "Intended Parent") && (
              <Link
                href="/find-agency"
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0",
                  padding: "10px 24px",
                  gap: "10px",
                  textDecoration: "none",
                  color: "#002E3F",
                  cursor: "pointer",
                  transition: "color 0.3s"
                }}
              >
                <SearchIcon />
                <Typography sx={styles.linkHover} variant="body1" >
                  Agency
                </Typography>
              </Link>
            )}
          </List>
        </Box>
      </Box>
      <Box sx={styles.logout} onClick={handleMenuClick}>
        <Image src={LogoutIcon} alt="" />
        <Typography variant="body2">Log Out</Typography>
      </Box>
    </Box >
  );
};

export default Sidebar;

