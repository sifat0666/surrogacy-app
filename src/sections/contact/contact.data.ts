import { RHFTextField } from "@/components/rhf";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

export const ContactFormData = [
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "firstName",
      heading: "First name",
      placeholder: "First name",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 12,
    otherOptions: {
      name: "lastName",
      heading: "Last name",
      placeholder: "Last name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    gridLength: 12,
    otherOptions: {
      name: "email",
      heading: "Email",
      placeholder: "Email",
    },
    component: RHFTextField,
  },
  {
    id: 5,
    gridLength: 6,
    otherOptions: {
      name: "message",
      heading: "Message",
      placeholder: "Type your message...",
      multiline: true,
      minRows: 7
    },
    component: RHFTextField,
  },
];
