import { Image } from "@nextui-org/react";
import { TPost } from "../types/post";
import LikeTab from "./post/LikeTab";
import ShareTab from "./post/ShareTab";
import PostHeader from "./post/PostHeader";
import { Link } from "react-router-dom";
import { LucideMessageSquareMore } from "lucide-react";

type TPostCard = {
  post: TPost;
};

const PostCard = ({ post }: TPostCard) => {
  return (
    <div
      className="w-[500px] h-full rounded-md bg-zinc-100 shadow-xl dark:bg-foreground-50 flex flex-col
      border border-foreground-300"
    >
      <PostHeader post={post} />

      {post.title && <h1 className="text-sm p-2">{post.title}</h1>}
      {post.post_img?.secure_url && (
        <span className="border-t dark:border-foreground-100 flex items-center justify-center">
          <Image
            radius="none"
            sizes=""
            src={post.post_img?.secure_url}
            className="min-w-[250px] max-w-full object-cover"
          />
        </span>
      )}

      <div className="h-[40px] border-t dark:border-foreground-100 grid grid-cols-3">
        <LikeTab post={post} />
        <Link
          to={`/post/${post.id}`}
          className=" flex items-center justify-center border-x dark:border-foreground-100 border-foreground-300 cursor-pointer group"
        >
          <LucideMessageSquareMore className="w-5 group-hover:text-emerald-500 group-hover:scale-110 group-hover:-rotate-6 duration-200 transition-all" />
        </Link>
        <ShareTab postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
