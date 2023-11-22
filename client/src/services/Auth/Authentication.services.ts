import axios from 'axios';
const API_URL = ' http://127.0.0.1:3300/api';

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth, { provider } from "~/firebase";

import { FormDataInterface } from "~/types/types.barrel";
import uploadFile from '~/services/Cloudinary/CloudinaryUpload';

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
        uId: resultFromFirebase.user.uid
    })

    return response;
}
const createUserWithGoogle = async () => {
    // ? Save user to Firebase
    const { user: savedUser } = await signInWithPopup(
        auth,
        provider
    );
    // ? Save User Data to Local DB in User is New
    if (savedUser.metadata.creationTime === savedUser.metadata.lastSignInTime) {
        await axios.post(`${API_URL}/users/register`, {
            email: savedUser.email,
            name: savedUser.displayName,
            username: savedUser.displayName?.toLowerCase().replace(' ', '_'),
            avatarURL: savedUser.photoURL,
            uId: savedUser.uid,
            gender: "NA",
            coverURL: "https://res.cloudinary.com/dpdmpt1rg/image/upload/v1700375937/default-coverURl_ewwpme.jpg",
            bio: "Your Bio goes here",
            country: "NA",
        })
        return 201;
    }
    return 201;
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
const getUserByUID = async (uId: string) => {
    const userData = await axios.get(`${API_URL}/users/user/${uId}`)
    return userData;
}

export {
    createUser, checkUsernameAvailability, getUserByUID, createUserWithGoogle
};