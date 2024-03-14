import { LucideBadgeCheck } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
    />
  );
};

export const CustomSuccessToast = (msg: string) => {
  return toast.custom(
    (t) => (
      <div
        onClick={() => console.log(t.visible)}
        className={`flex items-center gap-2 bg-foreground-100  text-foreground px-3 py-1.5 shadow-md rounded-md duration-500 transition-all border border-foreground-200 ${
          t.visible ? " translate-y-0" : " -translate-y-[100vh] "
        }`}
      >
        <LucideBadgeCheck className="w-5 text-green-500" />
        <p>{msg}</p>
      </div>
    ),
    {
      id: "success",
      duration: 2500,
    }
  );
};

export const CustomErrorToast = (msg: string) => {
  return toast.custom(
    (t) => (
      <div
        onClick={() => console.log(t.visible)}
        className={` flex items-center gap-2 bg-foreground-100  text-foreground px-3 py-1.5 shadow-md rounded-full duration-500 transition-all border border-foreground-200 ${
          t.visible ? " translate-y-0" : " -translate-y-[100vh] "
        }`}
      >
        <LucideBadgeCheck className="w-5 text-red-500" />
        <p>{msg}</p>
      </div>
    ),
    {
      id: "success",
      duration: 1500,
    }
  );
};
