import React from "react";
import Header from "../header/Header";
import Background from "./Background";
import Title from "./Title";
import ReturningUser from "./ReturningUser";
import TextCarousel from "./TextCarousel";

function Splash() {
  return (
    <div className="page">
      <Background />
      <Title />
      <ReturningUser />
      <TextCarousel />
      <Header />
    </div>
  );
}

export default Splash;
