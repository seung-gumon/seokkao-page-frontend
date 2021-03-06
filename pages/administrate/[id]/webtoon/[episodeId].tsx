import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import Head from "next/head";
import {Header} from "../../../../component/Header";
import React, {useCallback, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage} from "@fortawesome/free-solid-svg-icons";
import {useDropzone} from "react-dropzone";
import PleaseLogin from "../../../../component/PleaseLogin";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../../../apolloClient";
import {ADMIN_FIND_BY_ID_EPISODE, IImages, UPDATE_EPISODE} from "../[episodeId]";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../../__generated__/adminFindByIdEpisode";
import {useRouter} from "next/router";
import LazyLoad from "react-lazyload";
import {updateEpisode} from "../../../../__generated__/updateEpisode";





const WebToonEpisode = () => {


    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);

    const {query: {episodeId, id: seriesId}} = useRouter();

    const [images, setImages] = useState<string[]>([]);
    const [uploadLoading, setUploadLoading] = useState<boolean>(true);



    const {data, loading : useQueryLoading} = useQuery<adminFindByIdEpisode, adminFindByIdEpisodeVariables>(ADMIN_FIND_BY_ID_EPISODE, {
        skip: !isLoggedIn,
        variables: {
            seriesId: Number(seriesId),
            episodeId: Number(episodeId)
        },
        onCompleted: data => {
            const contents = data.adminFindByIdEpisode?.contents.map((contents, index) => {
                return contents;
            });

            if (contents) {
                setImages(contents);
            }
        }
    });


    const [updateEpisode] = useMutation<updateEpisode>(UPDATE_EPISODE, {
        onCompleted: data => {
            if (data.updateEpisode.ok) {
                return alert("업데이트 성공하였습니다.")
            } else {
                return alert('업데이트 실패 하였습니다. 새로고침후 다시 시도 해주세요')
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
            variables : {
                episodeInput : {
                    id : data?.adminFindByIdEpisode?.id,
                    contents : images
                }
            }
        })
    }



    const deleteImage = async (index: number, imageSrc: string) => {
        const confirm = window.confirm("삭제하시겠습니까 ?");

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
            const deleteImage = images?.filter((image, filterIndex) => filterIndex !== index);
            setImages(deleteImage);
            return alert('이미지가 삭제되었습니다.')
        } else if (!res.ok) {
            return alert('이미지가 삭제되지 않았습니다. 새로고침후 다시 시도 해주세요')
        }
    }



    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            acceptedFiles.forEach((acceptedFile: File) => {
                if (acceptedFile.size > 1 * 1024 * 1000) {
                    return alert('최대 용량 크기는 1MB 입니다.');
                }
            })

            setUploadLoading(false);
            const images: string[] = await Promise.all(acceptedFiles.map(async (image: string) => {
                const formBody = new FormData();
                const actualFile = image;
                formBody.append('file', actualFile);

                const url = await (await fetch("https://seokkao-page-backend.herokuapp.com/uploads/", {
                    method: "POST",
                    body: formBody
                })).json();

                return url.url;
            }));

            setImages((prev: string[]) => [...prev, ...images]);
            return setUploadLoading(() => true);
        } catch (e) {
            return alert("이미지를 올릴 수 없습니다.");
        }
    }, [])



    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    return (
        <>
            <Head>
                <title>웹툰 새로 올리기 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto w-full box-border'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div
                    className={`w-full ${isDragActive ? 'bg-amber-500' : 'bg-amber-300'} flex items-center h-28 border rounded-lg mt-5`}>
                    <div {...getRootProps()} className={'w-full h-full flex items-center justify-center'}>
                        <input {...getInputProps()} className={'w-full h-full'} accept={'image/jpeg'}/>
                        {
                            isDragActive ?
                                <p className={'text-sm lg:text-xl'}>
                                    <FontAwesomeIcon icon={faFileImage} className={'mr-1.5'}/>
                                    파일이 감지 되었습니다
                                </p> :
                                <p className={'text-sm lg:text-xl'}>
                                    <FontAwesomeIcon icon={faFileImage} className={'mr-1.5'}/>
                                    이미지 파일을 드래그 및 클릭해서 업로드 해주세요
                                </p>
                        }
                    </div>
                </div>

                <span className={'text-xl my-3 block'}>
                    미리보기
                </span>
                {images.length === 0 &&
                <div className={'flex flex-col px-3'}>
                    <span>업로드한 이미지가 없습니다</span>
                </div>
                }
                {
                    useQueryLoading || !uploadLoading ?
                        <div className=" flex justify-center flex-col items-center text-gray-600">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
                            이미지를 가져오는중입니다..
                        </div>
                        :
                        <div className={'flex flex-col w-full'}>
                            {
                                images?.map((imageSrc: string, index: number) => {
                                    return (

                                        <LazyLoad once={true} key={imageSrc} height={200} offset={[-100, 0]}>
                                            <button onClick={() => deleteImage(index, imageSrc)} className={'red absolute bg-red-500 rounded py-2 px-1.5 text-white'}>삭제
                                            </button>
                                            <img src={imageSrc} alt={`만화 ${index + 1}컷`} className={'w-full'}/>
                                        </LazyLoad>
                                    )
                                })
                            }
                        </div>
                }
                <div className={'w-11/12 lg:w-full flex items-center mx-auto'}>
                    <button className={'bg-lime-400 hover:bg-lime-500 py-2 w-full rounded-md my-3'}
                            onClick={update}>저장하기</button>
                </div>


            </div>
        </>
    )
}

export default WebToonEpisode;