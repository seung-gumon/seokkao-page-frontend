import {NextPage} from "next";
import {Header} from "../component/Header";
import React from "react";


const Custom500: NextPage = () => {
    return (
        <>
            <Header/>
            <div className={'flex flex-col h-screen'}>
                <div className={'w-full h-full flex items-center justify-center'}>
                    <button className={'px-3 py-2 cursor-pointer'}>잘못된 접근입니다.</button>
                </div>
            </div>
        </>
    )
}

export default Custom500;