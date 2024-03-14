import {
  LucideArrowLeft,
  LucideLoader2,
  LucideMessageSquareMore,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CustomErrorToast } from "../components/CustomToast";
import UserStore from "../store/UserStore";
import { TSharePost } from "../types/post";
import { getSharedPostById } from "../actions/sharepost";
import { Avatar, Image } from "@nextui-org/react";
import EditSharedPost from "../components/sharedpost/EditSharedPost";
import LikeTab from "../components/sharedpost/LikeTab";
import ShareTab from "../components/post/ShareTab";
import CommentTab from "../components/sharedpost/CommentTab";

const SharedPost = () => {
  const { id } = useParams();
  const user = UserStore((state) => state.user);
  const [post, setPost] = useState<TSharePost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async (id: string) => {
      setLoading(true);
      await getSharedPostById({ sharedpostId: id })
        .then((res) => {
          if (res.code === "success") {
            setPost(res.data);
          }
          if (res.code === "error") {
            CustomErrorToast("Failed to get shared post!");
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
      <div className="relative flex items-center   h-full flex-col  ">
        <Link
          to="/"
          className="w-[30px] h-[30px] rounded-full border dark:border-foreground-50 absolute top-1.5 -left-9 bg-foreground-50 flex items-center justify-center"
        >
          <LucideArrowLeft className="w-4" />
        </Link>
        <div className="w-[500px] p-1  flex flex-col bg-zinc-100 dark:bg-foreground-50 border border-foreground-300 ">
          {/* The user that shares the post */}
          <span className="flex items-center justify-between gap-2 hover:bg-foreground-100 rounded-t-md p-1">
            <Link
              to={`/post/${post.id}`}
              className="flex items-center gap-2 w-full"
            >
              <Avatar
                src={
                  post.User?.profile_img?.profile_secure_url
                    ? post.User?.profile_img?.profile_secure_url
                    : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
                size="sm"
                className="cursor-pointer"
              />
              <p className="text-xs">{`${post.User?.first_name} ${post.User?.last_name}`}</p>
            </Link>
            {user?.id === post.User.id && <EditSharedPost post={post} />}
          </span>
          {/*  The original post card */}
          {post.title && <h1 className="text-xs p-2">{post.title}</h1>}
          <div className="h-full  shadow-xl bg-zinc-100 dark:bg-foreground-50 flex flex-col border border-foreground-100 rounded-sm">
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
                <Avatar
                  src={
                    post.post.user?.profile_img?.profile_secure_url
                      ? post.post.user?.profile_img?.profile_secure_url
                      : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  }
                  size="sm"
                  className="cursor-pointer"
                />
                <p className="text-xs">{`${post.post.user?.first_name}, ${post.post.user?.last_name}`}</p>
              </Link>
            </span>
            {post.post.title && (
              <h1 className="text-xs p-2">{post.post.title}</h1>
            )}
          </div>
          {/* Likes,Comments and Share */}
          <div className="h-[40px] p-2  border-foreground-300 grid grid-cols-3">
            <LikeTab post={post} />
            <div className=" flex items-center justify-center border-x dark:border-foreground-100 border-foreground-300 cursor-pointer group">
              <LucideMessageSquareMore className="w-5 group-hover:text-emerald-500 group-hover:scale-110 group-hover:-rotate-6 duration-200 transition-all" />
            </div>
            <ShareTab postId={post.post.id} />
          </div>
          <CommentTab sharedPost={post} />
        </div>
      </div>
    </div>
  );
};
export default SharedPost;
