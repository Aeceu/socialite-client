import { TUser } from "./user";

export type TPost = {
  id: string;
  title: string | null;
  isLiked: boolean;
  isSaved: boolean;
  post_img: {
    id: string;
    image_id: string;
    secure_url: string;
  } | null;
  user: TUser;
  createdAt: Date;
};

export type TSharePost = {
  id: string;
  title: string | null;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
  User: TUser;
  post: TPost;
};

export type TPostLikes = {
  id: string;
  likersId: string;
  postId: string;
}[];

export type TPostComments = {
  id: string;
  userId: string;
  comment: string;
  user: TUser;
};

export type TUserPostParams = {
  userId: string | undefined;
};

export type TUserPostReturnType = {
  post: TPost[];
};

export type TGetPostParams = {
  postId: string;
};

export type TNewPostParams = {
  userId: string | undefined;
  data: string;
  file: string | ArrayBuffer | null;
};

export type TUpdatePostParams = {
  postId: string;
  data: string;
  file: string | ArrayBuffer | null;
};
