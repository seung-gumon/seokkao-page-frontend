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
import React, {useState} from "react";
import {Header} from "../../component/Header";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser , faComment} from "@fortawesome/free-solid-svg-icons";
import {addComma, addUnit} from "../../public/constants";
import {gql} from "@apollo/client";
import {SERIES_FRAGMENT} from "../../fragments";
import {
    findByIdSeries,
    findByIdSeries_findByIdSeries, findByIdSeries_findByIdSeries_episode,
    findByIdSeriesVariables
} from "../../__generated__/findByIdSeries";

interface ISeries {
    series : findByIdSeries_findByIdSeries
    episodeLength : number
}

const FIND_BY_ID_SERIES = gql`
    query findByIdSeries($seriesId : Float!) {
        findByIdSeries(seriesId : $seriesId) {
            ...SeriesParts
            serialization
            episode {
                episode
                createdAt
            }
            writer {
                name
            }
        } 
    }
    ${SERIES_FRAGMENT}
`

const Series : NextPage<ISeries> = ({series,episodeLength}) => {


    const [episodes , setEpisodes] = useState<findByIdSeries_findByIdSeries_episode[]>(series.episode);

    const changeOrderBy = () => {
        const reverseEpisodes = episodes.reverse();
        setEpisodes(() => [...reverseEpisodes]);
    }

    return (
        <>
            <Head>
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
            </section>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <article className={'pt-3 flex flex-col w-full'}>
                    <div className={'p-4 bg-white'}>
                        <div className={'flex'}>
                            <div className={'h-36 w-4/12 md:h-52 md:w-3/12 bg-center bg-cover rounded overflow-hidden'} style={{'backgroundImage' : `url(${series.thumbnail})`}}>
                            </div>
                            <div className={'w-10/12 ml-4 flex flex-col flex-1 justify-between'}>
                                <div>
                                    <h2 className={'text-sm font-base md:text-lg md:font-bold'}>{series.name}</h2>
                                    <div className={'flex items-center text-sm mt-1 md:text-lg'}>
                                        <FontAwesomeIcon icon={faUser} className={'text-gray-800 mr-0.5 text-xs fa-sm'}/>
                                        <span className={'text-xs'}>{addUnit(series.like)}명</span>
                                    </div>
                                </div>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'flex flex-col'}>
                                        <span className={'mt-1.5 text-xs md:text-sm tracking-tighter'}>{series.serialization} | 연재</span>
                                        <span className={'mt-1.5 text-xs md:text-sm'}>{series.writer.name} 작가</span>
                                    </div>
                                    <div className={'flex'}>
                                        <button className={'text-xs px-2 py-1 border-solid border rounded text-gray-500 border-gray-300 md:text-md md:border-1'}>작품소개</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <article className={'w-full my-2 md:py-2 py-2 px-4 bg-white flex items-center'}>
                    <div className={'p-1 rounded-full flex items-center justify-center bg-blue-500'}>
                        <FontAwesomeIcon icon={faComment} className={'text-white text-xs fa-xs mx-auto'}/>
                    </div>
                    <span className={'ml-1.5 md:ml-3 text-sm font-bold'}>{addComma(series.like)} 명이 보는 중</span>
                </article>
                <article className={'w-full flex items-center mb-2'}>
                    <button className={'bg-yellow-300 w-full mx-2 md:mx-0 py-3'}>첫편보기</button>
                </article>

            </section>

            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <article className={'w-full my-2 md:py-3 py-2 px-4 bg-white border-b border-gray-200'}>
                    <div className={'w-full pt-1 pb-4 flex items-center justify-between'}>
                        <span className={'text-gray-500 text-sm md:text-sm체'}>전체 ({episodeLength})</span>
                        <select className={'text-gray-500 text-xs md:text-sm'} onChange={(e) => changeOrderBy(e.target.value)}>
                            <option value={'early'}>첫편부터</option>
                            <option value={'latest'}>최신순</option>
                        </select>
                    </div>
                    {
                        episodes.map((episode) => {
                            return (
                                <div className={'flex items-center mt-1.5'} key={episode.episode}>
                                    <div
                                        className={'h-16 w-2/12 md:h-16 md:w-1/12 bg-cover bg-center rounded overflow-hidden'}
                                        style={{'backgroundImage': `url(${series.thumbnail})`}}/>
                                    <div className={'flex flex-col text-xs ml-2'}>
                                        <h4>{series.name} - {episode.episode}화</h4>
                                        <span className={'mt-0.5'}>{moment(episode.createdAt).format('YYYY.MM.DD')}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </article>
            </section>
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


    return {
        props: {
            series: data.findByIdSeries,
            episodeLength : data.findByIdSeries.episode.length
        },
    }


}


