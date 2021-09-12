import React from 'react';
import Layout from "../partials/Layout";
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import OrtherBlock1 from '../partials/OrtherBlock/OrtherBlock1';

function Home() {
  return (
    <div>
      <>
      <Layout>
        <div className="md:block hidden">
          <HeroHome />
        </div>
        <FeaturesBlocks />
        <OrtherBlock1 />
      </Layout>
      </>
    </div>
  );
}

export default Home;