import { RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";

export const SurrogacyData = [
  {
    id: 1,
    gridLength: 12,
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
    gridLength: 12,
    otherOptions: {
      name: "surrogateLocation",
      heading: "Surrogate Location",
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
    id: 3,
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
    id: 4,
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
    id: 5,
    gridLength: 12,
    otherOptions: {
      name: "frozenEmbroys",
      heading: "Do you have frozen embroys?",
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
      name: "typeJourney",
      heading: "Type of Journey?",
      placeholder: "Select an option",
      options: [
        { label: "First Child", value: 'First Child' },
        { label: "Sibling", value: "Sibling" },
      ],
    },
    component: RHFCustomSelect,
  },
  // {
  //   id: 7,
  //   gridLength: 12,
  //   otherOptions: {
  //     name: "memberships",
  //     heading: "When do you plan to start?",
  //     placeholder: "Select an option",
  //     options: [
  //       { label: "test", value: "test" },
  //       { label: "test 2", value: "test-2" },
  //     ],
  //   },
  //   component: RHFCustomSelect,
  // },
];
