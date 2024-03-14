import { useEffect, useState } from "react";
import { getUserPosts } from "../../actions/post";
import ProfileInfo from "./ProfileInfo";
import UserProfilePosts from "./UserProfilePosts";
import { useParams } from "react-router-dom";
import UserStore from "../../store/UserStore";
import { CustomErrorToast } from "../CustomToast";
import { getUserSharedPosts } from "../../actions/sharepost";

const ProfileFeed = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sharedPostLoading, setSharedPostLoading] = useState<boolean>(false);
  const { id } = useParams();
  const { setUserPosts, setUserSharedPosts } = UserStore();

  useEffect(() => {
    const fetchSharedPosts = async () => {
      setSharedPostLoading(true);
      await getUserSharedPosts({ userId: id })
        .then((res) => {
          if (res.code === "success") {
            setUserSharedPosts(res.data);
          }
          if (res.code === "error") {
            console.log(res.error);
            CustomErrorToast("Failed to fetch user posts!");
          }
        })
        .finally(() => {
          setSharedPostLoading(false);
        });
    };
    const fetchUserPosts = async () => {
      setLoading(true);
      await getUserPosts({ userId: id })
        .then((res) => {
          if (res.code === "success") {
            setUserPosts(res.data.post);
          }
          if (res.code === "error") {
            console.log(res.error);
            CustomErrorToast("Failed to fetch user sharedposts!");
          }
        })
        .finally(() => setLoading(false));
    };
    fetchUserPosts();
    fetchSharedPosts();
  }, [id]);

  return (
    <div className="w-full flex justify-center gap-4  p-4">
      <ProfileInfo />
      <UserProfilePosts
        loading={loading}
        id={id}
        sharedPostLoading={sharedPostLoading}
      />
    </div>
  );
};
export default ProfileFeed;
