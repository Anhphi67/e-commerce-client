import React from 'react';
// import './App.scss';
import Dropdown from '../partials/Dropdown';


function Menu() {
  return (
    <div className="container  mx-auto px-5 sm:px-6 mt-20 flex">
      <Dropdown title="Select movie" className="w-auto shadow-xs border-gray-400 border-2 "  />
    </div>
  );
}

export default Menu;