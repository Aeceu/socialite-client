import { Avatar } from "@nextui-org/react";
import { TPost } from "../../types/post";
import EditPost from "../EditPost";
import { Link } from "react-router-dom";
import UserStore from "../../store/UserStore";

type TPostHeader = {
  post: TPost;
};
const PostHeader = ({ post }: TPostHeader) => {
  const user = UserStore((state) => state.user);
  return (
    <span className="flex items-center justify-between gap-2 p-2 hover:bg-foreground-100 rounded-t-md">
      <Link to={`/post/${post.id}`} className="flex items-center gap-2 w-full">
        <Link to={`/profile/${post.user.id}`}>
          <Avatar
            src={
              post.user?.profile_img?.profile_secure_url
                ? post.user?.profile_img?.profile_secure_url
                : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
            }
            size="sm"
            className="cursor-pointer"
          />
        </Link>
        <p className="text-xs">{`${post.user?.first_name}, ${post.user?.last_name}`}</p>
      </Link>
      {user?.id === post.user.id && <EditPost post={post} />}
    </span>
  );
};
export default PostHeader;
