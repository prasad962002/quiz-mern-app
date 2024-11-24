import React, { useEffect, useState } from 'react'
import useLogout from '../../hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Bars3BottomRightIcon, BookOpenIcon, XMarkIcon } from '@heroicons/react/24/solid';

const AdminHeader = () => {
    const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoggedIn(!!user); // Set true if userDetails exist
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false); // Update login state
    navigate("/login");
  };
    const Links = [
        { name: "ADMIN HOME", link: "/admin/dashboard" },
        { name: "CREATE QUIZ", link: "/admin/create-quiz" },
        { name: "ALL QUIZZES", link: "/admin/allquiz" },
        { name: "CATEGORY", link: "/admin/category" },
        { name: "PROFILE", link: "/admin/profile" },
        { name: "RESULT", link: "/admin/result" },
      ];
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* Logo section */}
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
          <BookOpenIcon className="w-7 h-7 text-blue-600" />
          <span>Quiz</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* Link items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link, i) => (
            <li key={i} className="md:ml-8 md:my-0 my-7 font-semibold">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-blue-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {isLoggedIn ? (
            <>              

              <button
                onClick={handleLogout}
                className="btn bg-red-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-400 duration-500 md:ml-8 font-semibold"
              >
                LOG IN
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 hover:text-blue-400 duration-500 md:ml-8 font-semibold"
              >
                REGISTER
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader
