import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import footerImg from "../assets/imgs/bg-footer.jpg";

const Root = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer className="mt-10">
        <div className="w-11/12 lg:container mx-auto">
          <img className="w-full" src={footerImg} alt="" />
        </div>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
