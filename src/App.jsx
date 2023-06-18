import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Content from "./components/Content";
import "./App.css";

function App() {
  // Tilt State
  const navItems = ["ABOUT US", "TEST URL", "INFO"];
  const [tiltState, setTiltState] = React.useState(false);
  const [navState, setNavState] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("ABOUT US");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Ref for Tilt Area
  const tiltAreaRef = React.useRef(null);

  const hoverHack = (event) => {
    let iterations = 0;
    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iterations) {
            return event.target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iterations >= event.target.dataset.value.length)
        clearInterval(interval);
      iterations += 1 / 1.5;
    }, 30);
  };

  // Navigate to Page
  const navigate = (page) => {
    setNavState(false);
    tiltAreaRef.current.setAttribute("tilted", "false");
    tiltAreaRef.current.addEventListener(
      "animationend",
      () => {
        tiltAreaRef.current.removeAttribute("tilted");
        setTiltState(false);
      },
      { once: true }
    );
    setCurrentPage(page);
  };

  // Toggles tilt animation for Tilt Area
  const toggleTilt = () => {
    if (!tiltState) {
      tiltAreaRef.current.setAttribute("tilted", "true");
      setNavState(true);
      setTiltState(true);
    } else {
      setNavState(false);
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
        <div className="nav-wrapper" fade={navState ? null : "right"}>
          {navItems.map((item, id) => {
            return (
              <div
                data-value={item}
                className="nav-item"
                key={id}
                style={{ "--nav-delay": id }}
                onClick={() => navigate(item)}
                onMouseOver={hoverHack}
              >
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
      <div
        className="tilt-area"
        // Make Tilt Area clickable if Tilt Area is Tilted
        onClick={tiltState ? toggleTilt : null}
        ref={tiltAreaRef}
      >
        <button className="burger-icon" onClick={toggleTilt}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "white", height: "2rem" }}
          />
        </button>
        <Content page={currentPage} />
      </div>
    </div>
  );
}

export default App;
