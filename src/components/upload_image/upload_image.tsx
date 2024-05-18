"use client";
import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from "@mui/material";

import { CldImage } from 'next-cloudinary';


const Upload_image = () => {

    const [image, setImage] = useState("");

    const uploadImage = async (e: any) => {

        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);



        data.append("upload_preset", "w2fsqv0e");
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/w2fsqv0e/image/upload",
            {
                method: "POST",
                body: data,

            }
        );
        const file = await res.json();
        setImage(file.secure_url);
    }

    return (
        <Box sx={{ pt: { xs: "44px", sm: "120px" } }}>
            <Container maxWidth="xl">
                <Box sx={{ width: "100%", maxWidth: "850px", margin: "0 auto", textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary.main">
                        CONNECTING DREAMS
                    </Typography>
                    <Typography variant="h3" color="info.main" pt="5px">
                        A Platform for Intended Parents, Surrogates, and Agencies
                    </Typography>
                    {/* <UploadSingleFile
                        label="Upload an image"
                        name="file"
                        accept="image/*"
                        required
                        onChange={uploadImage}
                    /> */}
                    {image && (
                        <img src={image} style={{ width: "300px" }} alt="upload" />
                    )}

                </Box>
            </Container>
        </Box >
    );
};

export default Upload_image;
