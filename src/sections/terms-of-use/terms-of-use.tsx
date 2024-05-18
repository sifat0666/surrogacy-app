import React from "react";
import { Box, Container, List, ListItem, Typography } from "@mui/material";
import { termsData, termsInformationData } from "./terms-of-use.data";

const TermsOfUse = () => {
  return (
    <Box sx={{ mt: { xs: "44px", sm: "60px" }, mb: { xs: "52px", sm: "68px" } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" color="info.main" textAlign={{ xs: "center", sm: "left" }}>
          Terms of Use
        </Typography>
        <Box sx={{ pt: { xs: "40px", sm: "80px" } }}>
          {termsInformationData.map((item, index) => (
            <Typography variant="body2" color="info.main" pt={index === 1 ? "30px" : "15px"} key={index}>
              {item}
            </Typography>
          ))}

          {termsData.map((item, index) => (
            <Box key={index}>
              <Typography variant="h4" color="info.main" pt="24px" key={index}>
                {`${index + 1}. ${item?.title}`}
              </Typography>
              <Typography variant="body2" color="info.main" pb="12px" pt="12px" fontSize={{ xs: "14px", md: "16px" }}>
                {item?.desc}
              </Typography>
              {item?.list && (
                <List sx={styles.list} >
                  {item?.list?.map((item, index) => (
                    <ListItem key={index} sx={styles.listItem}>
                      {item}
                    </ListItem>
                  ))}
                </List>
              )}
              {item?.desc1 && (
                <Typography variant="body2" color="info.main" fontSize={{ xs: "14px", md: "16px" }}>
                  {item?.desc1}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TermsOfUse;

const styles = {
  list: {
    listStyleType: "disc",
    listStylePosition: "inside",
    p: 0,
  },
  listItem: {
    display: "list-item",
    p: 0,
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: 400,
    lineHeight: "24px",
    color: "info.main",
  },
};
