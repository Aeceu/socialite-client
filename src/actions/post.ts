import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import {
	TGetPostParams,
	TNewPostParams,
	TPost,
	TUpdatePostParams,
	TUserPostParams,
	TUserPostReturnType,
	TSharePost,
} from "../types/post";

export const getUserPosts = requestHandler<
	TUserPostParams,
	TUserPostReturnType
>((params) => axiosPrivate.get(`/userposts/${params?.userId}`));

export const getPostById = requestHandler<TGetPostParams, TPost>((params) =>
	axiosPrivate.get(`/post/${params?.postId}`)
);

export const getAllPosts = requestHandler<unknown, TPost[]>(() =>
	axiosPrivate.get("/allposts")
);

export const createPost = requestHandler<TNewPostParams, TPost>((params) =>
	axiosPrivate.post(`/newpost/${params?.userId}`, {
		data: params?.data,
		file: params?.file,
	})
);

export const updatePost = requestHandler<TUpdatePostParams, TPost>((params) =>
	axiosPrivate.patch(`/post/${params?.postId}`, {
		data: params?.data,
		file: params?.file,
	})
);
export const deletePost = requestHandler<TGetPostParams, string>((params) =>
	axiosPrivate.delete(`/post/${params?.postId}`)
);

type TFeed = {
	page: number;
	pageSize: number;
};

type getFeedReturnType = {
	feed: (TPost | TSharePost)[];
	totalCount: number;
};

export const getFeed = requestHandler<TFeed, getFeedReturnType>((params) =>
	axiosPrivate.get(
		`/api/feed?page=${params?.page}&pageSize=${params?.pageSize}`
	)
);
