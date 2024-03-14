import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import UserStore from "../store/UserStore";
import { useUserLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import SearchTab from "./SearchTab";

const NavBar = () => {
  const logout = useUserLogout();
  const user = UserStore((state) => state.user);
  return (
    <nav className="w-full h-[70px] flex items-center px-4 justify-between border-b dark:border-foreground-50 border-foreground-300 ">
      <div className="flex items-center gap-4">
        <Link to={`/`} className="text-cursive text-2xl text-emerald-500 ">
          SociaLite
        </Link>
        {/* <span className="flex items-center gap-2 dark:bg-foreground-50 bg-foreground-300 px-2 py-2 rounded-full">
          <LucideSearch className="w-4" />
          <input
            type="text"
            placeholder="search..."
            className="bg-inherit outline-none"
          />
        </span> */}
        <SearchTab />
      </div>
      <div className="flex items-center gap-8">
        <ThemeToggle />
        <Dropdown size="sm">
          <DropdownTrigger>
            <Avatar
              src={
                user?.profile_img?.profile_secure_url
                  ? user?.profile_img?.profile_secure_url
                  : "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              size="sm"
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="info"
              className="h-10 gap-2 text-foreground"
              textValue="info"
            >
              <p className="text-xs font-semibold">Signed in as</p>
              <p className="text-xs font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              textValue="profile"
              className="text-primary"
              color="primary"
            >
              <Link to={`/profile/${user?.id}`}>My Profile</Link>
            </DropdownItem>
            <DropdownItem
              textValue="logout"
              key="logout"
              className="text-danger"
              color="danger"
              onClick={logout}
            >
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};
export default NavBar;
