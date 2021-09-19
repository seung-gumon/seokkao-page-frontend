import Head from "next/head";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../../apolloClient";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import React, {useEffect, useRef, useState} from "react";
import {Header} from "../../../component/Header";
import {useRouter} from "next/router";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../__generated__/adminFindByIdEpisode";
import html2canvas from "@nidi/html2canvas";



interface IImages {
    src : string,
    seq : number
}


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
        // onCompleted: data => {
        //     console.log(data.adminFindByIdEpisode);
        // }
    })



    const [imageList , setImageList] = useState<IImages[]>([]);


    const convertToFileAndUploadFile = async (base64String: string) => {
        try {
            const imageFile = await fetch(base64String)
                .then(res => res.blob())
                .then(blob => {
                    const convertFile = new File([blob], "imageFile", {type: "image/png"});
                    return convertFile
                });

            const formBody = new FormData();


            formBody.append('file', imageFile);

            const {image:url} = await (await fetch("http://localhost:5000/uploads/", {
                method: "POST",
                body: formBody
            })).json();
            return url;
        } catch {
            return alert("이미지를 올릴 수 없습니다");
        }
    }


    const captureToImage = async () => {
        const textarea = document.getElementById("target");
        if (textarea) {
            textarea.style.width = '720px';
            textarea.style.height = '1097px';
            await html2canvas(textarea).then(async (canvas) => {
                const img = canvas.toDataURL();
                textarea.style.width = '100%';
                textarea.style.height = '187px';
                const imgSrc = await convertToFileAndUploadFile(img);
                setImageList((prev) => [...prev, {src: imgSrc, seq: imageList.length + 1}]);
            });

        }
    }



    const deleteImage = (index : number) => {
        const deleteImage = imageList.filter((image,filterIndex) => filterIndex !== index);
        setImageList(deleteImage);
    }


    const changeSeq = (seq: number, imageSrc: string) => {
        const newImageArr = imageList.map((image, mapIndex) => {
            if (image.src === imageSrc) {
                return {
                    ...image,
                    seq
                }
            } else {
                return image
            }
        });
        setImageList(newImageArr)
    }


    const sortImage = () => {
        const newArr = imageList.sort((a,b) => {
            if ( a.seq < b.seq ){
                return -1;
            }
            if ( a.seq > b.seq ){
                return 1;
            }
            return 0;
        });
        setImageList(() => newArr);
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
                        <h6 className={'py-3'}>텍스트 편집기</h6>
                        <textarea rows={16} cols={12} className={'border w-full p-3 whitespace-pre-wrap break-all'}
                                  style={{
                                      'fontSize': '25px',
                                      'height': '187px',
                                      'padding': '85px',
                                      'lineHeight': '63px'
                                  }} id={'target'}/>
                        <button className={"bg-yellow-300 hover:bg-yellow-400 py-3 my-3 w-full rounded mx-auto"}
                                onClick={() => captureToImage()}>이미지 저장하기
                        </button>
                    </article>


                    <article className={'flex w-full flex-wrap items-center py-4'}>
                        {
                            imageList.map((image, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={'w-1/6 mx-1.5 mt-1.5 flex flex-col items-center'}>
                                            <img className={'border '} src={image.src}
                                                 style={{'width': '720px', 'height': 'auto'}}/>
                                            <button
                                                className={'bg-rose-500 hover:bg-rose-700 mt-1 py-1 text-xs w-4/6 mx-auto rounded text-white'}
                                                onClick={() => deleteImage(index)}>
                                                삭제
                                            </button>
                                            <input onChange={(e) => changeSeq(Number(e.target.value), image.src)}
                                                   value={image.seq} placeholder={'이미지 순서'} type="number" min={0}
                                                   className="pl-2 text-center text-md border rounded mt-1 placeholder-blue w-4/6 p-0 no-outline text-dusty-blue-darker"/>
                                        </div>

                                    </React.Fragment>

                                )
                            })
                        }
                    </article>
                </section>
                <section className={'w-full'}>
                    <button className={'w-3/6 bg-blue-300 py-2 rounded hover:bg-blue-500'} onClick={() => sortImage()}>이미지 재배열 하기</button>
                    <button className={'w-3/6 bg-lime-300 py-2 rounded hover:bg-lime-500'}>수정하기</button>
                </section>
            </section>

        </>
    )
}

export default EpisodeAdmin;
