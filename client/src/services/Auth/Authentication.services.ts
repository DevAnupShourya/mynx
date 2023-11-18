import axios from 'axios';
const API_URL = ' http://127.0.0.1:3300/api';

import auth from "~/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


import { FormDataInterface } from "~/types/types.barrel";
import { uploadFile } from '~/services/Cloudinary/CloudinaryUpload';

const createUser = async (formData: FormDataInterface) => {
    // ? Save user to Firebase
    const resultFromFirebase = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
    );

    // ? Save User Images to Cloudinary DB
    const avatarCloudURL = await uploadFile(formData.avatarURL);
    const coverCloudURL = await uploadFile(formData.coverURL);

    // ? Save User Data to Local DB
    const response = await axios.post(`${API_URL}/users/register`, {
        email: resultFromFirebase.user.email,
        name: formData.name,
        username: formData.username,
        country: formData.country,
        gender: formData.gender,
        bio: formData.bio,
        avatarURL: avatarCloudURL,
        coverURL: coverCloudURL,
    })

    return response;
}

const checkUsernameAvailability = async (username: string) => {
    console.log('in checkUsernameAvailability')
    // ? Check if username is valid string
    const validUsernameRegex = /^[\w]+$/;

    if (!validUsernameRegex.test(username)) {
        return 404;
    }

    // ? Check if username is available to use
    const { data } = await axios.get(`${API_URL}/users/usernames`);

    if (data.responseData.usernames.includes(username)) {
        return 403;
    } else {
        return 200;
    }
}
export {
    createUser, checkUsernameAvailability
};