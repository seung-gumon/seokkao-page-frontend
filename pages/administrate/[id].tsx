import {useLazyQuery, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../apolloClient";
import {meQuery} from "../../__generated__/meQuery";
import {ME_QUERY} from "../me";
import {mySeries} from "../../__generated__/mySeries";
import {Header} from "../../component/Header";
import PleaseLogin from "../../component/PleaseLogin";
import React from "react";
import {MY_SERIES} from "../my-work";
import Head from "next/head";



const AdministrateById = () => {

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
                    <div className="min-w-screen flex items-center justify-center px-5 py-5">
                        <div className="w-full max-w-3xl">
                            <div className="-mx-2 md:flex">
                                <div className="w-full md:w-1/3 px-2">
                                    <div className="rounded-lg shadow-sm mb-4">
                                        <div
                                            className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                                            <div className="px-3 pt-8 pb-10 text-center relative z-10">
                                                <h4 className="text-sm uppercase text-gray-500 leading-tight">Users</h4>
                                                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">3,682</h3>
                                                <p className="text-xs text-green-500 leading-tight">▲ 57.1%</p>
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0">
                                                <canvas id="chart1" height="70"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-2">
                                    <div className="rounded-lg shadow-sm mb-4">
                                        <div
                                            className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                                            <div className="px-3 pt-8 pb-10 text-center relative z-10">
                                                <h4 className="text-sm uppercase text-gray-500 leading-tight">Subscribers</h4>
                                                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">11,427</h3>
                                                <p className="text-xs text-red-500 leading-tight">▼ 42.8%</p>
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0">
                                                <canvas id="chart2" height="70"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-2">
                                    <div className="rounded-lg shadow-sm mb-4">
                                        <div
                                            className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                                            <div className="px-3 pt-8 pb-10 text-center relative z-10">
                                                <h4 className="text-sm uppercase text-gray-500 leading-tight">Comments</h4>
                                                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">8,028</h3>
                                                <p className="text-xs text-green-500 leading-tight">▲ 8.2%</p>
                                            </div>
                                            <div className="absolute bottom-0 inset-x-0">
                                                <canvas id="chart3" height="70"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default AdministrateById