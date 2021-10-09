import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import instance from "../https";

import config from '../../src/config'

function Dropdown() {
  const ref = React.useRef()
  const [menus, setMenu] = React.useState({ result: [] });
  useEffect(() => {
    const fetchData = async () => {
      instance.get(
        '/ProductCategory/GetUiList',
      ).then(res => {
        setMenu(res.data);
      })
        .catch(err => {
        })

    };
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="main-header" >
        <div className="container">
          <div className="row align-items-center">
            <div className="d-flex text-center col-xl-12 col-lg-12 col-md-12">
              <div className="main-menu d-none d-lg-block">
                <nav>
                  <ul id="navigation">
                    {menus.result.map(item => (
                      <li key={item.id} className="hover:text-red-600">
                        <div className="flex items-center text-gray-500 group ">
                          <Link className="pt-4 pb-4 text-sm font-sans flex" to={'/list/' + item.id}> {item.name}
                          {item.subCategories.length > 0?(
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-hover:down group-hover:down2 down" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          ):null}
                          </Link>
                        
                          
                        </div>

                        <ul style={{ display: item.subCategories.length > 0 ? "block" : "none" }} className="submenu p-0">
                          {item.subCategories.map(sub => (
                            <li key={sub.id} className="hover:bg-gray-200  group ">
                              <Link to={'/list/' + sub.id}>{sub.name}</Link>
                            </li>
                          ))}
                        </ul>

                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dropdown;