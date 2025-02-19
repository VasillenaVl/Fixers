// rafce snippet
import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import BestProfessionals from "../components/BestProfessionals";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <BestProfessionals />
      <Banner />
    </div>
  );
};

export default Home;
