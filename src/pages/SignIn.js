import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/auth";
import Header from "../partials/Header";

const SignIn = ({ message, dispatch }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const Login = useCallback((e) => {
    e.preventDefault();
    dispatch(login(email, passWord))
        .then(() => {
          history.push("/");
          window.location.reload();
        })
        .catch(() => {
        });
  },[email,passWord,dispatch,history]);

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-2">
            <div className="pt-4 pb-6">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-2">
                <h1 className="h1">
                  Welcome back
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Link
                          to="reset-password"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Having trouble signing in?
                        </Link>
                      </div>
                      <input
                        id="password"
                        type="password"
                        onChange={(event) => setPassWord(event.target.value)}
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">
                            Keep me signed in
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="text-red-500 my-4 text-md">
                    {message}
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        onClick={Login}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Welcome</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}
export default connect(mapStateToProps)(SignIn);
