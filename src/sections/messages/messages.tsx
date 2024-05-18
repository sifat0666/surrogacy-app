"use client";
import React, { useEffect } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  colors,
  useMediaQuery,
} from "@mui/material";
import { useState, Fragment } from "react";
import { styles } from "./messages.style";
import { messageData } from "./messages.data";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AvatarImg from "../../assets/images/avatar.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDetailsQuery } from "@/services/users/users-api";
import SendMessageIcon from "../../assets/icons/send-message-icon.svg";
import SearchIcon from "@mui/icons-material/Search";
import Face1 from "../../assets/icons/emojis/face-1.svg";
import Face2 from "../../assets/icons/emojis/face-2.svg";
import Face3 from "../../assets/icons/emojis/face-3.svg";
import Face4 from "../../assets/icons/emojis/face-4.svg";
import RecyclingIcon from "@mui/icons-material/Recycling";
import {
  useLoadChatQuery,
  usePostChatMutation,
  useSendMessageMutation,
} from "@/services/chat/chat-api";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from "firebase/app";
import { getSessionStorage } from "@/utils/session-storage";
// date time format
import { format } from "date-fns";
import { identity, random } from "lodash";
import { RootState } from "@/store";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../config";
import {
  PremiumModal,
  VerifyModal,
} from "@/components/premium-modal/premium-modal";
import { useRouter } from "next/navigation";

import DeleteIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "../../assets/icons/close-icon.svg";
import DeleteItemIcon from "../../assets/icons/delete-account-icon.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);

const Messages = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const searchParam = useSearchParams().get("id");
  const { data }: any = useDetailsQuery({ id: searchParam });
  return (
    <Box sx={styles.messageWrap}>
      {isMobile ? (
        <ResponsiveMessage data={data?.data} />
      ) : (
        <DesktopMessage data={data?.data} />
      )}
    </Box>
  );
};

export default Messages;

const DesktopMessage = ({ data }: any) => {
  const [messageValue, setMessageValue] = useState("");
  const [chatData, setChatData] = useState<any>([]);
  // const [sendMessage] = useSendMessageMutation();
  // const { data: fetchedChatData, isError } = useLoadChatQuery({});
  const [selectedItem, setSelectedItem] = useState<any>(chatData);
  const selector = useSelector((state: any) => state.chat);
  const userId = useSearchParams().get("id");
  const recipientId = useSearchParams().get("recipientId");

  const userType = data?.user_type;
  const isParent = userType?.includes("Intended Parent");
  const isSurrogate = userType?.includes("Surrogate");
  const isAgency = userType?.includes("Agency");
  const isPremium = data?.userPlan === "Premium";
  const [messageData, setMessageData] = useState<any>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const authUserToken = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // firebase instance
  const app = initializeApp(firebaseConfig);
  const firestoreDb = getFirestore(app);
  const searchParam = useSearchParams().get("id");

  // Automatically select a chat based on searchParam or the first available chat

  const sendNotification = async (data: any) => {
    const url = `${BASE_URL}/create-notification`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUserToken}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
  };

  const canReplyToRole = (user: any, selectedItem: any) => {
    if (
      user.user_type == "Surrogate" &&
      selectedItem?.user_type == "Intended Parent" &&
      selectedItem.agency != null
    ) {
      return true;
    }
    if (
      user.user_type == "Surrogate" &&
      selectedItem?.friend_type == "Surrogate"
    ) {
      toast.error("You cannot send a message to another surrogate.");
      return false;
    }

    if (
      user.user_type == "Intended Parent" &&
      user.stripe_data.active == false
    ) {
      if (
        user.user_type == "Intended Parent" &&
        selectedItem?.user_type == "Surrogate" &&
        selectedItem?.agency == null
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }
    }
    if (
      user.user_type == "Intended Parent" &&
      selectedItem?.friend_type == "Intended Parent"
    ) {
      toast.error("You cannot send a message to another intended parent.");
      return false;
    }

    if (user.user_type == "Agency" && user.stripe_data.active == false) {
      if (
        user.user_type == "Agency" &&
        selectedItem?.friend_type == "Surrogate"
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }

      if (
        user.user_type == "Agency" &&
        selectedItem?.friend_type == "Intended Parent"
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }
    }
    if (user.user_type == "Agency" && selectedItem?.friend_type == "Agency") {
      setIsPremiumEnvelopModal(true);
      return false;
    }

    return true;
  };

  const handleItemClick = (id: any) => {
    const selectedItem = chatData?.find((item: any) => item?.friend_id === id);
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    // get chat_room of the user
    const chatRoomsCollection = collection(firestoreDb, "chat_room");
    // get all friends of the user from the chat_room the collection is stored as user_id_friend_id
    const user = getSessionStorage("user");
    const user_id = user?.id;
    const q = query(
      chatRoomsCollection,
      where("user_id", "==", user_id),
      where("is_blocked", "==", false),
      where("is_deleted", "==", false),
    );

    const fetchChatData = async () => {
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      setChatData(chatData);
      const selectedItem2 =
        chatData.find((item: any) => item?.friend_id == searchParam) ||
        chatData[0];
      setSelectedItem(selectedItem2);
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    const fetchChatData = () => {
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      const user = getSessionStorage("user");
      const user_id = user?.id;
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user_id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatData(chatData);
      });

      return () => unsubscribe(); // Clean up the subscription
    };

    fetchChatData();
  }, [firestoreDb]);

  useEffect(() => {
    if (selectedItem && selectedItem?.friend_id) {
      // messages are stored in the chats collection with each message having a unique document id
      const chats = collection(firestoreDb, "chats");
      const q = query(
        chats,
        where("sender_id", "in", [
          selectedItem?.friend_id,
          selectedItem?.user_id,
        ]),
        where("receiver_id", "in", [
          selectedItem?.friend_id,
          selectedItem?.user_id,
        ]),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        // Sort messages by date in descending order (latest first)
        messages.sort((a, b) => b.created_at - a.created_at);
        // Reverse the order of messages to display the latest one at the last
        messages.reverse();
        setMessageData(messages);
      });

      return () => unsubscribe(); // Unsubscribe when component unmounts or when dependency changes
    }
  }, [
    selectedItem,
    firestoreDb,
    selectedItem?.friend_id,
    selectedItem?.user_id,
  ]);

  const handleSendMessage = async () => {
    let canReply = canReplyToRole(user, selectedItem);
    if (!canReply) {
      setMessageValue("");
      return;
    }
    if (!selectedItem) {
      alert("Please select a chat before sending a message.");
      return;
    }
    if (!messageValue.trim()) {
      toast.error("Cannot send an empty message.");
      return;
    }
    const recipientId = selectedItem?.friend_id;
    try {
      const user = getSessionStorage("user");
      if (!user?.id || !recipientId) {
        console.error("Sender or receiver ID missing.");
        return;
      }

      const messageData = {
        sender_id: user.id,
        receiver_id: recipientId,
        message: messageValue.trim(),
        created_at: Date.now(),
        seen: false,
      };
      // create hash of the two user ids
      const messagesCollection = collection(firestoreDb, "chats");
      const docRef = await addDoc(messagesCollection, messageData);
      setDoc(doc(messagesCollection, docRef.id), messageData);
      setMessageValue("");

      // now update the chat_room collection with the latest message
      const chatRoomRef = doc(
        firestoreDb,
        "chat_room",
        `${user.id}_${recipientId}`,
      );
      updateDoc(chatRoomRef, {
        prevMessage: messageValue,
        created_at: Date.now(),
        is_deleted: false,
      });

      const chatRoomRef2 = doc(
        firestoreDb,
        "chat_room",
        `${recipientId}_${user.id}`,
      );
      updateDoc(chatRoomRef2, {
        prevMessage: messageValue,
        created_at: Date.now(),
        is_deleted: false,
      });

      // send notification
      const notificationData = {
        user_id: recipientId,
        target_user_id: user.id,
        title: "message",
        description: messageValue,
        created_at: Date.now(),
        is_seen: false,
      };
      sendNotification(notificationData);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleSearch = async (e: any) => {
    setChatData(chatData);
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredData = chatData.filter((item: any) =>
        item?.friend_name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setChatData(filteredData);
    } else {
      // get chat_room of the user
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      // get all friends of the user from the chat_room the collection is stored as user_id_friend_id
      const user = getSessionStorage("user");
      const user_id = user?.id;
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user_id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      //
      setChatData(chatData);

      if (chatData.length > 0) {
        setSelectedItem(chatData[0]); // Set the first chat as selected
      }
    }
  };

  const handleDeleteClick = (id: any) => {
    setDeleteItemId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    // find the chat room with the friend_id
    const chatRoomRef = doc(
      firestoreDb,
      "chat_room",
      `${user.id}_${deleteItemId}`,
    );
    const chatRoomSnap = await getDoc(chatRoomRef);
    if (chatRoomSnap.exists()) {
      // Update is_blocked field if the document exists
      await updateDoc(chatRoomRef, {
        is_deleted: true,
      });
      // set chatData to the updated chatData
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user.id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      //
      setChatData(chatData);
      if (chatData.length > 0) {
        setSelectedItem(chatData[0]); // Set the first chat as selected
      } else {
        setSelectedItem(null);
      }
      // close the dialog
      setOpenDialog(false);
    } else {
      console.error("Chat room does not exist.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <PremiumModal
        open={isPremiumEnvelopModal}
        onClose={() => setIsPremiumEnvelopModal(false)}
        handleOnClickModal={() => router.push("/membership")}
      />
      <VerifyModal
        open={isVerifyEnvelopModal}
        onClose={() => setIsVerifyEnvelopModal(false)}
      />
      <Grid container spacing={2}>
        {/* searchbar */}
        <Grid item xs={8}>
          <TextField
            name="search"
            fullWidth
            placeholder="Search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton style={{ color: "#FF414D" }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* users */}
        <Grid item xs={12} md={5}>
          <Box
            sx={styles.usersWrapper}
            style={{ height: "600px", overflow: "auto" }}
          >
            <Typography
              variant="h4"
              color="info.main"
              pb="26px"
              classes={{ root: "font-grotesk" }}
            >
              Chats
            </Typography>
            {chatData && chatData.length > 0 ? (
              chatData?.map((item: any) => (
                <Box
                  sx={styles.content}
                  onClick={() => handleItemClick(item?.friend_id)}
                  key={item?.id}
                  className="content"
                >
                  <Box sx={styles.messageContent}>
                    {item?.image === null ? (
                      <Image src={AvatarImg} alt="" width={32} height={32} />
                    ) : (
                      <Image
                        style={{ borderRadius: "50%" }}
                        src={item?.image}
                        width={40}
                        height={40}
                        alt=""
                      />
                    )}
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, color: "info.main" }}
                      >
                        {item?.friend_name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "12px", color: "info.main" }}
                      >
                        {item?.prevMessage}
                      </Typography>
                    </Box>
                  </Box>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="subtitle1" sx={styles.date}>
                      {/* format created_at . current one is like April 12, 2021 12:23 */}
                      {format(new Date(item?.created_at), "hh:mm a")}
                    </Typography>
                    <IconButton
                      onClick={() => handleDeleteClick(item?.friend_id)}
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>
              ))
            ) : (
              <Typography variant="subtitle1" color="info.main">
                No chats available
              </Typography>
            )}
          </Box>
        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">
            {/* <Image src={CloseIcon} alt="" style={{ cursor: "pointer" }} /> */}
          </DialogTitle>
          <Box sx={{ textAlign: "center", px: "40px", pb: "40px" }}>
            <Image src={DeleteItemIcon} alt="" />
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="info.main"
              pt="24px"
            >
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </Typography>
            <Typography variant="caption" color="info.main" pt="8px">
              Your chat will be deleted permanently
            </Typography>
            <Stack spacing={"24px"} mt="24px">
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FF3636 !important" }}
                onClick={handleDeleteConfirm}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#F4F4F4 !important", color: "#FF3636" }}
                onClick={handleDialogClose}
              >
                DON’T Delete
              </Button>
            </Stack>
          </Box>
        </Dialog>
        {/* message */}
        <Grid item xs={12} md={7}>
          <Box sx={{ ...styles.usersWrapper, px: "0" }}>
            <Box sx={styles.profile}>
              {/* check if image exists */}
              {selectedItem?.image == null ? (
                <Image
                  style={{ borderRadius: "50%" }}
                  src={AvatarImg}
                  width={50}
                  height={50}
                  alt=""
                />
              ) : (
                <Image
                  style={{ borderRadius: "50%" }}
                  src={selectedItem?.image}
                  width={50}
                  height={50}
                  alt=""
                />
              )}
              {selectedItem?.friend_name ? (
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "info.main" }}
                >
                  {selectedItem?.friend_name}
                </Typography>
              ) : (
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "info.main" }}
                >
                  No user selected
                </Typography>
              )}
            </Box>
            <Divider />
            <Box>
              <Box sx={{ my: "36px", height: "510px", overflow: "auto" }}>
                {messageData && messageData.length > 0 ? (
                  messageData?.map((message: any, i: any) => (
                    <Box
                      key={i}
                      sx={
                        message.receiver_id === user.id
                          ? styles.featuredMessage
                          : styles.featuredMessage2
                      }
                    >
                      {message?.receiver_id === user?.id ? (
                        <Box sx={{ width: "280px" }}>
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            {selectedItem?.image == null ? (
                              <Image
                                src={AvatarImg}
                                alt=""
                                width={32}
                                height={32}
                              />
                            ) : (
                              <Image
                                style={{ borderRadius: "50%" }}
                                src={selectedItem?.image}
                                width={32}
                                height={32}
                                alt=""
                              />
                            )}
                            <Typography
                              variant="caption"
                              sx={styles.doctorMessage}
                            >
                              {/* check if message is a value from face,face2, face3, face4 */}
                              {message?.message === "face1" ? (
                                <Image width={40} src={Face1} alt="" />
                              ) : message?.message == "face2" ? (
                                <Image width={40} src={Face2} alt="" />
                              ) : message?.message === "face3" ? (
                                <Image width={40} src={Face3} alt="" />
                              ) : message?.message === "face4" ? (
                                <Image width={40} src={Face4} alt="" />
                              ) : (
                                message?.message
                              )}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={styles.time}>
                            {format(new Date(message.created_at), "hh:mm a")}
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Typography
                              variant="caption"
                              sx={styles.patientMessage}
                            >
                              {/* check if message is a value from face,face2, face3, face4 */}
                              {message?.message === "face1" ? (
                                <Image width={40} src={Face1} alt="" />
                              ) : message?.message == "face2" ? (
                                <Image width={40} src={Face2} alt="" />
                              ) : message?.message === "face3" ? (
                                <Image width={40} src={Face3} alt="" />
                              ) : message?.message === "face4" ? (
                                <Image width={40} src={Face4} alt="" />
                              ) : (
                                message?.message
                              )}
                            </Typography>
                            {user?.images ? (
                              <Image
                                style={{ borderRadius: "50%" }}
                                src={user?.images}
                                alt=""
                                width={32}
                                height={32}
                              />
                            ) : (
                              <Image
                                style={{ borderRadius: "50%" }}
                                src={AvatarImg}
                                alt=""
                                width={32}
                                height={32}
                              />
                            )}
                          </Box>
                          <Typography
                            variant="caption"
                            sx={{
                              ...styles.time,
                              justifyContent: "flex-start",
                            }}
                          >
                            {format(new Date(message.created_at), "hh:mm a")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="subtitle1"
                    color="info.main"
                    style={{ margin: "20px 30px" }}
                  >
                    No messages available
                  </Typography>
                )}
              </Box>
              {/* send message */}
              <Box sx={{ px: "29px" }}>
                <TextField
                  name="send-message"
                  value={messageValue}
                  fullWidth
                  placeholder="Send Message"
                  onChange={(e) => setMessageValue(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSendMessage}>
                          <Image
                            src={SendMessageIcon}
                            alt=""
                            className="cursor-pointer"
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Info Notice */}
        <Grid item xs={12}>
          <Box
            style={{
              padding: "20px",
              background: "#e1dfdf",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h5"
              color="info.main"
              pb="14px"
              fontWeight={500}
            >
              <RecyclingIcon sx={{ color: "info.main", fontSize: "20px" }} />
              Notice:
            </Typography>
            <Typography variant="body1" color="info.main">
              For your own safety and protection, only pay and communicate
              through FindSurrogate. Never share personal information like ID
              documents and bank details with someone you never met.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ResponsiveMessage = ({ data }: any) => {
  const [messageValue, setMessageValue] = useState("");
  const [chatData, setChatData] = useState<any>([]);
  // const [sendMessage] = useSendMessageMutation();
  // const { data: fetchedChatData, isError } = useLoadChatQuery({});
  const [selectedItem, setSelectedItem] = useState<any>(chatData);
  const selector = useSelector((state: any) => state.chat);
  const userId = useSearchParams().get("id");
  const recipientId = useSearchParams().get("recipientId");

  const userType = data?.user_type;
  const isParent = userType?.includes("Intended Parent");
  const isSurrogate = userType?.includes("Surrogate");
  const isAgency = userType?.includes("Agency");
  const isPremium = data?.userPlan === "Premium";
  const [messageData, setMessageData] = useState<any>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  const authUserToken = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const [isPremiumEnvelopModal, setIsPremiumEnvelopModal] = useState(false);
  const [isVerifyEnvelopModal, setIsVerifyEnvelopModal] = useState(false);
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // firebase instance
  const app = initializeApp(firebaseConfig);
  const firestoreDb = getFirestore(app);
  const searchParam = useSearchParams().get("id");

  // Automatically select a chat based on searchParam or the first available chat

  const sendNotification = async (data: any) => {
    const url = `${BASE_URL}/create-notification`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUserToken}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
  };

  const canReplyToRole = (user: any, selectedItem: any) => {
    if (
      user.user_type == "Surrogate" &&
      selectedItem?.user_type == "Intended Parent" &&
      selectedItem.agency != null
    ) {
      return true;
    }
    if (
      user.user_type == "Surrogate" &&
      selectedItem?.friend_type == "Surrogate"
    ) {
      toast.error("You cannot send a message to another surrogate.");
      return false;
    }

    if (
      user.user_type == "Intended Parent" &&
      user.stripe_data.active == false
    ) {
      if (
        user.user_type == "Intended Parent" &&
        selectedItem?.user_type == "Surrogate" &&
        selectedItem?.agency == null
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }
    }
    if (
      user.user_type == "Intended Parent" &&
      selectedItem?.friend_type == "Intended Parent"
    ) {
      toast.error("You cannot send a message to another intended parent.");
      return false;
    }

    if (user.user_type == "Agency" && user.stripe_data.active == false) {
      if (
        user.user_type == "Agency" &&
        selectedItem?.friend_type == "Surrogate"
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }

      if (
        user.user_type == "Agency" &&
        selectedItem?.friend_type == "Intended Parent"
      ) {
        setIsPremiumEnvelopModal(true);
        return false;
      }
    }
    if (user.user_type == "Agency" && selectedItem?.friend_type == "Agency") {
      setIsPremiumEnvelopModal(true);
      return false;
    }

    return true;
  };

  const handleItemClick = (id: any) => {
    const selectedItem = chatData?.find((item: any) => item?.friend_id === id);
    setSelectedItem(selectedItem);
  };

  useEffect(() => {
    // get chat_room of the user
    const chatRoomsCollection = collection(firestoreDb, "chat_room");
    // get all friends of the user from the chat_room the collection is stored as user_id_friend_id
    const user = getSessionStorage("user");
    const user_id = user?.id;
    const q = query(
      chatRoomsCollection,
      where("user_id", "==", user_id),
      where("is_blocked", "==", false),
      where("is_deleted", "==", false),
    );

    const fetchChatData = async () => {
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      setChatData(chatData);
      const selectedItem2 =
        chatData.find((item: any) => item?.friend_id == searchParam) ||
        chatData[0];
      setSelectedItem(selectedItem2);
    };

    fetchChatData();
  }, []);

  useEffect(() => {
    const fetchChatData = () => {
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      const user = getSessionStorage("user");
      const user_id = user?.id;
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user_id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatData(chatData);
      });

      return () => unsubscribe(); // Clean up the subscription
    };

    fetchChatData();
  }, [firestoreDb]);

  useEffect(() => {
    if (selectedItem && selectedItem?.friend_id) {
      // messages are stored in the chats collection with each message having a unique document id
      const chats = collection(firestoreDb, "chats");
      const q = query(
        chats,
        where("sender_id", "in", [
          selectedItem?.friend_id,
          selectedItem?.user_id,
        ]),
        where("receiver_id", "in", [
          selectedItem?.friend_id,
          selectedItem?.user_id,
        ]),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        // Sort messages by date in descending order (latest first)
        messages.sort((a, b) => b.created_at - a.created_at);
        // Reverse the order of messages to display the latest one at the last
        messages.reverse();
        setMessageData(messages);
      });

      return () => unsubscribe(); // Unsubscribe when component unmounts or when dependency changes
    }
  }, [
    selectedItem,
    firestoreDb,
    selectedItem?.friend_id,
    selectedItem?.user_id,
  ]);

  const handleSendMessage = async () => {
    let canReply = canReplyToRole(user, selectedItem);
    if (!canReply) {
      setMessageValue("");
      return;
    }
    if (!selectedItem) {
      alert("Please select a chat before sending a message.");
      return;
    }
    if (!messageValue.trim()) {
      toast.error("Cannot send an empty message.");
      return;
    }
    const recipientId = selectedItem?.friend_id;
    try {
      const user = getSessionStorage("user");
      if (!user?.id || !recipientId) {
        console.error("Sender or receiver ID missing.");
        return;
      }

      const messageData = {
        sender_id: user.id,
        receiver_id: recipientId,
        message: messageValue.trim(),
        created_at: Date.now(),
        seen: false,
      };
      // create hash of the two user ids
      const messagesCollection = collection(firestoreDb, "chats");
      const docRef = await addDoc(messagesCollection, messageData);
      setDoc(doc(messagesCollection, docRef.id), messageData);
      setMessageValue("");

      // now update the chat_room collection with the latest message
      const chatRoomRef = doc(
        firestoreDb,
        "chat_room",
        `${user.id}_${recipientId}`,
      );
      updateDoc(chatRoomRef, {
        prevMessage: messageValue,
        created_at: Date.now(),
        is_deleted: false,
      });

      const chatRoomRef2 = doc(
        firestoreDb,
        "chat_room",
        `${recipientId}_${user.id}`,
      );
      updateDoc(chatRoomRef2, {
        prevMessage: messageValue,
        created_at: Date.now(),
        is_deleted: false,
      });

      // send notification
      const notificationData = {
        user_id: recipientId,
        target_user_id: user.id,
        title: "message",
        description: messageValue,
        created_at: Date.now(),
        is_seen: false,
      };
      sendNotification(notificationData);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleSearch = async (e: any) => {
    setChatData(chatData);
    const searchValue = e.target.value;
    if (searchValue) {
      const filteredData = chatData.filter((item: any) =>
        item?.friend_name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setChatData(filteredData);
    } else {
      // get chat_room of the user
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      // get all friends of the user from the chat_room the collection is stored as user_id_friend_id
      const user = getSessionStorage("user");
      const user_id = user?.id;
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user_id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      //
      setChatData(chatData);

      if (chatData.length > 0) {
        setSelectedItem(chatData[0]); // Set the first chat as selected
      }
    }
  };

  const handleDeleteClick = (id: any) => {
    setDeleteItemId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    // find the chat room with the friend_id
    const chatRoomRef = doc(
      firestoreDb,
      "chat_room",
      `${user.id}_${deleteItemId}`,
    );
    const chatRoomSnap = await getDoc(chatRoomRef);
    if (chatRoomSnap.exists()) {
      // Update is_blocked field if the document exists
      await updateDoc(chatRoomRef, {
        is_deleted: true,
      });
      // set chatData to the updated chatData
      const chatRoomsCollection = collection(firestoreDb, "chat_room");
      const q = query(
        chatRoomsCollection,
        where("user_id", "==", user.id),
        where("is_blocked", "==", false),
        where("is_deleted", "==", false),
      );
      const querySnapshot = await getDocs(q);
      const chatData = querySnapshot.docs.map((doc) => doc.data());
      //
      setChatData(chatData);
      if (chatData.length > 0) {
        setSelectedItem(chatData[0]); // Set the first chat as selected
      } else {
        setSelectedItem(null);
      }
      // close the dialog
      setOpenDialog(false);
    } else {
      console.error("Chat room does not exist.");
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <Box sx={styles.messageWrap}>
      {isPremiumEnvelopModal && (
        <PremiumModal
          open={isPremiumEnvelopModal}
          onClose={() => setIsPremiumEnvelopModal(false)}
          handleOnClickModal={() => router.push("/membership")}
        />
      )}
      {isVerifyEnvelopModal && (
        <VerifyModal
          open={isVerifyEnvelopModal}
          onClose={() => setIsVerifyEnvelopModal(false)}
        />
      )}
      {selectedItem ? (
        <Box sx={{ minHeight: "550px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(0,0,0,0.1)",
              // gap: "10px",
              padding: "5px 10px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <KeyboardBackspaceIcon
              sx={{
                color: "rgba(0,0,0,0.4)",
                fontSize: "24px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedItem(null)}
            />
            <Typography
              variant="subtitle1"
            >
              {selectedItem?.friend_name}
            </Typography>
          </Box>
          <Box
            sx={{
              minHeight: "450px",
              maxHeight: "450px",
              overflowY: "auto"
            }}
          >
            {messageData.map((message: any, i: any) => (
              <Box
                key={i}
                sx={
                  message.receiver_id === user.id
                    ? styles.featuredMessage
                    : styles.featuredMessage2
                }
              >
                {message?.receiver_id === user?.id ? (
                  <Box sx={{ minWidth: "150px" }}>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                      {selectedItem?.image === null ? (
                        <Image src={AvatarImg} alt="" width={32} height={32} />
                      ) : (
                        <Image
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={selectedItem?.image}
                          width={40}
                          height={40}
                          alt=""
                        />
                      )}
                      <Typography variant="caption" sx={styles.doctorMessage}>

                        {message?.message === "face1" ? (
                          <Image width={40} src={Face1} alt="" />
                        ) : message?.message == "face2" ? (
                          <Image width={40} src={Face2} alt="" />
                        ) : message?.message === "face3" ? (
                          <Image width={40} src={Face3} alt="" />
                        ) : message?.message === "face4" ? (
                          <Image width={40} src={Face4} alt="" />
                        ) : (
                          message?.message
                        )}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={styles.time}>
                      {/* Format created_at */}
                      {format(new Date(message.created_at), "hh:mm a")}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ minWidth: "150px" }}>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                      <Typography variant="caption" sx={styles.patientMessage}>
                        {message?.message === "face1" ? (
                          <Image width={40} src={Face1} alt="" />
                        ) : message?.message == "face2" ? (
                          <Image width={40} src={Face2} alt="" />
                        ) : message?.message === "face3" ? (
                          <Image width={40} src={Face3} alt="" />
                        ) : message?.message === "face4" ? (
                          <Image width={40} src={Face4} alt="" />
                        ) : (
                          message?.message
                        )}
                      </Typography>
                      {user?.images === null ? (
                        <Image src={AvatarImg} alt="" width={32} height={32} />
                      ) : (
                        <Image
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          src={user?.images}
                          width={40}
                          height={40}
                          alt=""
                        />
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ ...styles.time, justifyContent: "flex-start" }}
                    >
                      {/* Format created_at */}
                      {format(new Date(message.created_at), "hh:mm a")}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          {/* Send message input */}
          <TextField
            name="send-message"
            value={messageValue}
            fullWidth
            placeholder="Send Message"
            onChange={(e) => setMessageValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage}>
                    <Image
                      src={SendMessageIcon}
                      alt=""
                      className="cursor-pointer"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ) : (
        <Box sx={styles.chat}>
          {chatData.map((item, index) => (
            <Fragment key={index}>
              <Box
                sx={styles.content}
                onClick={() => handleItemClick(item?.friend_id)}
                key={item?.id}
                className="content"
              >
                <Box sx={styles.messageContent}>
                  <Image
                    src={item.image ? item.image : AvatarImg}
                    alt=""
                    width="32"
                    height="32"
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: "info.main" }}
                    >
                      {item?.friend_name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "12px", color: "info.main" }}
                    >
                      {item?.prevMessage}
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="column" spacing={1}>
                  <Typography variant="subtitle1" sx={styles.date}>
                    {/* Format created_at */}
                    {format(new Date(item?.created_at), "hh:mm a")}
                  </Typography>
                  {/* <IconButton onClick={() => handleDeleteClick(item?.friend_id)} style={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton> */}
                </Stack>
              </Box>
            </Fragment>
          ))}
        </Box>
      )
      }
    </Box >
  );
};
