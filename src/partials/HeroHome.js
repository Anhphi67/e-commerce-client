import React, { useState } from 'react';
import Modal from '../utils/Modal';

function HeroHome() {

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative">
      <div className=" mx-auto">
        <div className="pt-1 pb-12 md:pt-1 ">
          <div className="text-center ">
            <img className="relative w-full h-fit " src="https://theme.hstatic.net/1000090040/1000663762/14/slide2.png?v=1338" alt="Testimonial 01" />
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroHome;