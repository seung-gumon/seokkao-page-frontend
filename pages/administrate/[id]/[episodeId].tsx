import Head from "next/head";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../../apolloClient";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import React, {useRef, useState} from "react";
import {Header} from "../../../component/Header";
import {useRouter} from "next/router";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../__generated__/adminFindByIdEpisode";
import html2canvas from "@nidi/html2canvas";


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


    const {query: {episodeId, id: seriesId}} = useRouter();

    const {data, loading} = useQuery<adminFindByIdEpisode, adminFindByIdEpisodeVariables>(ADMIN_FIND_BY_ID_EPISODE, {
        skip: !isLoggedIn,
        variables: {
            seriesId: Number(seriesId),
            episodeId: Number(episodeId)
        },
        onCompleted: data => {
            console.log(data.adminFindByIdEpisode);
        }
    })



    const [imageList , setImageList] = useState<string[]>([]);


    const captureToImage = async () => {
        const textarea = document.getElementById("target");

        if (textarea) {
            textarea.style.width = '720px';
            textarea.style.height = '1097px';

            await html2canvas(textarea).then((canvas) => {
                const img = canvas.toDataURL();
                setImageList((prev) => [...prev, img]);
                textarea.style.height = "";
            });

            textarea.style.width = '100%';
            textarea.style.height = '187px';
        }
    }



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


    if (!data?.adminFindByIdEpisode) {
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
                <section className={'mx-auto w-full bg-white pt-5 px-1.5'} style={{'maxWidth': '950px'}}>
                    <h2 className={'text-md lg:text-xl text-gray-600'}>{data.adminFindByIdEpisode?.series.name} {data.adminFindByIdEpisode.episode}화</h2>

                    <article className={'flex flex-col bg-white w-full text-gray-600'}>
                        <h6 className={'py-3 '}>텍스트 편집기</h6>
                        <textarea rows={16} cols={12} className={'border w-full p-3 whitespace-pre-wrap break-all'} style={{'fontSize':'25px','height':'187px','padding':'85px','lineHeight':'63px'}} id={'target'}/>
                        <button className={"bg-blue-300 py-3"} onClick={() => captureToImage()}>저장하기</button>
                    </article>

                    <article className={'flex w-full'}>
                        {
                            imageList.map((image,index) => {
                                return (
                                    <div className={'w-1/6 border'}>
                                        <img key={index} src={image} style={{'width':'720px','height':'auto'}}/>
                                    </div>
                                    )
                            })
                        }
                    </article>

                </section>
            </section>
        </>
    )
}

export default EpisodeAdmin;
