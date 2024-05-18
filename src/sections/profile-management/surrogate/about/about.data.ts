import { RHFTextField } from "@/components/rhf";
import { RHFCustomChecked } from "@/components/rhf/rhf-custom-checked";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFDatePicker } from "@/components/rhf/rhf-date-picker";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { RHFUploadFilesWithPreview } from '@/components/rhf/rhf-upload-multiple';
import { options } from "numeral";


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
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "country",
      heading: "Country",
      placeholder: "Select Country",
      options: [
        { id: 1, label: "The US", value: "US" },
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
      name: "dateBirth",
      heading: "Date of Birth"
    },
    component: RHFDatePicker,
  },
  {
    id: 5,
    gridLength: 12,
    otherOptions: {
      name: "relationshipStatus",
      heading: "Relationship status?",
      options: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "In a reltionship", value: "In a reltionship" },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 6,
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
    id: 7,
    gridLength: 6,
    otherOptions: {
      name: "height",
      heading: "Height",
      type: "number",
      placeholder: '20 ft'
    },
    component: RHFTextField,
  },
  {
    id: 8,
    gridLength: 6,
    otherOptions: {
      name: "weight",
      heading: "Weight",
      placeholder: '85 kg'
    },
    component: RHFTextField,
  },
  {
    id: 9,
    gridLength: 12,
    otherOptions: {
      name: "tobacco",
      heading: "I smoke or use tobacco?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 10,
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
    id: 11,
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
    id: 19,
    gridLength: 12,
    otherOptions: {
      name: "listimages",
      heading: "Upload Gallery Images",
      placeholder: "Upload an Image",
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
    id: 24,
    gridLength: 6,
    otherOptions: {
      name: "lastname",
      heading: "Last Name",
      placeholder: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    gridLength: 6,
    otherOptions: {
      name: "country",
      heading: "Country",
      placeholder: "Select Country",
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
      name: "dateBirth",
      heading: "Date of Birth"
    },
    component: RHFDatePicker,
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    gridLength: 6,
    otherOptions: {
      name: "height",
      heading: "Height",
      type: "number",
      placeholder: '20 ft',
      options: [
        { label: "4'7'' - 140cm", value: 140 },
        { label: "4'8'' - 142cm", value: 142 },
        { label: "4'9'' - 145cm", value: 145 },
        { label: "4'10'' - 147cm", value: 147 },
        { label: "4'11'' - 150cm", value: 150 },
        { label: "5'0'' - 152cm", value: 152 },
        { label: "5'1'' - 155cm", value: 155 },
        { label: "5'2'' - 157cm", value: 157 },
        { label: "5'3'' - 160cm", value: 160 },
        { label: "5'4'' - 163cm", value: 163 },
        { label: "5'5'' - 165cm", value: 165 },
        { label: "5'6'' - 168cm", value: 168 },
        { label: "5'7'' - 170cm", value: 170 },
        { label: "5'8'' - 173cm", value: 173 },
        { label: "5'9'' - 175cm", value: 175 },
        { label: "5'10'' - 178cm", value: 178 },
        { label: "5'11'' - 180cm", value: 180 },
        { label: "6'0'' - 183cm", value: 183 },
        { label: "6'1'' - 185cm", value: 185 },
        { label: "6'2'' - 188cm", value: 188 },
        { label: "6'3'' - 191cm", value: 191 },
        { label: "6'4'' - 193cm", value: 193 },
        { label: "6'5'' - 196cm", value: 196 },
        { label: "6'6'' - 198cm", value: 198 },
        { label: "6'7'' - 201cm", value: 201 },
        { label: "6'8'' - 203cm", value: 203 },
        { label: "6'9'' - 206cm", value: 206 },
        { label: "6'10'' - 208cm", value: 208 },
        { label: "6'11'' - 211cm", value: 211 },
        { label: "7'0'' - 213cm", value: 213 },
        { label: "7'1'' - 216cm", value: 216 },
        { label: "7'2'' - 218cm", value: 218 },
        { label: "7'3'' - 221cm", value: 221 },
        { label: "7'4'' - 224cm", value: 224 },
        { label: "7'5'' - 226cm", value: 226 },
        { label: "7'6'' - 229cm", value: 229 },
        { label: "7'7'' - 231cm", value: 231 },
        { label: "7'8'' - 234cm", value: 234 },
        { label: "7'9'' - 236cm", value: 236 },
        { label: "7'10'' - 239cm", value: 239 },
        { label: "7'11'' - 241cm", value: 241 },
        { label: "8'0'' - 244cm", value: 244 },
        { label: "8'1'' - 246cm", value: 246 },
        { label: "8'2'' - 249cm", value: 249 },
        { label: "8'3'' - 251cm", value: 251 },
        { label: "8'4'' - 254cm", value: 254 },
        { label: "8'5'' - 257cm", value: 257 },
        { label: "8'6'' - 259cm", value: 259 },
        { label: "8'7'' - 262cm", value: 262 },
        { label: "8'8'' - 264cm", value: 264 },
        { label: "8'9'' - 267cm", value: 267 },
        { label: "8'10'' - 269cm", value: 269 },
        { label: "8'11'' - 272cm", value: 272 },
        { label: "9'0'' - 274cm", value: 274 }
      ],
    },
    component: RHFCustomSelect,
  },
  {
    id: 8,
    gridLength: 6,
    otherOptions: {
      name: "weight",
      heading: "Weight",
      placeholder: '85 kg',
      options: [
        { label: "90lb - 40kg", value: 40 },
        { label: "94lb - 43kg", value: 44 },
        { label: "98lb - 45kg", value: 45 },
        { label: "102lb - 46kg", value: 46 },
        { label: "106lb - 48kg", value: 48 },
        { label: "110lb - 50kg", value: 50 },
        { label: "114lb - 52kg", value: 52 },
        { label: "118lb - 53kg", value: 53 },
        { label: "122lb - 55kg", value: 55 },
        { label: "126lb - 57kg", value: 57 },
        { label: "130lb - 59kg", value: 59 },
        { label: "134lb - 61kg", value: 61 },
        { label: "138lb - 62kg", value: 62 },
        { label: "142lb - 64kg", value: 64 },
        { label: "146lb - 66kg", value: 66 },
        { label: "150lb - 68kg", value: 68 },
        { label: "154lb - 70kg", value: 70 },
        { label: "158lb - 71kg", value: 71 },
        { label: "162lb - 73kg", value: 73 },
        { label: "166lb - 75kg", value: 75 },
        { label: "170lb - 77kg", value: 77 },
        { label: "174lb - 79kg", value: 79 },
        { label: "178lb - 80kg", value: 80 },
        { label: "182lb - 82kg", value: 82 },
        { label: "186lb - 84kg", value: 84 },
        { label: "190lb - 86kg", value: 86 },
        { label: "194lb - 88kg", value: 88 },
        { label: "198lb - 89kg", value: 89 },
        { label: "202lb - 91kg", value: 91 },
        { label: "206lb - 93kg", value: 93 },
        { label: "210lb - 95kg", value: 95 },
        { label: "214lb - 97kg", value: 97 },
        { label: "218lb - 99kg", value: 99 },
        { label: "222lb - 100kg", value: 100 },
        { label: "226lb - 102kg", value: 102 },
        { label: "230lb - 104kg", value: 104 },
        { label: "234lb - 106kg", value: 106 },
        { label: "238lb - 108kg", value: 108 },
        { label: "242lb - 109kg", value: 109 },
        { label: "246lb - 111kg", value: 111 },
        { label: "250lb - 113kg", value: 113 },
        { label: "254lb - 115kg", value: 115 },
        { label: "258lb - 117kg", value: 117 },
        { label: "262lb - 119kg", value: 119 },
        { label: "266lb - 120kg", value: 120 },
        { label: "270lb - 122kg", value: 122 },
        { label: "274lb - 124kg", value: 124 },
        { label: "278lb - 126kg", value: 126 },
        { label: "282lb - 128kg", value: 128 },
        { label: "286lb - 130kg", value: 130 },
        { label: "290lb - 131kg", value: 131 },
        { label: "294lb - 133kg", value: 133 },
        { label: "298lb - 135kg", value: 135 },
        { label: "302lb - 137kg", value: 137 },
        { label: "306lb - 139kg", value: 139 },
        { label: "310lb - 140kg", value: 140 }
      ]
    },
    component: RHFCustomSelect,
  },
  {
    id: 9,
    gridLength: 12,
    otherOptions: {
      name: "tobacco",
      heading: "I smoke or use tobacco?",
      options: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
    component: RHFCustomChecked,
  },
  {
    id: 10,
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
    id: 11,
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
