import { RHFTextField } from "@/components/rhf";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

export const securitySettingFormData = [
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "currentPassword",
      heading: "Current Password",
      type: "password",
      placeholder: "Current Password",
    },
    component: RHFTextField,
  },
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "newPassword",
      heading: "New Password",
      type: "password",
      placeholder: "New Password",
    },
    component: RHFTextField,
  },
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "confirmPassword",
      heading: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
    },
    component: RHFTextField,
  },
];
