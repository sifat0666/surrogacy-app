import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFCustomSelectMultiple } from "@/components/rhf/rhf-custom-select-multiple";

export const MetaDataFormData = [
  {
    id: 1,
    gridLength: 12,
    otherOptions: {
      name: "assisted_groups",
      heading: "We assist the following groups",
      placeholder: "Select an option",
      options: [
        { label: "Surrogates and Intended Parents", value: "Surrogates and Intended Parents" },
        { label: "Intended Parents", value: "Intended Parents" },
        { label: "Surrogates", value: "Surrogates" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 2,
    gridLength: 12,
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
    id: 3,
    gridLength: 12,
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
    id: 4,
    gridLength: 12,
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
    id: 5,
    gridLength: 12,
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
];
