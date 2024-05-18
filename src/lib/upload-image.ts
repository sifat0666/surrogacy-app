import cloudinary from 'cloudinary';

export const UploadImage = async (file: any, folder: string) => {

    const buffer = await file.arrayBuffer();
    const bytes = buffer.from(buffer);

    // new Promise((resolve, reject) => {
    //     cloudinary.v2.uploader.upload_stream({
    //         resource_type: 'auto',
    //         folder: folder
    //     }, (error: any, result: any) => {
    //         if (error) {
    //             reject(error);
    //         } else {
    //             resolve(result);
    //         }
    //     }).end(bytes);
    // });
};
