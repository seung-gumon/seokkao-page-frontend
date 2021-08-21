import React from 'react';
import {useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import {
    NextPage,
    GetServerSideProps,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
    GetServerSidePropsContext
} from "next";
import {Header} from "../component/Header";
import {meQuery} from "../__generated__/meQuery";
import Head from "next/head";
import {initializeApollo} from "../apolloClient";
import Link from 'next/link';
import {useRouter} from 'next/router'

interface IMe {
}

export const ME_QUERY = gql`
    query meQuery {
        me {
            id
            email
            role
            name
            coin
        }
    }
`;

const me: NextPage<IMe> = () => {


    const router = useRouter();
    const {data, loading} = useQuery<meQuery>(ME_QUERY, {
        onError: error => {
            if (error) {
                localStorage.removeItem('login-token');
                return router.push("/");
            }
        }
    });


    useEffect(() => {
        const checkLoginToken = async () => {
            const token = localStorage.getItem('login-token');
            if (!token) {
                return router.push("/");
            }
            return;
        }
        (async () => {
            await checkLoginToken();
        })();
    }, [])


    if (loading) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <>
            <Head>
                <title>내 정보 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>
                <Header/>
                <div className={'mt-3 bg-white p-6 md:p-20'}>
                    <h3 className={'text-2xl text-gray-500'}><span
                        className={'text-black font-semibold'}>{data?.me.name}</span>님의 계정정보 </h3>
                    <div className={'flex w-full mt-9 flex-col'}>
                        <div className={'flex border border-solid border-gray-200 items-center py-2 px-4'}>
                            <span className={'text-gray-400 text-sm'} style={{'minWidth': '150px'}}>석카오 회원번호</span>
                            <span className={'text-left text-gray-800 text-sm'}>{data?.me.id}</span>
                        </div>
                        <div className={'flex border border-solid border-gray-200 items-center py-2 px-4 border-t-0'}>
                            <span className={'text-gray-400 text-sm'} style={{'minWidth': '150px'}}>석카오계정 이메일</span>
                            <span className={'text-left text-gray-800 text-sm'}>{data?.me.email}</span>
                        </div>

                        <Link href={"/edit-profile"}>
                            <a>
                                <div
                                    className={'flex border border-solid border-gray-200 items-center justify-between mt-4'}>
                                    <div className={'text-gray-800 py-2 px-4 text-sm'}>프로필 설정</div>
                                    <div className={'text-gray-800 py-2 px-4 text-sm'}>&rarr;</div>
                                </div>
                            </a>
                        </Link>
                        <span className={'text-sm mt-1.5 text-gray-400'}>석카오페이지 닉네임과 프로필 사진을 설정합니다.</span>
                    </div>

                </div>

            </div>

        </>
    )
}

export default me;


