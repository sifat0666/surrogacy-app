import { states } from "@/utils/states";



export const UploadSingleImageToCloud = async (image_file: any) => {
    const image_selected = image_file;

    try {
        if (!image_selected) {
            return;
        }
        const formData2 = new FormData();
        formData2.append("file", image_selected);
        formData2.append("upload_preset", "w2fsqv0e");
        try {
            const response = await fetch(' https://api.cloudinary.com/v1_1/dl8ppbbgu/image/upload', {
                method: 'POST',
                body: formData2,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // This header might be required by Cloudinary
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.secure_url;
            } else {
                console.error('Failed to upload image:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }

    } catch (error: any) {
        console.log("error", error);
        return "";
    }
}

export const UploadLostOfImagesToCloud = async (image_files: any[]) => {
    try {
        const uploadedImageUrls = [];

        for (const image_file of image_files) {
            const formData = new FormData();
            formData.append("file", image_file);
            formData.append("upload_preset", "w2fsqv0e");

            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dl8ppbbgu/image/upload', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest', // This header might be required by Cloudinary
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    uploadedImageUrls.push(data.secure_url);
                } else {
                    console.error('Failed to upload image:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        return uploadedImageUrls;
    } catch (error: any) {
        console.log("error", error);
        return [];
    }
}



export const getStatesByCountryCode = (countryCode: any) => {
    const filteredStates = states.filter((state: any) => state.country_code === countryCode);
    return filteredStates.map((state: any) => ({ label: state.name, value: state.state_code }));
}

export const parseStringToArray = (stringData: string | undefined) => {
    if (!stringData) {
        return '-';
    }
    // Remove quotes, escape characters, and brackets
    const cleanString = stringData.replace(/["\\[\]]/g, '');
    // Split by comma and trim each element
    const affiliationsArray = cleanString.split(',').map(affiliation => affiliation.trim());
    // Join the array elements with comma and space

    console.log("affiliationsArray", affiliationsArray);
    return affiliationsArray.join(', ');
}



export function getStateNameByCode(stateCode: any) {
    const state = states.find(state => state.state_code === stateCode);
    return state ? state.name : "State not found";
}

export function getCountryNameByCode(countryCode: any) {
    const state = states.find(state => state.country_code === countryCode);
    return state ? state.country_name : "Country not found";
}

export const getHeightInFeetAndInches = (heightInCm: number) => {
    const height = [
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
        { label: "9'0'' - 274cm", value: 274 },
    ];

    const selectedHeight = height.find(item => item.value === Number(heightInCm));
    return selectedHeight ? selectedHeight.label : '';
}


export const gettWeightInKgAndLb = (weightInKg: number) => {
    const weights = [
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
    ];

    const selectedWeight = weights.find(item => item.value === Number(weightInKg));
    return selectedWeight ? selectedWeight.label : '';
}