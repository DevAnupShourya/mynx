import { axiosInstanceAuth } from "~/lib/AxiosInstance";
import uploadFile from '~/services/UploadFiles/CloudinaryUpload';
import { PostDataInterface } from "~/types/post.types";

export const uploadPosts = async (postData: PostDataInterface) => {
        // ? upload only if user has any images and videos to upload 
        const imagesUrl = postData.images ? await Promise.all(postData.images.map(uploadFile)) : [];
        const videosUrl = postData.videos ? await Promise.all(postData.videos.map(uploadFile)) : [];

        const postPayload = {
            postType: postData.postType,
            tags: postData.tags,
            title: postData.title?.trim(),
            description: postData.description?.trim(),
            ...(imagesUrl.length > 0 && { imagesURL: imagesUrl }),
            ...(videosUrl.length > 0 && { videoURL: videosUrl }),
            ...(postData.pollOptions && { pollOptions: postData.pollOptions }),

        };
        return await axiosInstanceAuth.post(`/posts`, postPayload);
}

export const likePostById = async (postId: string) => {
        const response = await axiosInstanceAuth.patch(
            `/posts/like/${postId}`
        );
        return response;
}

export const updateVixpollPostById = async (ithToPlus: number, pollId: string) => {
    const response = await axiosInstanceAuth.patch(
        `/posts/poll/${pollId}?ithToPlus=${ithToPlus}`
    );
    return response;

}