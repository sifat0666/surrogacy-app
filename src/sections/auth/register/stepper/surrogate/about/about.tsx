import React from "react";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { styles } from "../../stepper.styles";
import { aboutData } from "./about.data";
import { useDispatch } from "react-redux";
import { setUserField } from "@/slices/user";
import dayjs from "dayjs";

const About = ({ handleChange }: { handleChange: () => void }) => {
  const dispatch = useDispatch();

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        relationshipStatus: Yup.string().required("Required Field!"),
        dateBirth: Yup.string()
          .required('Birthdate is required')
          .test('is-old-enough', 'You must be at least 18 years old', function (value) {
            const birthdate = dayjs(value, 'YYYY-MM-DD');
            const today = dayjs();
            const age = today.diff(birthdate, 'year');
            return age >= 18;
          }),
        children: Yup.string().required("Required Field!"),
        height: Yup.string().required("Required Field!"),
        weight: Yup.string().required("Required Field!"),
        tobacco: Yup.string().required("Required Field!"),
        travel: Yup.string().required("Required Field!"),
      })
    ),
    defaultValues: {
      relationshipStatus: "",
      dateBirth: "",
      height: "",
      weight: "",
      tobacco: "",
      travel: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    await dispatch(setUserField({ details: { about: values } }));
    handleChange();
  };

  return (
    <Grid container sx={styles.roleWrapper}>
      <Grid item xs={12} sx={{ paddingX: { xs: '25px', lg: '20px' } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} sx={{ pt: { xs: "24px", sm: "40px" } }}>
            {aboutData?.map((form: any) => {
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
    </Grid>
  );
};

export default About;
