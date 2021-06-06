import React from 'react';

function FeaturesBlocks() {
  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-white pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative mx-auto ">
        <div className="">

          {/* Section header */}
          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="">
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_1.png?v=1338" alt="Testimonial 01" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Tư Vấn Báo Giá In</h4>
            </div>

            {/* 2nd item */}
            <div className="-xl">
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_2.png?v=1338" alt="Testimonial 01" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Tham Khảo Mẫu In</h4>
            </div>

            {/* 3rd item */}
            <div className="">
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_3.png?v=1338" alt="Testimonial 01" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Mẫu In</h4>
            </div>

            {/* 4th item */}
            <div className="">
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_4.png?v=1338" alt="Testimonial 01" />

              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Chủ đề</h4>
            </div>

            {/* 5th item */}
            <div className="">
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_5.png?v=1338" alt="Testimonial 01" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Trang trí</h4>
            </div>

            {/* 6th item */}
            <div className="">  
              <img className="relative flex flex-col items-center bg-white shadow-xl w-full " src="//theme.hstatic.net/1000090040/1000663762/14/home_sec1_img_6.png?v=1338" alt="Testimonial 01" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">Phụ kiện</h4>
            </div>

          </div>

        </div>
      </div>
    
          
    </section>
  );
}

export default FeaturesBlocks;
