"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  useMediaQuery,
  Button,
  Typography,
  Popover,
} from "@mui/material";
import { CustomDropDown } from "./custom-dropdown";
import MenuIcon from "../../../assets/icons/menu-icon.svg";
import AvatarImg from "../../../assets/images/avatar.svg";
import surrogate_logo from "../../../assets/images/surrogate_logo.png";
import LogoImg from "../../../assets/images/logo.svg";
import {
  adminData,
  menuData,
  menuDataAgency,
  menuDataParent,
  menuDataSurrogate,
} from "./header.data";
import { styles } from "./header.styles";
import { HeaderDrawer } from "./header-drawer";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useLogoutMutation } from "@/services/auth-api";
import {
  clearSessionStorage,
  getSessionStorage,
} from "@/utils/session-storage";
import { clearLocalStorage } from "@/utils/local-storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { useForm, FormProvider } from "react-hook-form";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect } from "react";
import { BASE_URL } from "../../../../config";

import { RHFSwitch } from "@/components/rhf/rhf-switch";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "@/slices/auth/reducer";
import NotificationIcon from "../../../assets/icons/notification-icon.svg";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const isMobile = useMediaQuery("(max-width:1020px)");
  const [logoutMutation] = useLogoutMutation();
  const route = useRouter();
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<HTMLButtonElement | null>(null); // State for notifications popover
  const [notificationsAnchorEl2, setNotificationsAnchorEl2] =
    useState<HTMLButtonElement | null>(null); // State for notifications popover
  const [notifications, setNotifications] = useState<any[]>([]); // State to store notifications
  const authUserToken = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const authUser = useSelector((state: RootState) => state.auth.user);
  const activeUser = authUser?.user_type;
  let uddatedMenuData: any = menuData;

  if (activeUser === "Agency") {
    uddatedMenuData = menuDataAgency;
  }
  if (activeUser === "Intended Parent") {
    uddatedMenuData = menuDataParent;
  }
  if (activeUser === "Surrogate") {
    uddatedMenuData = menuDataSurrogate;
  }

  const { watch } = useForm();
  const methods = useForm();

  // Watch for changes to the RHFSwitch component
  const mySwitchValue = watch("mySwitch");

  // Function to handle change of the RHFSwitch
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => { };

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${BASE_URL}/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUserToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setNotifications(data.notifications); // Adjust according to your API response structure
        })
        .catch((error) => {
          console.error("Failed to fetch notifications:", error);
        });
    }
  }, [isAuthenticated]);

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotificationsClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setNotificationsAnchorEl(event.currentTarget); // Open notifications popover
  };

  const handleNotificationsClick2 = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setNotificationsAnchorEl2(event.currentTarget); // Open notifications popover
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null); // Close notifications popover
  };
  const handleNotificationsClose2 = () => {
    setNotificationsAnchorEl2(null); // Close notifications popover
  };

  const markAllNotificationsAsRead = () => {
    // Assuming there's an endpoint to mark all notifications as read
    fetch(`${BASE_URL}/mark-read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUserToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns the updated list of notifications
        setNotifications(data.notifications); // Update your state accordingly
        toast.success("All notifications marked as read.");
      })
      .catch((error) => {
        console.error("Failed to mark notifications as read:", error);
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const notificationsOpen = Boolean(notificationsAnchorEl); // Determine if notifications popover is open
  const notificationsId = notificationsOpen
    ? "notifications-popover"
    : undefined; // Set ID for notifications popover
  const notificationsOpen2 = Boolean(notificationsAnchorEl2); // Determine if notifications popover is open
  const notificationsId2 = notificationsOpen2
    ? "notifications-popover2"
    : undefined; // Set ID for notifications popover



  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClickPopover = (type: string) => {
    switch (type) {
      case "account-setting":
        route.push("/account-settings");
        break;
      case "logout":
        logoutMutation({})
          .unwrap()
          .then((data: any) => {
            window.location.href = "/login";
            toast.success(data?.message || "Successfully logged out");
            clearSessionStorage();
            clearLocalStorage();
          });
        break;
      default:
    }
  };

  return (
    <Box
      sx={{
        ...styles.headerWrap,
        py: isMobile ? "14px" : "0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item
            xs={10}
            md={2.5}
            lg={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {isAuthenticated && isMobile ? (
              // Render notifications icon on mobile
              <>
                <ListItem sx={styles.menuItem} onClick={handleNotificationsClick2}>
                  <NotificationsNoneIcon
                    style={{
                      fontSize: "32px",
                    }}
                  />
                  {notifications?.length > 0 && (
                    <div
                      style={{
                        width: 9,
                        height: 9,
                        backgroundColor: "red",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 6,
                        right: 7,
                      }}
                    ></div>
                  )}
                </ListItem>
                <Popover
                  id={notificationsId + "2"}
                  open={notificationsOpen2}
                  anchorEl={notificationsAnchorEl2}
                  onClose={handleNotificationsClose2}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {/* notifications with image, title and content */}
                  <Box
                    // style={{
                    //   maxWidth: 300, // Set maximum width
                    //   maxHeight: "80vh", // Set maximum height
                    //   overflowY: "auto",
                    // }}
                    style={{
                      width: 300,
                      height: 300,
                      overflowY: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 2,
                        backgroundColor: "#F4F4F4",
                        padding: "8px 10px",
                      }}
                    >
                      <Typography variant="h6" color="info.main">
                        Notifications
                      </Typography>
                      <Typography
                        sx={{
                          cursor: "pointer",
                          color: "gray",
                          fontSize: "13px",
                        }}
                        onClick={markAllNotificationsAsRead}
                      >
                        Mark all as read
                      </Typography>
                    </Box>
                    {notifications.length > 0 ? (
                      notifications?.map((notification) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                            padding: "10px 12px",
                            borderBottom: "1px solid #F4F4F4",
                          }}
                          onClick={() => {
                            console.log(notification);
                            if (notification.title == "message") {
                              route.push(
                                `/messages?id=${notification?.target_user?.id}`,
                              );
                            } else {
                              route.push(
                                `/user-profile?id=${notification?.target_user?.id}`,
                              );
                            }
                          }}
                        >
                          {notification?.target_user?.images ? (
                            <Image
                              src={
                                notification?.target_user?.images
                                  ? notification?.target_user?.images
                                  : AvatarImg
                              }
                              alt="avatar"
                              style={{
                                borderRadius: "10%",
                                objectFit: "cover",
                              }}
                              width={50}
                              height={50}
                            />
                          ) : (
                            <Image
                              src={AvatarImg ? AvatarImg : AvatarImg}
                              alt="avatar"
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                              width={50}
                              height={50}
                            />
                          )}
                          <Box>
                            <Typography
                              sx={{
                                cursor: "pointer",
                                color: "info.main",
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              {notification?.target_user?.name}
                            </Typography>
                            <Typography
                              sx={{
                                color: "info.main",
                                fontSize: "14px",
                                lineHeight: "1.3",
                              }}
                            >
                              {notification.title == "message"
                                ? "just sent you a message" +
                                ' "' +
                                notification.description +
                                '"'
                                : notification.title}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box>
                          <Typography variant="body1" color="info.main">
                            No New Notifications
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Popover>
              </>
            ) : (
              // Render logo on desktop
              <Link href="/" style={{ cursor: "pointer" }}>
                <Image
                  style={{
                    cursor: "pointer",
                    marginTop: isMobile ? "0px" : "10px",
                    width: isMobile ? "180px" : "186px",
                    height: isMobile ? "43px" : "36px",
                    objectFit: "contain",
                  }}
                  src={surrogate_logo}
                  alt="Find Surrogate Logo"
                />
              </Link>
            )}
            {!isAuthenticated && (
              <>
                {isMobile && (
                  <Button
                    style={{
                      backgroundColor: "#00C9D4",
                      color: "white",
                      marginLeft: "auto",
                      borderRadius: "10px",
                      fontSize: "10px",
                    }}
                    onClick={() => route.push("/register")}
                  >
                    Sign Up
                  </Button>
                )}
              </>
            )}
          </Grid>
          {!isMobile && (
            <Grid item xs={6} md={6.5} lg={7}>
              <List sx={styles.menuList}>
                {uddatedMenuData?.map((item: any, index: any) =>
                  item?.isSubMenu ? (
                    <Box key={item?.id}>
                      <CustomDropDown
                        data={item?.submenu}
                        title={item?.title}
                      />
                    </Box>
                  ) : (
                    <ListItem key={item?.id} sx={styles.menuItem}>
                      <Link href={item?.path ? item?.path : ""}>
                        {item?.title}
                      </Link>
                    </ListItem>
                  ),
                )}
              </List>
            </Grid>
          )}
          <Grid item md={3} lg={3} sx={{ textAlign: "right" }}>
            {!isMobile ? (
              isAuthenticated ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <ListItem
                    sx={styles.menuItem}
                    onClick={handleNotificationsClick}
                  >
                    {/* <NotificationsNoneIcon /> */}
                    <div>
                      <NotificationsNoneIcon
                        style={{
                          fontSize: "32px",
                        }}
                      />
                      {notifications?.length > 0 && (
                        <div
                          style={{
                            width: 9,
                            height: 9,
                            backgroundColor: "red",
                            borderRadius: "50%",
                            position: "absolute",
                            top: 6,
                            right: 7,
                          }}
                        ></div>
                      )}
                    </div>
                  </ListItem>
                  <Popover
                    id={notificationsId}
                    open={notificationsOpen}
                    anchorEl={notificationsAnchorEl}
                    onClose={handleNotificationsClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    {/* notifications with image, title and content */}
                    <Box
                      // style={{
                      //   maxWidth: 300, // Set maximum width
                      //   maxHeight: "80vh", // Set maximum height
                      //   overflowY: "auto",
                      // }}
                      style={{
                        width: 300,
                        height: 300,
                        overflowY: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 2,
                          backgroundColor: "#F4F4F4",
                          padding: "8px 10px",
                        }}
                      >
                        <Typography variant="h6" color="info.main">
                          Notifications
                        </Typography>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: "gray",
                            fontSize: "13px",
                          }}
                          onClick={markAllNotificationsAsRead}
                        >
                          Mark all as read
                        </Typography>
                      </Box>
                      {notifications.length > 0 ? (
                        notifications?.map((notification) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 2,
                              padding: "10px 12px",
                              borderBottom: "1px solid #F4F4F4",
                            }}
                            onClick={() => {
                              console.log(notification);
                              if (notification.title == "message") {
                                route.push(
                                  `/messages?id=${notification?.target_user?.id}`,
                                );
                              } else {
                                route.push(
                                  `/user-profile?id=${notification?.target_user?.id}`,
                                );
                              }
                            }}
                          >
                            {notification?.target_user?.images ? (
                              <Image
                                src={
                                  notification?.target_user?.images
                                    ? notification?.target_user?.images
                                    : AvatarImg
                                }
                                alt="avatar"
                                style={{
                                  borderRadius: "10%",
                                  objectFit: "cover",
                                }}
                                width={50}
                                height={50}
                              />
                            ) : (
                              <Image
                                src={AvatarImg ? AvatarImg : AvatarImg}
                                alt="avatar"
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                                width={50}
                                height={50}
                              />
                            )}
                            <Box>
                              <Typography
                                sx={{
                                  cursor: "pointer",
                                  color: "info.main",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                }}
                              >
                                {notification?.target_user?.name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "info.main",
                                  fontSize: "14px",
                                  lineHeight: "1.3",
                                }}
                              >
                                {notification.title == "message"
                                  ? "just sent you a message" +
                                  ' "' +
                                  notification.description +
                                  '"'
                                  : notification.title}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Box>
                            <Typography variant="body1" color="info.main">
                              No New Notifications
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Popover>
                  <ListItem sx={styles.menuItem}>
                    <Link href="/dashboard">Dashboard</Link>
                  </ListItem>
                  <Box
                    sx={styles.dashboard}
                    onClick={handleClick}
                    aria-describedby={id}
                  >
                    <Image
                      src={authUser?.images ? authUser?.images : AvatarImg}
                      alt="avatar"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                      width={50}
                      height={50}
                    />
                  </Box>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    sx={styles.popover}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <List>
                      {adminData?.map((item: any) => (
                        <ListItem
                          key={item?.id}
                          sx={{
                            ...styles.menuItem,
                            py: 1.5,
                            px: 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                          }}
                          onClick={() => {
                            handleClickPopover(item?.type);
                          }}
                        >
                          <Image
                            src={item?.icon ? item?.icon : AvatarImg}
                            alt=""
                          />
                          <Typography variant="body1" color="info.main">
                            {item?.title}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Popover>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="/login"
                    style={{
                      color: "#002D40",
                      fontSize: "16px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FF414D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#002D40")
                    }
                  >
                    Log in
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => route.push("/register")}
                  >
                    REGISTER FOR FREE
                  </Button>
                </Box>
              )
            ) : (
              <Box onClick={toggleDrawer}>
                <Image src={MenuIcon ? MenuIcon : AvatarImg} alt="" />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
      {/* responsive */}
      <HeaderDrawer
        open={drawerOpen}
        onClose={toggleDrawer}
        data={uddatedMenuData}
      />
    </Box>
  );
};

export default Header;

const linkStyle = {
  linkHover: {
    "&:hover": {
      color: "#FF414D",
    },
  },
};
