import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default function Menu({ fixed }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <>
     <section className="relative">
     <div className="flex flex-wrap mt-20 max-w-6xl mx-auto  sm:px-2">
        <div className="w-full px-4">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-400 rounded">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                    
                    <Link to="/list" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">In theo yêu cầu</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Dán gì 
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Sticker
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Pin Sticker
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Discover
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list"
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
     </section>
     
    </>
  );
}