import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer/Footer";
import footerImg from "../assets/imgs/bg-footer.jpg";
import Loader from "../Components/Laoder/Loader";

const Root = () => {
  const navigation = useNavigation()
  return (
    <div className="relative">
      <header className="sticky top-0 z-1 backdrop-blur-md shadow-sm">
        <Navbar></Navbar>
      </header>
      <main>
        {navigation.state === "loading" ? (
          <Loader></Loader>
        ) : (
          <Outlet></Outlet>
        )}
      </main>
      <footer className="mt-30">
        <div className="w-11/12 lg:container mx-auto">
          <img className="w-full" src={footerImg} alt="" />
        </div>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
