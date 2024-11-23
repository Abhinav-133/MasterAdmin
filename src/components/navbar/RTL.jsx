import React from "react";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);

  return (
    <nav className="sticky top-4 z-40 flex flex-row items-center justify-between rounded-xl bg-white/10 px-3 py-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-2 flex items-center">
        <a
          className="text-sm font-normal text-navy-700 hover:underline dark:text-white"
          href=" "
        >
          Pages
          <span className="mx-1 text-sm text-navy-700 dark:text-white">
            {" "}
            /{" "}
          </span>
        </a>
        <Link
          className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white"
          to="#"
        >
          {brandText}
        </Link>
      </div>

      <div className="flex items-center">
        <div
          className="cursor-pointer rounded-full bg-white p-1 shadow-md dark:bg-navy-800"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-5 w-5 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-5 w-5 text-gray-600 dark:text-white" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
