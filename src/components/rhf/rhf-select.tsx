import { useFormContext, Controller } from "react-hook-form";
import { FormLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";

export function RHFSelect({
  name,
  outerLabel,
  children,
  placeholder = "Select Option",
  startIcon,
  endIcon,
  ...other
}: any): JSX.Element {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {outerLabel && <FormLabel sx={{ color: 'info.main', fontWeight: 500, textAlign: 'left' }}>{outerLabel}</FormLabel>}
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{ native: true }}
            error={Boolean(error)}
            helperText={error?.message}
            variant="outlined"
            // renderValue={field?.value !== "" ? undefined : () => "placeholder text"}
            InputProps={{
              endAdornment: endIcon ?? "",
              startAdornment: startIcon ?? "",
            }}
            {...other}
            value={field.value ? field.value : " "}
            sx={{  '& .MuiNativeSelect-iconOutlined': {
              display: 'none'
            }}}
          >
            {/* <option disabled value=" ">
              {placeholder}
            </option> */}
            <MenuItem disabled value=" ">
              {placeholder}
            </MenuItem>
            {children}
          </TextField>
        </Stack>
      )}
    />
  );
}
