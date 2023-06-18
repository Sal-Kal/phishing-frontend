import React from "react";
import AboutPhishing from "../pages/AboutPhishing";
import Info from "../pages/Info";
import TestUrl from "../pages/TestUrl";

const Content = ({ page }) => {
  // const blobRef = React.useRef(null);

  // React.useEffect(() => {
  //   document.body.onpointermove = (event) => {
  //     const { clientX, clientY } = event;
  //     blobRef.current.animate(
  //       {
  //         left: `${clientX}px`,
  //         top: `${clientY}px`,
  //       },
  //       { duration: 5000, fill: "forwards" }
  //     );
  //   };
  // }, []);

  return (
    <div className="content-wrapper">
      {/* <div id="blob" ref={blobRef}></div>
      <div id="blur"></div> */}
      <div className="content">
        {page === "ABOUT US" ? (
          <AboutPhishing />
        ) : page === "TEST URL" ? (
          <TestUrl />
        ) : page === "INFO" ? (
          <Info />
        ) : (
          <div>You should not be seeing this</div>
        )}
      </div>
    </div>
  );
};

export default Content;
