import { FormLabel, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export function CreditCardExpirationField({
  name,
  variant = "outlined",
  fullWidth = true,
  outerLabel,
  rootSxLabel,
  inputProps = {}, 
  ...other 
}: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ month: "", year: "" }}
      rules={{
        validate: {
          validMonth: (value) => {
            if (!value.month) {
              return "Month is required";
            } else if (!/^\d{2}$/.test(value.month)) {
              return "Month should be 2 digits and contain only numbers";
            }
            return true;
          },
          validYear: (value) => {
            if (!value.year) {
              return "Year is required";
            } else if (!/^\d{2}$/.test(value.year)) {
              return "Year should be 2 digits and contain only numbers";
            }
            return true;
          },
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack>
          {outerLabel && (
            <FormLabel sx={{ textAlign: "left", ...rootSxLabel }}>
              {outerLabel}
            </FormLabel>
          )}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <TextField
              name={`${name}_month`}
              placeholder="MM"
              type="number" // Input type should be "number" for numerical input
              inputProps={{ maxLength: 2, ...inputProps }} // Restrict to 2 digits, allow customization
              value={value.month || ""}
              onBlur={onBlur}
              onChange={(e) =>
                onChange({ ...value, month: e.target.value.substring(0, 2) })
              } // Truncate to 2 digits to prevent exceeding limit
              {...other}
            />
            <Typography color="grey.500">/</Typography>
            <TextField
              name={`${name}_year`}
              placeholder="YY"
              type="number"
              inputProps={{ maxLength: 2, ...inputProps }}
              value={value.year || ""}
              onBlur={onBlur}
              onChange={(e) =>
                onChange({ ...value, year: e.target.value.substring(0, 2) })
              }
              {...other}
            />
          </Stack>
          {error && <Typography variant="caption" style={{ color: "#d32f2f" }}>{error.message}</Typography>}
        </Stack>
      )}
    />
  );
}

const styles = {
  creditCardWrap: {
    border: "2px solid #EAEAEA",
    borderRadius: "6px !important",
    "& .MuiFormControl-root": {
      width: "60px",
      "& .MuiInputBase-root": {
        border: "none",
      },
    },
  },
};
