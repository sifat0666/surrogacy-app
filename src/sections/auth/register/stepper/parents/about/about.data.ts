import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";

export const aboutData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
];
