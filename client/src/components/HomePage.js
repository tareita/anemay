import React from "react";
import { Navbar } from "./Navbar";
import Topics from "./Topics";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Topics />
      </div>
    </div>
  );
};

export default HomePage;
