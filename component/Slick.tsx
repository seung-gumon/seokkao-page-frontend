import {NextPage} from "next";
import React from "react";
import Slider from "react-slick";
import {mainPage_mainBanner} from "../__generated__/mainPage";
import Link from "next/link";

interface ISlick {
    mainBanner: mainPage_mainBanner[]
}

const NextArrow = (props: any) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, right: "3px", zIndex: 30}}
            onClick={onClick}
        />
    );
}

const PrevArrow = (props: any) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, left: "3px", zIndex: 30}}
            onClick={onClick}
        />
    );
}

export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>,
    autoplay: true,
    autoplaySpeed: 4000
};


const Slick: NextPage<ISlick> =
    ({
         mainBanner
     }) => {


        return (
            <div className={'w-full mt-3'}>
                <Slider {...settings}>
                    {mainBanner.map((banner) => {
                        return (
                            <React.Fragment key={banner.id}>
                                <Link href={`/series/${banner.id}`}>
                                    <a>
                                        <div
                                            className={'mainBannerInnerShadow w-full bg-center h-72 relative w-full bg-gray-400 flex items-center justify-center flex-column bg-contain'}
                                            style={{backgroundImage: `url(${banner.thumbnail})`}}
                                        >
                                            <div className={'absolute z-30 bottom-0 text-2xl left-0 px-3 pb-3 text-white'}>
                                                <h6>{banner.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </Link>

                                <div>
                                    <p className={'bg-yellow-400 px-3 py-1.5 text-xs md:text-lg text-white font-normal text-center w-full whitespace-nowrap overflow-hidden overflow-ellipsis'}>{banner.description}</p>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </Slider>
            </div>
        );
    }

export default Slick;