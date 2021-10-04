import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { createStore } from "redux";
import { connect } from "react-redux";
import { register } from "../store/actions/auth";

// import {userLoginFetch} from '../redux/actions';

import Header from "../partials/Header";

function SignUp({message, dispatch}) {
  let history = useHistory();
  function todos(state = [], action) {
    switch (action.type) {
      case "User_Info":
        return state.push(action.Obj);
      default:
        return state;
    }
  }

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  function submit(e) {
    e.preventDefault();
    var data = {
      firstName: fname,
      lastName: lname,
      address: "string",
      email: email,
      password: passWord,
    };

    dispatch(register(data))
      .then(() => {
        alert("Tạo tài khoản thành công");
        history.push("/");
        window.location.reload();
      })
      .catch(() => {});
  }

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-4 pb-6 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-2">
                <h1 className="h1">
                  Welcome to Pichistudio
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        onChange={(event) => setFName(event.target.value)}
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="w-1/2 px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        onChange={(event) => setLName(event.target.value)}
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        onChange={(event) => setPassWord(event.target.value)}
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  <div className="text-red-500 my-4">{message}</div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={submit}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the{" "}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>
                    , and our{" "}
                    <a className="underline" href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  Already account?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}
export default connect(mapStateToProps)(SignUp);
