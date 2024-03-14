import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import {
  LucideEdit,
  LucideLoader2,
  LucideMessageCircleMore,
  LucideMoreVertical,
  LucideTrash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { TSharePost } from "../../types/post";
import UserStore from "../../store/UserStore";
import { editSharedPost } from "../../actions/sharepost";
import { CustomErrorToast, CustomSuccessToast } from "../CustomToast";
import DeleteSharedPost from "./DeleteSharedPost";

type TSharedPostCardProps = {
  post: TSharePost;
};

const EditSharedPost = ({ post }: TSharedPostCardProps) => {
  const { updateOneSharePost } = UserStore();
  const [currentPost, setCurrentPost] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (onClose: () => void) => {
    if (currentPost === post.title) {
      return onClose();
    }
    setLoading(true);
    await editSharedPost({ sharePostId: post.id, title: currentPost })
      .then((res) => {
        if (res.code === "success") {
          updateOneSharePost(res.data);
          CustomSuccessToast("Post updated successfully!");
        }
        if (res.code === "error") {
          CustomErrorToast("Error updating post!");
          console.log(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  useEffect(() => {
    if (post.title) setCurrentPost(post.title);
  }, []);

  return (
    <>
      <Dropdown size="sm">
        <DropdownTrigger>
          <span className="group">
            <LucideMoreVertical className="w-4 group-hover:scale-110 group-hover:-rotate-6 duration300 transition-all cursor-pointer group-hover:text-emerald-500" />
          </span>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" classNames={{ base: "z-10" }}>
          <DropdownItem
            onPress={onOpen}
            className="text-success"
            color="success"
            startContent={<LucideEdit className="w-4" />}
            textValue="edit"
          >
            Edit
          </DropdownItem>
          <DropdownItem
            closeOnSelect={false}
            isReadOnly={true}
            className="text-danger"
            color="danger"
            startContent={<LucideTrash className="w-4" />}
            textValue="delete"
          >
            <DeleteSharedPost sharedPostId={post.id} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
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
                  value={currentPost}
                  onChange={(e) => setCurrentPost(e.target.value)}
                  variant="bordered"
                  size="sm"
                  placeholder="type your description here...."
                  startContent={<LucideMessageCircleMore className="w-4" />}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleUpdate(onClose)}
                  isDisabled={loading}
                >
                  {loading ? (
                    <LucideLoader2 className="w-5 animate-spin" />
                  ) : (
                    "Update Post"
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
export default EditSharedPost;
