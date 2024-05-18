import React from "react";
import { Box, Button, Drawer, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
interface CustomDrawerProps {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title?: string;
  handleReset?: () => void;
  handleApply?: () => void;
}

const CustomDrawer = (props: CustomDrawerProps) => {
  const { open, onClose, title = "Filters", handleReset, handleApply, children } = props;

  return (
    <Drawer anchor={"right"} open={open} onClose={onClose} classes={{ paper: "drawerPaperRoot" }} sx={styles.drawer}>
      <Box sx={styles.content}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CloseIcon sx={{ color: "grey.500", cursor: 'pointer' }} onClick={onClose} />
        </Box>
        <Box sx={styles.contentWrap}>
          <Typography sx={styles.title} classes={{ root: "font-grotesk" }}>
            {title}
          </Typography>
          {children}
        </Box>
      </Box>
      <Box sx={styles.actionWrap}>
        <Typography variant="body2" color='secondary.main' sx={{ cursor: 'pointer' }} onClick={handleReset}>
          Clear all
        </Typography>
        <Button variant="contained" sx={styles.applyBtn} onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;

const styles = {
  drawer: {
    "& .drawerPaperRoot": {
      width: "500px",
    },
  },
  content: {
    p: "16px",
  },
  contentWrap: {
    px: { xs: "4px", sm: "32px" },
    py: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
    pb: "24px",
    color: "info.main",
    borderBottom: "1px solid #B0B0B0",
  },
  actionWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #B0B0B0",
    py: '12px',
    px: '48px',
  },
  applyBtn: {
    fontSize: '16px',
    fontWeight: 400,
    background: '#FF414D !important'
  },
};
