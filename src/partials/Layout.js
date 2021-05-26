import React, { useEffect, useState } from 'react';
import Header from '../partials/Header';
import Menu from '../partials/Dropdown';
import Footer from '../partials/Footer';
import store from "../store/index"
import instance from "../https";

const Layout = ({ children }) => {
  const [state, setStates] = useState(store.getState())
  if (localStorage.getItem('token') != '') {
    if (state.todos.length==0){
      function addTodo(Obj) {
        return {
          type: 'User_Info',
          Obj
        }
      }
      instance.get('/User/GetCurrentUserAsync')
        .then(response => {
          store.dispatch(addTodo(response.data))
          setStates(store.getState())
          return 
        })
    }
  }


  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <div className="justify-around  mx-auto px-5 sm:px-6 mt-20 flex">
          <Menu />
        </div>
      </div>
      <main>{children}</main>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default Layout;