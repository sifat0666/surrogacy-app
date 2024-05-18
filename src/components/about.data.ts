import { RHFTextField } from "@/components/rhf";
import { RHFCountrySelect } from "@/components/rhf/rhf-country-select";
import RHFCustomSelect from "@/components/rhf/rhf-custom-select";
import { RHFUploadSingleFileWithPreview } from "@/components/rhf/rhf-upload";
import { RHFUploadFilesWithPreview } from "@/components/rhf/rhf-upload-multiple";
import { RHFCustomSelectMultiple } from "@/components/rhf/rhf-custom-select-multiple";
import { RHFCheckbox } from "@/components/rhf/rhf-checkbox";
import { options } from "numeral";

export const reportUSerFormData = [

    {
        id: 1,
        gridLength: 12,
        otherOptions: {
            name: "issue",
            heading: "What issue have you with this user?",
            placeholder: "Enter your issue",
            options: [
                { id: 1, label: "Spam", value: "spam" },
                { id: 2, label: "Inappropriate Content", value: "inappropriate_content" },
                { id: 3, label: "Harassment", value: "harassment" },
                { id: 4, label: "Hate Speech", value: "hate_speech" },
                { id: 5, label: "Violence", value: "violence" },
                { id: 6, label: "Other", value: "other" },
            ],
        },
        component: RHFCustomSelect,
    },
    {
        id: 2,
        gridLength: 12,
        otherOptions: {
            name: "issueexplanation",
            heading: "Explain the issue",
            placeholder: "Enter your explanation",
            multiline: true,
        },
        component: RHFTextField,
    },
    {
        id: 3,
        otherOptions: {
            name: "checkboxfield",
            label: "Block this user",
        },
        component: RHFCheckbox,
    },
];

