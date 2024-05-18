import ProfileImage from "../../../assets/images/auth/auth-bg.svg";

export const styles = {
  authBgImg: {
    height: "100vh",
    display: "flex",
    backgroundImage: `url(${ProfileImage.src})`,
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  authWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  heading: {
    // fontSize: "40px",
    fontSize: { xs: "25px", sm: "40px", md: "40px", lg: "40px", xl: "40px" },
    fontWeight: 700,
    lineHeight: "48px",
    color: "info.main",
  },
  termsTitle: {
    textAlign: "center",
    color: "info.main",
    fontSize: "12px",
    marginTop: '5px !important'
  },
};
