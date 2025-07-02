import React from 'react';
import logo from "../../assets/imgs/as-11-logo.png"
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/" className=" flex items-center gap-2 md:text-2xl font-bold">
          <img className="w-10 md:w-14" src={logo} alt="logo" /> FreshReminder
        </Link>
    );
};

export default Logo;