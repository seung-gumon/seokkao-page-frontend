import {
    GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult,
    GetStaticProps,
    GetStaticPropsContext, GetStaticPropsResult,
    NextPage
} from "next";
import {initializeApollo} from "../../apolloClient";
import moment from "moment";
import {mainPage, mainPageVariables} from "../../__generated__/mainPage";
import Head from "next/head";
import React from "react";
import {Header} from "../../component/Header";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {addUnit} from "../../public/constants";
import {gql} from "@apollo/client";
import {SERIES_FRAGMENT} from "../../fragments";
import {
    findByIdSeries,
    findByIdSeries_findByIdSeries,
    findByIdSeriesVariables
} from "../../__generated__/findByIdSeries";

interface ISeries {
    series : findByIdSeries_findByIdSeries
}

const FIND_BY_ID_SERIES = gql`
    query findByIdSeries($seriesId : Float!) {
        findByIdSeries(seriesId : $seriesId) {
            ...SeriesParts
            serialization
        } 
    }
    ${SERIES_FRAGMENT}
`

const Series : NextPage<ISeries> = ({series}) => {
    return (
        <>
            <Head>
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'pt-3 flex flex-col w-full'}>
                    <div className={'p-4 bg-white'}>
                        <div className={'flex'}>
                            <div className={'w-2/12 rounded overflow-hidden'}>
                                <img className={'w-full h-auto'} src={series.thumbnail} alt={`${series.name}표지`}/>
                            </div>
                            <div className={'w-10/12 ml-4 flex flex-col flex-1 justify-between'}>
                                <div>
                                    <h2 className={'text-lg font-bold'}>{series.name}</h2>
                                    <div className={'flex items-center text-sm'}>
                                        <FontAwesomeIcon icon={faUser} className={'text-gray-800 mr-1.5'}/>
                                        {addUnit(series.like)}명
                                    </div>
                                </div>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'flex flex-col'}>
                                        <span className={'mt-1.5'}>{series.serialization} | 연재</span>
                                        <span className={'mt-1.5'}>{series.name} 작가님</span>
                                    </div>
                                    <div className={'flex'}>
                                        <button className={'mr-7'}>작품소개</button>
                                        <button>첫편보기</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Series;


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISeries>> => {

    const apolloClient = initializeApollo();

    const {id}: any = context.query;



    const {data} = await apolloClient.query<findByIdSeries, findByIdSeriesVariables>({
        query: FIND_BY_ID_SERIES,
        variables: {
            seriesId: +id
        }
    })

    console.log(data.findByIdSeries)

    return {
        props: {
            series: data.findByIdSeries
        },
    }


}


