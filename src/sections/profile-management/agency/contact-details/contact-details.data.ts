import { RHFTextField } from "@/components/rhf";

export const contactDetailsFormData = [
  {
    id: 1,
    gridLength: 6,
    otherOptions: {
      name: "email",
      heading: "Email",
      placeholder: "test@gmail.com",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "phone",
      heading: "Phone",
      placeholder: "123-456-789",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    gridLength: 6,
    otherOptions: {
      name: "website",
      heading: "Website",
      placeholder: "https://",
    },
    component: RHFTextField,
  },
];
