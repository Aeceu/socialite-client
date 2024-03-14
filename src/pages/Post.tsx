import { Avatar, Image } from "@nextui-org/react";
import UserStore from "../store/UserStore";
import LikeTab from "../components/post/LikeTab";
import CommentTab from "../components/post/CommentTab";
import ShareTab from "../components/post/ShareTab";
import EditPost from "../components/EditPost";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../actions/post";
import { TPost } from "../types/post";
import { CustomErrorToast } from "../components/CustomToast";
import {
  LucideArrowLeft,
  LucideLoader2,
  LucideMessageSquareMore,
} from "lucide-react";

const Post = () => {
  const { id } = useParams();
  const user = UserStore((state) => state.user);
  const [post, setPost] = useState<TPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async (id: string) => {
      setLoading(true);
      await getPostById({ postId: id })
        .then((res) => {
          if (res.code === "success") {
            setPost(res.data);
          }
          if (res.code === "error") {
            CustomErrorToast("Failed to get post!");
            console.log(res.error);
          }
        })
        .finally(() => setLoading(false));
    };
    id && fetchPost(id);
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-70px)] overflow-y-auto flex items-center justify-center">
        <LucideLoader2 className="w-5 animate-spin" />
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="h-[calc(100vh-70px)] overflow-y-auto flex items-center justify-center">
        <h1>Cannot find post</h1>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto flex items-center justify-center">
      <div className="relative flex items-center  h-full flex-col  ">
        <Link
          to="/"
          className="w-[30px] h-[30px] rounded-full border dark:border-foreground-50 absolute top-1.5 -left-9 bg-foreground-50 flex items-center justify-center"
        >
          <LucideArrowLeft className="w-4" />
        </Link>
        <div
          className="w-[500px] bg-zinc-100 shadow-xl dark:bg-foreground-50 flex flex-col
      border border-foreground-300"
        >
          <span className="flex items-center justify-between gap-2 p-2 rounded-t-md">
            <span className="flex items-center gap-2 w-full">
              <Avatar
                src={
                  post.user?.profile_img?.profile_secure_url
                    ? post.user?.profile_img?.profile_secure_url
                    : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
                size="sm"
                className="cursor-pointer"
              />
              <p className="text-xs">{`${post.user?.first_name}, ${post.user?.last_name}`}</p>
            </span>
            {user?.id === post.user.id && <EditPost post={post} />}
          </span>

          {post.title && <h1 className="text-sm p-2">{post.title}</h1>}
          {post.post_img?.secure_url && (
            <span className="border-t dark:border-foreground-100 border-foreground-300 flex items-center justify-center">
              <Image
                radius="none"
                sizes=""
                src={post.post_img?.secure_url}
                className="min-w-[250px] max-w-full object-cover"
              />
            </span>
          )}

          <div className="h-[40px] border-t dark:border-foreground-100 border-foreground-300 grid grid-cols-3">
            <LikeTab post={post} />
            <div className=" flex items-center justify-center border-x dark:border-foreground-100 border-foreground-300 cursor-pointer group">
              <LucideMessageSquareMore className="w-5 group-hover:text-emerald-500 group-hover:scale-110 group-hover:-rotate-6 duration-200 transition-all" />
            </div>
            <ShareTab postId={post.id} />
          </div>

          <CommentTab post={post} />
        </div>
      </div>
    </div>
  );
};
export default Post;
