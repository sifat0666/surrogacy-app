import React from "react";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { styles } from "../../stepper.styles";
import { SurrogacyData } from "./surrogacy.data";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";

const Surrogacy = ({ handleChange }: { handleChange: () => void }) => {
  const dispatch = useDispatch();

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        typeSurrogacy: Yup.string().required("Required Field!"),
        firstSurrogacyJourney: Yup.string().required("Required Field!"),
        workingAgency: Yup.string().required("Required Field!"),
        intendedParentsLocation: Yup.string().required("Required Field!"),
        willingHelp: Yup.string().required("Required Field!"),
        startJourney: Yup.string().required("Required Field!"),
      })
    ),
    defaultValues: {
      typeSurrogacy: "",
      firstSurrogacyJourney: "",
      workingAgency: "",
      intendedParentsLocation: "",
      willingHelp: "",
      startJourney: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {

    await dispatch(setUserField({ details: { surrogacy: values } }));
    handleChange();
  };

  return (
    <Grid container item xs={11} md={8} sx={styles.roleWrapper}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "40px" } }}>
          {SurrogacyData?.map((form: any) => {
            return (
              <Grid item key={form?.id} xs={12} md={form?.gridLength}>
                <Typography variant="body1" color="info.main" pb="14px" fontWeight={500} textAlign="left">
                  {form?.otherOptions?.heading}
                </Typography>
                <form.component size="small" {...form.otherOptions} />
              </Grid>
            );
          })}
        </Grid>
        <Button variant="contained" type="submit" sx={{ backgroundColor: "#FF414D !important", mt: "30px", width: "100%" }}>
          CONTINUE
        </Button>
        <Typography variant="subtitle1" color="info.main" fontSize={12} textAlign="center">
          We will never share your information with anyone else
        </Typography>
      </FormProvider>
    </Grid>
  );
};

export default Surrogacy;
