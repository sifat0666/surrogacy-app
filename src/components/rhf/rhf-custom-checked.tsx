import { useFormContext, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormHelperText, FormControlLabel, FormLabel, Box } from "@mui/material";
import CheckedIcon from "../../assets/icons/checked-dot-icon.svg";
import Image from "next/image";

export function RHFCustomChecked({ name, options, outerLabel, disabled = false, ...other }: any): JSX.Element {
  const { control } = useFormContext();


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, field: { onChange }, fieldState: { error } }: any) => (

        <Box sx={{ position: 'relative' }}>
          {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
          <RadioGroup
            {...field}
            row
            {...other}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newValue = e.target.value;

              if (typeof newValue !== "string") return;
              if (newValue === "true") onChange(true);
              else if (newValue === "false") onChange(false);
              else onChange(newValue);
            }}
          >
            {options?.map(({ value, label }: any) => (
              <FormControlLabel sx={styles.formControlLabel} key={value} value={value} control={<Radio disabled={disabled} checkedIcon={<Image src={CheckedIcon} alt="" />} />} label={label} />
            ))}
          </RadioGroup>

          {Boolean(error) && (
            <FormHelperText error sx={{ position: 'absolute' }}>
              {error?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}

const styles = {
  formControlLabel: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #FF414D",
    width: "max-content",
    p: "16px 16px",
    margin: "7px 4px",
    borderRadius: "6px",
    "& .MuiButtonBase-root": {
      p: "0 10px 0 0",
      "& > svg": {
        width: "11px",
        height: "11px",
      },
    },
    "& .MuiTypography-root": {
      fontSize: "14px",
      fontWeight: 500,
      color: "secondary.main",
      lineHeight: 0,
      marginTop: "-1px",
    },
  },
};
