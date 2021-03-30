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
    <div className="container max-w-6xl mx-auto px-5 sm:px-6 mt-20 flex">
      <Dropdown title="Select movie" className="w-auto shadow-xs border-gray-400 border-2 "  />
    </div>
     </section>
     
    </>
  );
}