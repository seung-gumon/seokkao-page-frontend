import {
    NextPage,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
    GetServerSideProps,
    GetServerSidePropsContext, GetServerSidePropsResult
} from "next";
import {Header} from "../component/Header";
import SubHeader from "../component/SubHeader";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import Slick from "../component/Slick";
import 'moment/locale/ko';
import {initializeApollo} from "../apolloClient";
import MiddleCategory from "../component/MiddleCategory";
import OrderContainer from "../component/OrderContainer";
import ContentsContainer from "../component/ContentsContainer";
import AdBanner from "../component/AdBanner";
import CommonListContentsBox from "../component/CommonListContentsBox";

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
                <MiddleCategory/>
                <OrderContainer/>
                <ContentsContainer/>
                <AdBanner/>
                <CommonListContentsBox/>
                <CommonListContentsBox/>
            </div>
        </>
    )
}


export default Index


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IIndex>> => {

    const apolloClient = initializeApollo();


    return {
        props: {
            id: 1
        },
    }
}