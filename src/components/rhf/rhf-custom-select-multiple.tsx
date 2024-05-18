import { Select, FormLabel, FormHelperText, FormControl, MenuItem, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function RHFCustomSelectMultiple({ name, options, outerLabel, styleMenu, placeholder, fullWidth = true, ...others }: any): JSX.Element {
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
                        multiple  // Enable multiple selection
                        inputRef={field.ref}
                        IconComponent={KeyboardArrowDownIcon}
                        inputProps={{
                            classes: {
                                icon: "selectIcon",
                            },
                        }}
                        sx={styles.select}
                        value={Array.isArray(field.value) ? field.value : []} // Ensure value is an array
                        onChange={(e) => field.onChange(e.target.value)} // Update field value
                        {...others}
                    >
                        <MenuItem disabled value="">
                            <em style={{ fontStyle: "normal" }}>{placeholder ?? "Select"}</em>
                        </MenuItem>
                        {options?.map(({ id, label, value }: any, index: number) => (
                            <MenuItem
                                value={value}
                                key={index}
                                sx={{
                                    fontSize: "16px",
                                    mx: 2,
                                    // make it important
                                    backgroundColor: field?.value?.includes(value) ? "#002D40 !important" : "inherit",
                                    color: field?.value?.includes(value) ? "white" : "inherit",
                                    borderBottom: "1px solid #E0E0E0",
                                }}
                            >
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

export default RHFCustomSelectMultiple;

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
