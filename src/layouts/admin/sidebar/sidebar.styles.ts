export const styles = {
  siderbarWrapper: {
    boxShadow: "4px 0px 12px 0px #00000012",
    p: "22px 12px",
    bordeRadius: "6px",
    height: "120vh",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "space-between",
    flexDirection: "column",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    pb: "22px",
  },
  avatar: {
    borderRadius: "50px",
  },
  completeProfileWrap: {
    borderBottom: "1px solid #002D40",
    pb: "32px",
  },
  completeProfile: {
    color: "#FF414D",
    fontWeight: 500,
    fontSize: "14px",
  },
  menu: {
    mt: "32px",
    "& .listItem": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px",
      cursor: "pointer",
      color: "#002D40",
      fontWeight: 400,
      fontSize: "16px",
      textDecoration: "none",
      p: "15px 24px",
      transition: '0.3s all'
    },
    "& .activeListItem": {
      backgroundColor: "#FF414D",
      color: "#fff",
      borderRadius: "6px",
    },
    "& .activeImage": {
      filter: "invert(95%) sepia(95%) saturate(18%) hue-rotate(263deg) brightness(105%) contrast(104%)",
    },
    "& .regularImage": {
      filter: "brightness(0) saturate(100%) invert(14%) sepia(11%) saturate(7219%) hue-rotate(164deg) brightness(96%) contrast(103%)",
    },
  },
  logout: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    p: "15px 24px",
    transition: '0.3s all',
    border: '1px solid #002D40',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  heading: {
    color: "info.main",
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: "34px",
  },
  headingWrapper: {
    mt: { xs: "24px", md: "40px" },
    backgroundColor: "info.main",
    px: { xs: 0, md: "20px" },
    py: "24px",
    borderRadius: "6px",
  },
  linearProgress: {
    "&.linear-progress": {
      width: "70%",
      height: "6px",
      bacground: "#ECF9FB",
      "& .MuiLinearProgress-bar": {
        backgroundColor: "primary.light",
      },
    },
  },

  // link hover styles
  linkHover: {
    "&:hover": {
      color: "#FF414D",
    },
  },
};
