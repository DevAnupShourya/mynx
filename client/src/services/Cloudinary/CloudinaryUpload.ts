import axios from 'axios';
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
    } catch (error) {
        console.log('Error while uploading Image to Cloudinary ', error)
    }
}
export default uploadFile;