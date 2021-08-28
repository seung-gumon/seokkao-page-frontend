import React, {useEffect} from 'react';
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {NextPage} from "next";
import {Header} from "../component/Header";
import {meQuery} from "../__generated__/meQuery";
import Head from "next/head";
import Link from 'next/link';
import {useRouter} from 'next/router'
import {UserRole} from "../__generated__/globalTypes";
import {isLoggedInVar} from "../apolloClient";
import PleaseLogin from "../component/PleaseLogin";

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

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const {data ,loading, error} = useQuery<meQuery>(ME_QUERY);


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
                <title>내 정보 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>

            <div className={'mx-auto'} style={{'maxWidth': '950px'}}>
                <Header/>
                <div className={'bg-white p-6 md:p-20'}>
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
                        <span className={'text-sm my-1.5 text-gray-400'}>석카오페이지 닉네임과 프로필 사진을 설정합니다.</span>
                        {
                            data?.me.role !== UserRole.User &&
                            <Link href={"/my-work"}>
                                <a>
                                    <div
                                        className={'flex border border-solid border-gray-200 items-center justify-between '}>
                                        <div className={'text-gray-800 py-2 px-4 text-sm'}>내 작품 보기</div>
                                        <div className={'text-gray-800 py-2 px-4 text-sm'}>&rarr;</div>
                                    </div>
                                </a>
                            </Link>
                        }
                    </div>

                </div>

            </div>

        </>
    )
}

export default me;


