import {NextPage} from "next";
import {Header} from "../component/Header";
import React, {useEffect} from "react";
import Head from "next/head";
import {gql, useLazyQuery, useQuery, useReactiveVar} from "@apollo/client";
import {meQuery} from "../__generated__/meQuery";
import {ME_QUERY} from "./me";
import {isLoggedInVar} from "../apolloClient";
import PleaseLogin from "../component/PleaseLogin";
import {SERIES_FRAGMENT} from "../fragments";
import {mySeries} from "../__generated__/mySeries";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {addUnit} from "../public/constants";




export const MY_SERIES = gql`
    query mySeries {
        mySeries {
            name
            series {
                ...SeriesParts
                category {
                    categoryName
                }
            }
        }
    }
    ${SERIES_FRAGMENT}
`


interface IMyWork {

}

const MyWork : NextPage<IMyWork> = ({}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const {loading, error} = useQuery<meQuery>(ME_QUERY, {
        onCompleted: data => {
            if (data) {
                fetching();
            }
        }
    });

    const [fetching, {data, loading: SeriesFetchLoading}] = useLazyQuery<mySeries>(MY_SERIES);




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


    if (!isLoggedIn || error || loading) {
        return (
            <PleaseLogin/>
        )
    }


    return (
        <>
            <Head>
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'p-3'}>

                    <h4 className={'text-md text-gray-700 my-3'}>{data?.mySeries.name}님께서 집필하신 작품 ✏️</h4>
                    {

                        data?.mySeries.series.length !== 0 ?
                        data?.mySeries.series.map((series) => {
                            return (
                                <div className={'flex hover:shadow-lg rounded items-center mt-1'} key={series.id}>
                                    <div className={'flex border rounded-xl bg-black'}  style={{'maxWidth':'120px'}}>
                                        <img src={series.thumbnail} alt={series.name} className={'w-full h-auto'}/>
                                    </div>
                                    <div className={'flex w-/7/12 py-1.5 pl-2 font-medium flex-col justify-center'}>
                                        <h3 className={'text-sm text-gray-700 py-1'}>{series.name}</h3>
                                        <h6 className={'text-xs text-gray-500 font-light'}>{series.description}</h6>
                                        <p className={'flex items-center mt-1.5 text-xs text-gray-500 font-light'}>
                                            <FontAwesomeIcon icon={faUser} className={'text-gray-400 mr-1'}/>
                                            {addUnit(series.like)}명 | {series.category.categoryName}
                                        </p>
                                        <Link href={`/administrate/${series.id}`}>
                                            <a>
                                                <button style={{'maxWidth':'120px'}} className={'w-full bg-blue-400 py-1.5 mt-2 text-white flex items-center justify-center text-sm rounded'}>관리하기
                                                </button>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                            :
                            <span className={'text-xs text-gray-700 md:text-lg'}>
                                집필하신 작품이 없습니다. 새로운 작품을 집필해보세요 ✏️
                            </span>
                    }
                </div>
            </div>
        </>

    )
}

export default MyWork;