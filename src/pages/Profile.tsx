import { useParams } from "react-router-dom";
import { TUser } from "../types/user";
import { useEffect, useState } from "react";
import { getUserById } from "../actions/user";
import ProfileFeed from "../components/profile/ProfileFeed";
import { ProfileHeader } from "../components/profile/ProfileHeader";

const Profile = () => {
  const [user, setUser] = useState<TUser>();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      await getUserById({ id }).then((res) => {
        if (res.code === "success") {
          setUser(res.data);
        }
        if (res.code === "error") {
          console.log(res.error);
        }
      });
    };

    fetchUser();
  }, [id]);

  return (
    <div className="relative min-h-screen overflow-y-auto dark:bg-background text-foreground">
      <ProfileHeader user={user} id={id} setUser={setUser} />
      <ProfileFeed />
    </div>
  );
};
export default Profile;
