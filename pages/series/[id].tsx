import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {initializeApollo, isLoggedInVar, LOCALSTORAGE_TOKEN} from "../../apolloClient";
import moment from "moment";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {Header} from "../../component/Header";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faComment} from "@fortawesome/free-solid-svg-icons";
import {addComma, addUnit} from "../../public/constants";
import {gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {SERIES_FRAGMENT} from "../../fragments";
import {
    findByIdSeries,
    findByIdSeries_findByIdSeries, findByIdSeries_findByIdSeries_episode,
    findByIdSeriesVariables
} from "../../__generated__/findByIdSeries";
import NotAccept from "../../component/NotAccept";
import {buyEpisode, buyEpisodeVariables} from "../../__generated__/buyEpisode";
import {useRouter} from "next/router";
import {getPurchaseHistory, getPurchaseHistoryVariables} from "../../__generated__/getPurchaseHistory";
import {NextSeo} from "next-seo";


export interface ISeries {
    series: findByIdSeries_findByIdSeries | null
    episodeLength: number
    seriesId: number
}

export const FIND_BY_ID_SERIES = gql`
    query findByIdSeries($seriesId : Float!) {
        findByIdSeries(seriesId : $seriesId) {
            ...SeriesParts
            serialization
            episode {
                id
                episode
                createdAt
                howMuchCoin
            }
            writer {
                name
            }
        }
    }
    ${SERIES_FRAGMENT}
`


export const BUY_EPISODE = gql`
    mutation buyEpisode($buyEpisodeInput: BuyEpisodeInput!) {
        buyEpisode(buyEpisodeInput : $buyEpisodeInput) {
            ok
            error
            buyEpisodeId
        }
    }
`

export const PURCHASE_HISTORY = gql`
    query getPurchaseHistory($seriesId : Float!) {
        getPurchaseHistory(seriesId : $seriesId)
    }
`


const Series: NextPage<ISeries> = ({series, episodeLength, seriesId}) => {



    const router = useRouter();
    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const apolloClient = initializeApollo();

    const {data: purchaseHistoryData} = useQuery<getPurchaseHistory, getPurchaseHistoryVariables>(PURCHASE_HISTORY, {
        skip: !isLoggedIn,
        variables: {
            seriesId
        }
    })


    const [buyEpisodeMutation] = useMutation<buyEpisode, buyEpisodeVariables>(BUY_EPISODE, {
        onCompleted: async data => {
            if (!data.buyEpisode.ok) {
                return alert(data.buyEpisode.error);
            }

            const queryResult = apolloClient.readQuery({
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
                    getPurchaseHistory: [...queryResult.getPurchaseHistory, data.buyEpisode.buyEpisodeId]
                }
            })
            return router.push(`/series/${seriesId}/${data.buyEpisode.buyEpisodeId}`)
        },
    });


    const [orderBy, setOrderBy] = useState<boolean>(true);

    const changeOrderBy = (value: string) => {
        if (value === 'early') {
            return setOrderBy(false);
        }
        if (value === 'latest') {
            return setOrderBy(true)
        }
    }


    const loginValidationCheck = () => {
        const loginToken = localStorage.getItem(LOCALSTORAGE_TOKEN);
        if (!loginToken) {
            alert("로그인을 먼저 해주세요 !");
            return false;
        } else {
            return true
        }
    }


    const buyEpisode = async (episodeId: number, episode: number, howMuchCoin: number) => {

        if (!loginValidationCheck()) {
            return router.push("/login");
        }

        if (episode === 1) {
            return await buyEpisodeMutation({
                variables: {
                    buyEpisodeInput: {
                        episodeId,
                        seriesId
                    }
                }
            })
        }

        const confirm = window.confirm(`${episode}화를 열람하시겠습니까? ${howMuchCoin}코인이 소비됩니다.`);

        if (!confirm) {
            return
        }

        return await buyEpisodeMutation({
            variables: {
                buyEpisodeInput: {
                    episodeId,
                    seriesId
                }
            }
        })
    }


    const directGotoEpisode = async (id: number) => {
        if (!loginValidationCheck()) {
            return router.push("/login");
        }
        return router.push(`/series/${seriesId}/${id}`)
    }




    if (!series) {
        return (
            <NotAccept/>
        )
    }


    return (
        <>
            <NextSeo
                title={`${series.name} | 석카오페이지`}
                description={series.description}
                canonical={`https://seokkao-page-frontend.vercel.app/series/${series.id}`}
                openGraph={{
                    url: `https://seokkao-page-frontend.vercel.app/series/${series.id}`,
                    title: `${series.name} | 석카오 페이지`,
                    description: `${series.description}`,
                    site_name: 'Seokkao-Page',
                }}
            />
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
            </section>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <article className={'pt-3 flex flex-col w-full'}>
                    <div className={'p-4 bg-white'}>
                        <div className={'flex'}>
                            <div className={'h-36 w-4/12 md:h-52 md:w-3/12 bg-center bg-cover rounded overflow-hidden'}
                                 style={{'backgroundImage': `url(${series.thumbnail})`}}>
                            </div>
                            <div className={'w-10/12 ml-4 flex flex-col flex-1 justify-between'}>
                                <div>
                                    <h2 className={'text-sm font-base md:text-lg md:font-bold'}>{series.name}</h2>
                                    <div className={'flex items-center text-sm mt-1 md:text-lg'}>
                                        <FontAwesomeIcon icon={faUser}
                                                         className={'text-gray-800 mr-0.5 text-xs fa-sm'}/>
                                        <span className={'text-xs'}>{addUnit(series.like)}명</span>
                                    </div>
                                </div>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'flex flex-col'}>
                                        <span
                                            className={'mt-1.5 text-xs md:text-sm tracking-tighter'}>{series.serialization} | 연재</span>
                                        <span className={'mt-1.5 text-xs md:text-sm'}>{series.writer.name} 작가</span>
                                    </div>
                                    <div className={'flex'}>
                                        <Link href={`/series/description/${seriesId}`}>
                                            <a>
                                                <button
                                                    className={'text-xs px-2 py-1 border-solid border rounded text-gray-500 border-gray-300 md:text-md md:border-1'}>작품소개
                                                </button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <article className={'w-full my-2 md:py-2 py-2 px-4 bg-white flex items-center'}>
                    <div className={'p-1 rounded-full flex items-center justify-center bg-blue-500'}>
                        <FontAwesomeIcon icon={faComment} className={'text-white text-xs fa-xs mx-auto'}/>
                    </div>
                    <span className={'ml-1.5 md:ml-3 text-sm font-bold'}>{addComma(series.like)} 명이 보는 중</span>
                </article>
                <article className={'w-full flex items-center bg-yellow-300 '}>
                    <Link href={`/series/${seriesId}/1`}>
                        <a className={'w-full py-3 md:mx-0 '}>
                            <button className={'bg-yellow-300 w-full '}>첫편보기</button>
                        </a>
                    </Link>
                </article>
            </section>

            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <article className={'w-full my-2 md:py-3 py-2 px-4 bg-white border-b border-gray-200'}>
                    <div className={'w-full pt-1 pb-4 flex items-center justify-between'}>
                        <span className={'text-gray-500 text-sm md:text-sm체'}>전체 ({episodeLength})</span>
                        <select className={'text-gray-500 text-xs md:text-sm'}
                                onChange={(e) => changeOrderBy(e.target.value)}>
                            <option value={'latest'}>최신순</option>
                            <option value={'early'}>첫편부터</option>
                        </select>
                    </div>
                    <div className={`flex ${orderBy ? ' flex-col' : ' flex-col-reverse'}`}>
                        {
                            series.episode.map((episode) => {
                                return (
                                    <div
                                        className={purchaseHistoryData?.getPurchaseHistory.includes(episode.id) ? 'flex items-center mt-1.5 bg-gray-100' : 'flex items-center mt-1.5'}
                                        key={episode.episode}
                                        onClick={() => purchaseHistoryData?.getPurchaseHistory.includes(episode.id) ? directGotoEpisode(episode.id) : buyEpisode(episode.id, episode.episode, episode.howMuchCoin)}>
                                        <div
                                            className={'h-16 w-20 md:h-16 md:w-1/12 bg-cover bg-center rounded overflow-hidden'}
                                            style={{'backgroundImage': `url(${series.thumbnail})`}}/>
                                        <div className={'flex flex-col text-xs ml-2 w-full'}>
                                            <div className={'flex w-full justify-between'}>
                                                <h4>{series.name} - {episode.episode}화 {episode.episode === 1 && <span
                                                    className={'text-center text-white bg-rose-500 px-0.5'}>무료</span>}</h4>
                                                {purchaseHistoryData?.getPurchaseHistory.includes(episode.id) &&
                                                <span className={'mr-3 text-2xs text-gray-500'}>열람 완료</span>}
                                            </div>

                                            <span
                                                className={'mt-0.5'}>{moment(episode.createdAt).format('YYYY.MM.DD')}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </article>
            </section>
        </>
    )
}

export default Series;


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISeries>> => {
    try{
        const apolloClient = initializeApollo();

        const {id}: any = context.query;


        const {data, error} = await apolloClient.query<findByIdSeries, findByIdSeriesVariables>({
            query: FIND_BY_ID_SERIES,
            variables: {
                seriesId: +id
            }
        });



        return {
            props: {
                series: data.findByIdSeries,
                episodeLength: data?.findByIdSeries?.episode?.length ?? 0,
                seriesId: +id,
            },
        }
    }catch (e) {
        return {
            props: {
                series: null,
                episodeLength: 0,
                seriesId: 0,
            },
        }
    }

}


