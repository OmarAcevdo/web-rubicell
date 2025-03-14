import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
            <div>
                <img src="banner1.jpg" alt="" className="w-full h-[20rem] md:h-[30rem] lg:h-[40rem]"/>
            </div>
            <div>
                <img src="banner2.jpg" alt="" className="w-full h-[20rem] md:h-[30rem] lg:h-[40rem]"/>
            </div>
            <div>
                <img src="banner3.jpg" alt="" className="w-full h-[20rem] md:h-[30rem] lg:h-[40rem]"/>
            </div>
            <div>
                <img src="banner4.png" alt="" className="w-full h-[20rem] md:h-[30rem] lg:h-[40rem]"/>
            </div>
            <div>
                <img src="banner5.jpg" alt="" className="w-full h-[20rem] md:h-[30rem] lg:h-[40rem]"/>
            </div>
        </Slider>
    );
}
 


export default Carousel