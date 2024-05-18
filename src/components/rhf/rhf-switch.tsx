import { useFormContext, Controller } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

export function RHFSwitch({ name, disabled, defaultValue, ...other }: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      sx={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", justifyItems: "center", gap: 1 }}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Switch
              {...field}
              disabled={disabled}
              {...other}
            />
          )}
        />
      }
      label={other.label} // Pass the label prop to FormControlLabel
    />
  );
}
