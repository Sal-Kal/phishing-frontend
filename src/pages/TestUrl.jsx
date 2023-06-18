import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import Loader from "../components/Loader";

const backendUrl = "http://localhost:5000/test/url";
// const form = {
//   url: "https://google.com",
// };

const TestUrl = () => {
  const [url, setUrl] = useState("");
  const [testState, setTestState] = useState("disclaimer");
  const [loaderText, setLoaderText] = useState("LOADING...");
  const [resultFetched, setResultFetched] = useState(false);
  const disclaimerRef = useRef(null);
  const [result, setResult] = useState({ score: 0 });
  const [count, setCount] = useState(0);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const word = "LOADING...";

  const handleStroke = (event) => {
    const value = event.target.value;
    setUrl(value);
  };

  const handleClick = async () => {
    setTestState("loading");
    setResult({ score: 0 });
    if (disclaimerRef.current !== null) {
      disclaimerRef.current.setAttribute("fade", "true");
    }
    try {
      let formData = {
        url: url,
      };
      await axios.post(backendUrl, formData).then((res) => {
        console.log(res.data.message);
        setResult(res.data.message);
        setResultFetched(true);
        setTestState("result");
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        const diff = result.score - prevCount;
        const increment = diff / 20; // Increase count by 5% of the difference
        return prevCount + increment;
      });
    }, 9);
    return () => clearInterval(interval);
  }, [result.score]);

  useEffect(() => {
    let itr = 0;
    const interval = setInterval(() => {
      setLoaderText((prevText) => {
        return prevText
          .split("")
          .map((letter, index) => {
            if (index < itr) {
              return word[index];
            } else {
              return letters[Math.floor(Math.random() * 26)];
            }
          })
          .join("");
      });
      if (itr === word.length * 2.5) {
        itr = 0;
      }
      itr += 1;
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBlock: "1rem", fontFamily: "Researcher Squid" }}>
        TEST URL
      </div>
      <input
        type="text"
        value={url}
        onChange={handleStroke}
        placeholder="Enter URL here"
        style={{
          fontFamily: "Space Mono",
          fontSize: "2rem",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0)",
          border: "2px solid white",
          borderRadius: "100px",
          width: "70%",
          height: "3rem",
          marginInline: "auto",
          marginBlock: "2rem",
        }}
      />
      {testState === "disclaimer" ||
      testState === "loading" ||
      !resultFetched ? (
        <p id="disclaimer" ref={disclaimerRef}>
          <b>Disclaimer:</b> The phishing URL test project is strictly for
          educational and security awareness purposes. It involves simulating
          phishing attacks to assess vulnerability and raise awareness. All
          participants must provide explicit consent, and the project should
          comply with applicable laws and regulations. The use of real-world
          email addresses or sensitive data is strictly prohibited. The results
          obtained should be used solely for educational purposes and to
          implement enhanced security measures. The project organizers and
          developers assume no responsibility for any misuse, unauthorized
          activities, or damages resulting from the project. Participants are
          urged to prioritize the protection of personal information and adhere
          to cybersecurity best practices.
        </p>
      ) : testState === "result" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10rem",
            marginBlock: "4rem",
          }}
        >
          <div style={{ fontFamily: "Space Mono", fontWeight: "200" }}>
            {result.prediction === "safe" ? (
              <>
                <p>This website is {count.toFixed(1)}% Safe</p>
                <a
                  href={url}
                  target="_blank"
                  style={{ fontsize: "1.5rem", color: "white" }}
                  rel="noreferrer"
                >
                  {/* <button classname="loader" navigate="true">
                    continue to website
                  </button> */}
                  visit site
                </a>
              </>
            ) : (
              <>
                <p>This website is {count.toFixed(1)}% not safe</p>
                <a
                  href={url}
                  target="_blank"
                  style={{ fontSize: "1.5rem", color: "white" }}
                  rel="noreferrer"
                >
                  {/* <button className="loader" navigate="true">
                    Continue to Website
                  </button> */}
                  visit site
                </a>
              </>
            )}
          </div>
          <div style={{ height: "15rem", width: "15rem" }}>
            <CircularProgressbar
              className="custom-progress-bar"
              value={count}
              text={count === 0 ? "0%" : `${count.toFixed(1)}%`}
              strokeWidth={7}
              styles={buildStyles({
                pathTransition: 2,
                pathColor: result.prediction === "safe" ? "green" : "red",
                textColor: "white",
                textSize: "1rem",
                textAlign: "center",
                trailColor: "black",
                strokeLinecap: "round",
                backgroundColor: "black",
              })}
            />
          </div>
        </div>
      ) : (
        <div>You shouldn’t be seeing this</div>
      )}
      {/* <Loader /> */}

      {testState === "loading" ? (
        <div className="button-wrapper">
          <button className="loader" onClick={handleClick} loading="true">
            {loaderText}
          </button>
        </div>
      ) : (
        <div className="button-wrapper">
          <button className="loader" onClick={handleClick}>
            TEST URL
          </button>
        </div>
      )}
    </div>
  );
};

export default TestUrl;
