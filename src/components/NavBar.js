import React from "react";

const NavBar = ({ navState }) => {
  const navItems = ["About Us", "Test URL", "Info"];

  return (
    <div className="nav-wrapper" fade={navState ? null : "right"}>
      {navItems.map((item, id) => {
        return (
          <div className="nav-item" key={id} style={{ "--nav-delay": id }}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
