import {NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {Header} from "../component/Header";
import SubHeader from "../component/SubHeader";
import Head from "next/head";
import React from "react";
import Slick from "../component/Slick";


interface IIndex {
    id: number
}


const Index: NextPage<IIndex> = () => {

    // const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    return (
        <>
            <Head>
                <title>홈 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>
                <Header/>
                <SubHeader/>
                <Slick/>
                <div className={'w-full bg-white p-2 bg-white my-2'}>
                    <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-1">
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>1</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>2</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>3</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>4</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>5</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>6</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>7</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>8</div>
                        <div className={'bg-purple-500 rounded-md h-7 flex items-center justify-center text-white text-sm font-extrabold'}>9</div>
                    </div>
                </div>

                <div className={'w-full bg-white p-2 bg-white my-2'}>
                    <ul className={'flex items-center my-2'}>
                        <li className={'text-sm mr-4'}>웹툰</li>
                        <li className={'text-sm'}>웹소설</li>
                    </ul>
                    <ul className={'flex items-center'}>
                        <li className={'text-sm flex-1'}>일</li>
                        <li className={'text-sm flex-1'}>월</li>
                        <li className={'text-sm flex-1'}>화</li>
                        <li className={'text-sm flex-1'}>수</li>
                        <li className={'text-sm flex-1'}>목</li>
                        <li className={'text-sm flex-1'}>금</li>
                        <li className={'text-sm flex-1'}>토</li>
                        <li className={'text-sm flex-1'}>일</li>
                        <li className={'text-sm flex-1'}>완결</li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default Index


// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IIndex>> => {
//
//     const apolloClient = initializeApollo()
//
//
//     return {
//         props: {
//             id: 1
//         },
//         revalidate: 10000000 //주기 몇초로 할거임 ?
//     }
// }