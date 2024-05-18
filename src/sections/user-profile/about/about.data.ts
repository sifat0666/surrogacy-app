

import {
  parseStringToArray,
  getStateNameByCode,
  getCountryNameByCode,
  gettWeightInKgAndLb,
  getHeightInFeetAndInches
} from "@/utils/utilitiy-functions";


export const personalInformationData = (data: any) => [
  { title: "Age", label: `${data?.age ?? "-"}` },
  { title: "Relationship Status", label: `${data?.relationship_status ?? "-"}` },
  { title: "Height", label: `${getHeightInFeetAndInches(data?.height) ?? "-"}` },
  { title: "Weight", label: `${gettWeightInKgAndLb(data?.weight) ?? "-"}` },
  { title: "Children", label: `${data?.have_children ? "Yes" : "No" ?? "-"}` },
  { title: "Tobacco use", label: `${data?.is_smoke_or_tobacco ? "Yes" : "No" ?? "-"}` },
  { title: "Willing to travel", label: `${data?.is_willing_to_travel ? "Yes" : "No" ?? "-"}` },
];


export const parentPersonalInformationData = (data: any) => [
  // { title: "First Name", label: `${data?.name ?? "-"}` },
  // { title: "Last Name", label: `${data?.name?.split(" ")[1] ?? "-"}` },
  { title: "Country", label: getCountryNameByCode(data?.country) ?? "-" },
  { title: "Children", label: `${data?.have_children ? "Yes" : "No" ?? "-"}` },
  { title: "Relationship Status", label: `${data?.relationship_status ?? "-"}` },
  // { title: "State", label: getStateNameByCode(data?.state) ?? "-" },
  // { title: "Relationship Status", label: `${data?.relationship_status ?? "-"}` },
  // { title: "Children?", label: `${data?.have_children ? "Yes" : "No" ?? "-"}` },
  { title: "Willing to Travel", label: `${data?.is_willing_to_travel ? "Yes" : "No" ?? "-"}` },
];

export const surrogacyInformationData = (data: any) => [
  { title: "Type of Surrogacy", label: `${data?.surrogacy_type ?? '-'}` },
  { title: "First-time Surrogate", label: `${data?.is_first_surrogacy_journey ? "Yes" : "No" ?? '-'}` },
  { title: "Willing to Help", label: `${data?.willing_to_help_types ?? '-'}` },
  { title: "Working with an Agency", label: `${data?.willing_to_help_types ? 'Yes' : 'No' ?? '-'}` },
  { title: "Intended Parents location", label: `${data?.intended_parent_location === "The US" ? "United States" : data?.intended_parent_location ?? '-'}` },
  { title: "Availability", label: "Ready to start!" },
];
export const parentSurrogacyInformationData = (data: any) => [
  { title: "Type of Surrogacy", label: `${data?.surrogacy_type ?? '-'}` },
  { title: "First Surrogacy Journey", label: `${data?.is_first_surrogacy_journey ? "Yes" : "No" ?? '-'}` },
  { title: "Working with an Agency", label: `${data?.willing_to_help_types ? 'Yes' : 'No' ?? '-'}` },
  { title: "Frozen Embryos", label: `${data?.have_frozen_embryos ? "Yes" : "No" ?? '-'}` },
  // if the countey is The US then show United States other wise use the function to get the country name
  { title: "Surrogate Location", label: `${data?.surrogate_location === "The US" ? "United States" : getCountryNameByCode(data?.surrogate_location) ?? '-'}` },
  { title: "Type of Journey", label: `${data?.type_of_journey ?? '-'}` },
];

export const agencyAboutData = (data: any) => [
  { title: "Agency Name", label: `${data?.name ?? '-'}` },
  // { title: "Country", label: `${data?.country ?? '-'}` },
  // { title: "State", label: `${data?.state ?? '-'}` },
  { title: "We assist the following groups", label: `${data?.assisted_groups ?? '-'}` },
  { title: "Services Provided", label: parseStringToArray(data?.services_provided) },
  { title: "Average Matching Time", label: `${data?.surrogate_matching_time ?? '-'}` },
  { title: "Average Journey Length", label: `${data?.journey_length ?? '-'}` },
  { title: "Membership and Affiliations", label: parseStringToArray(data?.membership_affilations) },
];


export const aboutData = (data: any) => [
  { title: "About", label: `${data?.about ?? '-'}` },
];