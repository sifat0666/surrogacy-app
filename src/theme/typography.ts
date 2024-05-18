import { Theme } from "@mui/material/styles";

export default function themeTypography(theme: Theme) {
  return {
    body1: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "27px",
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "14px",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "30px",
    },

    overline: {
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    // h1: {
    //   fontWeight: 700,
    //   fontSize: "36px",
    //   lineHeight: 1.2,
    // },
    h2: {
      fontWeight: 800,
      fontSize: "64px",
      lineHeight: "77px",
      "@media (max-width: 768px)": {
        fontSize: "32px",
        lineHeight: "42px",
        fontWeight: 700,
      },
    },
    h3: {
      fontWeight: 800,
      fontSize: "48px",
      lineHeight: "58px",
      "@media (max-width: 768px)": {
        fontSize: "32px",
        lineHeight: "41px",
        fontWeight: 700,
      },
    },
    h4: {
      fontWeight: 700,
      fontSize: "32px",
      lineHeight: "42px",
      "@media (max-width: 768px)": {
        fontSize: "24px",
        lineHeight: "33px",
      },
    },
    h5: {
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "27px",
      "@media (max-width: 768px)": {
        fontWeight: 400,
      },
    },
    h6: {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "24px",
      "@media (max-width: 768px)": {
        fontSize: "14px",
      },
    },
  };
}
