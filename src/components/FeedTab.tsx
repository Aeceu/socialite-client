import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { Spinner } from "@nextui-org/react";
import UserStore from "../store/UserStore";
import { getSharedPost } from "../actions/sharepost";
import SharedPostCard from "./SharedPostCard";
import { getAllPosts } from "../actions/post";
import PostCard from "./PostCard";

const FeedTab = () => {
  const { allSharedPost, setAllSharedPost, user, allPosts, setAllPosts } =
    UserStore();
  const [loading, setloading] = useState(false);
  const fetchAllSharedPost = async () => {
    await getSharedPost()
      .then((res) => {
        if (res.code === "success") {
          setAllSharedPost(res.data);
        }
        if (res.code === "error") {
          console.log(res.error);
        }
      })
      .finally(() => {
        setloading(false);
      });
  };

  const fetchAllPost = async () => {
    await getAllPosts().then((res) => {
      if (res.code === "success") {
        setAllPosts(res.data);
      }
      if (res.code === "error") {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    setloading(true);
    fetchAllSharedPost();
    fetchAllPost().finally(() => {
      setloading(false);
    });
  }, []);

  return (
    <div className="overflow-y-auto w-[60%] h-full flex flex-col items-center p-4  scrollbar-hide">
      <CreatePost />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {allSharedPost &&
            allSharedPost?.length > 0 &&
            allSharedPost.map((post, i) => (
              <SharedPostCard user={user} post={post} key={i} />
            ))}
          {allPosts &&
            allPosts?.length > 0 &&
            allPosts.map((post, i) => <PostCard post={post} key={i} />)}
        </div>
      )}
      {}
    </div>
  );
};
export default FeedTab;
