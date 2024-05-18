import { RHFCheckbox, RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";

export const CreateNewProfileFormData = [
  {
    id: 0,
    gridLength: 12,
    otherOptions: {
      name: "image",
      heading: "Upload an Image",
      accept: {
        "image/jpeg": [".jpeg", ".png"],
      },
      type: "image",
    },
    component: RHFUploadSingleFileWithPreview,
  },
  {
    id: 1,
    gridLength: 6,
    otherOptions: {
      name: "name",
      heading: "First Name",
      placeholder: "First Name",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "last_name",
      heading: "Last Name",
      placeholder: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    otherOptions: {
      name: "user_type",
      heading: "Member Type",
      placeholder: "Select one...",
      options: [
        { label: "Intended Parent", value: "Intended Parent" },
        { label: "Surrogate", value: "Surrogate" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 4,
    otherOptions: {
      name: "country",
      heading: "Select your Country",
      placeholder: "Select one...",
    },
    component: RHFCountrySelect,
  },
  {
    id: 5,
    otherOptions: {
      name: "state",
      heading: "Select your state",
      placeholder: "Select one...",
      options: [],
    },
    component: RHFCustomSelect,
  },
];
