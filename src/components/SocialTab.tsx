import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TUser } from "../types/user";
import UserStore from "../store/UserStore";
import { Divider, User } from "@nextui-org/react";
import { Loader2, LucideUserPlus2 } from "lucide-react";
import { addFriend, getUserNotFriends } from "../actions/userFriend";

const SocialTab = () => {
  const [loading, setLoading] = useState(false);
  const [usersTab, setUsersTab] = useState<TUser[]>([]);
  const user = UserStore((state) => state.user);
  const friends = UserStore((state) => state.friends);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await getUserNotFriends({ userId: user?.id })
        .then((res) => {
          if (res.code === "success") {
            setUsersTab(res.data);
          }
          if (res.code === "error") {
            console.log(res.error);
            alert("ERROR!");
          }
        })
        .finally(() => setLoading(false));
    };
    fetchUsers();
  }, [friends]);

  return (
    <section className="w-[20%] border-l dark:border-foreground-50 flex flex-col items-center p-2">
      {/* <SearchTab setUsersTab={setUsersTab} setLoading={setLoading} /> */}
      <p className="p-2">Users</p>
      <Divider />
      {loading ? (
        <Loader2 className="w-4 animate-spin" />
      ) : usersTab.length <= 0 ? (
        <h1 className="p-4">No users</h1>
      ) : (
        usersTab.map((user, i) => (
          <UserCard
            user={user}
            key={i}
            setUsersTab={setUsersTab}
            usersTab={usersTab}
          />
        ))
      )}
    </section>
  );
};
export default SocialTab;

type TUserCardParams = {
  user: TUser;
  setUsersTab: Dispatch<SetStateAction<TUser[]>>;
  usersTab: TUser[];
};

const UserCard = ({ user, setUsersTab, usersTab }: TUserCardParams) => {
  const you = UserStore((state) => state.user);
  const { friends, setUserFriends } = UserStore();

  const handleAddFriend = async () => {
    await addFriend({ friendId: user?.id, userId: you?.id }).then((res) => {
      if (res.code === "success") {
        console.log("added a friend!");
        setUserFriends([...friends, res.data]);
        setUsersTab(usersTab.filter((user) => user.id !== res.data.id));
      }
      if (res.code === "error") {
        alert("Failed to add friend!");
        console.log("error!");
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 px-2 py-4 rounded-md ">
      <User
        name={`${user.first_name}, ${user.last_name}`}
        description={user.email}
        avatarProps={{
          src: user?.profile_img?.profile_secure_url
            ? user?.profile_img?.profile_secure_url
            : "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        }}
      />
      <LucideUserPlus2
        onClick={handleAddFriend}
        className="w-4 cursor-pointer hover:scale-110 hover:text-emerald-500 duration-300 transition-all"
      />
    </div>
  );
};
