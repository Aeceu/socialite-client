import { Spinner } from "@nextui-org/react";
import UserStore from "../../store/UserStore";
import CreatePost from "../CreatePost";
import PostCard from "../PostCard";
import SharedPostCard from "../SharedPostCard";

type UserProfilePostsProps = {
  loading: boolean;
  sharedPostLoading: boolean;
  id: string | undefined;
};

const UserProfilePosts = ({
  loading,
  sharedPostLoading,
  id,
}: UserProfilePostsProps) => {
  const { userPosts, userSharedPosts, user } = UserStore();
  return (
    <div className="min-w-[500px]  flex flex-col items-center gap-4">
      {id === user?.id && <CreatePost />}
      {loading || sharedPostLoading ? (
        <Spinner />
      ) : userPosts.length === 0 && userSharedPosts.length === 0 ? (
        <div>
          <h1>No post available...</h1>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4  items-center">
          {userPosts.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
          {userSharedPosts.map((post, i) => (
            <SharedPostCard post={post} key={i} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
export default UserProfilePosts;
