import React, { useState,useEffect } from 'react';
import './Menu.css';
import axios from 'axios';

function Dropdown() {
  const [menus, setMenu] = React.useState({result:[]});
  useEffect(async () => {
    const result = await axios(
      'https://localhost:44377/api/ProductCategory/GetUiList',
    );
    setMenu(result.data);
  });

  
  

  return (
  <div className="navbar bg-white text-black shadow-lg">
  <div className="dropdown">
    <button className="dropbtn shadow-sm">In theo yêu cầu   
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn">Dán gì ? 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn shadow-sm">Sticker 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn">Pin Sticker 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 

  <div className="dropdown">
    <button className="dropbtn shadow-sm">Wall Decal 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn">Decor trang trí 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 

  <div className="dropdown">
    <button className="dropbtn shadow-sm">Collection 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 
  <div className="dropdown">
    <button className="dropbtn">Phụ kiện 
      
    </button>
    <div className="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div> 


</div>

  );
}


export default Dropdown;