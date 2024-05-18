import { CreditCardExpirationField, RHFTextField } from "@/components/rhf";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

export const paymentFormData = [
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "cardNumber",
      heading: "Card Numbers",
      placeholder: "1234 5678 9123 2323",
      type: "number",
      inputProps:{
        maxLength: 16,
        inputMode: "numeric",
        pattern: "[0-9]*",
        onInput: (event: any) => {
          const newValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 16);
          event.target.value = newValue;
        },
      }
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 12,
    otherOptions: {
      name: "name",
      heading: "Name",
      placeholder: "Name",
    },
    component: RHFTextField,
  },
  // {
  //   id: 3,
  //   gridLength: 6,
  //   otherOptions: {
  //     name: "cardExpiration",
  //     heading: "Expiry Date",
  //   },
  //   component: CreditCardExpirationField,
  // },
  // {
  //   id: 4,
  //   gridLength: 6,
  //   otherOptions: {
  //     name: "cvvCode",
  //     heading: "CVV Code",
  //     placeholder: "1234",
  //     inputProps: {
  //       maxLength: 4,
  //       inputMode: "numeric",
  //       pattern: "[0-9]*",
  //       onInput: (event: any) => {
  //         const newValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 4);
  //         event.target.value = newValue;
  //       },
  //     },
  //   },
  //   component: RHFTextField,
  // },
];
