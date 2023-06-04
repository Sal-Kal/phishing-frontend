import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./components/NavBar";
import Content from "./components/Content";
import "./App.css";

function App() {
  // Tilt State
  const [tiltState, setTiltState] = React.useState(false);
  const [navState, setNavState] = React.useState(false);

  // Ref for Tilt Area
  const tiltAreaRef = React.useRef(null);

  // Toggles tilt animation for Tilt Area
  const applyTilt = () => {
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
      {tiltState ? <NavBar navState={navState} /> : null}
      <div
        className="tilt-area"
        // Make Tilt Area clickable if Tilt Area is Tilted
        onClick={tiltState ? applyTilt : null}
        ref={tiltAreaRef}
      >
        <button className="burger-icon" onClick={applyTilt}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "#78ffd6", height: "2rem" }}
          />
        </button>
        <Content contentState={tiltState ? false : true} />
      </div>
    </div>
  );
}

export default App;
