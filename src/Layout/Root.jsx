import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer/Footer";
import Loader from "../Components/Laoder/Loader";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

const Root = () => {
  const navigation = useNavigation();
  return (
    <div className="relative">
      <header className="sticky top-0 z-1 backdrop-blur-md shadow-sm">
        <Navbar></Navbar>
      </header>
      <main>
        {navigation.state === "loading" ? (
          <>
            <ScrollToTop></ScrollToTop>
            <Loader></Loader>
          </>
        ) : (
          <>
            <ScrollToTop></ScrollToTop>
            <Outlet></Outlet>
          </>
        )}
      </main>
      <footer className="mt-30">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Root;
