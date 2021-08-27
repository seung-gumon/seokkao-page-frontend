import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {NextPage} from "next";



interface IOrderContainer {
    today : string,
    setToday : Function,
    genre : string,
    setGenre : Function
}

const OrderContainer : NextPage<IOrderContainer> =
    ({
        today,
        setToday,
        genre,
        setGenre
     }) => {






    useEffect(() => {
        const today = moment().format('dddd');
        setToday(today);
    },[])

    return (
        <div className={'w-full bg-white p-2 bg-white my-2 mb-0'}>
            <ul className={'flex items-center md:justify-center my-2 ml-2'}>
                <li className={'text-sm mr-4 cursor-pointer' + (genre === "Cartoon" ? ' text-gray-800' : ' text-gray-300')} onClick={() => setGenre("Cartoon")}>웹툰
                    <FontAwesomeIcon icon={faClock} className={'text-grey-300 text-sm ml-1'}/>
                </li>
                <li className={'text-sm cursor-pointer' + (genre === "Novel" ? ' text-gray-800' : ' text-gray-300')} onClick={() => setGenre("Novel")}>웹소설
                    <FontAwesomeIcon icon={faClock} className={'text-grey-300 text-sm ml-1'}/>
                </li>
            </ul>
            <ul className={'flex items-center'}>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "월요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('월요일')}>월</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "화요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('화요일')}>화</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "수요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('수요일')}>수</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "목요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('목요일')}>목</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "금요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('금요일')}>금</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "토요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('토요일')}>토</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "일요일" ? ' border-amber-400' : ' border-gray-200')} onClick={() => setToday('일요일')}>일</li>
                <li className={'text-sm flex-1 text-center border-b-4 border-gray-200' + (today === "complete" ? ' border-amber-400' : ' border-gray-200')}
                    onClick={() => setToday('complete')}>완결
                </li>
            </ul>
        </div>
    )
}

export default OrderContainer