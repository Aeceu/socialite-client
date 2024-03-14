import { useEffect, useState } from "react";
import UserStore from "../../store/UserStore";
import { TPostComments, TSharePost } from "../../types/post";
import {
  createSharedPostComment,
  getSharedPostComments,
} from "../../actions/sharedPostComments";
import { Loader2, LucideSend } from "lucide-react";
import { Avatar, Input } from "@nextui-org/react";

const CommentTab = ({ sharedPost }: { sharedPost: TSharePost }) => {
  const user = UserStore((state) => state.user);
  const [newComment, setNewComment] = useState<string>("");

  const [comments, setComments] = useState<TPostComments[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      await getSharedPostComments({ sharedPostId: sharedPost.id })
        .then((res) => {
          if (res.code === "success") {
            setComments(res.data);
          }
          if (res.code === "error") {
            alert("ALERT!");
            console.log(res.error);
          }
        })
        .finally(() => setLoading(false));
    };
    fetchComments();
  }, []);

  const handleNewSharedPostComment = async () => {
    setLoading(true);
    await createSharedPostComment({
      comment: newComment,
      sharedPostId: sharedPost.id,
      userId: user?.id,
    })
      .then((res) => {
        if (res.code === "success") {
          setComments([...comments, res.data]);
        }
        if (res.code === "error") {
          alert("ERROR!");
          console.log(res.error);
        }
      })
      .finally(() => {
        setNewComment("");
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center border-t dark:border-foreground-100 border-foreground-300 cursor-pointer group">
      <div className="relative w-full p-2 flex items-center  gap-2">
        <Avatar
          src={
            sharedPost.User.profile_img?.profile_secure_url
              ? sharedPost.User.profile_img?.profile_secure_url
              : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
          }
          size="sm"
          className="cursor-pointer"
        />
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          size="sm"
          placeholder="write your comment here"
          radius="sm"
          style={{
            fontSize: "10px",
          }}
          endContent={
            loading ? (
              <Loader2 className="w-4 animate-spin" />
            ) : (
              <LucideSend
                onClick={handleNewSharedPostComment}
                className="w-5 cursor-pointer hover:text-emerald-500 hover:scale-110 duration-300 transition-all"
              />
            )
          }
        />
      </div>
      {loading ? (
        <Loader2 className="animate-spin w-4" />
      ) : (
        comments.length > 0 &&
        comments.map((item, i) => (
          <div key={i} className="w-full p-2 flex items-center  gap-2">
            <Avatar
              src={
                item.user?.profile_img?.profile_secure_url
                  ? item.user?.profile_img?.profile_secure_url
                  : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              size="sm"
              className="cursor-pointer"
            />
            <Input
              readOnly
              size="sm"
              placeholder={item.comment}
              radius="sm"
              style={{
                fontSize: "10px",
              }}
              label={`${item.user.first_name} ${item.user.last_name}`}
              labelPlacement="outside"
            />
          </div>
        ))
      )}
    </div>
  );
};
export default CommentTab;
