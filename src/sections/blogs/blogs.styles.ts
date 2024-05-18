export const styles = {
  searchWrapper: {
    textAlign: "center",
    "& .search": {
      "& .MuiInputBase-root": {
        backgroundColor: "grey.200",
        "& input": {
          color: "info.main",
          "&::placeholder": {
            color: "info.main",
          },
        },
      },
    },
  },
  textField: {
    pt: "10px",
    pb: "32px",
    width: "100%",
    maxWidth: "400px",
  },
  status: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    pt: "24px",
  },
  caption: {
    color: "secondary.main",
    fontWeight: 500,
    backgroundColor: "grey.200",
    width: "max-content",
    p: "4px 8px",
    cursor: "pointer",
  },
  heading: {
    color: "info.main",
    fontWeight: 700,
    fontSize: "24px",
    pt: "16px",
  },
  button: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    pt: "24px",
    cursor: "pointer",
    width: "max-content",
    color: "secondary.main",
  },
};
