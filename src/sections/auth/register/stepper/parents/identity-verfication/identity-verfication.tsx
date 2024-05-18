import React, { useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { styles } from "../../stepper.styles";
import { FormProvider, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";
import { states } from "@/utils/states";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

const IdentityVerfication = ({ handleChange }: { handleChange: () => void }) => {
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = React.useState<any>([]);
  const method = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("First Name is required"),
        last_name: Yup.string(),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("Name is required"),
      })
    ),
    defaultValues: {
      name: "",
      last_name: "",
      country: "",
      state: ""
    },
  });

  const { handleSubmit, setValue, watch } = method;

  const onSubmit = async (values: any) => {
    values.name = values.name.trim();
    values.last_name = values.last_name.trim();
    values.name = values.name + " " + values.last_name;
    await dispatch(setUserField({ details: { identity: values } }));
    handleChange();
  };


  function getStatesByCountryCode(countryCode: any) {
    const filteredStates = states.filter((state: any) => state.country_code === countryCode);
    return filteredStates.map((state: any) => ({ label: state.name, value: state.state_code }));
  }

  useEffect(() => {
    const selectedCountry = watch("country")
    if (selectedCountry) {
      let states = getStatesByCountryCode(selectedCountry)
      let uniqueStates = states.filter((v, i, a) => a.findIndex(t => (t.value === v.value)) === i)
      setSelectedState(uniqueStates)
    }
  }, [watch("country")]);


  return (
    <Grid container justifyContent="center" sx={styles.roleWrapper}>
      <Grid item xs={12} sx={{ paddingX: { xs: '25px', sm: 0 } }}>
        <FormProvider methods={method} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} direction="column">
            <RHFTextField
              fullWidth
              name="name"
              outerLabel="First Name"
              placeholder="First Name"
              rootSxLabel={styles.outerLabel}
            />
            <RHFTextField
              fullWidth
              name="last_name"
              outerLabel="Last Name"
              placeholder="Last Name"
              rootSxLabel={styles.outerLabel}
            />
            <RHFCountrySelect
              fullWidth
              name="country"
              outerLabel="Select Your Country"
              placeholder="Select Your Country"
              rootSxLabel={styles.outerLabel}
            />
            <RHFCustomSelect
              fullWidth
              name="state"
              outerLabel="Select Your State"
              placeholder="Select Your State"
              rootSxLabel={styles.outerLabel}
              options={selectedState}
            />
            <Box>
              <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", width: "100%" }}>
                Continue
              </Button>
              <Typography variant="subtitle1" color="info.main" fontSize={12} textAlign='center'>We Will never share your information with anyone else</Typography>
            </Box>
          </Stack>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default IdentityVerfication;
