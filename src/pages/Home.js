import React from 'react';

import Header from '../partials/Header';
import Menu from '../partials/Dropdown';
import HeroHome from '../partials/HeroHome';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
       <Header/>

      {/*  Page content */}
      <main className="flex-grow mt-20  mx-auto px-5 sm:px-6">
        

        {/*  Page sections */}
       <Menu/>

        <HeroHome />
        {/* <FeaturesHome /> */}
        <FeaturesBlocks />
        {/* <Testimonials /> */}
        {/* <Newsletter /> */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;