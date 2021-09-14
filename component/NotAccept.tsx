import {NextPage} from "next";
import {Header} from "./Header";
import React from "react";


const NotAccept : NextPage = () => {
    return (
        <>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'flex flex-col h-screen'}>
                    <div className={'w-full h-full flex items-center justify-center'}>
                        <button className={'px-3 py-2 cursor-pointer'}>잘못된 접근입니다.</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotAccept;