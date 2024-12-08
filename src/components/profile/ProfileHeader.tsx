import { Image } from "@nextui-org/react";
import { TUser } from "../../types/user";
import { Dispatch, SetStateAction } from "react";
import ChangeProfile from "../modal/ChangeProfile";
import ChangeCover from "../modal/ChangeCover";

type ProfileHeaderProps = {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  id: string | undefined;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, id, setUser }) => {
  return (
    <div className="w-full border-b dark:border-foreground-50 flex items-center justify-center bg-gradient-to-b from-white/20 to-black/30">
      <div className="relative w-3/4 h-[350px] flex flex-col ">
        <div className="relative h-[250px] w-full rounded-md flex items-end justify-end  ">
          {user?.profile_img && (
            <Image
              src={
                user.profile_img.cover_secure_url
                  ? user.profile_img.cover_secure_url
                  : "https://images.unsplash.com/photo-1608408843596-b3119736057c?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              alt="img"
              className=" relative w-full h-full"
              radius="sm"
            />
          )}
          <ChangeCover id={id} setUser={setUser} user={user} />
        </div>
        <div className="  w-full h-[100px] flex items-center p-4">
          <div className="group absolute bottom-14 left-5">
            {user?.profile_img && (
              <Image
                src={
                  user.profile_img.profile_secure_url
                    ? user.profile_img.profile_secure_url
                    : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
                alt="img"
                className=" relative w-[150px] h-[150px] object-cover p-1 border-2 border-blue-500"
                radius="full"
              />
            )}
            <span className="group-hover:flex hidden right-0 bottom-0 bg-gray-600 w-[30px] h-[30px] items-center justify-center rounded-full  absolute z-10 hover:scale-110 duration-300 transition-all">
              <ChangeProfile user={user} setUser={setUser} id={id} />
            </span>
          </div>
          <h1 className="mt-6 text-xl">{`${user?.first_name} ${user?.last_name}`}</h1>
        </div>
      </div>
    </div>
  );
};
