import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import useAuth from "../../Hooks/useAuth";
import loginImg from "../../assets/Lottis/as-11-login.json";
import Lottie from "lottie-react";
import person from "../../assets/Lottis/as-11-person.json"

const Login = () => {
  const { loginUser, loginWithGoogle, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newUser = Object.fromEntries(formData.entries());

    // login user
    loginUser(newUser.email, newUser.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login!",
          text: "User login successfully!",
          icon: "success",
          timer: 2000,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMassage = error.code;
        toast.error(`${errorMassage}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  //   google login
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login!",
          text: "User login successfully!",
          icon: "success",
          timer: 2000,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorMassage = error.code;
        toast.error(`${errorMassage}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div>
      <title>FreshReminder-login</title>
      <div className="w-11/12 lg:container mx-auto flex flex-col md:flex-row md:items-center bg-base-100  mt-5 md:mt-10 md:px-40">
        <div data-aos="fade-right" className="hidden md:w-[50%] lg:flex justify-center">
          <Lottie animationData={loginImg} style={{width:500}}></Lottie>
        </div>
        <form data-aos="fade-left" onSubmit={handleLogin} className="card-body md:w-[50%]">
          <div className="flex justify-center">
            <Lottie animationData={person} style={{width:100}} className="bg-[#64b843] rounded-full p-1"></Lottie>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Login Your Account
          </h2>
          <fieldset className="fieldset w-full">
            <label className=" text-xl font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input  w-full"
              placeholder="Enter Your Email"
            />
            <label className="text-xl font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input  w-full"
              placeholder="Enter Your Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
          </fieldset>
          <button className="btn bg-[#64b843]">Login</button>
          <div className="divider">OR</div>
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#64b843] font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
