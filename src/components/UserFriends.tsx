import { User } from "@nextui-org/react";
import { useEffect } from "react";
import { getUserFriends, removeFriend } from "../actions/userFriend";
import UserStore from "../store/UserStore";
import { TUser } from "../types/user";
import { LucideUserMinus2 } from "lucide-react";
import { Link } from "react-router-dom";

const UserFriends = () => {
  const { friends, setUserFriends, user } = UserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      await getUserFriends({ userId: user?.id }).then((res) => {
        if (res.code === "success") {
          setUserFriends(res.data);
        }
        if (res.code === "error") {
          console.log(res.error);
          alert("ERROR!");
        }
      });
    };
    fetchUsers();
  }, []);

  return (
    <section>
      {friends.map((user, i) => (
        <UserCard user={user} key={i} />
      ))}
    </section>
  );
};
export default UserFriends;

type TUserCardParams = {
  user: TUser;
};

const UserCard = ({ user }: TUserCardParams) => {
  const you = UserStore((state) => state.user);
  const { setUserFriends, friends } = UserStore();
  const handleAddFriend = async () => {
    await removeFriend({ friendId: user?.id, userId: you?.id }).then((res) => {
      if (res.code === "success") {
        setUserFriends(friends.filter((friend) => friend.id !== res.data.id));
      }
      if (res.code === "error") {
        alert("Failed to add friend!");
        console.log("error!");
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 px-2 py-4 rounded-md ">
      <Link to={`/profile/${user.id}`}>
        <User
          name={`${user.first_name}, ${user.last_name}`}
          description={user.email}
          avatarProps={{
            src: user?.profile_img?.profile_secure_url
              ? user?.profile_img?.profile_secure_url
              : "https://i.pravatar.cc/150?u=a04258a2462d826712d",
          }}
        />
      </Link>
      <LucideUserMinus2
        onClick={handleAddFriend}
        className="w-4 cursor-pointer hover:scale-110 hover:text-red-500 duration-300 transition-all"
      />
    </div>
  );
};
