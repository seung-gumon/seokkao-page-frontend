import Head from "next/head";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../../apolloClient";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import React from "react";
import {Header} from "../../../component/Header";
import {useRouter} from "next/router";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../__generated__/adminFindByIdEpisode";


const ADMIN_FIND_BY_ID_EPISODE = gql`
    query adminFindByIdEpisode($seriesId : Float!, $episodeId : Float!) {
        adminFindByIdEpisode(seriesId :$seriesId, episodeId : $episodeId) {
            id
            episode
            contents
            series {
                name
            }
        }
    }
`


const EpisodeAdmin = () => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const {query: {episodeId, id : seriesId}} = useRouter();

    const {data, loading} = useQuery<adminFindByIdEpisode, adminFindByIdEpisodeVariables>(ADMIN_FIND_BY_ID_EPISODE, {
        skip : !isLoggedIn,
        variables: {
            seriesId: Number(seriesId),
            episodeId: Number(episodeId)
        },
        onCompleted: data => {
            console.log(data);
        }
    })




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


    if(!data) {
        return (
            <NotAccept/>
        )
    }


    return (
        <>
            <Head>
                <title>{data.adminFindByIdEpisode?.series.name} | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
            </section>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                {data.adminFindByIdEpisode?.series.name}
            </section>
        </>
    )
}

export default EpisodeAdmin;
