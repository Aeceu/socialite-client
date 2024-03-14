import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Input,
  Divider,
  Textarea,
} from "@nextui-org/react";
import UserStore from "../store/UserStore";
import {
  LucideImage,
  LucideLoader2,
  LucideMessageCircleMore,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { createPost } from "../actions/post";
import { CustomErrorToast, CustomSuccessToast } from "./CustomToast";

const CreatePost = () => {
  const { allPosts, setAllPosts } = UserStore();
  const user = UserStore((state) => state.user);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);

  const handePost = async (onClose: () => void) => {
    setLoading(true);
    await createPost({ userId: user?.id, data, file })
      .then((res) => {
        if (res.code === "success") {
          console.log(res.data);
          setAllPosts([...allPosts, res.data]);
          CustomSuccessToast("New post created!");
        }
        if (res.code === "error") {
          console.log(res.error);
          CustomErrorToast("An error occured!");
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
        setData("");
      });
  };

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    }
  }

  return (
    <>
      <div
        onClick={onOpen}
        className="w-[500px] p-2 rounded-md bg-zinc-100 shadow-xl dark:bg-foreground-50 flex flex-col cursor-pointer border border-foreground-300"
      >
        <span className="flex items-center gap-2">
          <Avatar
            src={
              user?.profile_img?.profile_secure_url
                ? user?.profile_img?.profile_secure_url
                : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
            }
            size="md"
            className="cursor-pointer"
          />
          <Input
            readOnly
            size="sm"
            radius="full"
            placeholder="what's on your mind...."
          />
        </span>
        <Divider className="my-2" />
        <span className="flex items-center justify-between">
          <LucideImage className="w-4" />
        </span>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <Avatar
                  src={
                    user?.profile_img?.profile_secure_url
                      ? user?.profile_img?.profile_secure_url
                      : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  }
                  size="md"
                  className="cursor-pointer"
                />
                <p className="">{`${user?.first_name}, ${user?.last_name}`}</p>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  variant="bordered"
                  size="sm"
                  placeholder="type your description here...."
                  startContent={<LucideMessageCircleMore className="w-4" />}
                />

                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleFile(e)}
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
                  color="primary"
                  onPress={() => handePost(onClose)}
                  isDisabled={loading}
                >
                  {loading ? (
                    <LucideLoader2 className="w-5 animate-spin" />
                  ) : (
                    "Post"
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
export default CreatePost;
