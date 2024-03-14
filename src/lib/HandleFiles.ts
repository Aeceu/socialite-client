import { Dispatch, SetStateAction } from "react";

type HandleFilesProps = {
  setImage: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  e: React.ChangeEvent<HTMLInputElement>;
};
export const HandleFiles = ({ e, setImage }: HandleFilesProps) => {
  const selectedFile = e.target.files?.[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  }
};
