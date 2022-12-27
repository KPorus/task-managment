import React, { useContext } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../component/context/AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
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

  const { createUser, setLoading } = useContext(AuthContext);

  let handleLogin = (e) => {
    e.preventDefault();
    let form = e.target;
    let email = form.email.value;
    let password = form.password.value;
    let name = form.name.value;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setLoading(true);
        user.displayName = name;
        toast.success("Sign up Successfully.");
        const currentUser = {
          email: userInfo.email,
        };
        fetch(
          " http://localhost:5000/jwt",
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
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          });
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
        setErrors({ ...errors, general: error.message });
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

  document.title = "Sign Up";
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
            <div
              className='w-full max-w-xl xl:px-8 xl:w-5/12'
              onSubmit={handleLogin}>
              <div className='bg-gray-900  rounded shadow-2xl p-7 sm:p-10'>
                <h3 className=' text-white mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl uppercase'>
                  Sign up
                </h3>
                <form>
                  <div className='mb-1 sm:mb-2'>
                    <label
                      htmlFor='firstName'
                      className='inline-block mb-1 font-medium text-white'>
                      Full name
                    </label>
                    <input
                      required
                      type='text'
                      className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                      name='name'
                      id='firstName'
                      placeholder='Enter your name'
                    />
                  </div>
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
                      className='flex-grow w-full h-12 px-4 mb-2 transition duration-200  border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                      id='email'
                      name='email'
                      onChange={handleEmailChange}
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
                      placeholder='Password'
                      required
                      type='password'
                      className='flex-grow w-full h-12 px-4 mb-2 transition duration-200  border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'
                      id='pass'
                      name='password'
                      onChange={handlePasswordChange}
                    />
                    {errors.password && (
                      <p className='text-red-600'>{errors.password}</p>
                    )}
                  </div>
                  <div className='mt-4 mb-2 sm:mb-4'>
                    <button
                      type='submit'
                      className='uppercase inline-flex items-center justify-center w-full h-12 px-6 font-medium bg-slate-800 tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
                      Sign Up
                    </button>
                  </div>
                </form>
                <small className='text-white'>
                  {" "}
                  <Link to='/login'>
                    Already have a account!!{" "}
                    <span className='font-bold text-[#085594]'>Login</span>
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
