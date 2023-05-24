import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  // Nav Bar Items
  const navItems = ["Kill", "Your", "Self", "Now"];

  // Tilt State
  const [tiltState, setTiltState] = React.useState(false);

  // Ref for Tilt Area
  const tiltAreaRef = React.useRef(null);

  // Ref for content within Tilt Area
  const contentRef = React.useRef(null);

  // Ref for navbar
  const navRef = React.useRef(null);

  // Scroll Animation for Content within Tilt Area
  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      contentRef.current.setAttribute("fade", "down");
      contentRef.current.addEventListener(
        "animationend",
        () => {
          contentRef.current.removeAttribute("fade");
        },
        { once: true }
      );
    } else {
      contentRef.current.setAttribute("fade", "up");
      contentRef.current.addEventListener(
        "animationend",
        () => {
          contentRef.current.removeAttribute("fade");
        },
        { once: true }
      );
    }
  };

  // Toggles tilt animation for Tilt Area
  const applyTilt = () => {
    if (!tiltState) {
      tiltAreaRef.current.setAttribute("tilted", "true");
      setTiltState(true);
    } else {
      navRef.current.setAttribute("fade", "right");
      tiltAreaRef.current.setAttribute("tilted", "false");
      tiltAreaRef.current.addEventListener(
        "animationend",
        () => {
          tiltAreaRef.current.removeAttribute("tilted");
          setTiltState(false);
        },
        { once: true }
      );
    }
  };

  return (
    <div className="app">
      {/* Show Nav Bar if Tilt Area is Tilted */}
      {tiltState ? (
        <div className="nav-wrapper" ref={navRef}>
          {navItems.map((item, id) => {
            return (
              <div className="nav-item" key={id} style={{ "--nav-delay": id }}>
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
      <div
        className="tilt-area"
        // Make Tilt Area clickable if Tilt Area is Tilted
        onClick={tiltState ? applyTilt : null}
        // Disable Scroll Animation if Tilt Area is Tilted
        onWheel={tiltState ? null : handleScroll}
        ref={tiltAreaRef}
      >
        <button className="burger-icon" onClick={applyTilt}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "lime", height: "2rem" }}
          />
        </button>
        <div className="content" ref={contentRef}>
          Death Is The Only Escape
        </div>
      </div>
    </div>
  );
}

export default App;
