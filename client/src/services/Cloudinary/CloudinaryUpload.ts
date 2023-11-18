import axios from 'axios';
const cloudName = 'dpdmpt1rg';
const unsignedUploadPreset = 'vixel_preset';

const uploadFile = async (file: string) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('file', file);

    try {
        const cldResponse = await axios.post(url, fd);
        return cldResponse.data.secure_url
    } catch (error) {
        console.log('Error while uploading Image to Cloudinary ', error)
    }
}

export { uploadFile };