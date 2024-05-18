"use client";
import React from "react";
import { CreditCardExpirationField, FormProvider, RHFCheckbox, RHFMultiCheckbox, RHFSelect, RHFTextField } from "@/components/rhf";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RHFCustomSelect } from "@/components/rhf/rhf-custom-select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RHFRadioGroup } from "@/components/rhf/rhf-radio-group";
import { RHFSwitch } from "@/components/rhf/rhf-switch";

import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";

const page = () => {
  const methods = useForm({
    resolver: yupResolver(
      Yup.object({
        name: Yup.string().required("Band Name is required"),
      })
    ),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = () => {};

  const monthList = [
    {
      value: "january",
      label: "January",
    },
    {
      value: "february",
      label: "February",
    },
    {
      value: "march",
      label: "March",
    },
    {
      value: "april",
      label: "April",
    },
    {
      value: "may",
      label: "May",
    },
    {
      value: "june",
      label: "June",
    },
    {
      value: "july",
      label: "July",
    },
    {
      value: "august",
      label: "August",
    },
    {
      value: "september",
      label: "September",
    },
    {
      value: "october",
      label: "October",
    },
    {
      value: "november",
      label: "November",
    },
    {
      value: "december",
      label: "December",
    },
  ];

  const { handleSubmit } = methods;
  return (
    <Box sx={{ m: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField type="text" name="description" placeholder="Enter some text" fullWidth outerLabel="" multiline rows={6} />
        <RHFTextField type="text" name="description" placeholder="Enter some text" fullWidth outerLabel="Search" StartIcon={<SearchIcon />} />
        <RHFSelect name="month" placeholder="Select month" endIcon={<KeyboardArrowDownIcon />}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </RHFSelect>
        <RHFCustomSelect name="month" placeholder="Select month" options={monthList} />
        <RHFRadioGroup
          name="radioTest"
          options={[
            { label: "test", value: "test" },
            { label: "test 2", value: "test-2" },
          ]}
        />

        <RHFMultiCheckbox
          name="checkboxMulti"
          options={[
            { label: "test2", value: "test2" },
            { label: "test 222", value: "test 222" },
          ]}
        />
        <RHFSwitch name="testSwitch" label="Switch" />
        <RHFUploadSingleFileWithPreview name="image" accept={{ "image/*": [], "video/*": [] }} type="image" />
        <RHFCustomChecked
          name="radioTest"
          options={[
            { label: "test", value: "test" },
            { label: "test 2", value: "test-2" },
          ]}
        />
        <CreditCardExpirationField name="name" />
        <RHFCheckbox name="acceptedMe" label="I accept the Terms" />

      </FormProvider>
    </Box>
  );
};

export default page;
