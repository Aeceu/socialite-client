import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TPostComments } from "../types/post";

type PostIdParams = {
  postId: string;
};

export const getComments = requestHandler<PostIdParams, TPostComments[]>(
  (params) => axiosPrivate.get(`/post/comment/${params?.postId}`)
);

type TCreateCommentParams = {
  userId: string | undefined;
  postId: string;
  comment: string;
};

export const createComment = requestHandler<
  TCreateCommentParams,
  TPostComments
>((params) =>
  axiosPrivate.post(`/comment/new/${params?.userId}/${params?.postId}`, {
    comment: params?.comment,
  })
);

type TCommentIdProps = {
  commentId: string;
};

export const deleteComment = requestHandler<TCommentIdProps, TPostComments>(
  (params) => axiosPrivate.delete(`/comment/${params?.commentId}`)
);

type TUpdateCommentProps = {
  commentId: string;
  comment: string;
};
export const updateComment = requestHandler<TUpdateCommentProps, TPostComments>(
  (params) =>
    axiosPrivate.patch(`/comment/${params?.commentId}`, params?.comment)
);
