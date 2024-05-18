import React from "react";
import { Box, Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";

interface CustomModalInterface {
    isOpen: boolean;
    handleClose: () => void;
    heading: string;
    description: string;
    date?: string;
    doneButtonText: string;
    handleDone: () => void;
}

const CustomModal: React.FC<CustomModalInterface> = ({
    isOpen,
    handleClose,
    heading,
    description,
    date,
    doneButtonText,
    handleDone,
}) => {
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle textAlign="right" onClick={handleClose}>
                {/* <Image src="/close-icon.svg" alt="" style={{ cursor: "pointer" }} /> */}
            </DialogTitle>
            <Box sx={{ textAlign: "center", px: "40px", pb: "40px" }}>
                {/* <Image src="/delete-account-icon.svg" alt="" /> */}
                <Typography variant="subtitle2" fontWeight={700} color="info.main" pt="24px">
                    {heading}
                </Typography>
                <Typography variant="caption" color="info.main" pt="8px">
                    {description}{" "} {date}
                </Typography>
                <Stack spacing={"24px"} mt="24px">
                    <Button variant="contained" sx={{ backgroundColor: "#FF3636 !important" }} onClick={handleDone}>
                        {doneButtonText}
                    </Button>
                </Stack>
            </Box>
        </Dialog>
    );
};

CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    doneButtonText: PropTypes.string.isRequired,
    handleDone: PropTypes.func.isRequired,
    date: PropTypes.string,
};

export default CustomModal;
