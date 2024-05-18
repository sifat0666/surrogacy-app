import { useFormContext, Controller, FieldValues } from "react-hook-form";
import { Box, FormLabel, Stack, Typography } from "@mui/material";
import FlagsSelect from "react-flags-select";
import { ReactElement } from "react";

interface RHFSelectProps {
  name: string;
  outerLabel?: string;
  placeholder?: string;
  [key: string]: any;
}

export function RHFCountrySelect({ name, outerLabel, placeholder = "Select Country", ...other }: RHFSelectProps): ReactElement {
  const { control } = useFormContext<FieldValues>();

  return (
    <Box sx={styles.countryWrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Stack>
            {outerLabel && <FormLabel sx={styles.formLabel}>{outerLabel}</FormLabel>}
            <FlagsSelect
              placeholder={placeholder}
              selected={value}
              searchable={true} // Enable search functionality
              onSelect={(countryCode: string) => onChange(countryCode)}
              // countries={Object.keys(FlagsSelect.countries)}
              showSelectedLabel={true}
              className="flag-select"
              {...other}
            />
            {error && (
              <Typography variant="caption" color="#d32f2f">
                {error.message}
              </Typography>
            )}
          </Stack>
        )}
      />
    </Box>
  );
}

const styles = {
  countryWrapper: {
    "& .flag-select": {
      paddingBottom: 0,
      "& button": {
        border: "2px solid #EAEAEA",
        padding: "8px 14px",
        borderRadius: "6px !important",
        "&::after": {
          borderTop: "5px solid #888888",
        },
        '&[aria-expanded="true"]::after': {
          borderTop: 0,
          borderBottom: "5px solid #888888",
        },
      },
    },
  },
  formLabel: {
    color: "info.main",
    fontSize: "18px",
    fontWeight: 500,
    textAlign: "left",
    pb: '8px'
  },
};
