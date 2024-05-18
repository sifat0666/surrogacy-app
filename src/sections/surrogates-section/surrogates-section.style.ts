export const styles = {
    cardWrap: {
      position: "relative",
      borderRadius: "12px",
    },
    headingWrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "18px",
      flexDirection: { xs: "column", sm: "row" },
    },
    icons: {
      position: "absolute",
      top: "18px",
      right: "18px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "6px",
    },
    title: {
      fontWeight: 700,
      color: "info.main",
      pt: "10px",
      cursor: 'pointer'
    },
    desc: {
      color: "grey.900",
      pt: "10px",
    },
    locationWrap: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      pt: "15px",
    },
    status: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: "4px 16px",
      color: "#fff",
      textTransform: "uppercase",
      fontSize: "12px",
    },
    finderTitle: {
      textTransform: "uppercase",
      textAlign: { sm: "left", xs: "center" },
    },
    filterWrap: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filter: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      border: "1px solid #EAEAEA",
      p: "8px 20px",
      borderRadius: "6px",
      cursor: "pointer",
    },
    tagsBtn: {
      fontWeight: 400,
      p: "8px 16px !important",
      textTransform: "capitalize",
      backgroundColor: "#FF414D !important",
    },
    loadMoreBtn: { textAlign: 'center', mt: { xs: '40px', sm: '80px' }, mb: { xs: '20px', sm: '80px' } }
  };