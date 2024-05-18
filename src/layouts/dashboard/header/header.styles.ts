export const styles = {
  headerWrap: {
    background: "#fff",
    boxShadow: "0px 3px 8px 0px rgba(0, 0, 0, 0.10)",
  },
  menuList: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "left",
    p: { xs: "32px", sm: "auto" },
    gap: "32px",
  },
  menuItem: {
    position: "relative",
    width: "max-content",
    p: 0,
    cursor: "pointer",
    "& a": {
      color: "info.main",
      fontSize: "16px",
      fontWeight: 500,
      textDecoration: "none",
      "&:hover": {
        color: "secondary.main",
      },
    },
  },
  popover: {
    "& .MuiPaper-root": {
      boxShadow: "4px 0px 12px 0px #00000012",
      backgroundColor: "grey.100",
      borderRadius: "6px",
      minWidth: "max-content",
      minHeight: "max-content",
      // p: 1.2,
      top: "90px !important",
    },
  },
  subMenu: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "2px",
    "& p": {
      color: "info.main",
      fontSize: "16px",
      fontWeight: 500,
      textDecoration: "none",
      "&:hover": {
        color: "secondary.main",
      },
    },
  },
  accordion: {
    "&.paperProps": {
      boxShadow: "none",
      '&.Mui-expanded': {
        margin: 0,
      },
      "&:before": {
        display: "none",
      },
      "& .MuiAccordionSummary-root": {
        p: 0,
        minHeight: "inherit",
        "& .MuiAccordionSummary-content": {
          margin: 0,
          color: "info.main",
          fontSize: "16px",
          fontWeight: 500,
          "&:hover": {
            color: "secondary.main",
          },
        },
      },
      '& .MuiCollapse-root': {
        '& .MuiCollapse-wrapper': {
          marginTop: 2
        }
      }
    },
    '& .summary': {
      padding: '15px 0px'
    }
  },
  dashboard: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "12px",
  },

  keyArrow: {
    fontSize: 20,
    color: "gray",
    // add hover effect
    "&:hover": {
      color: "#FF414D",
    },
  }
};
