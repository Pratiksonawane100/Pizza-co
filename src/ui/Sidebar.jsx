import { useState } from "react";
import "../css/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu icon only visible on mobile screens */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{ top: "5%", marginLeft: "2%" }}
      >
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/menu">Menu</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>

            <li>
              <a href="/order/new">Create order</a>
            </li>
            <li>
              <a href="/update">Update Order</a>
            </li>
            <li>
              <a href="/status">Orders</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
