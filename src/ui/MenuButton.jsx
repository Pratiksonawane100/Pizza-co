// src/ui/MenuButton.jsx
import PropTypes from "prop-types";
import "../css/MenuButton.css";

const MenuButton = ({ toggleSidebar }) => {
  return (
    <button className="menu-button" onClick={toggleSidebar}>
      ☰
    </button>
  );
};

// Adding prop types validation
MenuButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default MenuButton;
