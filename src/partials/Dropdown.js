import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Menu.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
      <div className="main-header header-sticky">
        <div className="container">
          <div className="row align-items-center">
            <div className="d-flex  col-xl-12 col-lg-12 col-md-12">
              <div className="main-menu d-none d-lg-block">
                <nav>
                  <ul id="navigation">
                    {menus.result.map(item => (
                      <li key={item.id}>
                        <Link className="pt-4 pb-4" to={'/list/id/' + item.id}> {item.name}</Link>
                        <ul  style={{display:item.subCategories.length>0?"block":"none"}} className="submenu">
                          {item.subCategories.map(sub => (
                            <li key={sub.id} className="hover:bg-gray-200">
                              <Link  to={'/list/id/' + sub.id}>{sub.name}</Link>
                            </li>
                          ))}
                        </ul>

                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-12">
              <div className="mobile_menu d-block d-lg-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dropdown;