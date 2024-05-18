import { type Theme } from "@mui/material";

export default function themePalette(theme: Theme) {
  return {
    primary: {
      main: '#1AA6B7',
      dark: '#073E44',
      light: '#00C9D4'
    },
    secondary: {
      main: '#FF414D',
    },
    info: {
      main: '#002D40',
    },
    neutral: {
      main: '#00415C',
    },
    success: {
      main: '#16A34A'
    },
    warning: {
      main: '#FC5E3A',
      dark: '#FFBF19',
      light: '#FE9D35'
    },
    grey: {
      100: '#FFFFFF',
      200: '#F4F4F4',
      300: '#EAEAEA',
      400: '#B0B0B0',
      500: '#888888',
      600: '#4F4F4F',
      700: '#000000',
      800: '#215B62',
    }
  };
}
