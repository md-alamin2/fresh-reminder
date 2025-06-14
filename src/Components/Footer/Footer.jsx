import { FaFacebook, FaTwitter, FaInstagram, FaLink, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/imgs/as-11-logo.png";
import useAuth from "../../Hooks/useAuth";
import { Link, NavLink } from "react-router";

export default function Footer() {
  const { user } = useAuth();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className= "font-semibold"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          className= "font-semibold"
        >
          Fridge
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/"
              className= "font-semibold"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className= "font-semibold"
            >
              My Items
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-200 text-base-content md:p-10">
      <div className="w-11/12 lg:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
        {/* Logo & Name */}
        <div className="lg:col-span-2">
          {/* Replace with <img src="/logo.png" alt="FreshReminder" className="w-12" /> if you have a logo image */}
          <Link to="/" className="flex items-center">
            <div>
              <img className="w-10" src={logo} alt="logo" />
            </div>
            <span className="font-bold text-xl">FreshReminder</span>
          </Link>
          <p className="mt-4 text-sm w-80">
            FreshReminder helps you track food expiry dates, reduce waste, and
            eat fresh every time.
          </p>

          {/* Copyright */}
          <div className="text-sm mt-5">
            <p>© 2025 FreshReminder</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="footer-title">Useful Links</h3>
          <ul className="menu p-0 m-0">{links}</ul>
        </div>

        {/* Terms */}
        <div>
          <h3 className="footer-title">Legal</h3>
          <a className="link link-hover">Terms & Conditions</a>
          <a className="link link-hover">Privacy Policy</a>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/alamin.akash.7399" target="_blank" className="text-xl hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/md-al-amin-7a191b339/" target="_blank" className="text-xl hover:text-sky-400">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/md.alamin1176" target="_blank" className="text-xl hover:text-pink-600">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
