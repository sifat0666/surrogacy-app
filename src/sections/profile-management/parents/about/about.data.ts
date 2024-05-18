import { RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { RHFUploadFilesWithPreview } from '@/components/rhf/rhf-upload-multiple';

export const aboutFormData = [
  {
    id: 0,
    gridLength: 12,
    otherOptions: {
      name: "image",
      heading: "Upload Profile Avatar",
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
      heading: "Name",
      placeholder: "Placeholder",
    },
    component: RHFTextField,
  },
  {
    id: 145,
    gridLength: 6,
    otherOptions: {
      name: "last_name",
      heading: "Last Name",
      placeholder: "Last Name"
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "country",
      heading: "Country",
      placeholder: "Select",
    },
    component: RHFCountrySelect,
  },
  {
    id: 3,
    gridLength: 6,
    otherOptions: {
      name: "state",
      heading: "State",
      placeholder: "Select one...",
      options: [],
    },
    component: RHFCustomSelect,
  },
  {
    id: 4,
    gridLength: 12,
    otherOptions: {
      name: "relationshipStatus",
      heading: "Relationship status?",
      options: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "In a Relationship", value: "In a relationship" },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 5,
    gridLength: 12,
    otherOptions: {
      name: "children",
      heading: "Do you have children?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 6,
    gridLength: 12,
    otherOptions: {
      name: "travel",
      heading: "Willing to travel?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 7,
    gridLength: 12,
    otherOptions: {
      name: "about",
      heading: "About",
      placeholder: "Type your message...",
      multiline: true,
      minRows: 7,
    },
    component: RHFTextField,
  },

];


export
  const aboutFormData_2 = [
    {
      id: 0,
      gridLength: 12,
      otherOptions: {
        name: "image",
        heading: "Upload Profile Avatar",
        accept: {
          "image/jpeg": [".jpeg", ".png"],
        },
        type: "image",
      },
      component: RHFUploadSingleFileWithPreview,
    },
    {
      id: 220,
      gridLength: 12,
      otherOptions: {
        name: "listimages",
        heading: "Upload Gallery Images",
        accept: {
          "image/jpeg": [".jpeg", ".png"],
        },
        type: "image",
      },
      component: RHFUploadFilesWithPreview,
    },

    {
      id: 1,
      gridLength: 6,
      otherOptions: {
        name: "name",
        heading: "Name",
        placeholder: "Placeholder",
      },
      component: RHFTextField,
    },
    {
      id: 1,
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
      gridLength: 6,
      otherOptions: {
        name: "state",
        heading: "State",
        placeholder: "Select one...",
        options: [],
      },
      component: RHFCustomSelect,
    },
    {
      id: 2,
      gridLength: 6,
      otherOptions: {
        name: "country",
        heading: "Country",
        placeholder: "Select",
      },
      component: RHFCountrySelect,
    },

    {
      id: 4,
      gridLength: 12,
      otherOptions: {
        name: "relationshipStatus",
        heading: "Relationship status?",
        options: [
          { label: "Single", value: "Single" },
          { label: "Married", value: "Married" },
          { label: "In a Reltionship", value: "In a relationship" },
        ],
      },
      component: RHFCustomChecked,
    },
    {
      id: 5,
      gridLength: 12,
      otherOptions: {
        name: "children",
        heading: "Do you have children?",
        options: [
          { label: "Yes", value: 1 },
          { label: "No", value: 0 },
        ],
      },
      component: RHFCustomChecked,
    },
    {
      id: 6,
      gridLength: 12,
      otherOptions: {
        name: "travel",
        heading: "Willing to travel?",
        options: [
          { label: "Yes", value: 1 },
          { label: "No", value: 0 },
        ],
      },
      component: RHFCustomChecked,
    },
    {
      id: 7,
      gridLength: 12,
      otherOptions: {
        name: "about",
        heading: "About",
        placeholder: "Type your message...",
        multiline: true,
        minRows: 7,
      },
      component: RHFTextField,
    },

  ];
