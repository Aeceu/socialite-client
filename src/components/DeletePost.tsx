import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { deletePost } from "../actions/post";
import UserStore from "../store/UserStore";
import { CustomErrorToast, CustomSuccessToast } from "./CustomToast";

type TDeletePost = {
  postId: string;
};

const DeletePost = ({ postId }: TDeletePost) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { allPosts, setAllPosts } = UserStore();

  const handleDeletePost = async (onClose: () => void) => {
    setLoading(true);
    await deletePost({ postId })
      .then((res) => {
        if (res.code === "success") {
          console.log(res.data);
          CustomSuccessToast(res.data);
          setAllPosts(allPosts.filter((item) => item.id !== postId));
        }
        if (res.code === "error") {
          CustomErrorToast("An error occured deleting post :((");
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <>
      <h1 onClick={onOpen} className="text-foreground" color="danger">
        Delete
      </h1>
      <Modal
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          wrapper: "z-[100000]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <p className="text-xs">Are you sure you want to delete post?</p>
              </ModalHeader>
              <ModalFooter>
                <Button onPress={onClose} variant="light">
                  Close
                </Button>
                <Button
                  color="danger"
                  className="text-foreground"
                  onPress={() => handleDeletePost(onClose)}
                  isDisabled={loading}
                >
                  {loading ? (
                    <LucideLoader2 className="w-5 animate-spin" />
                  ) : (
                    "Delete Post"
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
export default DeletePost;
