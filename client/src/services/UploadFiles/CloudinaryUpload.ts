import axios from 'axios';

// ? From .env change with yours
const cloudName = import.meta.env.VITE_CLD_CLOUDNAME;
const unsignedUploadPreset = import.meta.env.VITE_CLD_UNSIGNEDUPLOADPRESET;

const uploadFile = async (file: string) => {
    const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('file', file);

    try {
        const cldResponse = await axios.post(cloudinary_url, fd);
        return cldResponse.data.secure_url;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(`Error uploading on Cloudinary ${error.response.data.error.message}`)
        throw new Error(`File upload failed in [uploadFile]: ${error.response.data.error.message}`);
    }   
}
export { uploadFile as default };