import React from "react";


const MiddleCategory = () => {

    const addRest = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <div className={'w-full bg-white p-2 bg-white my-2 text-xs'}>
            <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-1">
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-2 flex items-center justify-center text-white text-sm font-extrabold'}>
                    <span className={'text-blueGray-700 text-xs md:text-md font-medium'}>오늘 신작</span>
                    <span
                        className={'text-blueGray-700 ml-1 rounded-full px-1.5 py-0.5 flex items-center text-xs md:text-md font-medium justify-center bg-amber-400 text-center'}
                        >{addRest(3000)}</span>
                </div>
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-1.5 flex items-center justify-center text-white text-xs md:text-md font-extrabold'}>
                    <span className={'text-blueGray-700 text-md font-medium'}>오늘 UP</span>
                    <span
                        className={'text-blueGray-700 ml-1 rounded-full px-1.5 py-0.5 flex items-center text-xs md:text-md font-medium justify-center bg-amber-400 text-center'}
                    >{addRest(3000)}</span>
                </div>
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-1.5 flex items-center justify-center text-white text-xs md:text-md font-extrabold'}>
                    <span className={'text-blueGray-700 text-md font-medium'}>오늘 랭킹</span>
                    <span
                        className={'text-blueGray-700 ml-1 rounded-full px-1.5 py-0.5 flex items-center text-xs md:text-md font-medium justify-center bg-amber-400 text-center'}
                    >{addRest(3000)}</span>
                </div>
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-1.5 flex items-center justify-center text-white text-xs md:text-md font-extrabold'}>
                    <span className={'text-blueGray-700 text-md font-medium'}>웹툰</span>
                    <span
                        className={'text-blueGray-700 ml-1 rounded-full px-1.5 py-0.5 flex items-center text-xs md:text-md font-medium justify-center bg-amber-400 text-center'}
                    >{addRest(3000)}</span>
                </div>
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-1.5 flex items-center justify-center text-white text-xs md:text-md font-extrabold'}>
                    <span className={'text-blueGray-700 text-md font-medium'}>소설</span>
                    <span
                        className={'text-blueGray-700 ml-1 rounded-full px-1.5 py-0.5 flex items-center text-xs md:text-md font-medium justify-center bg-amber-400 text-center'}
                    >{addRest(3000)}</span>
                </div>
                <div className={'bg-blueGray-200 bg-opacity-80 rounded-md py-1.5 flex items-center justify-center text-white text-xs md:text-md font-extrabold'}>
                    <span className={'text-blueGray-700 text-md font-medium'}>강력추천!</span>
                </div>
            </div>
        </div>
    )
}

export default MiddleCategory