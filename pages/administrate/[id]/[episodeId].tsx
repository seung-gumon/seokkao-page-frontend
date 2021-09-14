import Head from "next/head";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../../apolloClient";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import React, {useRef, useState} from "react";
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

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    const [novelText,setNovelText] = useState<string>('');


    const writeNovel = (textAreaValue : string) => {
        const canvas = canvasRef.current;
        const imageElem = imageRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');

        }
    }




    const captureToImage = () => {
        const canvas = canvasRef.current;
        const imageElem = imageRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.font = "6px";
                // ctx.canvas.width = ctx?.measureText(novelText).width;
                ctx.fillText(novelText , 0 , 10);

                // ctx.fillText(textAreaValue, 0, 10);
                // ctx.font = "12px"
                // if (imageElem) {
                // imageElem.src = tCtx.canvas.toDataURL();
                // }
            }
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
                        <canvas ref={canvasRef} className={'bg-red-200'} style={{imageRendering: 'pixelated'}}></canvas>
                        <img ref={imageRef}/>
                        <textarea className={'border w-full p-3'} onChange={(e) => setNovelText(e.target.value)} ref={textAreaRef}/>
                        <button className={"bg-blue-300 py-3"} onClick={() => captureToImage()}>저장하기</button>
                    </article>
                </section>
            </section>
        </>
    )
}

export default EpisodeAdmin;
