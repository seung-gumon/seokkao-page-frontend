import {NextPage} from "next";
import Slider from "react-slick";
import {mainPage_mainBanner} from "../__generated__/mainPage";


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
                            <>
                                <div
                                    className={'mainBannerInnerShadow relative w-full bg-gray-400 flex items-center justify-center flex-column bg-contain'}
                                    style={{backgroundImage: `url(${banner.thumbnail})`}}>
                                    <img src={banner.thumbnail} alt={banner.name}/>
                                    <div className={'absolute z-30 bottom-0 text-2xl left-0 px-3 pb-3 text-white'}>
                                        <h6>{banner.name}</h6>
                                    </div>
                                </div>
                                <div>
                                    <p className={'bg-yellow-400 px-3 py-1.5 text-white font-normal text-center w-full whitespace-nowrap overflow-hidden overflow-ellipsis'}>{banner.description}</p>
                                </div>
                            </>
                        )
                    })}
                </Slider>
            </div>
        );
    }

export default Slick