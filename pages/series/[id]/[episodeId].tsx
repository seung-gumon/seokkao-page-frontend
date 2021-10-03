import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {Header} from "../../../component/Header";
import {isLoggedInVar} from "../../../apolloClient";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {
    getEpisodeBySeriesIdAndEpisodeId,
    getEpisodeBySeriesIdAndEpisodeIdVariables
} from "../../../__generated__/getEpisodeBySeriesIdAndEpisodeId";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import HTMLFlipBook from 'react-pageflip';


interface IUserEpisode {
    seriesId : number
    episodeId : number
}


export const EPISODE_DATA = gql`
    query getEpisodeBySeriesIdAndEpisodeId($seriesEpisodeIdsInput : seriesEpisodeIdsInput!) {
        getEpisodeBySeriesIdAndEpisodeId(seriesEpisodeIdsInput : $seriesEpisodeIdsInput) {
            episode
            contents
            series {
                name
            }
        }
    }
`


const UserNovelEpisode: NextPage<IUserEpisode> = ({seriesId,episodeId}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

    const {
        data,
        loading,
        error
    } = useQuery<getEpisodeBySeriesIdAndEpisodeId, getEpisodeBySeriesIdAndEpisodeIdVariables>(EPISODE_DATA, {
        skip: !isLoggedIn,
        variables: {
            seriesEpisodeIdsInput: {
                seriesId,
                episodeId
            }
        }
    });

    const [page , setPage] = useState<number>(1);
    const [totalPage , setTotalPage] = useState<number>(0);

    const onPage = (e: any) => {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth >= 768) {
            const currentPage: number = e.data;
            return setPage(currentPage);
        } else {
            const currentPage: number = e.data;
            return setPage(currentPage + 1);
        }
    }

    useEffect(() => {
        if (data?.getEpisodeBySeriesIdAndEpisodeId) {
            const clientWidth = document.documentElement.clientWidth;
            if (clientWidth >= 768) {
                return setTotalPage(data?.getEpisodeBySeriesIdAndEpisodeId?.contents.length / 2);
            } else {
                return setTotalPage(data?.getEpisodeBySeriesIdAndEpisodeId?.contents.length / 1);
            }
        }
    }, [data])


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    if (loading) {
        return (
            <>
                <Header/>
                <div className={'flex flex-col h-screen'}>
                    <div className={'w-full h-full flex items-center justify-center'}>
                        Loading...
                    </div>
                </div>
            </>
        )
    }


    if (error || !data?.getEpisodeBySeriesIdAndEpisodeId) {
        return (
            <NotAccept/>
        )
    }





    return (
        <>
            <Head>
                <title>
                    {
                        !data ? "석카오 페이지" : `${data?.getEpisodeBySeriesIdAndEpisodeId?.series.name} ${data?.getEpisodeBySeriesIdAndEpisodeId?.episode}화 | 석카오페이지`
                    }
                </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
                <section className={'mx-auto w-full bg-white'}>
                    <HTMLFlipBook
                        width={720}
                        height={1097}
                        size="stretch"
                        minWidth={315}
                        maxWidth={1000}
                        minHeight={400}
                        maxHeight={1533}
                        maxShadowOpacity={0.1}
                        mobileScrollSupport={true}
                        onFlip={onPage}
                    >
                        {
                            data?.getEpisodeBySeriesIdAndEpisodeId?.contents.map((content: string, index) => {
                                const imgAlt = `${data?.getEpisodeBySeriesIdAndEpisodeId?.series.name} ${data?.getEpisodeBySeriesIdAndEpisodeId?.episode}화${index + 1}page`
                                return (
                                    <img src={content}  key={index} alt={imgAlt}/>
                                )
                            })
                        }
                    </HTMLFlipBook>
                    <div className='flex items-center justify-center py-1.5 text-gray-500'>
                        [<span>{page} </span> 페이지 <span className={'mx-1.5'}>/</span><span>총 {totalPage}페이지</span>]
                    </div>
                </section>
            </section>
        </>
    )
}

export default UserNovelEpisode



export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IUserEpisode>> => {

    const params = context.query;


    return {
        props : {
            seriesId : Number(params.id),
            episodeId : Number(params.episodeId),
        }
    }
}