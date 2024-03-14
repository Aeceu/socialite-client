import { Image, Spinner } from "@nextui-org/react";
import SeeFriends from "../modal/SeeFriends";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TUser } from "../../types/user";
import { getUserFriends } from "../../actions/userFriend";
import { CustomErrorToast } from "../CustomToast";

const ProfileInfo = () => {
  const [friends, setFriends] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      await getUserFriends({ userId: id })
        .then((res) => {
          if (res.code === "success") {
            setFriends(res.data);
          }
          if (res.code === "error") {
            CustomErrorToast("Failed to fetch user friends!");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFriends();
  }, [id]);

  return (
    <div className="sticky  top-0 w-[350px] border dark:border-foreground-300 h-max p-2 bg-foreground-50 rounded-md ">
      <div className="w-full flex flex-col">
        <span className="w-full flex items-center justify-between gap-2 ">
          <p className="text-xl">Friends </p>
          <SeeFriends friends={friends} />
        </span>
        <p className="text-xs">{friends.length} friends</p>
      </div>
      <div className="grid grid-cols-3 place-items-center p-1 gap-1">
        {loading ? (
          <Spinner />
        ) : (
          friends.map(
            (friend, i) =>
              friend?.profile_img && (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-1 "
                >
                  <Image
                    src={
                      friend.profile_img.profile_secure_url
                        ? friend.profile_img.profile_secure_url
                        : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                    }
                    alt="img"
                    className="w-[100px] h-[90px] border dark:border-foreground-100 object-cover shadow-md"
                    radius="sm"
                  />
                  <p className="text-xs">{`${friend.first_name} ${friend.last_name}`}</p>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;
