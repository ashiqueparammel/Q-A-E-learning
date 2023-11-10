import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import { baseUrl } from '../../Api/Api';
import { getLocal } from '../../Helpers/Auth';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../Redux/UserSlice';
import toast, { Toaster } from 'react-hot-toast'
import { Checkbox } from "@material-tailwind/react";

function Login() {
  const history = useNavigate()
  const dispatch = useDispatch()
  const response = getLocal();

  const signup = () => {
    history('/signup');
  }
  useEffect(() => {
    if (response) {
      history('/');
    }
  }, [response, history]);


  const loginuser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await response.json();
    try {
      const token = jwtDecode(data.access)
      const setuser = {
        "user_id": token.user_id,
        "name": token.username,
        "email": token.email,
        "is_admin": token.is_admin
      }

      dispatch(setUserInfo({ userinfo: setuser }))

    } catch (error) {
      console.error('Error decoding JWT:', error);
    }

    if (response.status === 200) {
      localStorage.setItem('authToken', JSON.stringify(data));
      history('/');

    } else if (response.status === 401) {
      toast.error('User credentials mismatch')
      history('/login');

    }
    else {
      toast.error('Network error!')
      history('/login');

    }

  }


  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-9 m-auto bg-[#f3f4f6] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h1>
        <form className="mt-6" onSubmit={(e) => loginuser(e)}>


          <div className="mb-2">
            <input
              type="text" placeholder="Username" name="username" required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
            focus:border-gray-400 focus:ring-gray-300 
            focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>


          <div className="mb-2 ">
            <input
              type="password" placeholder="Password" name="password" required
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md
              focus:border-gray-400 focus:ring-gray-300
              focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <br />

          <div>
            <label>
              <input type="checkbox" />
              {"  "}Remember me
            </label>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg 
          hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-[#525252] rounded-lg 
          hover:bg-[#44403c] focus:outline-none focus:bg-gray-600" onClick={signup} >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs text-center font-bold text-gray-400">
          By Cliking Button  Above.You  Agree To Our <br />
          <u className='text-gray-900'>TermsOfUse</u> And <u className='text-gray-900'>Privacy Policy</u>
        </p>
      </div>
      <Toaster />
    </div>

  )
}

export default Login