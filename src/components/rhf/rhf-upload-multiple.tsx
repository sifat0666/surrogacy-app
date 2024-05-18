import React, { useEffect, useRef, useState } from "react";
import { ButtonBase, FormHelperText, Grid, Typography, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import CancelIcon from '@mui/icons-material/Cancel';


export function RHFUploadFilesWithPreview({
    name,
    label = "Upload Files",
    accept,
    required = true,
}: any): JSX.Element {
    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useFormContext();

    const fileInputRef: any = useRef(null);
    const [previews, setPreviews] = useState<any>();
    const authUser = useSelector((state: RootState) => state.auth.user);


    useEffect(() => {
        if (typeof authUser?.gallery === "object") {
            setPreviews(authUser?.gallery);
        } else {
            if (authUser?.gallery !== undefined) {
                setPreviews(JSON.parse(authUser?.gallery));
            }
        }
    }, [authUser]);

    useEffect(() => {
    }, [previews]);


    const files = watch(name);

    const handleClickAttachFile = (): void => {
        fileInputRef.current?.click();
    };

    // Function to generate image previews
    const generateImagePreviews = (files: FileList | null) => {
        if (files) {
            const previewsArray: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        previewsArray.push(reader.result);
                        if (previewsArray.length === files.length) {
                            setPreviews(previewsArray);
                        }
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };
    const handleRemoveImage = (index: number) => {
        const updatedPreviews = previews.filter((_: any, i: any) => i !== index);
        setPreviews(updatedPreviews);
        setValue(name, updatedPreviews); // Update form data
    };

    return (
        <div>
            <ButtonBase
                disableRipple
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 1.4,
                    padding: 7,
                    marginBottom: 2,
                    backgroundColor: "#EAEEEF",
                }}
                onClick={handleClickAttachFile}
            >
                <Typography variant="body2">
                    {label}{" "}
                    {required && (
                        <Typography component="span" variant="body2" color="error.main">
                            *
                        </Typography>
                    )}
                </Typography>
            </ButtonBase>

            {previews && previews?.length > 0 && (
                <Grid container sx={{ marginTop: 1 }}>
                    {previews && previews?.map((url: string, index: number) => (
                        <Grid
                            item
                            key={index}
                            xs={6}
                            sm={6}
                            md={3}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "start",
                                    alignItems: "start",
                                    margin: "15px 0",
                                }}
                            >
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: "100%", // Set width to 100% for responsiveness
                                        height: "150px", // Set a fixed height for all images
                                        objectFit: "cover", // Maintain aspect ratio
                                        marginBottom: "5px",
                                    }}
                                />
                                <Button
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: "relative",
                                        top: "5px",
                                        right: "5px",
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                                        padding: "5px",
                                        color: "#FF414D",
                                    }}
                                >
                                    Remove <CancelIcon />
                                </Button>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}

            <input
                {...register(name)}
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple
                onChange={(event) => {
                    const selectedFiles: FileList | null = event.target.files;
                    if (selectedFiles && selectedFiles.length <= 5) {
                        setValue(name, selectedFiles);
                        trigger(name);
                        generateImagePreviews(selectedFiles);
                    } else {
                        toast.error("You can only upload a maximum of 5 files");
                    }
                }}
                style={{ display: "none" }}
            />
        </div>
    );
}
