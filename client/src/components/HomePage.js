import React from "react";
import { Navbar } from "./Navbar";
import Topics from "./Topics";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h2
          className="my-3"
          style={{ color: "var(--bs-ternary)", fontSize: "30px" }}
        >
          Topics
        </h2>
        <div className="row">
          <div className="col-sm-7">
            <Topics />
          </div>
          <div className="col-sm-5">
            <img
              src="https://i.pinimg.com/originals/b3/f3/4c/b3f34c47c855b3388768c26e2111de33.png"
              style={{ width: "100%" }}
              className="mx-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
