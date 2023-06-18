import React from "react";
import Guy from "../assets/guy.jpg";

const AboutPhishing = () => {
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
      <h4
        style={{
          textAlign: "center",
          marginBlock: "1rem",
          // fontFamily: "Poppins",
          fontFamily: "Researcher Regular",
        }}
      >
        What is Phishing Attack ?
      </h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            fontSize: "1.7rem",
            textAlign: "justify",
            width: "90%",
            fontFamily: "Poppins",
            fontWeight: "200",
            borderRadius: "12px",
            padding: "1rem",
            marginBlock: "auto",
          }}
        >
          Phishing attack is a type of cyber-attack where attacker sends
          fraudulent (spoofed, fake or deceptive) messages designed to lure a
          human victim to give away personal information or credentials or to
          deploy malicious software in victim's infrastructure like ransomware.
          As Internet usage is increasing day by day so are the cyber-crimes and
          scams. Phishing is one of the latest sophisticated techniques used by
          the scammers.
        </p>
        <img src={Guy} alt="Guy" />
      </div>
    </div>
  );
};

export default AboutPhishing;
