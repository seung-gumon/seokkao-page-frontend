import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import PleaseLogin from "../../../../component/PleaseLogin";
import React, {useCallback, useEffect, useState} from "react";
import {useMutation, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../../../apolloClient";
import Head from "next/head";
import {Header} from "../../../../component/Header";
import {useDropzone} from 'react-dropzone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faList} from "@fortawesome/free-solid-svg-icons";
import {image} from "@nidi/html2canvas/dist/types/css/types/image";
import {createEpisode, createEpisodeVariables} from "../../../../__generated__/createEpisode";
import {GET_DASHBOARD_DATA} from "../../[id]";
import moment from "moment";
import {CREATE_EPISODE} from "../new";
import {FIND_BY_ID_SERIES, ISeries} from "../../../series/[id]";
import {findByIdSeries, findByIdSeriesVariables} from "../../../../__generated__/findByIdSeries";
import {useRouter} from "next/router";



const NewWebToonAdmin : NextPage<ISeries> = ({series,episodeLength,seriesId}) => {


    const router = useRouter();

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const apolloClient = initializeApollo();



    const [images, setImages] = useState<string[]>([]);
    const [uploadLoading, setUploadLoading] = useState<boolean>(true);

    const [createMutation] = useMutation<createEpisode, createEpisodeVariables>(CREATE_EPISODE, {
        refetchQueries: [{
            query: GET_DASHBOARD_DATA,
            variables: {
                purchaseInput: {
                    seriesId: series?.id,
                    startDate: moment((new Date(moment().add(-30, 'days').format('YYYY/MM/DD')))).format('YYYY-MM-DD'),
                    endDate: moment(new Date(moment().format('YYYY/MM/DD'))).format('YYYY-MM-DD')
                }
            },
        }],
        onCompleted: data => {
            if (data.createEpisode.ok) {
                alert("????????? ??????????????? ?????????????????????.");
                return router.push(`/administrate/${seriesId}`);
            } else {
                return alert('????????? ???????????? ?????? ?????????????????????.??????????????? ?????? ?????? ????????????')
            }
        },
    });


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
            const deleteImage = images?.filter((image, filterIndex) => filterIndex !== index);
            setImages(deleteImage);
            return alert('???????????? ?????????????????????.')
        } else if (!res.ok) {
            return alert('???????????? ???????????? ???????????????. ??????????????? ?????? ?????? ????????????')
        }
    }


    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            acceptedFiles.forEach((acceptedFile: File) => {
                if (acceptedFile.size > 1 * 1024 * 1000) {
                    return alert('?????? ?????? ????????? 1MB ?????????.');
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
            return alert("???????????? ?????? ??? ????????????.");
        }
    }, [])


    const createEpisode = async () => {
        if (images.length === 0) return alert("???????????? ???????????? ????????????.")

        await createMutation({
            variables: {
                episodeCreateInput: {
                    seriesId,
                    episode: episodeLength + 1,
                    contents: images
                }
            }
        })
    }


    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    return (
        <>
            <Head>
                <title>{series?.name} ?????? ????????? | ??????????????????</title>
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
                                    ????????? ?????? ???????????????
                                </p> :
                                <p className={'text-sm lg:text-xl'}>
                                    <FontAwesomeIcon icon={faFileImage} className={'mr-1.5'}/>
                                    ????????? ????????? ????????? ??? ???????????? ????????? ????????????
                                </p>
                        }
                    </div>
                </div>

                <span className={'text-xl my-3 px-3'}>
                    ????????????
                </span>
                {images.length === 0 &&
                <div className={'flex flex-col px-3'}>
                    <span>???????????? ???????????? ????????????</span>
                </div>
                }
                {
                    !uploadLoading ?
                        <div className=" flex justify-center flex-col items-center text-gray-600">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
                            ???????????? ????????????????????????..
                        </div>
                        :
                        <div className={'flex flex-col w-full'}>
                            {
                                images.map((imageSrc: string, index: number) => {
                                    return (
                                        <div key={index} className={'relative'}>
                                            <button
                                                onClick={() => deleteImage(index , imageSrc)}
                                                className={'red absolute bg-red-500 rounded py-2 px-1.5 text-white'}>??????
                                            </button>
                                            <img src={imageSrc} alt={`?????? ${index + 1}???`}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
                <div className={'w-11/12 lg:w-full flex items-center mx-auto'}>
                    <button className={'bg-lime-400 hover:bg-lime-500 py-2 w-full rounded-md my-3'}
                            onClick={() => createEpisode()}>????????????</button>
                </div>


            </div>

        </>

    )
}

export default NewWebToonAdmin


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISeries>> => {
    try{
        const apolloClient = initializeApollo();

        const {id}: any = context.query;



        const {data , error} = await apolloClient.query<findByIdSeries, findByIdSeriesVariables>({
            query: FIND_BY_ID_SERIES,
            variables: {
                seriesId: +id
            }
        });

        return {
            props: {
                series: data.findByIdSeries,
                episodeLength : data?.findByIdSeries?.episode?.length ?? 0,
                seriesId : +id,
            },
        }
    }catch (e) {
        return {
            props: {
                series: null,
                episodeLength : 0,
                seriesId : 0,
            },
        }
    }

}
