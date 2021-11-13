import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import Head from "next/head";
import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import {Header} from "../../../component/Header";
import {initializeApollo, isLoggedInVar} from "../../../apolloClient";
import {FetchResult, gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {
    getEpisodeBySeriesIdAndEpisodeId,
    getEpisodeBySeriesIdAndEpisodeIdVariables
} from "../../../__generated__/getEpisodeBySeriesIdAndEpisodeId";
import PleaseLogin from "../../../component/PleaseLogin";
import NotAccept from "../../../component/NotAccept";
import HTMLFlipBook from 'react-pageflip';
import {faList} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {prevOrNextEpisode, prevOrNextEpisodeVariables} from "../../../__generated__/prevOrNextEpisode";
import {PURCHASE_HISTORY} from "../[id]";
import {image} from "@nidi/html2canvas/dist/types/css/types/image";
import LazyLoad from "react-lazyload";

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
                category {
                    mainCategory
                }
                name
            }
        }
    }
`

export const PREV_OR_NEXT_EPISODE = gql`
    mutation prevOrNextEpisode($prevOrNext: String!,$prevOrNextEpisode: prevOrNextEpisodeInput!) {
        prevOrNextEpisode(prevOrNext : $prevOrNext , prevOrNextEpisode : $prevOrNextEpisode) {
            ok
            error
        }
    }
`




const UserEpisode: NextPage<IUserEpisode> = ({seriesId,episodeId}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const router = useRouter();

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

    const [goToPrevOrNextPage] = useMutation<prevOrNextEpisode,prevOrNextEpisodeVariables>(PREV_OR_NEXT_EPISODE)

    const [page , setPage] = useState<number>(1);
    const [totalPage , setTotalPage] = useState<number>(0);
    const navRef = useRef<HTMLAttributes<HTMLDivElement>>(null);

    const apolloClient = initializeApollo();

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


    const gotoSeriesList = () => {
        return router.push(`/series/${seriesId}`);
    }

    const changePageFetchResult = async (req: FetchResult<prevOrNextEpisode>) => {
        const ok = req.data?.prevOrNextEpisode.ok;
        const episodeId = req.data?.prevOrNextEpisode.error;

        if (!ok) {
            return alert(req.data?.prevOrNextEpisode.error);
        }

        const queryResult = await apolloClient.readQuery({
            query: PURCHASE_HISTORY,
            variables: {
                seriesId
            }
        });

        apolloClient.writeQuery({
            query: PURCHASE_HISTORY,
            variables: {
                seriesId
            },
            data: {
                getPurchaseHistory: [...queryResult.getPurchaseHistory, Number(episodeId)]
            }
        })

        return router.push(`/series/${seriesId}/${Number(episodeId)}`);
    }


    const nextEpisode = async () => {
        const confirm = window.confirm("다음화를 보시겠습니까 ?");
        if (!confirm) {
            return
        }
        if (data?.getEpisodeBySeriesIdAndEpisodeId) {
            const nextEpisode = data?.getEpisodeBySeriesIdAndEpisodeId?.episode + 1;
            const req: FetchResult<prevOrNextEpisode> = await goToPrevOrNextPage({
                variables: {
                    prevOrNext: 'next',
                    prevOrNextEpisode: {
                        seriesId: seriesId,
                        episode: nextEpisode
                    }
                },
            });
            return await changePageFetchResult(req);
        }
    }

    const prevEpisode = async () => {
        const confirm = window.confirm("이전화를 보시겠습니까 ?");
        if (!confirm) {
            return
        }

        if (data?.getEpisodeBySeriesIdAndEpisodeId) {
            const prevEpisode = data?.getEpisodeBySeriesIdAndEpisodeId?.episode - 1;
            const req: FetchResult<prevOrNextEpisode> = await goToPrevOrNextPage({
                variables: {
                    prevOrNext: 'prev',
                    prevOrNextEpisode: {
                        seriesId: seriesId,
                        episode: prevEpisode
                    }
                },
            });
            return await changePageFetchResult(req);
        }
    }


    useEffect(() => {
        if (data?.getEpisodeBySeriesIdAndEpisodeId) {
            const clientWidth = document.documentElement.clientWidth;
            if (clientWidth >= 768) {
                const totalPage = data?.getEpisodeBySeriesIdAndEpisodeId?.contents.length === 1 ? 1 : data?.getEpisodeBySeriesIdAndEpisodeId?.contents.length / 2;
                return setTotalPage(totalPage);
            } else {
                return setTotalPage(data?.getEpisodeBySeriesIdAndEpisodeId?.contents.length / 1);
            }
        }
    }, [data])



    const confirmRef = () => {
        const a = navRef.current;
        console.log(a);
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


    if (error || !data?.getEpisodeBySeriesIdAndEpisodeId) {
        return (
            <NotAccept/>
        )
    }


    if (data.getEpisodeBySeriesIdAndEpisodeId.series.category.mainCategory === 'Cartoon') {
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
                <div className={'w-full flex justify-center items-center'} onClick={confirmRef}>
                    <section className={'mx-auto relative w-full'} style={{'maxWidth': '950px'}}>
                        <Header/>
                        <div className={'flex flex-col'}>
                            {
                                data.getEpisodeBySeriesIdAndEpisodeId.contents.map((imageSrc,index) => {
                                    return (
                                        <LazyLoad once={true} key={imageSrc} height={200} offset={[-100, 0]}>
                                            <img src={imageSrc} alt={`${index + 1}컷`} className={'w-full'}/>
                                        </LazyLoad>
                                    )
                                })
                            }
                        </div>
                        <article className={'fixed bottom-0 bg-white w-full py-2'} style={{'maxWidth':'950px'}}>
                            <div className='flex flex-col items-center justify-center py-1 text-gray-500'>
                                <div ref={navRef} className={'flex items-center justify-evenly py-1.5 w-full'}>
                                    <FontAwesomeIcon icon={faList} className={'mr-1 text-gray-600 text-md'} onClick={gotoSeriesList}/>
                                    <span className={'px-3 py-1.5 text-sm md:text-base cursor-pointer'} onClick={prevEpisode}>&larr; 이전편</span>
                                    <span className={'px-3 py-1.5 text-sm md:text-base cursor-pointer'} onClick={nextEpisode}>다음편 &rarr;</span>
                                </div>
                            </div>
                        </article>
                    </section>
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
                    <div className='flex flex-col items-center justify-center py-1.5 text-gray-500'>
                        <div>
                            [<span>{page} </span> 페이지 <span className={'mx-1.5'}>/</span><span>총 {totalPage}페이지</span>]
                        </div>
                        <div className={'flex items-center justify-evenly py-1.5 w-full'}>
                            <FontAwesomeIcon icon={faList} className={'mr-1 text-gray-600 text-md'} onClick={gotoSeriesList}/>
                            <span className={'px-3 py-1.5 text-sm md:text-base cursor-pointer'} onClick={prevEpisode}>&larr; 이전편</span>
                            <span className={'px-3 py-1.5 text-sm md:text-base cursor-pointer'} onClick={nextEpisode}>다음편 &rarr;</span>
                        </div>
                    </div>

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