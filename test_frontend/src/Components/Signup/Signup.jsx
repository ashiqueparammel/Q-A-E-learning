import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/Api"
import { COUNTRIES } from '../../Helpers/Countries';
import toast, { Toaster } from 'react-hot-toast'

const countries = COUNTRIES

function Signup() {

  const [selectedCountry, setSelectedCountry] = useState('+cc');
  const [selectedCountryname, setSelectedCountryname] = useState('');

  const handleCountryChange = (event) => {
    // countries.map((country) => (event.target.value))

    setSelectedCountry(event.target.value);
  };

  const history = useNavigate()
  const signupform = async (e) => {
    e.preventDefault();

    const data = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password2: e.target.password2.value,
      country: e.target.country.value,
      phone_number: selectedCountry + e.target.phone_number.value,
    };


    if (selectedCountry.length === 0) {
      toast.error('please select country!')

    } if (data.password !== data.password2) {
      toast.error('password not match!')

    }
    if (data.phone_number < 11) {
      toast.error('password should have at least 10 digits!')

    }
    if (data.password.length < 8) {
      toast.error('Password should have at least 8 digits!')

    }
    try {
      const response = await fetch(`${baseUrl}signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'first_name': data.first_name,
          'last_name': data.last_name,
          'username': data.username,
          'email': data.email,
          'country': data.country,
          'password': data.password,
          'password2': data.password,
          'phone_number': data.phone_number,
        })
      });

      if (response.status === 200 && response.registerd) {
        toast.success('Sign Up successfully!')

        history('/login');
      }

      else if (response.status === 404) {
        if (response.Text.phone_number) {
          toast.error("The phone number entered is not valid.")
        }
        else if (response.Text.username) {
          toast.error("A user with that username already exists.")
        }
        else if (response.Text.email) {
          toast.error("A user with that email already exists.")
        }
        else {
          toast.error("'Something went wrong. Please try again later.'")
        }
      }
      else {
        toast.error("'Something went wrong. Please try again later.'")
      }
    } catch (error) {
      console.log("Registration error:", error);

    }

  }



  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#f3f4f6] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Create your account
        </h1>
        <form className="mt-6" onSubmit={(e) => signupform(e)}>
          <div className="flex flex-row gap-5">
            <div className="mb-2 flex-1">
              <input
                type="text" placeholder="First Name" name="first_name" required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md
                focus:border-gray-400 focus:ring-gray-300
                focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2 flex-1">
              <input
                type="text" placeholder="Last Name" name="last_name" required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md
                focus:border-gray-400 focus:ring-gray-300
                focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="mb-2">
            <input
              type="text" placeholder="Username" name="username" required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md 
              focus:border-gray-400 focus:ring-gray-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <input
              type="email" placeholder="Your Email Address" name="email" required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border 
              rounded-md focus:border-gray-400 focus:ring-gray-300 
              focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <br />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            This Will be used for verification
          </label>

          <br />
          <div className="flex flex-row gap-5">
            <div className="mb-2 flex-1">
              <select
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md 
          focus:border-gray-400 focus:ring-gray-300 
          focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="" disabled selected>
                  Select a country
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.mobileCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2 flex-1">
              <input
                type="text"
                placeholder={`${selectedCountry} Phone`}
                name="phone_number"
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md 
          focus:border-gray-400 focus:ring-gray-300 
          focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="mb-2 flex-1">
              <input
                type="password" placeholder="Password" name="password" required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md
                focus:border-gray-400 focus:ring-gray-300
                focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2 flex-1">
              <input
                type="password" placeholder="Confirm " name="password2" required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md
                focus:border-gray-400 focus:ring-gray-300
                focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg 
            hover:bg-gray-900 focus:outline-none focus:bg-gray-600">
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs text-center text-gray-700">
          {" "}
          Already a member?{" "}
          <Link to={"/login"}>
            <u className="font-medium text-gray-600 hover:underline">
              Sign in
            </u>
          </Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup