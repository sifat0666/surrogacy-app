import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { FormLabel, Stack } from "@mui/material";
import DatePickerIcon from "../../assets/icons/date-picker-icon.svg";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import dayjs from "dayjs";



export function RHFDatePicker({
  name,
  label,
  outerLabel,
  ...other
}: any): JSX.Element {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {

        const dateValue = field.value ? dayjs(field.value) : null;

        return (
          <Stack gap='0.6rem'>
            {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
            <DatePicker
              {...field}
              {...other}
              //defaultValue={field?.value ? dayjs(field?.value) : dayjs("2022-02-02")}
              value={dateValue}
              slotProps={{
                textField: {
                  helperText: error ? error.message : "",
                  error: Boolean(error),
                  fullWidth: other.fullWidth,
                  size: other.size,
                  variant: "outlined",
                },
              }}
              label={label}
            />
          </Stack>
        );
      }}
    />
  );
}
