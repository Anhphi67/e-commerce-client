import React, { useState, useEffect } from 'react';
import './Menu.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Dropdown() {
  const [menus, setMenu] = React.useState({ result: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://localhost:44377/api/ProductCategory/GetUiList',
      );
      setMenu(result.data);
    };

    fetchData();
  }, []);
  return (
    <div className="navbar bg-white text-black shadow-lg">
      {menus.result.map(item => (
        <div key={item.id} className="dropdown">
          <button   className="dropbtn shadow-sm">{item.name}
          </button>
          <div className="dropdown-content">
            {item.subCategories.map(sub => (
             <Link  key={sub.id} to={'/list/id/' + sub.id}>{sub.name}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default Dropdown;