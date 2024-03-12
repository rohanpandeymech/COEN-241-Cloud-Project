import React from "react";

import { logo } from "../assets";
import backgroundImage from "../assets/scu_backdrop.jpg"; // Adjust the path as needed


const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col"
      style={{
        height: '70vh',
        width: '100vw',
        backgroundImage: `linear-gradient(rgba(255, 255, 400, 0.5), rgba(255, 255, 400, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'header',
        backgroundPosition: 'center',
      }}    
    >
      <nav className="flex justify-between items-center w-[80%] mb-10 pt-3 mx-12">
        <img src={logo} alt="scu_logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open(
              "https://github.com/rohanpandeymech/COEN-241-Cloud-Project",
              "_blank"
            )
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="red_gradient ">Bronco’s Content Summarization Tool </span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Bronco’s Content Summarization Tool, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
