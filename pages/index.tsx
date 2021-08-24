import {
    NextPage,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
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
import {gql,useQuery} from "@apollo/client";
import {meQuery} from "../__generated__/meQuery";
import {ME_QUERY} from "./me";
import {SERIES_FRAGMENT} from "../fragments";
import {mainPage} from "../__generated__/mainPage";


interface IIndex {
    mainPageData : mainPage
}




const MainPageQuery = gql`
    query mainPage {
        mainBanner {
            ...SeriesParts
        }
    }
    ${SERIES_FRAGMENT}
`


const Index: NextPage<IIndex> = ({mainPageData}) => {




    useQuery<meQuery>(ME_QUERY , {
        onError : error => {
            if (error) {
                localStorage.removeItem('login-token');
            }
        }
    });


    return (
        <>
            <Head>
                <title>홈 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>
                <Header/>
                <SubHeader/>
                <Slick
                    mainBanner={mainPageData.mainBanner}
                />
                <MiddleCategory/>
                <OrderContainer/>
                <ContentsContainer/>
                <AdBanner/>
                <CommonListContentsBox
                    title={'기다리면 무료 웹툰'}
                />
                <CommonListContentsBox
                    title={'인기 웹툰'}
                />
                <CommonListContentsBox
                    title={'기다리면 무료 소설'}
                />
                <CommonListContentsBox
                    title={'인기 소설'}
                />
            </div>
        </>
    )
}


export default Index


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IIndex>> => {

    const apolloClient = initializeApollo();

    const {data} = await apolloClient.query<mainPage>({
        query: MainPageQuery,
    });




    return {
        props: {
            mainPageData : data
        },
        revalidate : 40000
    }
}