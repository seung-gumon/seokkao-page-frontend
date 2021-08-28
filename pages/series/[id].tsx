import {
    GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult,
    GetStaticProps,
    GetStaticPropsContext, GetStaticPropsResult,
    NextPage
} from "next";
import {initializeApollo} from "../../apolloClient";
import moment from "moment";
import {mainPage, mainPageVariables} from "../../__generated__/mainPage";
import Head from "next/head";
import React from "react";
import {Header} from "../../component/Header";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {addUnit} from "../../public/constants";

interface ISeries {

}


const Series : NextPage<ISeries> = () => {
    return (
        <>
            <Head>
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'p-3'}>
                    <span>호호호</span>
                </div>
            </div>
        </>
    )
}

export default Series;


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ISeries>> => {

    const apolloClient = initializeApollo();

    const {id} = context.query;

    // const {data} = await apolloClient.query<>()


    return {
        props: {

        },
    }
}


