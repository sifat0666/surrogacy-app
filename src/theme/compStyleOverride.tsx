import { createTheme, type Theme } from "@mui/material";

const muiTheme = createTheme();
export default function componentStyleOverrides(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          fontWeight: 700,
          color: "#fff",
          transition: "0.3s all ease-in-out",
          whiteSpace: "wrap",
          "&.MuiButton-contained": {
            padding: "12px 24px",
            borderRadius: "6px",
            backgroundColor: theme.palette.primary.light,
            boxShadow: "none",
            transition: "0.3s all ease-in-out",
            // '&:hover': {
            //   backgroundColor: '#5748b8'
            // }
          },
          "&.MuiButton-outlined": {
            padding: "12px 24px",
            borderRadius: "6px",
            border: `2px solid ${theme.palette.secondary.main}`,
            boxShadow: "none",
            transition: "0.3s all ease-in-out",
            color: theme?.palette?.secondary?.main,
          },
        },
        sizeSmall: {
          padding: "8px 16px !important",
        },
        sizeMedium: {
          padding: "10px 20px",
        },
        sizeLarge: {
          padding: "12px 20px",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          // color: theme.colors?.textDark,
          padding: "24px",
          borderRadius: "20px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    // MuiCheckbox: {
    //   styleOverrides: {
    //     root: {
    //       color: '#E7E7E7',
    //       '&.Mui-checked': {
    //         color: '#E7E7E7'
    //       }
    //     }
    //   }
    // },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: "15px",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "15px",
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary",
        icon: (
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="20" rx="10.5" />
            <rect x="0.5" y="0.5" width="20" height="20" rx="10.5" stroke={muiTheme.palette.grey[600]} />
          </svg>
        ),
        checkedIcon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
              fill="currentColor"
            />
          </svg>
        ),
      },
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: (
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M9 3.5C5.68629 3.5 3 6.18629 3 9.5V15.5C3 18.8137 5.68629 21.5 9 21.5H15C18.3137 21.5 21 18.8137 21 15.5V9.5C21 6.18629 18.3137 3.5 15 3.5H9ZM16.7179 10.1961C17.1024 9.79966 17.0926 9.16657 16.6961 8.7821C16.2997 8.39763 15.6666 8.40737 15.2821 8.80385L10.6667 13.5635L8.7179 11.5539C8.33343 11.1574 7.70034 11.1476 7.30385 11.5321C6.90737 11.9166 6.89763 12.5497 7.2821 12.9461L9.94877 15.6961C10.1371 15.8904 10.3961 16 10.6667 16C10.9372 16 11.1962 15.8904 11.3846 15.6961L16.7179 10.1961Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
        color: "secondary",
        icon: (
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <rect height="16" rx="5" stroke={muiTheme.palette.grey[300]} strokeWidth="2" width="16" x="4" y="4.5" />
          </svg>
        ),
        indeterminateIcon: (
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
        // disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: 40,
          height: 24,
          padding: 0,
          "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            transition: muiTheme.transitions.create(["background-color"], {
              duration: 500,
            }),
            backgroundColor: muiTheme.palette.grey[400],
          },
        },
        switchBase: {
          padding: 1,
          marginLeft: -2,
          transitionDuration: "300ms",
          "&.Mui-checked + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "#FF414D",
          },
        },
        thumb: {
          boxSizing: "border-box",
          width: 16,
          height: 16,
          marginTop: 2.8,
          marginLeft: 3,
          color: muiTheme.palette.common.white,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px 0px #0000001A",
          border: "1px solid #EAEAEA",
          background: "#fff",
          borderRadius: "6px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.muiTab": {
            border: 0,
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "capitalize",
            color: "#888888",
            "@media (max-width: 768px)": {
              width: "100%",
              maxWidth: "100%",
            },
          },
          "&.Mui-selected": {
            color: "#FF414D !important",
            "@media (max-width: 768px)": {
              border: "1px solid #FF414D",
              borderRadius: "6px",
            },
          },
        },
      },
    },
    MuiPickersDay: {
      root: {
        color: "red",
        "& .Mui-selected": {},
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "",
          minWidth: "36px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "2px solid #EAEAEA",
          borderRadius: "6px !important",
          height: "48px",
          width: "100%",
          color: "#B0B0B0",
          textAlign: 'left',
          fontSize: "16px",
          "& fieldset": { border: "none" },
        },
        input: {
          color: "#B0B0B0",
          "&::placeholder": {
            color: "#B0B0B0",
            fontSize: "16px",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "absolute",
          bottom: "-24px",
          left: 0,
          margin: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: "1.7rem",
          color: "#C4C4C4",
          fontSize: "14px",
          fontWeight: 400,
        },
        focused: {
          color: "#42369F",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        multiline: {
          height: "max-content",
          borderRadius: "10px",
        },
        MuiTextField: {
          defaultProps: {
            variant: "filled",
          },
          // styleOverrides: {
          //   root: {
          //     fontWeight: 500,
          //     background: 'red',
          //     padding: '15.5px 14px',
          //     borderRadius: '10px',
          //     '&.MuiInputBase-inputSizeSmall': {
          //       padding: '10px 14px',
          //       '&.MuiInputBase-inputAdornedStart': {
          //         paddingLeft: 0
          //       }
          //     }
          //   }
          // }
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          // borderRadius: `${theme?.customization?.borderRadius}px`
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& svg": {
            fill: "#42369F",
            fontSize: "25px",
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            // color: theme.colors?.grey300
          },
        },
        mark: {
          // backgroundColor: theme.paper,
          width: "4px",
        },
        valueLabel: {
          // color: theme?.colors?.primaryLight
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#EAEAEA",
          opacity: 1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&.MuiChip-deletable .MuiChip-deleteIcon": {
            color: "inherit",
          },
        },
      },
    },
    MuiTextarea: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid red",
          fontSize: "14px",
          resize: "vertical",
          "&:focus": {
            outline: "none",
            border: "1px solid #007bff",
          },
        },
      },
    },
    MuiTextareaAutosize: {
      root: {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiPaper-root": {
            boxShadow: "0px 20px 20px 0px #00000014",
            borderRadius: '8px',
            backgroundColor: '#fff'
          },
        },
      },
    },
  };
}
