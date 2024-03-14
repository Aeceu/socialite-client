import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Switch
      onClick={toggle}
      defaultSelected
      size="sm"
      color="success"
      startContent={<SunIcon className="w-4" />}
      endContent={<MoonIcon className="w-4" />}
    />
  );
}

/*
<div
      className="w-[50px] h-[25px] border-[1.5px] border-[#53c28b70] rounded-2xl flex items-center justify-between p-[2px] relative cursor-pointer"
      onClick={toggle}
    >
      <div className="text-[14px]">🔆</div>
      <div className="text-[14px]"> 🌙</div>
      <div
        className="w-5 h-5 bg-[#53c28b] rounded-[50%] absolute"
        style={theme === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>

*/
