import { Divider, User } from "@nextui-org/react";
import UserStore from "../store/UserStore";
import { LucideBookmark, LucideShare, LucideThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import UserFriends from "./UserFriends";

const SideBar = () => {
  const user = UserStore((state) => state.user);

  return (
    <section className="w-[20%] border-r dark:border-foreground-50 border-foreground-300 flex flex-col p-2">
      <Link
        to={`/profile/${user?.id}`}
        className="w-full flex items-center gap-2 px-2 py-4 rounded-md hover:bg-foreground hover:text-foreground-50"
      >
        <User
          name={`${user?.first_name}, ${user?.last_name}`}
          description={`${user?.email}`}
          avatarProps={{
            src: user?.profile_img?.profile_secure_url
              ? user?.profile_img?.profile_secure_url
              : "https://i.pravatar.cc/150?u=a04258a2462d826712d",
          }}
        />
      </Link>
      <Divider className="my-2" />
      <p className="text-xs">Activities</p>
      <span className="text-sm w-full flex items-center gap-2 px-2 py-3.5 rounded-md group cursor-pointer hover:bg-blue-500">
        <LucideShare className="w-4 text-foreground group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 " />
        <p className="group-hover:scale-110 text-foreground ">Posts</p>
      </span>
      <span className="text-sm w-full flex items-center gap-2 px-2 py-3.5 rounded-md  group cursor-pointer hover:bg-red-500">
        <LucideThumbsUp className="w-4 text-foreground group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 " />
        <p className="group-hover:scale-110 text-foreground ">Liked</p>
      </span>
      <span className="text-sm w-full flex items-center gap-2 px-2 py-3.5 rounded-md  group cursor-pointer hover:bg-emerald-500">
        <LucideBookmark className="w-4 text-foreground group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 " />
        <p className="group-hover:scale-110 text-foreground ">Saved</p>
      </span>
      <Divider className="my-2" />
      <p className="text-xs">Friends</p>
      <UserFriends />
    </section>
  );
};
export default SideBar;
