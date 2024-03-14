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
  Image,
} from "@nextui-org/react";
import {
  LucideEdit,
  LucideLoader2,
  LucideMessageCircleMore,
  LucideMoreVertical,
  LucideTrash,
} from "lucide-react";
import { TPost } from "../types/post";
import { ChangeEvent, useEffect, useState } from "react";
import { updatePost } from "../actions/post";
import UserStore from "../store/UserStore";
import DeletePost from "./DeletePost";
import { CustomErrorToast, CustomSuccessToast } from "./CustomToast";

type TPostCard = {
  post: TPost;
};

const EditPost = ({ post }: TPostCard) => {
  const { updateOnePost, allPosts } = UserStore();
  const [currentPost, setCurrentPost] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleUpdate = async (onClose: () => void) => {
    if (currentPost === post.title && file === null) {
      return onClose();
    }

    setLoading(true);
    await updatePost({ data: currentPost, file, postId: post.id })
      .then((res) => {
        if (res.code === "success") {
          updateOnePost(res.data);
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
        console.log(allPosts);
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
            <DeletePost postId={post.id} />
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

                {post.post_img?.secure_url && (
                  <span className="mx-2 border dark:border-foreground-100 flex items-center justify-center">
                    <Image
                      radius="none"
                      sizes=""
                      src={post.post_img?.secure_url}
                      className="min-w-[250px] max-w-[450px] object-cover"
                    />
                  </span>
                )}
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleFile(e)}
                  accept="image/png, image/gif, image/jpeg"
                  placeholder="change post image"
                  className="text-xs outline-none w-full  border-2 border-foreground-100 rounded-md shadow-xl px-4 py-2"
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
export default EditPost;
