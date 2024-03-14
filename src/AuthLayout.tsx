import { Outlet } from "react-router-dom";
import AuthBackground from "./components/AuthBackground";
import AuthInfo from "./components/AuthInfo";

const AuthLayout = () => {
  return (
    <div className="relative overflow-hidden min-h-screen flex md:flex-row flex-col  items-center justify-center p-4 md:gap-0 gap-2">
      <h1 className="z-10 text-cursive text-emerald-500  text-6xl inline md:hidden">
        SociaLite
      </h1>
      <AuthBackground />
      <AuthInfo />
      <Outlet />
    </div>
  );
};
export default AuthLayout;
