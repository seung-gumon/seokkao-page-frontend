import {
    NextPage,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
} from "next";
import {Header} from "../component/Header";
import SubHeader from "../component/SubHeader";
import Head from "next/head";
import React, {useState} from "react";
import Slick from "../component/Slick";
import 'moment/locale/ko';
import {initializeApollo} from "../apolloClient";
import MiddleCategory from "../component/MiddleCategory";
import OrderContainer from "../component/OrderContainer";
import ContentsContainer from "../component/ContentsContainer";
import AdBanner from "../component/AdBanner";
import CommonListContentsBox from "../component/CommonListContentsBox";
import {gql, useQuery} from "@apollo/client";
import {meQuery} from "../__generated__/meQuery";
import {ME_QUERY} from "./me";
import {SERIES_FRAGMENT} from "../fragments";
import {mainPage, mainPageVariables} from "../__generated__/mainPage";
import moment from "moment";


interface IIndex {
    mainPageData: mainPage
    current : string
}


export const MAIN_PAGE_QUERY = gql`
    query mainPage($today : String!) {
        mainBanner {
            ...SeriesParts
        }
        orderByPopular(today : $today) {
            cartoon {
                ...SeriesParts
                writer {
                    name
                }
            }
            novel {
                ...SeriesParts
                writer {
                    name
                }
            }
        }
    }
    ${SERIES_FRAGMENT}
`


const Index: NextPage<IIndex> = ({mainPageData}) => {


    useQuery<meQuery>(ME_QUERY, {
        onError: error => {
            if (error) {
                localStorage.removeItem('login-token');
            }
        }
    });


    const [today, setToday] = useState<string>('');
    const [genre, setGenre] = useState<string>("Novel");

    return (
        <>
            <Head>
                <title>홈 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '950px'}}>
                <Header/>
                <SubHeader/>
                <Slick
                    mainBanner={mainPageData.mainBanner}
                />
                {/*<MiddleCategory/>*/}
                <OrderContainer
                    today={today}
                    setToday={setToday}
                    genre={genre}
                    setGenre={setGenre}
                />
                <ContentsContainer
                    today={today}
                    genre={genre}

                />
                {/*<AdBanner/>*/}
                {/*<CommonListContentsBox*/}
                {/*    title={'인기 웹툰'}*/}
                {/*    fetchData={mainPageData.orderByPopular.cartoon}*/}
                {/*/>*/}
                {/*<CommonListContentsBox*/}
                {/*    title={'인기 소설'}*/}
                {/*    fetchData={mainPageData.orderByPopular.novel}*/}
                {/*/>*/}
            </div>
        </>
    )
}


export default Index


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IIndex>> => {

    const apolloClient = initializeApollo();
    const today = moment().format('dddd');


    const {data} = await apolloClient.query<mainPage,mainPageVariables>({
        query: MAIN_PAGE_QUERY,
        variables: {
            today : today
        }
    });

    const current = new Date();

    return {
        props: {
            mainPageData: data,
            current : String(current)
        },
        revalidate: 40000
    }
}