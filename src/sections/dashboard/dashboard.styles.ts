export const styles = {
  homeWrapper: {
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    gap: "32px",
    px: { xs: "0px", sm: "40px" },
    pb: "50px",
    borderBottom: "1px solid #EAEAEA",
    flexDirection: { xs: "column", sm: "row" },
  },
  surrogatesUser: {
    px: { xs: "0px", sm: "40px" },
    borderBottom: "1px solid #EAEAEA",
    pb: { xs: "13px", sm: "40px" },
  },
  upgradeBtn: {
    backgroundColor: "primary.light",
    p: "12px 29px",
    width: { xs: "100%", sm: "auto" },
  },
  listingWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
    py: "50px",
    px: { xs: "0px", sm: "40px" },
  },
  button: {
    fontWeight: 400,
  },
  table: {
    "& .MuiTableHead-root": {
      "& .MuiTableCell-root": {
        fontSize: "16px",
        fontWeight: 700,
        color: "info.main",
        lineHeight: "24px",
        textTransform: "capitalize",
        px: "24px",
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableCell-root": {
        fontSize: "16px",
        fontWeight: 500,
        color: "info.main",
        lineHeight: "24px",
        textTransform: "capitalize",
        py: "28px",
        px: "24px",
      },
    },
  },
  tableCell: {
    textAlign: "center",
  },
  listingTableWrapper: {
    padding: "24px 0",
    borderRadius: "6px",
    border: "1px solid #EAEAEA",
    mb: "8px",
  },
  listingRow: {
    borderBottom: "1px solid #EAEAEA",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: "24px 24px",
    flex: "100%",
    "& p": {
      display: "flex",
      flex: "50%",
    },
  },
  noDataFound: {
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    p: "24px 0",
    width: "100%",
    textAlign: "center",
  },
  datafound: {
    fontWeight: "700 !important",
    color: "#FF414D !important",
    py: "50px",
  },
  userTypeData: {
    px: { xs: "0px", sm: "40px" },
    pt: { xs: "40px", sm: "50px" },
  },
  userTypeMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pl: { xs: "0", sm: "24px" },
    pt: { xs: '28px', sm: '24px' },
    borderBottom: '1px solid #EAEAEA',
    pb: '12px'
  },
  messageBtn: {
    border: '1px solid rgba(255, 66, 77, 0.6)',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px !important',
    fontWeight: 400,
    color: 'rgba(255, 66, 77, 0.6)',
    textDecoration: 'none'
  },
  userTypeLikes: {
    border: '1px solid #EAEAEA',
    borderRadius: '6px',
    mt: '12px',
    p: '24px '
  }
};
