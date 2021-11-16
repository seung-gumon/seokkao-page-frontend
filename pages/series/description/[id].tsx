import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {initializeApollo} from "../../../apolloClient";
import {findByIdSeries, findByIdSeriesVariables} from "../../../__generated__/findByIdSeries";
import {gql} from "@apollo/client";
import {SERIES_FRAGMENT} from "../../../fragments";
import {workDescription, workDescriptionVariables} from "../../../__generated__/workDescription";
import Head from "next/head";
import React from "react";
import {Header} from "../../../component/Header";

export const FIND_BY_ID_SERIES = gql`
    query workDescription($seriesId : Float!) {
        findByIdSeries(seriesId : $seriesId) {
            ...SeriesParts
            category {
                categoryName
                mainCategory
            }
            writer {
                name
            }
        }
    }
    ${SERIES_FRAGMENT}
`


interface IDescription {
    data : workDescription | null
}

const Description: NextPage<IDescription> = ({data}) => {
    return (
        <>
            <Head>
                <title>작품 설명 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto w-full'} style={{'maxWidth': '950px'}}>
                <Header/>
            </section>
            <section className={'mx-auto w-full bg-white'} style={{'maxWidth': '950px'}}>
                <div className={'p-3 bg-white w-full flex'}>
                    <h5 className={'text-gray-500 text-center'} style={{'minWidth':'17%'}}>작품 설명</h5>
                    <div className={'flex flex-col'}>
                        <p className={'text-gray-500 ml-2 text-sm line-clamp-5'}>{data?.findByIdSeries?.description}</p>
                        <ul className={'flex flex-col mt-8 ml-2 w-full text-sm text-gray-500'}>
                            <li className={'w-full flex mt-1'}>
                                <span className={'font-bold w-20'}>카테고리</span>
                                <span>{data?.findByIdSeries?.category?.categoryName}</span>
                            </li>
                            <li className={'w-full flex mt-1'}>
                                <span className={'font-bold w-20'}>발행자</span>
                                <span>석카오 페이지</span>
                            </li>
                            <li className={'w-full flex mt-1'}>
                                <span className={'font-bold w-20'}>연령등급</span>
                                <span>전체 이용가</span>
                            </li>
                            <li className={'w-full flex mt-1'}>
                                <span className={'font-bold w-20'}>전자책 정가</span>
                                <span>{data?.findByIdSeries?.category?.mainCategory === 'Novel' ?
                                    "1코인/회차 당"
                                    :
                                    "2코인/회차 당"
                                }</span>
                            </li>
                            <li className={'w-full flex mt-1'}>
                                <span className={'font-bold w-20'}>작가</span>
                                <span>{data?.findByIdSeries?.writer.name}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Description;


const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IDescription>> => {
    try{
        const apolloClient = initializeApollo();

        const {id}: any = context.query;



        const {data} = await apolloClient.query<workDescription , workDescriptionVariables>({
            query: FIND_BY_ID_SERIES,
            variables: {
                seriesId: +id
            }
        })



        return {
            props: {
                data
            },
        }
    }catch (e) {
        return {
            props : {
                data : null
            }
        }
    }



}
