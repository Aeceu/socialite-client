import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TPostLikes } from "../types/post";

type PostIdProps = {
  postId: string;
};

type PostIdAndUserIdProps = {
  userId: string | undefined;
  postId: string;
};

type PostIdAndLikeIdProps = {
  likeId: string;
  postId: string;
};

type LikesReturnType = {
  likes: TPostLikes;
};

export const getPostLikes = requestHandler<PostIdProps, LikesReturnType>(
  (params) => axiosPrivate.get(`/post/likes/${params?.postId}`)
);

export const likePost = requestHandler<PostIdAndUserIdProps, LikesReturnType>(
  (params) =>
    axiosPrivate.get(`/post/likepost/${params?.postId}/${params?.userId}`)
);

export const unLikePost = requestHandler<PostIdAndLikeIdProps, LikesReturnType>(
  (params) =>
    axiosPrivate.get(`/post/unlikepost/${params?.postId}/${params?.likeId}`)
);
