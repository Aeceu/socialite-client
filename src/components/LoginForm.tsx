import { useForm, SubmitHandler } from "react-hook-form";
import { TUserLogin } from "../types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "../types/userSchema";
import { Button, Input } from "@nextui-org/react";
import {
  LucideArrowRightFromLine,
  LucideAtSign,
  LucideEye,
  LucideEyeOff,
  LucideKey,
  LucideLoader2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { loginUser } from "../actions/user";
import UserStore from "../store/UserStore";
import { CustomSuccessToast } from "./CustomToast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUserLogin>({ resolver: zodResolver(userLoginSchema) });
  const { setToken, setUser } = UserStore();

  const onSubmit: SubmitHandler<TUserLogin> = async (data) => {
    setError("");
    await loginUser(data).then((res) => {
      if (res.code === "success") {
        console.log(res.data);
        setUser(res.data.user);
        setToken(res.data.accessToken);
        CustomSuccessToast("User login successfully!");
        navigate("/");
      }
      if (res.code === "error") {
        if (res.error.response) {
          if (typeof res.error.response.data === "string") {
            setError(res.error.response.data);
            console.log(res.error.response.data);
          }
        } else {
          setError("Unexpected Error, please restart the page!");
        }
      }
    });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="z-10 p-4 w-full md:w-1/3 border dark:border-foreground-50  shadow-xl rounded-2xl grid grid-cols-2 place-items-center gap-3
       bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  "
    >
      <h1 className="p-2 text-3xl flex items-center gap-2 col-span-2    text-emerald-500 font-bold">
        Log in
        <ThemeToggle />
      </h1>
      {error && (
        <li className="text-xs col-span-2 text-red-500 w-full">{error}</li>
      )}
      <Input
        variant="faded"
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        label="Email address"
        startContent={<LucideAtSign className="w-4" />}
        className="col-span-2"
      />
      <Input
        variant="faded"
        type={showPass ? "text" : "password"}
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        label="Password"
        startContent={<LucideKey className="w-4" />}
        endContent={
          showPass ? (
            <LucideEye
              className="w-4 cursor-pointer hover:scale-110 duration-200 transition-all "
              onClick={() => setShowPass(false)}
            />
          ) : (
            <LucideEyeOff
              className="w-4 cursor-pointer hover:scale-110 duration-200 transition-all "
              onClick={() => setShowPass(true)}
            />
          )
        }
        className="col-span-2"
      />
      <Button
        radius="sm"
        type="submit"
        isDisabled={isSubmitting}
        className="bg-emerald-500 text-white  flex items-center justify-center col-span-2 w-full"
      >
        {isSubmitting ? (
          <p className="text-xs flex items-center gap-1">
            <LucideLoader2 className="w-3 animate-spin" />
            Submitting
          </p>
        ) : (
          <p className="text-xs">Submit</p>
        )}
      </Button>
      <p className="text-xs col-span-2 w-full text-center flex items-center justify-center gap-2">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 flex items-center gap-1 hover:scale-110 duration-300 transition-all"
        >
          Sign up here <LucideArrowRightFromLine className="w-4" />
        </Link>
      </p>
    </form>
  );
};
export default LoginForm;
