import React from 'react';
import Layout from "../partials/Layout";
import store from "../store/index"

// import Header from '../partials/Header';
// import Menu from '../partials/Dropdown';
// import Footer from '../partials/Footer';

import HeroHome from '../partials/HeroHome';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <>
      <Layout>
        <HeroHome />
        <FeaturesBlocks />
      </Layout>
      </>
    </div>
  );
}

export default Home;