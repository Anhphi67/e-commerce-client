import React from 'react';
import Layout from "../partials/Layout";
import HeroHome from '../partials/HeroHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import OrtherBlock1 from '../partials/OrtherBlock/OrtherBlock1';
function Home() {
  return (
    <div className="px-24 flex flex-col min-h-screen overflow-hidden">
      <>
      <Layout>
        <HeroHome />
        <FeaturesBlocks />
        <OrtherBlock1 />
      </Layout>
      </>
    </div>
  );
}

export default Home;