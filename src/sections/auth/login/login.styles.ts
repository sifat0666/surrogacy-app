import ProfileImage from "../../../assets/images/auth/auth-bg.svg";

export const styles = {
  authBgImg: {
    height: "100vh",
    display: "flex",
    // backgroundImage: `url(${ProfileImage.src})`,
    // backgroundPosition: "right",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "auto",
    background: `url(${ProfileImage.src}) no-repeat right  fixed`
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
  auth: {
    pt: '40px',
    '& .login-button': {
      background: 'none !important',
      boxShadow: 'none !important',
      border: '2px solid #EAEAEA !important',
      borderRadius: '6px !important',
      opacity: '1 !important',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      height: '48px',
      width: '100%',
      fontSize: '12px',
      fontWeight: '500',
      color: '#002D40 !important',
      display: 'flex !important',
      '& > div': {
      background: 'none !important',
      margin: '0 !important',
      padding: '0 !important',
      }
    }
  }
};
