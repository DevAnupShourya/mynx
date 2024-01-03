import axiosInstance from "~/lib/AxiosInstance";
import uploadFile from '~/services/Cloudinary/CloudinaryUpload';
import { PostDataInterface } from "~/types/types.barrel";

export const uploadPosts = async (postData: PostDataInterface, token: string) => {

    const imagesUrl = postData.images ? await Promise.all(postData.images.map(uploadFile)) : [];
    const videosUrl = postData.videos ? await Promise.all(postData.videos.map(uploadFile)) : [];

    const postPayload = {
        postType: postData.postType,
        tags: postData.tags,
        title: postData.title,
        description: postData.description,
        ...(imagesUrl.length > 0 && { imagesURL: imagesUrl }),
        ...(videosUrl.length > 0 && { videoURL: videosUrl }),
        ...(postData.pollOptions && { pollOptions: postData.pollOptions }),

    };

    const response = await axiosInstance.post(`/posts`, postPayload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response;
}