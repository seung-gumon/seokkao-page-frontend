import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextPage
} from "next";
import {Header} from "../component/Header";
import React from "react";
import Head from "next/head";
import {useQuery} from "@apollo/client";
import {meQuery} from "../__generated__/meQuery";
import {ME_QUERY} from "./me";
import {initializeApollo} from "../apolloClient";
import {mainPage, mainPageVariables} from "../__generated__/mainPage";



interface IMyWork {

}

const MyWork : NextPage<IMyWork> = ({}) => {


    return (
        <>
            <Head>
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '950px'}}>
                <Header/>
                <span>Hello we are bts</span>
            </div>
        </>

    )
}

export default MyWork


export const getServerSideProps : GetServerSideProps = async (context : GetServerSidePropsContext) : Promise<GetServerSidePropsResult<IMyWork>> => {

    const apolloClient = initializeApollo();

    console.log(context)
    // console.log(apolloClient)


    return {
        props : {

        }
    }
}