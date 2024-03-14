import { TUser } from "../../types/user";
import { LucideCamera, LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { CustomErrorToast, CustomSuccessToast } from "../CustomToast";
import { updateUserCoverImage } from "../../actions/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
  Button,
} from "@nextui-org/react";
import { HandleFiles } from "../../lib/HandleFiles";

type ChangeCoverProps = {
  user: TUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  id: string | undefined;
};

const ChangeCover: React.FC<ChangeCoverProps> = ({ id, setUser, user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newCoverImage, setNewCoverImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  const HandleChangeCover = async (onClose: () => void) => {
    setLoading(true);
    await updateUserCoverImage({ file: newCoverImage, userId: id })
      .then((res) => {
        if (res.code === "success") {
          CustomSuccessToast("Profile changed successfully!");
          setUser(res.data);
        }
        if (res.code === "error") {
          CustomErrorToast("Failed to change profile picture!");
          console.log(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        radius="sm"
        className="flex items-center gap-2 text-xs bg-gray-600 absolute right-3 bottom-3 z-10 "
        size="sm"
      >
        <LucideCamera className="w-4" /> Edit cover photo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Cover Photo
              </ModalHeader>
              <ModalBody>
                <div className="border dark:border-foreground-100 w-full flex items-center justify-center">
                  {user?.profile_img && (
                    <Image
                      src={
                        user.profile_img.cover_secure_url
                          ? user.profile_img.cover_secure_url
                          : "https://images.unsplash.com/photo-1608408843596-b3119736057c?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://i.pravatar.cc/150?u=a04258a2462d826712d"
                      }
                      alt="img"
                      className="object-cover min-w-[333px]"
                      radius="none"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    HandleFiles({ e, setImage: setNewCoverImage })
                  }
                  accept="image/png, image/gif, image/jpeg"
                  placeholder="profile image"
                  className="text-xs outline-none w-full  border-2 border-foreground-100 rounded-md shadow-xl px-4 py-2"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  radius="sm"
                  className="bg-emerald-500"
                  isDisabled={loading}
                  onClick={() => HandleChangeCover(onClose)}
                >
                  {loading ? (
                    <p className="text-xs flex items-center gap-1">
                      <LucideLoader2 className="w-3 animate-spin" />
                      Submitting
                    </p>
                  ) : (
                    <p className="text-xs">Submit</p>
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ChangeCover;
