// using mui creeate a successfulm payment page that ahs a button to go to home 

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const PaymentSuccess = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography variant="h4" style={{ color: "#002D40" }} gutterBottom>
                Thank you
            </Typography>
            <Typography variant="body1" style={{ margin: "20px 10px", color: "gray", textAlign: "center" }}>
                Your purchase was successful. You are upgraded to Premium Member.
            </Typography>
            <Link
                href="/dashboard"
                passHref
                style={{ textDecoration: "none", color: "#FF414D", fontSize: "18px", fontWeight: "500", padding: "10px 30px", border: "1px solid #FF414D", borderRadius: "5px" }}
            >
                Go to Dashboard
            </Link>
        </Box >
    );
};

export default PaymentSuccess;
