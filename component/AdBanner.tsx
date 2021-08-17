import {NextPage} from "next";
import Slider from "react-slick";


interface ISlick {

}

const NextArrow = (props: any) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, right : "3px", zIndex : 30}}
            onClick={onClick}
        />
    );
}

const PrevArrow = (props: any) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, left : "3px", zIndex : 30}}
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
    prevArrow : <PrevArrow/>,
    nextArrow : <NextArrow/>,
    autoplay: true,
    autoplaySpeed: 4000
};


const AdBanner :NextPage<ISlick> = ({}) => {


    return (
        <div className={'w-full my-2 px-7 py-2 bg-white'}>
            <Slider {...settings}>
                <div>
                    <h3 className={'w-full bg-red-500'} style={{'height':'100px'}}>1</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-amber-500'} style={{'height':'100px'}}>2</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-pink-500'} style={{'height':'100px'}}>3</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-green-500'} style={{'height':'100px'}}>4</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-blue-500'} style={{'height':'100px'}}>5</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-purple-500'} style={{'height':'100px'}}>6</h3>
                </div>
            </Slider>
        </div>
    );
}

export default AdBanner