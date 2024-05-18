"use client";
import React, { useState } from "react";
import { Box, Container, Grid, InputAdornment, Skeleton, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "../../assets/icons/search-icon.svg";
import Image from "next/image";
import TabButtonContainer from "@/components/tab-button-container/tab-button-container";
import BlogsImg from "../../assets/images/blogs/blogs-img.png";
import { styles } from "./blogs.styles";
import ChevronRightIcon from "../../assets/icons/chevron-right-icon.svg";
import { useGetBlogsQuery } from "@/services/blogs/blogs-api";
import dayjs from "dayjs";

const Blogs = () => {
  const [isButtonFilter, setIsButtonFilter] = useState();
  const [search, setSearch] = useState("");
  const labels = ["all", "surrogates", "parents", "agencies"];
  const { data, isLoading }: any = useGetBlogsQuery({ title: search, category: isButtonFilter });

  return (
    <Box sx={{ pt: { xs: 0, md: "106px" } }}>
      <Container maxWidth="xl">
        <Box sx={styles.searchWrapper}>
          <Typography variant="h3" color="info.main">
            Blogs
          </Typography>
          <TextField
            name="search"
            placeholder="Search by any keyword"
            classes={{ root: "search" }}
            value={search}
            sx={styles.textField}
            onChange={(event: any) => setSearch(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Image src={SearchIcon} alt="" />
                </InputAdornment>
              ),
            }}
          />
          <TabButtonContainer labels={labels} onButtonClick={setIsButtonFilter} rootBtnSx={{ fontWeight: 400, padding: "8px 16px", textTransform: "capitalize" }} />
        </Box>
        <Grid container sx={{ mt: "34px" }} spacing={4}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={6} md={4} lg={3} key={index}>
                  <Skeleton variant="rounded" width="100%" height={390} />
                </Grid>
              ))
            : data?.blogs?.data?.map((item: any, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box>
                    <Image src={BlogsImg} alt="" style={{ width: "100%" }} />
                    <Box sx={styles.status}>
                      <Typography variant="caption" sx={styles.caption}>
                        {item?.category}
                      </Typography>
                      <Typography variant="caption" fontWeight={500} color="grey.400">
                        {`${dayjs(item?.updated_at).format("m")} min read`}
                      </Typography>
                    </Box>
                    <Typography classes={{ root: "font-grotesk" }} sx={styles.heading}>
                      {item?.title}
                    </Typography>
                    <Typography variant="body2" color="info.main" pt="8px">
                      {item?.content?.length > 0 ? item?.content.slice(0, 80) + "..." : " - "}
                    </Typography>
                    <Box sx={styles.button}>
                      <Typography variant="body2" color="secondary.main">
                        Read more
                      </Typography>
                      <Image src={ChevronRightIcon} alt="" />
                    </Box>
                  </Box>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blogs;
