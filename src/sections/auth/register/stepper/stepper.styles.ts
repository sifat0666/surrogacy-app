export const styles = {
  progress: {
    my: "40px",
    "& .linearProgress": {
      backgroundColor: "grey.200",
      height: "16px",
      borderRadius: "50px",
      marginBottom: "5px",
    },
  },
  linearProgress: {
    width: "100%",
    maxWidth: "410px",
    margin: "0 auto",
    textAlign: "center",
  },
  percentage: {
    fontWeight: 700,
    color: "primary.main",
  },
  bgWrapper: {
    boxShadow: "0px 4px 12px 0px #0000001A",
    border: "2px solid #F4F4F4",
    borderRadius: "6px",
    width: "100%",
    mt: "40px",
    py: '50px',
    height: "calc(100vh - 280px)",
    overflowY: 'auto'
  },
  heading: {
    // fontSize: "40px",
    fontSize: { xs: "25px", sm: "40px", md: "40px", lg: "40px", xl: "40px" },
    fontWeight: 700,
    lineHeight: "48px",
    color: "info.main",
  },
  roleWrapper: {
    // py: "30px",
    flexDirection: "column",
    margin: "0 auto",
    height: '100%',
    minHeight: '100%',
    textAlign: 'left',
    // paddingX: { xs: '20px' } 
  },
  outlinedButton: {
    border: "1px solid #1AA6B7 !important",
    color: "#1AA6B7 !important",
  },
  caption: {
    fontSize: "14px",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  outerLabel: {
    fontWeight: 500,
    color: 'info.main',
    pb: 0
  }

  // hiver class fro button
};
