import { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { MdSunny } from "react-icons/md";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-[6px] rounded-full text-blue-800 dark:text-yellow-400"
    >
      {theme === "dark" ? <MdSunny size={20} /> : <IoMoon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
