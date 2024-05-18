import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

export const surrogacyInformationFormData = [
  {
    id: 1,
    gridLength: 6,
    otherOptions: {
      name: "typeSurrogacy",
      heading: "Type of Surrogacy",
      placeholder: "Select an option",
      options: [
        { label: "Gestational Surrogacy", value: "Gestational Surrogacy" },
        { label: "Traditional Surrogacy", value: "Traditional Surrogacy" },
        { label: "Gestational and Traditional Surrogacy", value: "Gestational and Traditional Surrogacy" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "willingHelp",
      heading: "I am willing to Help",
      placeholder: "Select an option",
      options: [
        { label: "Open to All Intended Parents", value: "Open to All Intended Parents" },
        { label: "Heterosexual Couple", value: "Heterosexual Couple" },
        { label: "Gay Couple", value: "Gay Couple" },
        { label: "Lesbian Couple", value: "Lesbian Couple" },
        { label: "Single Man", value: "Single Man" },
        { label: "Single Woman", value: "Single Woman" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 3,
    gridLength: 6,
    otherOptions: {
      name: "intendedParentsLocation",
      heading: "Intended parents location",
      placeholder: "Select an option",
      options: [
        { label: "United states", value: "The US" },
        { label: "Canada", value: "Canada" },
        { label: "Worldwide", value: "Worldwide" },
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 4,
    gridLength: 12,
    otherOptions: {
      name: "firstSurrogacyJourney",
      heading: "Is this your first surrogacy journey?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 5,
    gridLength: 12,
    otherOptions: {
      name: "workingAgency",
      heading: "Are you working with an agency?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 6,
    gridLength: 6,
    otherOptions: {
      name: "startJourney",
      heading: "When to start journey",
      placeholder: "Select an option",
      options: [
        { label: "Ready to start", value: "Ready to start" },
        { label: "This year", value: "This year" },
        { label: "Next year", value: "Next year" },
        { label: "Unknown", value: "Unknown" },
      ],
    },
    component: RHFCustomSelect,
  },
];
