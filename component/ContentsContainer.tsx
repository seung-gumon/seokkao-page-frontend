import React, {useEffect} from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {NextPage} from "next";
import {gql, useQuery} from "@apollo/client";
import {SERIES_FRAGMENT} from "../fragments";
import {
    getSerializationTodayFromMain,
    getSerializationTodayFromMainVariables
} from "../__generated__/getSerializationTodayFromMain";
import Link from "next/link";
import {addUnit} from "../public/constants";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton" ;


const GET_SERIALIZATION_TODAY = gql`
    query getSerializationTodayFromMain($mainCategory : String! , $today : String!) {
        getSerializationTodayFromMain(mainCategory : $mainCategory , today : $today) {
            ...SeriesParts
        }
    }
    ${SERIES_FRAGMENT}
`

interface IContentsContainer {
    today: string,
    genre: string,
}

const ContentsContainer: NextPage<IContentsContainer> =
    ({
         today,
         genre
     }) => {

        const {
            data,
            loading: fetchLoading
        } = useQuery<getSerializationTodayFromMain, getSerializationTodayFromMainVariables>(GET_SERIALIZATION_TODAY, {
            skip: !today ? true : false,
            variables: {
                today,
                mainCategory: genre
            },
        });


        if (fetchLoading) {
            return (
                <div className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-5 gap-y-2 w-full bg-white px-2 md:pt-3">
                    {
                        [...Array(25)].map((n, index) => {
                            return (
                                <div className={'flex flex-col'} key={index}>
                                    <SkeletonTheme color="#CBD5E1" highlightColor="#94A3B8">
                                        <p className={'bg-white'}>
                                            <Skeleton width={'3.5em'} height={'3em'}/>
                                            <Skeleton
                                                className={'mt-1 text-xs text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis text-xs md:text-md'}
                                                width={'100%'}/>
                                            <Skeleton
                                                className={'mt-1 text-xs text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis text-xs md:text-md'}
                                                width={'100%'}/>
                                        </p>
                                    </SkeletonTheme>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        return (
            <>
                <div className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-1 gap-y-2 w-full bg-white px-2 md:pt-3">
                    {
                        data?.getSerializationTodayFromMain.map((series) => {
                            return (
                                <Link href={`series/${series.id}`} key={series.id}>
                                    <a>
                                        <div className={'flex flex-col'}>
                                            <div className={'relative rounded-lg overflow-hidden'}>
                                                <img src={series.thumbnail} alt={series.name}
                                                     className={'w-full h-auto h-full rounded-lg'}/>
                                            </div>

                                            <span
                                                className={'mt-1 text-xs text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis text-xs md:text-md'}>{series.name}</span>
                                            <span className={'text-gray-800'} style={{'fontSize': '10px'}}>
                                        <FontAwesomeIcon icon={faUser} className={'text-gray-400 mr-1'}/>
                                                {addUnit(series.like)}명</span>
                                        </div>
                                    </a>
                                </Link>

                            )
                        })
                    }
                </div>


                <div className={'flex bg-white w-full items-center justify-center py-3'}>
                    <span
                        className={'text-black text-xs md:text-sm cursor-pointer text-center md:text-lg border-2 border-blueGray-300 px-2 py-1 rounded-lg text-blueGray-500'}>{today} 연재 더보기 &rarr;</span>
                </div>
            </>
        )

    }


export default ContentsContainer;