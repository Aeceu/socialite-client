import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TPostComments } from "../types/post";

type TgetSharedPostCommentsProps = {
  sharedPostId: string;
};

export const getSharedPostComments = requestHandler<
  TgetSharedPostCommentsProps,
  TPostComments[]
>((params) => axiosPrivate.get(`/sharedpost/comment/${params?.sharedPostId}`));

type TcreateSharedPostCommentProps = {
  userId: string | undefined;
  sharedPostId: string;
  comment: string;
};
export const createSharedPostComment = requestHandler<
  TcreateSharedPostCommentProps,
  TPostComments
>((params) =>
  axiosPrivate.post(
    `/sharedpost/comment/new/${params?.userId}/${params?.sharedPostId}`,
    { comment: params?.comment }
  )
);

type TCommentIdProps = {
  commentId: string;
};

export const deleteComment = requestHandler<TCommentIdProps, TPostComments>(
  (params) => axiosPrivate.delete(`/sharedpost/comment/${params?.commentId}`)
);

type TUpdateCommentProps = {
  commentId: string;
  comment: string;
};
export const updateComment = requestHandler<TUpdateCommentProps, TPostComments>(
  (params) =>
    axiosPrivate.patch(
      `/sharedpost/comment/${params?.commentId}`,
      params?.comment
    )
);
