import React, { useState, useEffect } from 'react';
import './Menu.css';
import axios from 'axios';

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
        <div className="dropdown">
          <button key={item.id} className="dropbtn shadow-sm">{item.name}
          </button>
          <div className="dropdown-content">
            {item.subCategories.map(sub => (
             <a>{sub.name}</a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default Dropdown;