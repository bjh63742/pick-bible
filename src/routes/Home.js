import React, { useState } from "react";
import BiblePick from "../components/BiblePick";
import Login from "../components/Login";

const Home = () => {
  const [name, setName] = useState("");
  const handleName = (name) => {
    setName(name);
  };
  if (name === "") {
    return <Login handleName={handleName} />;
  } else {
    return <BiblePick name={name} />;
  }
};

export default Home;
