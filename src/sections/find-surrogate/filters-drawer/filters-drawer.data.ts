import { RHFCheckbox, RHFMultiCheckbox, RHFSelect, RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFSwitch } from "@/components/rhf/rhf-switch";

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
        { label: "United states", value: "The US" },
        { id: 2, label: "Canada", value: "Canada" },
      ],
    },
    component: RHFCountrySelect,
  },
  {
    id: 3,
    otherOptions: {
      name: "state",
      heading: "State",
      placeholder: "Please select a state",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    otherOptions: {
      name: "typeSurrogacy",
      heading: "Type of Surrogacy",
      placeholder: "Please select a Surrogacy Type",
      options: [
        { label: "Gestational Surrogacy", value: "Gestational Surrogacy" },
        { label: "Traditional Surrogacy", value: "Traditional Surrogacy" },
        { label: "Gestational and Traditional Surrogacy", value: "Gestational and Traditional Surrogacy" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 5,
    otherOptions: {
      name: "journey",
      heading: "When do you Plan to start your journey?",
      options: [
        { label: "Ready to Start", value: "Ready to Start" },
        { label: "This Year", value: "This Year" },
        { label: "Next Year", value: "Next Year" },
        { label: "Unknown", value: "Unknown" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 6,
    otherOptions: {
      name: "agency",
      heading: "Are you working with an agency?",
    },
    component: RHFSwitch,
  },
  {
    id: 7,
    otherOptions: {
      name: "surrogacyJourney",
      heading: "Is this your first surrogacy journey?",
    },
    component: RHFSwitch,
  },
  {
    id: 8,
    otherOptions: {
      name: "intendedParentLocation",
      heading: "Intended Parent Location",
      placeholder: "Please select a location",
    },
    component: RHFCountrySelect,
  },
  {
    id: 9,
    otherOptions: {
      name: "agencyRepresented",
      heading: "Agency Represented",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    component: RHFCustomSelect,
  },
];
