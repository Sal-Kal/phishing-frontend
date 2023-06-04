import React from "react";

const Content = ({ contentState }) => {
  const contentRef = React.useRef(null);
  const blobRef = React.useRef(null);

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

  React.useEffect(() => {
    document.body.onpointermove = (event) => {
      const { clientX, clientY } = event;
      blobRef.current.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 5000, fill: "forwards" }
      );
    };
  }, []);

  return (
    <div
      className="content-wrapper"
      ref={contentRef}
      // Disable Scroll Animation if Tilt Area is Tilted
      onWheel={contentState ? handleScroll : null}
    >
      <div id="blob" ref={blobRef}></div>
      <div id="blur"></div>
      <div className="content">This Is A Test</div>
    </div>
  );
};

export default Content;
