// using mui creeate a successfulm payment page that ahs a button to go to home 

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const PaymentFailed = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography variant="h4" style={{ color: "#002D40" }} gutterBottom>
                Oops! Payment Failed
            </Typography>
            <Typography variant="body1" style={{ margin: "20px 10px", color: "gray", textAlign: "center" }}>
                Your payment was unsuccessful. Please try again.
            </Typography>
            <Box style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Link
                    href="/membership"
                    passHref
                    style={{ textDecoration: "none", backgroundColor: "#FF414D", color: "white", fontSize: "18px", fontWeight: "500", padding: "10px 30px", border: "1px solid #FF414D", borderRadius: "5px" }}
                >
                    Try Again
                </Link>
                <Link
                    href="/"
                    passHref
                    style={{ textDecoration: "none", color: "#FF414D", fontSize: "18px", fontWeight: "500", padding: "10px 30px", border: "1px solid #FF414D", borderRadius: "5px" }}
                >
                    Go to Home
                </Link>
            </Box>
        </Box >
    );
};

export default PaymentFailed;
