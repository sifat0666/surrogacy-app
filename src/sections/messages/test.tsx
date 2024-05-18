
"use client";
import React, { useEffect } from "react";
import { Box, Divider, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from "@mui/material";
import { useState, Fragment } from "react";
import { styles } from "./messages.style";
import { messageData } from "./messages.data";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AvatarImg from "../../assets/images/avatar.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDetailsQuery } from "@/services/users/users-api";
import SendMessageIcon from "../../assets/icons/send-message-icon.svg";
import { useLoadChatQuery, usePostChatMutation, useSendMessageMutation } from "@/services/chat/chat-api";
import { useSelector } from "react-redux";

const Messages = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const searchParam = useSearchParams().get("id");
  const { data }: any = useDetailsQuery({ id: searchParam });
  return (
    <Box sx={styles.messageWrap}>
      {isMobile ? <ResponsiveMessage data={data?.data} /> : <DesktopMessage data={data?.data} />}
    </Box>
  );
};

export default Messages;

const DesktopMessage = ({ data }: any) => {
  const [messageValue, setMessageValue] = useState('');
  const [chatData, setChatData] = useState<any>([]);
  const [sendMessage] = useSendMessageMutation();
  const { data: fetchedChatData, isError } = useLoadChatQuery({});
  const [selectedItem, setSelectedItem] = useState<any>(chatData);
  const selector = useSelector((state: any) => state.chat);

  useEffect(() => {
    async function fetchChatData() {
      try {
        setChatData(fetchedChatData?.chats);
      } catch (error) {
        console.error('Error fetching chat data:', error, isError);
      }
    }
    if (fetchedChatData) {
      fetchChatData();
    }
  }, [fetchedChatData, isError]);

  const handleItemClick = (id: any) => {
    const selectedItem = chatData?.find((item: any) => item?.id === id);
    setSelectedItem(selectedItem);
  };

  const userType = data?.user_type;
  const isParent = userType?.includes('Intended Parent');
  const isSurrogate = userType?.includes('Surrogate');
  const isAgency = userType?.includes('Agency');
  const isPremium = data?.userPlan === 'Premium';

  const canReplyToRole = (role: string) => {
    if (isPremium) {
      if (userType === 'Intended Parent') {
        return role === 'Agency';
      } else if (userType === 'Surrogate') {
        return role === 'Agency';
      } else if (userType === 'Agency') {
        return role !== 'Agency';
      }
    } else {
      if (userType === 'Intended Parent') {
        return role === 'Agency';
      } else if (userType === 'Surrogate') {
        return role === 'Parent';
      } else if (userType === 'Agency') {
        return false;
      }
    }
  };

  const canStartChatWithRole = (role: string) => {
    if (isPremium) {
      if (userType === 'Intended Parent') {
        return role === 'Surrogate';
      } else if (userType === 'Surrogate') {
        return role === 'Surrogate';
      } else if (userType === 'Agency') {
        return role === 'Surrogate';
      }
    } else {
      if (userType === 'Intended Parent') {
        return false;
      } else if (userType === 'Surrogate') {
        return role === 'Agency';
      } else if (userType === 'Agency') {
        return false;
      }
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage({ target_user: selectedItem?.id, message: messageValue });
      // Handle response if needed
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box>
      {selector.status !== 'error' ? (
        <Grid container spacing={2}>
          {/* users */}
          <Grid item xs={12} md={5}>
            <Box sx={styles.usersWrapper}>
              <Typography variant="h4" color="info.main" pb="26px" classes={{ root: "font-grotesk" }}>
                Chats
              </Typography>
              {chatData?.map((item: any) => (
                <Box
                  sx={styles.content}
                  onClick={() => handleItemClick(item?.id)}
                  key={item?.id}
                  className="content"
                >
                  <Box sx={styles.messageContent}>
                    <Image src={AvatarImg} alt="" />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: "info.main" }}>
                        {item?.sender.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontSize: "12px", color: "info.main" }}>
                        {item?.prevMessage}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={styles.date}>
                    {item?.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          {/* message */}
          <Grid item xs={12} md={7}>
            <Box sx={{ ...styles.usersWrapper, px: "0" }}>
              <Box sx={styles.profile}>
                <Image src={AvatarImg} alt="" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "info.main" }}>
                  {selectedItem?.title}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Box sx={{ my: "36px", height: '510px', overflow: "auto" }}>
                  {selectedItem?.document_id &&
                    selectedItem?.sender?.map((message: any, i: number) => (
                      <Box key={i} sx={styles.featuredMessage(message)}>
                        {message.role === "doctor" ? (
                          <Box sx={{ width: "280px" }}>
                            <Box sx={{ display: "flex", gap: "15px" }}>
                              <Image src={message?.avatar} alt="" width={32} height={32} />
                              <Typography variant="caption" sx={styles.doctorMessage}>
                                {message?.message}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={styles.time}>
                              12:23
                            </Typography>
                          </Box>
                        ) : (
                          <Box>
                            <Box sx={{ display: "flex", gap: "15px" }}>
                              <Typography variant="caption" sx={styles.patientMessage}>
                                {message?.message}
                              </Typography>
                              <Image src={message?.avatar} alt="" width={32} height={32} />
                            </Box>
                            <Typography variant="caption" sx={{ ...styles.time, justifyContent: "flex-start" }}>
                              12:23
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    ))}
                </Box>
                {/* send message */}
                <Box sx={{ px: '29px' }}>
                  <TextField
                    name="send-message"
                    fullWidth
                    placeholder="Send Message"
                    onChange={(e: any) => setMessageValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" >
                          <IconButton disabled={!canReplyToRole(selectedItem?.user_type)} onClick={handleSendMessage}>
                            <Image src={SendMessageIcon} alt="" className="cursor-pointer" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography variant="body1" color='secondary.main'>{selector.message}</Typography>
        </Box>
      )}
    </Box>
  );
};

const ResponsiveMessage = ({ data }: any) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (id: any) => {
    const selectedItem = messageData.find((item) => item?.id === id);
    setSelectedItem(selectedItem);
  };
  return (
    <Box sx={styles.messageWrap}>
      {selectedItem ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <KeyboardBackspaceIcon sx={{ color: "rgba(0,0,0,0.4)", fontSize: "24px", cursor: "pointer" }} onClick={() => setSelectedItem(!selectedItem)} />
          <Typography variant="subtitle1">{selectedItem?.title}</Typography>
        </Box>
      ) : (
        <Typography variant="h4" color="info.main" pb="26px" classes={{ root: "font-grotesk" }}>
          Chats
        </Typography>
      )}
      <Box sx={{ mt: "24px" }}>
        {messageData.map((item, index) => (
          <Fragment key={index}>
            {!selectedItem ? (
              <Box sx={styles.content} onClick={() => handleItemClick(item?.id)} key={item?.id} className="content">
                <Box sx={styles.messageContent}>
                  <Image src={AvatarImg} alt="" />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: "info.main" }}>
                      {item?.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: "12px", color: "info.main" }}>
                      {item?.prevMessage}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1" sx={styles.date}>
                  {item?.time}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ border: selectedItem?.id === item?.id && item?.message.length > 0 ? "1px solid #EAEAEA" : 0, borderRadius: "6px", p: "25px" }}>
                {selectedItem?.id === item?.id &&
                  item?.message?.map((message, i) => (
                    <Box key={i} sx={styles.featuredMessage(message)}>
                      {message.role === "doctor" ? (
                        <Box sx={{ width: "280px" }}>
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Image src={message?.avatar} alt="" width={32} height={32} />
                            <Typography variant="caption" sx={styles.doctorMessage}>
                              {message?.message}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={styles.time}>
                            12:23
                          </Typography>
                        </Box>
                      ) : (
                        <Box>
                          <Box sx={{ display: "flex", gap: "15px" }}>
                            <Typography variant="caption" sx={styles.patientMessage}>
                              {message?.message}
                            </Typography>
                            <Image src={message?.avatar} alt="" width={32} height={32} />
                          </Box>
                          <Typography variant="caption" sx={{ ...styles.time, justifyContent: "flex-start" }}>
                            12:23
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
              </Box>
            )}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
