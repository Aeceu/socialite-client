import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TPostLikes } from "../types/post";

type SharedPostIdProps = {
  sharedPostId: string;
};

type SharedPostIdAndUserIdProps = {
  userId: string | undefined;
  sharedPostId: string;
};

type SharedPostIdAndLikeIdProps = {
  likeId: string;
  sharedPostId: string;
};

type LikesReturnType = {
  likes: TPostLikes;
};

export const getSharedPostLikes = requestHandler<
  SharedPostIdProps,
  LikesReturnType
>((params) => axiosPrivate.get(`/sharedpost/likes/${params?.sharedPostId}`));

export const likeSharedPost = requestHandler<
  SharedPostIdAndUserIdProps,
  LikesReturnType
>((params) =>
  axiosPrivate.get(
    `/sharedpost/likepost/${params?.sharedPostId}/${params?.userId}`
  )
);

export const unLikeSharedPost = requestHandler<
  SharedPostIdAndLikeIdProps,
  LikesReturnType
>((params) =>
  axiosPrivate.get(
    `/sharedpost/unlikepost/${params?.sharedPostId}/${params?.likeId}`
  )
);
