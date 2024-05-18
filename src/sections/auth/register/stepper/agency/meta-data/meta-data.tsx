import React from "react";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { styles } from "../../stepper.styles";
import { MetaDataFormData } from "./meta-data.data";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";

const MetaData = ({ handleChange }: { handleChange: () => void }) => {
  const dispatch = useDispatch();

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        assisted_groups: Yup.string().required("Required Field!"),
        surrogate_matching_time: Yup.string().required("Required Field!"),
        journey_length: Yup.string().required("Required Field!"),
        services_provider: Yup.array().min(1, "Required Field!"),
        membership_affilations: Yup.array().min(1, "Required Field!"),
      })
    ),
    defaultValues: {
      assisted_groups: "",
      services_provider: [],
      surrogate_matching_time: "",
      journey_length: "",
      membership_affilations: []
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    await dispatch(setUserField({ details: { meta: values } }));
    handleChange();
  };

  return (
    <Grid container sx={styles.roleWrapper}>
      <Grid item xs={12} sx={{ paddingX: { xs: '25px', lg: '20px' } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "40px" } }}>
            {MetaDataFormData?.map((form: any) => {
              return (
                <Grid item key={form?.id} xs={12} md={form?.gridLength}>
                  <Typography variant="body1" color="info.main" pb="14px" fontWeight={500} textAlign='left'>
                    {form?.otherOptions?.heading}
                  </Typography>
                  <form.component size="small" {...form.otherOptions} />
                </Grid>
              );
            })}
          </Grid>
          <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", mt: "30px", width: "100%" }}>
            Continue
          </Button>
          <Typography variant="subtitle1" color="info.main" fontSize={12} textAlign="center">
            We will never share your information with anyone else
          </Typography>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default MetaData;
