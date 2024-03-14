import {
  LucideLoader2,
  LucideMessageCircleMore,
  LucideRepeat2,
} from "lucide-react";
import { sharePost } from "../../actions/sharepost";
import { useState } from "react";
import UserStore from "../../store/UserStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CustomSuccessToast } from "../CustomToast";

type TShareTabProps = {
  postId: string;
};

const ShareTab = ({ postId }: TShareTabProps) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, setAllSharedPost, allSharedPost } = UserStore();

  const SharePost = async (onClose: () => void) => {
    setLoading(true);
    await sharePost({ postId: postId, title, userId: user?.id })
      .then((res) => {
        if (res.code === "success") {
          CustomSuccessToast("You shared a post!");
          setAllSharedPost([...allSharedPost, res.data]);
        }
        if (res.code === "error") {
          alert("ERROR!");
          console.log(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <div
      onClick={onOpen}
      className=" flex items-center justify-center cursor-pointer group"
    >
      <LucideRepeat2 className="w-5 group-hover:text-yellow-500 group-hover:scale-110 group-hover:-rotate-6 duration-200 transition-all" />
      <Modal
        size="md"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2"></ModalHeader>
              <ModalBody>
                <Textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="bordered"
                  size="sm"
                  placeholder="type your title here...."
                  startContent={<LucideMessageCircleMore className="w-4" />}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose(), setTitle("");
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => SharePost(onClose)}
                  isDisabled={loading}
                >
                  {loading ? (
                    <LucideLoader2 className="w-5 animate-spin" />
                  ) : (
                    "Share Post"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default ShareTab;
