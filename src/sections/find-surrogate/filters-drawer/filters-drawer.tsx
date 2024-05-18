import React from 'react';
import CustomDrawer from '@/components/custom-drawer/custom-drawer';
import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/rhf';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { filtersData } from './filters-drawer.data';

interface FiltersDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onFormValues?: (values: any) => void; // Callback function to pass form values to the parent
}

const FiltersDrawer = ({ open, onClose, onFormValues }: FiltersDrawerProps) => {
  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object({
      })
    ),
    defaultValues: {
      search: '',
      country: '',
      state: '',
      typeSurrogacy: '',
      journey: '',
      agency: false,
      surrogacyJourney: false,
      intendedParentLocation: '',
      agencyRepresented: '',
    },
  });

  const onSubmit = () => { };

  const handleApply = () => {
    const formValues = methods.getValues();
    if (onFormValues && onClose) {
      onFormValues(formValues);
      onClose(); // Close the drawer
    }
  };

  const handleReset = () => {
    // alert('Resetting form values');
    methods.reset(); // Reset form values
  };

  const { handleSubmit } = methods;

  const handleClose = () => {
    methods.reset(); // Reset form values
    if (onClose) {
      onClose();
    }
  };

  return (
    <CustomDrawer
      open={open}
      onClose={handleClose}
      title="Filters"
      handleApply={handleApply}
      handleReset={handleReset} // Pass the reset function to the CustomDrawer component
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {filtersData?.map((form: any) => {
          return (
            <Box key={form?.id} sx={{ borderBottom: '1px solid #B0B0B0', py: '20px' }}>
              <Typography variant="h5" color="info.main" pb="14px">
                {form?.otherOptions?.heading}
              </Typography>
              <form.component size="small" {...form.otherOptions}>
                {form.otherOptions.select
                  ? form?.options?.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                  : null}
              </form.component>
            </Box>
          );
        })}
      </FormProvider>
    </CustomDrawer>
  );
};

export default FiltersDrawer;
