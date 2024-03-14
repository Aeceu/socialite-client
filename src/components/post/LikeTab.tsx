import { LucideLoader2, LucideThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getPostLikes, likePost, unLikePost } from "../../actions/likes";
import { TPost, TPostLikes } from "../../types/post";
import UserStore from "../../store/UserStore";

type TPostCard = {
  post: TPost;
};

const LikeTab = ({ post }: TPostCard) => {
  const user = UserStore((state) => state.user);
  const [likes, setLikes] = useState<TPostLikes>([]);
  const [loading, setLoading] = useState(false);
  const [userLikesPost, setUserLikesPost] = useState(-1);

  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true);
      await getPostLikes({ postId: post.id })
        .then((res) => {
          if (res.code === "success") {
            setLikes(res.data.likes);
            setUserLikesPost(
              res.data.likes.findIndex((item) => item.likersId === user?.id)
            );
          }

          if (res.code === "error") {
            console.log(res.error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchLikes();
  }, []);

  const handeClick = async () => {
    if (userLikesPost === -1) {
      await likePost({ postId: post.id, userId: user?.id }).then((res) => {
        if (res.code === "success") {
          setLikes(res.data.likes);
          setUserLikesPost(
            res.data.likes.findIndex((item) => item.likersId === user?.id)
          );
        }
        if (res.code === "error") {
          alert("error liking post!");
          console.log(res.error);
        }
      });
    } else {
      await unLikePost({
        likeId: likes[userLikesPost].id,
        postId: post.id,
      }).then((res) => {
        if (res.code === "success") {
          setLikes(res.data.likes);
          setUserLikesPost(
            res.data.likes.findIndex((item) => item.likersId === user?.id)
          );
        }
        if (res.code === "error") {
          alert("error unliking post!");
          console.log(res.error);
        }
      });
    }
  };

  return (
    <div
      onClick={handeClick}
      className=" flex items-center justify-center gap-1 hover:bg-foreground-100 cursor-pointer group"
    >
      <LucideThumbsUp
        className={`${
          userLikesPost !== -1 && "text-blue-500"
        } w-5 group-hover:text-blue-500 group-active:scale-125 group-hover:-rotate-6 duration-200 transition-all`}
      />
      {loading ? (
        <LucideLoader2 className="w-4 animate-spin" />
      ) : (
        <p className="text-xs">{likes.length}</p>
      )}
    </div>
  );
};
export default LikeTab;
