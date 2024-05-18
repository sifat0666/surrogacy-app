import { Theme, createTheme } from "@mui/material/styles";
import componentStyleOverrides from "./compStyleOverride";
import themePalette from "./palette";
import themeTypography from "./typography";

const createCustomTheme = (customization: any): Theme => {
  const themeOptions: any = {
    direction: "ltr",
    palette: themePalette(customization),
    typography: themeTypography(customization),
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
  };

  const theme: any = createTheme(themeOptions);

  theme.components = componentStyleOverrides(theme);

  return theme;
};

export default createCustomTheme;
