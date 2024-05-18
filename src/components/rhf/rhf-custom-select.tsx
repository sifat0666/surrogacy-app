import { Select, FormLabel, FormHelperText, FormControl, MenuItem, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function RHFCustomSelect({ name, options, outerLabel, styleMenu, placeholder, fullWidth = true, ...others }: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={Boolean(error)} fullWidth={fullWidth}>
          {outerLabel && <FormLabel sx={styles.label}>{outerLabel}</FormLabel>}
          <Select
            displayEmpty
            inputRef={field.ref}
            IconComponent={KeyboardArrowDownIcon}
            inputProps={{
              classes: {
                icon: "selectIcon",
              },
            }}
            sx={styles.select}
            {...field}
            {...others}
          >
            <MenuItem disabled value="">
              <em style={{ fontStyle: "normal" }}>{placeholder ?? "Select"}</em>
            </MenuItem>
            {options?.map(({ id, label, value }: any, index: number) => (
              <MenuItem value={value} key={index} sx={{ fontSize: "16px", mx: 2, ...styleMenu }}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {Boolean(error) && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export default RHFCustomSelect;

const styles = {
  select: {
    "& .selectIcon": {
      fill: "#888888",
    },
  },
  label: {
    pb: "0.6rem",
    color: "info.main",
    fontWeight: 500,
    textAlign: "left",
  },
};
