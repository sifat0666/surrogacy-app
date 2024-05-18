export const styles = {
  cardWrap: {
    position: "relative",
    borderRadius: "12px",
  },
  icons: {
    position: "absolute",
    top: "18px",
    right: "18px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "6px",
  },
  title: {
    fontWeight: 700,
    color: "info.main",
    pt: "10px",
  },
  desc: {
    color: "grey.900",
    pt: "10px",
  },
  locationWrap: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    pt: "15px",
  },
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "4px 16px",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  finderTitle: {
    textTransform: "uppercase",
    textAlign: { sm: "left", xs: "center" },
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
    },
  },
};
