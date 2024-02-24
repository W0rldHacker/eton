"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaGithub, FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineLightMode, MdOutlineDarkMode, MdNoteAdd } from "react-icons/md";
import NotesManager from "@/components/NotesManager";

export default function Home() {
  const [checked, setChecked] = useState(true);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="drawer overflow-hidden">
      <input
        id="drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div
          className={`tooltip tooltip-right before:text-xs before:p-2 absolute left-0 ${
            checked ? "translate-x-72" : ""
          } transition-transform duration-300`}
          data-tip={(checked ? "Скрыть" : "Показать") + " боковую панель"}
        >
          <label
            htmlFor="drawer"
            className={`btn btn-ghost p-2 min-h-min h-auto no-animation text-base-content text-opacity-50 hover:bg-transparent hover:text-opacity-100 ${
              checked ? "" : "rotate-180"
            } transition-all duration-300`}
          >
            <FaChevronLeft size={20} />
          </label>
        </div>
      </div>
      <div className="drawer-side w-72 relative overflow-x-hidden overflow-y-hidden hover:overflow-y-auto z-10">
        <ul className="menu p-4 pr-6 w-72 min-h-full bg-base-200 text-base-content">
          <li className="w-full flex items-center justify-center">
            <h1 className="menu-title text-5xl font-semibold text-base-content">Eton</h1>
            <p className="menu-title pt-0">version {process.env.NEXT_PUBLIC_APP_VERSION}</p>
          </li>
          <li className="">
            <ul className="menu m-0 p-0 my-2 flex-row gap-2 justify-center before:bg-transparent">
              <li>
                <a className="menu-btn tooltip before:bg-transparent before:text-xs before:-mb-2.5 before:duration-0 after:hidden" data-tip="Сменить тему">
                  <label className="swap swap-rotate h-9 w-9 rounded-lg">
                    <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
                    <MdOutlineDarkMode size={24} className="swap-on"></MdOutlineDarkMode>
                    <MdOutlineLightMode size={24} className="swap-off"></MdOutlineLightMode>
                  </label>
                </a>
              </li>
              <li>
                <a className="menu-btn tooltip before:bg-transparent before:text-xs before:-mb-2.5 before:duration-0 after:hidden" data-tip="GitHub">
                  <FaGithub size={20}></FaGithub>
                </a>
              </li>
              <li>
                <a className="menu-btn tooltip before:bg-transparent before:text-xs before:-mb-2.5 before:duration-0 after:hidden" data-tip="Помощь">
                  <FaRegCircleQuestion size={20}></FaRegCircleQuestion>
                </a>
              </li>
            </ul>
          </li>
          <NotesManager />
        </ul>
      </div>
    </div>
  );
}
