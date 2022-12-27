import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const { login, googleLogin, setLoading, setUser, forgetPassword } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = {
      email: userInfo.email,
    };

    console.log(currentUser);

    login(userInfo.email, userInfo.password)
      .then((result) => {
        toast.success("success");
        let user = result.user;
        console.log(user);
        setLoading(true);
        setUser(user);

        fetch(
          " https://b612-used-products-resale-server-side-kp-orus.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            // local storage is the easiest but not the best place to store jwt token
            localStorage.setItem("token", data.token);
            e.target.reset();
            navigate(from, { replace: true });
          });
      })
      .catch((err) => {
        console.log(err);
        setErrors({ ...errors, general: err.message });
      });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrors({ ...errors, email: "Please provide a valid email" });
      setUserInfo({ ...userInfo, email: "" });
    } else {
      setErrors({ ...errors, email: "" });
      setUserInfo({ ...userInfo, email: e.target.value });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const lengthError = password.length < 6;
    const noSymbolError = !/[\!\@\#\$\%\^\&\*]{1,}/.test(password);
    const noCapitalLetterError = !/[A-Z]{1,}/.test(password);

    if (lengthError) {
      setErrors({ ...errors, password: "Must be at least 6 characters" });
      setUserInfo({ ...userInfo, password: "" });
    } else if (noSymbolError) {
      setErrors({ ...errors, password: "Must have a unique number" });
      setUserInfo({ ...userInfo, password: " " });
    } else if (noCapitalLetterError) {
      setErrors({ ...errors, password: "Must have a capital letter" });
      setUserInfo({ ...userInfo, password: " " });
    } else {
      setErrors({ ...errors, password: "" });
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };

  let googleProvider = new GoogleAuthProvider();
  let handleGoogleLogin = () => {
    googleLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        setLoading(true);
        console.log(user);
        toast.success("Login successfull!");

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);
        fetch(
          " https://b612-used-products-resale-server-side-kp-orus.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          });
        // ...
      })
      .catch((error) => {
        console.log(error);
        toast.error("login failled");
      });
  };

  let resetPass = () => {
    setLoading(true);
    forgetPassword(userInfo.email)
      .then(() => {
        // Password reset email sent!
        // ..
        toast.success("Check your Mail. Reset password mail has been sent");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrors({ ...errors, general: errorMessage });
        // ..
      });
  };

  document.title = "Login form";

  return (
    <div className='relative'>
      <img
        src='https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
        className='absolute inset-0 object-cover w-full h-full'
        alt=''
      />
      <div className='relative bg-gray-900 bg-opacity-75'>
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
          <div className='flex flex-col items-center justify-between xl:flex-row'>
            <div className='w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12'>
              <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none'>
                The quick, fast <br className='hidden md:block' />& easy to use{" "}
                <span className='text-teal-accent-400'>to track your task</span>
              </h2>
              <p className='max-w-xl mb-4 text-base text-gray-400 md:text-lg'>
                Plan, organize, and collaborate on any project with powerful
                task management that can be customized for every need.
              </p>
            </div>
            <div className='w-full max-w-xl xl:px-8 xl:w-5/12'>
              <div className='bg-gray-900 rounded shadow-2xl p-7 sm:p-10'>
                <h3 className='text-white mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl uppercase'>
                  Login
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className='mb-1 sm:mb-2'>
                    <label
                      htmlFor='email'
                      className='inline-block mb-1 font-medium text-white'>
                      E-mail
                    </label>
                    <input
                      placeholder='john.doe@example.org'
                      required
                      type='text'
                      onChange={handleEmailChange}
                      className='flex-grow w-full h-12 px-4 mb-2 transition duration-200  border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                      id='email'
                      name='email'
                    />
                    {errors.email && (
                      <p className='text-red-600'>{errors.email}</p>
                    )}
                  </div>
                  <div className='mb-1 sm:mb-2'>
                    <label
                      htmlFor='pass'
                      className='inline-block mb-1 font-medium text-white'>
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      placeholder='password'
                      required
                      onChange={handlePasswordChange}
                      className='flex-grow w-full h-12 px-4 mb-2 transition duration-200  border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                      id='pass'
                    />
                    {errors.password && (
                      <p className='text-red-600'>{errors.password}</p>
                    )}
                  </div>
                  <div className='mt-4 mb-2 sm:mb-4'>
                    <button
                      type='submit'
                      className='bg-slate-800 inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide uppercase text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
                      Login
                    </button>
                  </div>
                </form>
                <small>
                  <button
                    onClick={resetPass}
                    className='text-white duration-300 transform hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110'>
                    Forget password
                  </button>
                </small>
                <p className='text-center text-white'>
                  New here{" "}
                  <Link className='text-[#003566] font-bold' to='/signup'>
                    Sign Up
                  </Link>{" "}
                </p>
                <button
                  className='text-white text-center mt-4 justify-center mx-auto w-52 h-12 p-[0.7rem] flex duration-300 transform border border-gray-400  hover:text-teal-accent-400 hover:border-teal-accent-400 hover:shadow hover:scale-110'
                  onClick={handleGoogleLogin}>
                  <FcGoogle className='text-2xl mr-2'></FcGoogle>Google Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
