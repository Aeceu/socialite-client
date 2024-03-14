import { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import { TUser } from "../types/user";

type TAddfriendProps = {
  friendId: string | undefined;
  userId: string | undefined;
};

type TUserIdParams = {
  userId: string | undefined;
};

type TSearchUserProps = {
  search: string | undefined;
};

export const addFriend = requestHandler<TAddfriendProps, TUser>((params) =>
  axiosPrivate.post(`/user/addFriend/${params?.userId}/${params?.friendId}`)
);

export const removeFriend = requestHandler<TAddfriendProps, TUser>((params) =>
  axiosPrivate.get(`/user/unFriend/${params?.userId}/${params?.friendId}`)
);

export const getUserFriends = requestHandler<TUserIdParams, TUser[]>((params) =>
  axiosPrivate.get(`/user/friends/${params?.userId}`)
);

export const getUserNotFriends = requestHandler<TUserIdParams, TUser[]>(
  (params) => axiosPrivate.get(`/users/${params?.userId}`)
);

export const searchUser = requestHandler<TSearchUserProps, TUser[]>((params) =>
  axiosPrivate.get(`/searchUser/${params?.search}`)
);
