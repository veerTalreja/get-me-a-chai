"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row">
      <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
        <img className="invertImg" src="/tea.gif" width={44} alt="" />
        <span className="text-xl md:text-base my-3 md:my-0">Get Me a Chai!</span>
      </Link>
      <div className="relative flex flex-col pb-1 md-block">
        {status === "authenticated" && session?.user && (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={() => {
                setTimeout(() => setShowDropdown(false), 300);
              }}
              id="multiLevelDropdownButton"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="multi-dropdown"
              className={`z-10 ${showDropdown ? "" : "hidden"} absolute left-[12px] bg-gray-800 divide-y divide-gray-100 rounded-lg shadow w-34`}
            >
              <ul className="py-2 text-sm text-white">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.username || session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-500"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-500"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {status === "unauthenticated" && (
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
