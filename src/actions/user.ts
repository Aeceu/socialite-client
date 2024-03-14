import axios, { axiosPrivate } from "../api/axios";
import { requestHandler } from "../helpers/requestHandlers";
import {
  TUser,
  TUserLogin,
  TUserSignup,
  UpdateUserParams,
  UserIdParams,
} from "../types/user";

export const registerUser = requestHandler<TUserSignup, string>((params) =>
  axios.post("/signup", params)
);

type TUserLoginReturnType = {
  user: TUser;
  accessToken: string;
};

export const loginUser = requestHandler<TUserLogin, TUserLoginReturnType>(
  (params) =>
    axios.post("/login", params, {
      withCredentials: true,
    })
);
export const getUserById = requestHandler<UserIdParams, TUser>((params) =>
  axiosPrivate.get(`/user/${params?.id}`)
);

export const getUsers = requestHandler<unknown, TUser[]>(() =>
  axiosPrivate.get(`/users`)
);

export const updateUser = requestHandler<UpdateUserParams, string>((params) =>
  axiosPrivate.patch(`/user/${params?.id}`, {
    data: params?.data,
    file: params?.file,
  })
);

export const deleteUser = requestHandler<UserIdParams, string>((params) =>
  axiosPrivate.delete(`/user/${params?.id}`)
);

type TupdateUserProfileImage = {
  file: string | ArrayBuffer | null;
  userId: string | undefined;
};
export const updateUserProfileImage = requestHandler<
  TupdateUserProfileImage,
  TUser
>((params) =>
  axiosPrivate.patch(`/user/profile/${params?.userId}`, { file: params?.file })
);

export const updateUserCoverImage = requestHandler<
  TupdateUserProfileImage,
  TUser
>((params) =>
  axiosPrivate.patch(`/user/cover/${params?.userId}`, { file: params?.file })
);
