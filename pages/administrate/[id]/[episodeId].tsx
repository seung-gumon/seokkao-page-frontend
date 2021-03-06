import Head from "next/head";
import {gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../../apolloClient";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import React, {useEffect, useRef, useState} from "react";
import {Header} from "../../../component/Header";
import {useRouter} from "next/router";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../__generated__/adminFindByIdEpisode";
import html2canvas from "@nidi/html2canvas";
import {updateEpisode, updateEpisodeVariables} from "../../../__generated__/updateEpisode";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import DragabbleCard from "../../../component/DragabbleCard";


export interface IImages {
    id: number,
    src: string,
    seq: number
}


export const ADMIN_FIND_BY_ID_EPISODE = gql`
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

export const UPDATE_EPISODE = gql`
    mutation updateEpisode($episodeInput : episodeUpdateInput!) {
        updateEpisode(episodeInput: $episodeInput) {
            ok
            error
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
            setImageList(data.adminFindByIdEpisode?.contents ?? []);
        }
    });


    const [updateEpisode] = useMutation<updateEpisode>(UPDATE_EPISODE, {
        onCompleted: data => {
            if (data.updateEpisode.ok) {
                return alert("???????????? ?????????????????????.")
            } else {
                return alert('???????????? ?????? ???????????????. ??????????????? ?????? ?????? ????????????')
            }
        },
        refetchQueries: [{
            query: ADMIN_FIND_BY_ID_EPISODE,
            variables: {
                seriesId: Number(seriesId),
                episodeId: Number(episodeId)
            },
        }]
    });

    const update = async () => {
        await updateEpisode({
            variables: {
                episodeInput: {
                    id: data?.adminFindByIdEpisode?.id,
                    contents: imageList
                }
            }
        })
    }


    const [imageList, setImageList] = useState<string[]>([]);
    const [fetchImage, setFetchImage] = useState<boolean>(false);


    const convertToFileAndUploadImage = async (base64String: string) => {
        try {
            setFetchImage(true);
            const imageFile = await fetch(base64String)
                .then(res => res.blob())
                .then(blob => {
                    const convertFile = new File([blob], "imageFile", {type: "image/png"});
                    return convertFile
                });

            const formBody = new FormData();
            formBody.append('file', imageFile);

            const url = await (await fetch("https://seokkao-page-backend.herokuapp.com/uploads/", {
                method: "POST",
                body: formBody
            })).json();
            return url.url;
        } catch {
            return alert("???????????? ?????? ??? ????????????");
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
                const imgSrc = await convertToFileAndUploadImage(img);
                setFetchImage(false);
                if (imageList) {
                    setImageList((prev) => prev && [...prev, imgSrc]);
                }

            });
        }
    }


    const deleteImage = async (index: number, imageSrc: string) => {

        const confirm = window.confirm("???????????????????????? ?");

        if (!confirm) {
            return;
        }

        const replaceImgSrc = imageSrc.replace('https://seungseokkakaopage.s3.amazonaws.com/', "");
        const res = await fetch("https://seokkao-page-backend.herokuapp.com/uploads/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                imageSrc: replaceImgSrc
            }),
        });
        if (res.ok) {
            const deleteImage = imageList?.filter((image, filterIndex) => filterIndex !== index);
            setImageList(deleteImage);
            return alert('???????????? ?????????????????????.')
        } else if (!res.ok) {
            return alert('???????????? ???????????? ???????????????. ??????????????? ?????? ?????? ????????????')
        }
    }


    const onDragEnd = ({draggableId, destination, source}: DropResult) => {
        if (!destination) return;
        if (!imageList) return;

        // ?????? ????????? ????????? ???????????? ?????? ??????
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // @ts-ignore
        setImageList((oldToDos) => {
            if (!destination) return;
            if (!oldToDos) return;
            const toDosCopy = [...oldToDos];
            toDosCopy.splice(source.index, 1);
            toDosCopy.splice(destination?.index, 0, draggableId);
            return toDosCopy;
        });
    };


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
                <title>{data.adminFindByIdEpisode?.series.name} | ??????????????????</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
                <section className={'mx-auto w-full bg-white pt-5 px-1.5'} style={{'maxWidth': '950px'}}>
                    <h2 className={'text-md lg:text-xl text-gray-600'}>{data.adminFindByIdEpisode?.series.name} {data.adminFindByIdEpisode.episode}???</h2>
                    {
                        fetchImage ?
                            <div className=" flex justify-center flex-col items-center text-gray-600">
                                <div
                                    className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
                                ???????????? ????????????????????????..
                            </div>
                            :
                            <article className={'flex flex-col bg-white w-full text-gray-600'}>
                                <h6 className={'py-3'}>????????? ?????????</h6>
                                <textarea rows={16} cols={12}
                                          className={'border w-full p-3 whitespace-pre-wrap break-all'}
                                          style={{
                                              'fontSize': '25px',
                                              'height': '187px',
                                              'padding': '85px',
                                              'lineHeight': '63px'
                                          }} id={'target'}/>
                                <button className={"bg-yellow-300 hover:bg-yellow-400 py-3 my-3 w-full rounded mx-auto"}
                                        onClick={() => captureToImage()}>????????? ????????????
                                </button>
                            </article>
                    }


                    <DragDropContext onDragEnd={onDragEnd} >
                            <Droppable droppableId="one" direction={'horizontal'}>
                                {(magic) => (
                                    <div ref={magic.innerRef} {...magic.droppableProps}>
                                        {imageList?.map((image, index) =>
                                            <DragabbleCard key={index}
                                                           image={image}
                                                           index={index}
                                                           deleteImage={deleteImage}/>)
                                        }
                                        {magic.placeholder}
                                    </div>
                                )}
                            </Droppable>
                    </DragDropContext>


                </section>
                <section className={'w-full bg-white'}>
                    <button className={'w-full bg-lime-300 py-2 rounded hover:bg-lime-500'}
                            onClick={() => update()}>????????????
                    </button>
                </section>
            </section>

        </>
    )
}

export default EpisodeAdmin;
