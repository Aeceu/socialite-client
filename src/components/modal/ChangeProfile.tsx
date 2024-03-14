import { Image } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import { TUser } from "../../types/user";
import { LucideCamera, LucideLoader2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { updateUserProfileImage } from "../../actions/user";
import { CustomErrorToast, CustomSuccessToast } from "../CustomToast";
import { HandleFiles } from "../../lib/HandleFiles";
import UserStore from "../../store/UserStore";

type ChangeProfileProps = {
  user: TUser | undefined;
  setUser: Dispatch<SetStateAction<TUser | undefined>>;
  id: string | undefined;
};

const ChangeProfile: React.FC<ChangeProfileProps> = ({ setUser, user, id }) => {
  const updateUser = UserStore((state) => state.setUser);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [newProfileImage, setNewProfileImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const HandleChangeProfile = async (onClose: () => void) => {
    setLoading(true);
    await updateUserProfileImage({ file: newProfileImage, userId: id })
      .then((res) => {
        if (res.code === "success") {
          CustomSuccessToast("Profile changed successfully!");
          setUser(res.data);
          updateUser(res.data);
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
      <LucideCamera onClick={onOpen} className="w-4 cursor-pointer" />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change Profile Photo
              </ModalHeader>
              <ModalBody>
                <div className="border dark:border-foreground-100 w-full flex items-center justify-center">
                  {user?.profile_img && (
                    <Image
                      src={
                        user.profile_img.profile_secure_url
                          ? user.profile_img.profile_secure_url
                          : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      }
                      alt="img"
                      className="object-cover w-[333px]"
                      radius="none"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={(e) =>
                    HandleFiles({ e, setImage: setNewProfileImage })
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
                  onClick={() => HandleChangeProfile(onClose)}
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
export default ChangeProfile;
