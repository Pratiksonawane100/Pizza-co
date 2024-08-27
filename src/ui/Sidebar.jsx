import { useState } from "react";
import { CiHome, CiShoppingCart, CiPizza } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { BsBox2 } from "react-icons/bs";
import { PiPizzaDuotone } from "react-icons/pi"; // Import the new icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu icon only visible on mobile screens */}
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded focus:outline-none lg:hidden"
        onClick={toggleSidebar}
        style={{ zIndex: "1000" }}
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 p-5 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ zIndex: "100", paddingTop: "60px" }}
      >
        {/* Logo Section */}
        <div className="flex items-center mb-8">
          <PiPizzaDuotone className="text-4xl text-yellow-400" />
          <span className="ml-3 text-2xl font-bold text-white">Pizza-Co</span>
        </div>

        <nav className="space-y-4">
          <ul className="space-y-4">
            <li>
              <a
                href="/"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <CiHome className="text-2xl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Home
                </span>
              </a>
            </li>
            <li>
              <a
                href="/menu"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <CiPizza className="text-2xl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Menu
                </span>
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <CiShoppingCart className="text-2xl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Cart
                </span>
              </a>
            </li>
            <li>
              <a
                href="/order/new"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <IoCreateOutline className="text-xl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Create Order
                </span>
              </a>
            </li>
            <li>
              <a
                href="/update"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <GrUpdate className="text-sl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Update Order
                </span>
              </a>
            </li>
            <li>
              <a
                href="/status"
                className="flex items-center p-3 hover:bg-gray-700 rounded-md"
              >
                <BsBox2 className="text-sl text-white" />
                <span className="ml-4 text-lg font-semibold text-white">
                  Orders
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
