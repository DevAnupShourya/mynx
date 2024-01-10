type PostType = 'Vixet' | 'Vixdeo' | 'Vixsnap' | 'Vixogs' | 'Vixpoll' | 'Vixlive';
export interface PostDataInterface {
    postType: PostType
    tags: string[]
    title?: string
    description?: string
    videos?: string[]
    videosDisplay?: string[]
    images?: string[]
    imagesDisplay?: string[]
    pollOptions?: { pollName: string }[] | null
}

export interface OnePostResponseType {
    author: string
    postType: PostType
    tags: string[]
    likes: string[]
    title?: string
    description?: string
    videoURL?: string[]
    imagesURL?: string[]
    pollOptions?: { pollName: string, pollSupporters: string[] }[] | null
    createdAt: Date
    _id: string
}

export interface AllPostsResponseType {
    postsArray: OnePostResponseType[];
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    totalPages: number;
}
