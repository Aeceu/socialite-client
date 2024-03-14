import { Avatar, Image } from "@nextui-org/react";
import { TSharePost } from "../types/post";
import { TUser } from "../types/user";
import { Link } from "react-router-dom";
import { LucideMessageSquareMore } from "lucide-react";
import ShareTab from "./post/ShareTab";
import LikeTab from "./sharedpost/LikeTab";
import EditSharedPost from "./sharedpost/EditSharedPost";

type TSharedPostCardProps = {
  user: TUser | null; //? User that shares the post
  post: TSharePost; //? The post that user shares
};
const SharedPostCard = ({ post, user }: TSharedPostCardProps) => {
  return (
    <div className="w-[500px] p-1 rounded-md flex flex-col bg-zinc-100 dark:bg-foreground-50 shadow-xl border dark:border-foreground-300">
      <span className="flex items-center justify-between gap-2 hover:bg-foreground-100 rounded-t-md p-1">
        <Link
          to={`/sharedpost/${post.id}`}
          className="flex items-center gap-2 w-full"
        >
          <Link to={`/profile/${post.User.id}`}>
            <Avatar
              src={
                post.User?.profile_img?.profile_secure_url
                  ? post.User?.profile_img?.profile_secure_url
                  : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              size="sm"
              className="cursor-pointer"
            />
          </Link>
          <p className="text-xs">{`${post.User?.first_name} ${post.User?.last_name}`}</p>
        </Link>
        {user?.id === post.User.id && <EditSharedPost post={post} />}
      </span>

      {post.title && <h1 className="text-xs p-2">{post.title}</h1>}
      <div className="h-full bg-zinc-100 dark:bg-foreground-50 flex flex-col border border-foreground-300 rounded-md">
        {post.post.post_img?.secure_url && (
          <span className=" flex items-center justify-center">
            <Image
              radius="none"
              sizes=""
              src={post.post.post_img?.secure_url}
              className="min-w-[250px] max-w-full object-cover rounded-t-md"
            />
          </span>
        )}
        <span className="flex items-center justify-between gap-2 p-2 hover:bg-foreground-100">
          <Link
            to={`/post/${post.post.id}`}
            className="flex items-center gap-2 w-full"
          >
            <Link to={`/profile/${post.post.user.id}`}>
              <Avatar
                src={
                  post.post.user?.profile_img?.profile_secure_url
                    ? post.post.user?.profile_img?.profile_secure_url
                    : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
                size="sm"
                className="cursor-pointer"
              />
            </Link>
            <p className="text-xs">{`${post.post.user?.first_name}, ${post.post.user?.last_name}`}</p>
          </Link>
        </span>
        {post.post.title && <h1 className="text-xs p-2">{post.post.title}</h1>}
      </div>

      <div className="h-[40px]  grid grid-cols-3">
        <LikeTab post={post} />
        <Link
          to={`/sharedpost/${post.id}`}
          className=" flex items-center justify-center border-x dark:border-foreground-100 border-foreground-300 cursor-pointer group"
        >
          <LucideMessageSquareMore className="w-5 group-hover:text-emerald-500 group-hover:scale-110 group-hover:-rotate-6 duration-200 transition-all" />
        </Link>
        <ShareTab postId={post.post.id} />
      </div>
    </div>
  );
};
export default SharedPostCard;
