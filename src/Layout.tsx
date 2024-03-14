import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <main className="dark:bg-background dark:text-white overflow-hidden bg-zinc-200 text-slate-950">
      <NavBar />
      <Outlet />
    </main>
  );
};
export default Layout;
