"use client";
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Button } from "@mui/material";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styles } from "./header.styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const CustomDropDown = ({ data, title }: { title: string; data: any }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Box>
            <Typography sx={styles.subMenu} onClick={handleClick}>
                <Typography aria-describedby={id} variant="body2" fontWeight={500} color="info.main">
                    {title}
                </Typography>
                <KeyboardArrowDownIcon
                    sx={styles.keyArrow}
                />
            </Typography>
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
                    {data?.map((item: { id: string; path: string; title: string }) => (
                        <ListItem key={item?.id} sx={{ ...styles.menuItem, py: 1.5, px: 3 }}>
                            <Link href={item?.path}>{item?.title}</Link>
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};

export const CustomAccordion = ({ data, title }: { data: any; title: string }) => {
    return (
        <Accordion sx={styles.accordion} classes={{ root: 'paperProps' }} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                {title}
            </AccordionSummary>
            {data?.map((obj: any) => (
                <AccordionDetails
                    key={obj?.id}
                    classes={{ root: 'summary' }}
                >
                    <Link
                        href={obj?.path}
                        style={{ textDecoration: "none", color: "gray" }}
                    >
                        {obj?.title}
                    </Link>
                </AccordionDetails>
            ))}
        </Accordion>
    );
};
