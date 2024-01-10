import axiosInstance from "~/lib/AxiosInstance";
import uploadFile from '~/services/UploadFiles/CloudinaryUpload';
import { PostDataInterface } from "~/types/post.types";

export const uploadPosts = async (postData: PostDataInterface, token: string) => {
        // ? upload only if user has any images and videos to upload 
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

        return await axiosInstance.post(`/posts`, postPayload, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
}

export const likePostById = async (postId: string, token: string) => {
        const response = await axiosInstance.patch(
            `/posts/like/${postId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
}

export const updateVixpollPostById = async (ithToPlus: number, pollId: string, token: string) => {

    const response = await axiosInstance.patch(
        `/posts/poll/${pollId}?ithToPlus=${ithToPlus}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response;

}