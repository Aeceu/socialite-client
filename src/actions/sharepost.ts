import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TSharePost } from "../types/post";

type TUserAndPostIdProps = {
  userId: string | undefined;
  postId: string;
  title: string | undefined;
};
export const sharePost = requestHandler<TUserAndPostIdProps, TSharePost>(
  (params) =>
    axiosPrivate.post(`/sharepost/${params?.userId}/${params?.postId}`, {
      title: params?.title,
    })
);

type TUserSharedPostsProps = {
  userId: string | undefined;
};

export const getUserSharedPosts = requestHandler<
  TUserSharedPostsProps,
  TSharePost[]
>((params) => axiosPrivate.get(`/usersharedposts/${params?.userId}`));

export const getSharedPost = requestHandler<unknown, TSharePost[]>(() =>
  axiosPrivate.get("/allsharedposts")
);

type TGetSharedPostByIdProps = {
  sharedpostId: string;
};
export const getSharedPostById = requestHandler<
  TGetSharedPostByIdProps,
  TSharePost
>((params) => axiosPrivate.get(`/sharepost/${params?.sharedpostId}`));

type TEditSharedPostProps = {
  sharePostId: string;
  title: string;
};

export const editSharedPost = requestHandler<TEditSharedPostProps, TSharePost>(
  (params) =>
    axiosPrivate.patch(`/sharepost/${params?.sharePostId}`, {
      title: params?.title,
    })
);

export const deleteSharedPost = requestHandler<string, TSharePost>((params) =>
  axiosPrivate.delete(`/sharepost/${params}`)
);
