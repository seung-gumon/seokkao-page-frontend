import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import Head from "next/head";
import React, {useEffect} from "react";
import {Header} from "../../../component/Header";
import {ISeries} from "../[id]";
import {authTokenVar, initializeApollo, isLoggedInVar} from "../../../apolloClient";
import {setContext} from "@apollo/client/link/context";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {
    getEpisodeBySeriesIdAndEpisodeId,
    getEpisodeBySeriesIdAndEpisodeIdVariables
} from "../../../__generated__/getEpisodeBySeriesIdAndEpisodeId";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";

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


const UserEpisode: NextPage<IUserEpisode> = ({seriesId,episodeId}) => {

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



    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    if (error || !data) {
        return (
            <NotAccept/>
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
                <section className={'mx-auto w-full bg-white pt-5 px-1.5'}>
                    {
                        data?.getEpisodeBySeriesIdAndEpisodeId?.contents.map((content : string , index) => {
                            return (
                                <img key={index} src={content}
                                 alt={`${data?.getEpisodeBySeriesIdAndEpisodeId?.series.name} ${data?.getEpisodeBySeriesIdAndEpisodeId?.episode}화${index + 1}page`}/>
                            )
                        })
                    }
                </section>
            </section>
        </>
    )
}

export default UserEpisode



export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IUserEpisode>> => {

    const params = context.query;


    return {
        props : {
            seriesId : Number(params.id),
            episodeId : Number(params.episodeId),
        }
    }
}