import { useEffect, useState } from "react";
import { TUser } from "../types/user";
import { Input, User } from "@nextui-org/react";
import { Loader2, Search } from "lucide-react";
import { searchUser } from "../actions/userFriend";
import { Link } from "react-router-dom";

const SearchTab = () => {
  const [loading, setLoading] = useState(false);
  const [usersTab, setUsersTab] = useState<TUser[] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const handleSearch = async () => {
      if (search) {
        await searchUser({ search }).then((res) => {
          if (res.code === "success") {
            setUsersTab(res.data);
          }
          if (res.code === "error") {
            console.log(res.error);
            alert("ERROR!!");
          }
        });
      } else {
        setUsersTab(null);
      }
      setLoading(false);
    };
    const timeout = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  // const handleBlur = () => {
  //   setSearch("");
  //   setUsersTab(null);
  // };

  return (
    <form className="relative w-full  flex items-center gap-4">
      <Input
        size="sm"
        radius="full"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Search className="w-5" />}
      />

      <div
        className={`${
          !search && "hidden"
        } flex flex-col items-center gap-1 justify-center w-full z-20 absolute top-14 bg-foreground-50 p-1 rounded-md`}
      >
        {loading ? (
          <span className="p-2">
            <Loader2 className="w-4 animate-spin" />
          </span>
        ) : usersTab && usersTab?.length <= 0 && usersTab !== null ? (
          <h1 className="text-sm w-full p-2 text-center ">No user</h1>
        ) : (
          usersTab?.map((user, i) => <UserCard key={i} user={user} />)
        )}
      </div>
    </form>
  );
};
export default SearchTab;

type TUserCardParams = {
  user: TUser;
};

const UserCard = ({ user }: TUserCardParams) => {
  return (
    <Link
      to={`/profile/${user.id}`}
      className="w-full flex items-center justify-between gap-2 p-1"
    >
      <User
        className="w-full"
        name={`${user.first_name}, ${user.last_name}`}
        description={user.email}
        avatarProps={{
          src: user?.profile_img?.profile_secure_url
            ? user?.profile_img?.profile_secure_url
            : "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        }}
      />
    </Link>
  );
};
