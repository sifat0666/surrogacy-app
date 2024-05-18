import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { styles } from "../stepper.styles";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";

const buttonData = [
  { label: "Surrogate", type: "surrogate", variant: "outlined" },
  { label: "Independent Parent", type: "independent-parent", variant: "outlined" },
  { label: "Agency", type: "agency", variant: "outlined" },
];

const Role = ({ handleChange }: { handleChange: (type: string) => void }) => {
  const dispatch = useDispatch();

  const handleButtonChange = async (type: string) => {
    await dispatch(setUserField({ role: type }));
    handleChange(type);
  };

  return (
    <Grid container justifyContent="center" sx={styles.roleWrapper}>
      <Grid item xs={12} sx={{ paddingX: { xs: '25px', lg: '20px' } }}>
        <Typography variant="h4" color="info.main" classes={{ root: "font-grotesk" }}>
          Your Role
        </Typography>
        <Stack spacing={2} mt="30px">
          {buttonData.map((button, index) => (
            <Button
              key={index}
              variant={button.variant === "contained" ? "contained" : "outlined"}
              sx={{
                ...styles.caption,
                ...(button.variant === "contained" ? styles.caption : styles.outlinedButton),
                ':hover': {
                  backgroundColor: '#1AA6B7 !important', // Red color on hover
                  color: '#fff !important', // White text color on hover
                }
              }}
              onClick={() => handleButtonChange(button.type)}
            >
              {button.label}
            </Button>
          ))}
          <Typography variant="subtitle1" fontSize={12} color="secondary.main" textAlign="center">
            Be aware that once you select a role, you can’t modify it later.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Role;
