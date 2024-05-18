import { RHFCheckbox, RHFMultiCheckbox, RHFSelect, RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFCustomSelectMultiple } from "@/components/rhf/rhf-custom-select-multiple";


export const filtersData = [
  {
    id: 1,
    otherOptions: {
      name: "search",
      heading: "Search",
      placeholder: "Keyword",
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
        { label: "United states", value: "US" },
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
];
