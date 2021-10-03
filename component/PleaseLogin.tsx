import {NextPage} from "next";
import {Header} from "./Header";
import React from "react";
import {useRouter} from "next/router";



const PleaseLogin : NextPage = () => {

    const router = useRouter();

    const removeLoginToken = () => {
        localStorage.removeItem('login-token');
        return router.push("/login");
    }

    return (
        <>
            <div className={'flex flex-col h-screen w-full mx-auto'} style={{'maxWidth': '950px'}}>
                <Header/>
                <div className={'w-full h-full flex items-center justify-center'}>
                    <button onClick={removeLoginToken} className={'bg-amber-300 px-3 py-2 cursor-pointer'}>로그인이 필요합니다</button>
                </div>
            </div>
        </>
    )
}

export default PleaseLogin;