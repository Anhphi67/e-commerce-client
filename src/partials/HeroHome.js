import React, { useState } from 'react';
import { Carousel } from 'react-carousel-minimal';

function HeroHome() {

  const data = [
    {
      image: "https://api.pichistudio.vn/images/Slide_1.png",
      caption: ""
    },
    {
      image: "https://api.pichistudio.vn/images/Slide_2.png",
      caption: ""

    },
    {
      image: "https://api.pichistudio.vn/images/Slide_3.png",
      caption: ""
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <div>
          <Carousel
            data={data}
            time={5000}
            width="100%"
            height="400px"
            captionStyle={captionStyle}
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "100%",
              maxHeight: "400px",
              margin: "0px auto 20px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}


export default HeroHome;