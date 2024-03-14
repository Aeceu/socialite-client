import { z } from "zod";
import { userLoginSchema, userSignupSchema } from "./userSchema";

export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TUserSignup = z.infer<typeof userSignupSchema>;

export type TUser = {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  age: number | null;
  phone: number | null;
  birthdate: Date | null;
  createdAt: Date;
  profile_img: {
    id: string;
    profile_image_id: string;
    profile_secure_url: string;
    cover_image_id: string;
    cover_secure_url: string;
  } | null;
};

export type TUserUpdate = {
  first_name: string;
  last_name: string;
  email: string;
};

export type UserIdParams = {
  id: string | undefined;
};
export type UpdateUserParams = {
  id: string;
  data: TUserUpdate;
  file: string | ArrayBuffer | null;
};
