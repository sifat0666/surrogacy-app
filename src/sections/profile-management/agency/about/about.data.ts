import { RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { RHFUploadFilesWithPreview } from "@/components/rhf/rhf-upload-multiple";
import { RHFCustomSelectMultiple } from "@/components/rhf/rhf-custom-select-multiple";

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
      heading: "Agency Name",
      placeholder: "Placeholder",
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
      options: [
        { id: 1, label: "United State", value: "US" },
        { id: 2, label: "Canada", value: "CA" },
      ],
    },
    component: RHFCustomSelect,
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
    gridLength: 6,
    otherOptions: {
      name: "assistedGroups",
      heading: "Assisted Groups",
      placeholder: "Select one...",
      options: [
        { id: 1, label: "Surrogates and Intended Parents", value: "Surrogates and Intended Parents" },
        { id: 3, label: "Intended Parents", value: "Intended Parents" },
        { id: 2, label: "Surrogates", value: "Surrogates" },
      ],
    },

    component: RHFCustomSelect,
  },
  {
    id: 5,
    gridLength: 6,
    otherOptions: {
      name: "services_provider",
      heading: "Services",
      placeholder: "Select an option",
      options: [
        { label: "Billing Management", value: "Billing Management" },
        { label: "Case Management", value: "Case Management" },
        { label: "Counseling & Support", value: "Counseling & Support" },
        { label: "Escrow Management", value: "Escrow Management" },
        { label: "Legal Counsel", value: "Legal Counsel" },
        { label: "Screening & Matching", value: "Screening & Matching" },
        { label: "Egg Donation", value: "Egg Donation" },
      ],
    },
    component: RHFCustomSelectMultiple,
  },
  {
    id: 6,
    gridLength: 6,
    otherOptions: {
      name: "surrogate_matching_time",
      heading: "Average surrogate matching",
      placeholder: "Select an option",
      options: [
        { label: "1 month", value: "1 month" },
        { label: "3 months", value: "3 months" },
        { label: "6 months", value: "6 months" },
        { label: "1 year", value: "1 year" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 7,
    gridLength: 6,
    otherOptions: {
      name: "journey_length",
      heading: "Average journey length",
      placeholder: "Select an option",
      options: [
        { label: "12 months", value: "12 months" },
        { label: "18 months", value: "18 months" },
        { label: "24 months", value: "24 months" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 8,
    gridLength: 6,
    otherOptions: {
      name: "membership_affilations",
      heading: "Memberships & affiliations",
      placeholder: "Select an option",
      options: [
        { label: "ASRM", value: "ASRM" },
        { label: "SEEDS", value: "SEEDS" },
        { label: "Resolve", value: "Resolve" },
        { label: "BBB", value: "BBB" },
        { label: "Family Equality", value: "Family Equality" },
        { label: "SART", value: "SART" },
      ],
    },
    component: RHFCustomSelectMultiple,
  },
  {
    id: 9,
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

export const aboutFormData_2 = [
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
    id: 0,
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
      heading: "Agency Name",
      placeholder: "Placeholder",
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
      options: [
        { id: 1, label: "The US", value: "US" },
        { id: 2, label: "Canada", value: "CA" },
      ],
    },
    component: RHFCustomSelect,
  },

  {
    id: 4,
    gridLength: 6,
    otherOptions: {
      name: "assistedGroups",
      heading: "Assisted Groups",
      placeholder: "Select one...",
      options: [
        { id: 1, label: "Surrogates and Intended Parents", value: "Surrogates and Intended Parents" },
        { id: 3, label: "Intended Parents", value: "Intended Parents" },
        { id: 2, label: "Surrogates", value: "Surrogates" },
      ],
    },

    component: RHFCustomSelect,
  },
  {
    id: 5,
    gridLength: 6,
    otherOptions: {
      name: "services_provider",
      heading: "Services",
      placeholder: "Select options",
      options: [
        { label: "Billing Management", value: "Billing Management" },
        { label: "Case Management", value: "Case Management" },
        { label: "Counseling & Support", value: "Counseling & Support" },
        { label: "Escrow Management", value: "Escrow Management" },
        { label: "Legal Counsel", value: "Legal Counsel" },
        { label: "Screening & Matching", value: "Screening & Matching" },
        { label: "Egg Donation", value: "Egg Donation" },
      ],
    },
    component: RHFCustomSelectMultiple,
  },
  {
    id: 6,
    gridLength: 6,
    otherOptions: {
      name: "surrogate_matching_time",
      heading: "Average surrogate matching",
      placeholder: "Select an option",
      options: [
        { label: "1 month", value: "1 month" },
        { label: "3 months", value: "3 months" },
        { label: "6 months", value: "6 months" },
        { label: "1 year", value: "1 year" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 7,
    gridLength: 6,
    otherOptions: {
      name: "journey_length",
      heading: "Average journey length",
      placeholder: "Select an option",
      options: [
        { label: "12 months", value: "12 months" },
        { label: "18 months", value: "18 months" },
        { label: "24 months", value: "24 months" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 8,
    gridLength: 6,
    otherOptions: {
      name: "membership_affilations",
      heading: "Memberships & affiliations",
      placeholder: "Select options",
      options: [
        { label: "ASRM", value: "ASRM" },
        { label: "SEEDS", value: "SEEDS" },
        { label: "Resolve", value: "Resolve" },
        { label: "BBB", value: "BBB" },
        { label: "Family Equality", value: "Family Equality" },
        { label: "SART", value: "SART" },
      ],
    },
    component: RHFCustomSelectMultiple,
  },
  {
    id: 9,
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
