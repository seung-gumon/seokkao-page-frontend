import {gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../../apolloClient";
import {adminFindByIdEpisode, adminFindByIdEpisodeVariables} from "../../../__generated__/adminFindByIdEpisode";
import React, {useState} from "react";
import html2canvas from "@nidi/html2canvas";
import PleaseLogin from "../../../component/PleaseLogin";
import {Header} from "../../../component/Header";
import NotAccept from "../../../component/NotAccept";
import Head from "next/head";
import {IImage} from "image-size/dist/types/interface";
import {IImages} from "./[episodeId]";
import {FIND_BY_ID_SERIES, ISeries} from "../../series/[id]";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {findByIdSeries, findByIdSeriesVariables} from "../../../__generated__/findByIdSeries";
import {createEpisode, createEpisodeVariables} from "../../../__generated__/createEpisode";
import moment from "moment";
import {GET_DASHBOARD_DATA} from "../[id]";


const CREATE_EPISODE = gql`
    mutation createEpisode($episodeCreateInput : episodeCreateInput!) {
        createEpisode(episodeCreateInput: $episodeCreateInput) {
            ok
            error
        }
    }
`



const NewEpisodeAdmin : NextPage<ISeries> = ({series,episodeLength,id}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


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
                return alert("새로운 에피소드가 등록되었습니다.")
            } else {
                return alert('새로운 에피소드 등록 실패하였습니다.새로고침후 다시 시도 해주세요')
            }
        },
    });

    const createEpisode = async () => {
        const contents = imageList?.map(image => image.src);
        if (series && contents) {
            await createMutation({
                variables : {
                    episodeCreateInput : {
                        seriesId : series.id,
                        episode : episodeLength + 1,
                        contents
                    }
                }
            })
        }
    }


    const [imageList, setImageList] = useState<IImages[] | undefined>([]);
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

            const url = await (await fetch("http://localhost:5000/uploads/", {
                method: "POST",
                body: formBody
            })).json();
            return url.url;
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
                const imgSrc = await convertToFileAndUploadImage(img);
                setFetchImage(false);
                if (imageList) {
                    setImageList((prev) => prev && [...prev, {
                        id: imageList.length + 1,
                        src: imgSrc,
                        seq: imageList?.length + 1
                    }]);
                }

            });
        }
    }


    const deleteImage = async (index: number, imageSrc: string) => {

        const confirm = window.confirm("삭제하시겠습니까 ?");

        if (!confirm) {
            return;
        }

        const replaceImgSrc = imageSrc.replace('https://seungseokkakaopage.s3.amazonaws.com/', "");
        const res = await fetch("http://localhost:5000/uploads/delete", {
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
            return alert('이미지가 삭제되었습니다.')
        } else if (!res.ok) {
            return alert('이미지가 삭제되지 않았습니다. 새로고침후 다시 시도 해주세요')
        }
    }


    const changeSeq = (seq: number, imageId: number) => {
        const newImageArr = imageList?.map((image, mapIndex) => {
            if (image.id === imageId) {
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
        const newArr = imageList?.sort((a, b) => {
            if (a.seq < b.seq) {
                return -1;
            }
            if (a.seq > b.seq) {
                return 1;
            }
            return 0;
        });

        if (newArr) {
            setImageList(() => [...newArr]);
        }
    }


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }



    return (
        <>
            <Head>
                <title>{series?.name} | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
                <section className={'mx-auto w-full bg-white pt-5 px-1.5'} style={{'maxWidth': '950px'}}>
                    <h2 className={'text-md lg:text-xl text-gray-600'}>{series?.name} {episodeLength+1}화</h2>
                    {
                        fetchImage ?
                            <div className=" flex justify-center flex-col items-center text-gray-600">
                                <div
                                    className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
                                이미지를 가져오는중입니다..
                            </div>
                            :
                            <article className={'flex flex-col bg-white w-full text-gray-600'}>
                                <h6 className={'py-3'}>텍스트 편집기</h6>
                                <textarea rows={16} cols={12}
                                          className={'border w-full p-3 whitespace-pre-wrap break-all'}
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
                    }


                    <article className={'flex w-full flex-wrap items-center py-4'}>
                        {
                            imageList?.map((image, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className={'w-1/6 mx-1.5 mt-1.5 flex flex-col items-center'}>
                                            <img className={'border '} src={image.src}
                                                 style={{'width': '720px', 'height': 'auto'}}/>
                                            <button
                                                className={'bg-rose-500 hover:bg-rose-700 mt-1 py-1 text-xs w-4/6 mx-auto rounded text-white'}
                                                onClick={() => deleteImage(index, image.src)}>
                                                삭제
                                            </button>
                                            <input onChange={(e) => changeSeq(Number(e.target.value), image.id)}
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
                    <button className={'w-3/6 bg-blue-300 py-2 rounded hover:bg-blue-500'}
                            onClick={() => sortImage()}>이미지 재배열 하기
                    </button>
                    <button className={'w-3/6 bg-lime-300 py-2 rounded hover:bg-lime-500'} onClick={() => createEpisode()}>생성하기</button>
                </section>
            </section>

        </>
    )
}


export default NewEpisodeAdmin

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISeries>> => {
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
            id : +id,
        },
    }
}
