import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  User,
} from "@nextui-org/react";
import { TUser } from "../../types/user";
import { useNavigate } from "react-router-dom";

type SeeFriendsProps = {
  friends: TUser[];
};

const SeeFriends = ({ friends }: SeeFriendsProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = (id: string, onClose: () => void) => {
    navigate(`/profile/${id}`);
    onClose();
  };

  return (
    <>
      <Button
        variant="light"
        onPress={onOpen}
        radius="sm"
        className="text-xs text-blue-500 "
        size="sm"
      >
        See all friends
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Friends</ModalHeader>
              <ModalBody>
                {friends.map((user, i) => (
                  <div
                    onClick={() => handleClick(user.id, onClose)}
                    key={i}
                    className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-foreground-100 rounded-md "
                  >
                    <User
                      name={`${user.first_name}, ${user.last_name}`}
                      description={user.email}
                      avatarProps={{
                        src: user?.profile_img?.profile_secure_url
                          ? user?.profile_img?.profile_secure_url
                          : "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                      }}
                    />
                  </div>
                ))}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default SeeFriends;
