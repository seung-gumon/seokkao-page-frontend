import {NextPage} from "next";
import Slider from "react-slick";


interface ISlick {

}

function NextArrow(props: any) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, right : "3px", zIndex : 30}}
            onClick={onClick}
        />
    );
}

function PrevArrow(props: any) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, left : "3px", zIndex : 30}}
            onClick={onClick}
        />
    );
}


const Slick :NextPage<ISlick> = ({}) => {
    const settings = {
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

    return (
        <div className={'w-full mt-3'}>
            <Slider {...settings}>
                <div>
                    <h3 className={'w-full bg-red-500'} style={{'height':'200px'}}>1</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-amber-500'} style={{'height':'200px'}}>2</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-pink-500'} style={{'height':'200px'}}>3</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-green-500'} style={{'height':'200px'}}>4</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-blue-500'} style={{'height':'200px'}}>5</h3>
                </div>
                <div>
                    <h3 className={'w-full bg-purple-500'} style={{'height':'200px'}}>6</h3>
                </div>
            </Slider>
        </div>
    );
}

export default Slick