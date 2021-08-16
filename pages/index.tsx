import {NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {Header} from "../component/Header";
import SubHeader from "../component/SubHeader";
import Head from "next/head";
import React from "react";
import Slick from "../component/Slick";


interface IIndex {
    id: number
}


const Index: NextPage<IIndex> = () => {

    // const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    return (
        <>
            <Head>
                <title>홈 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>
                <Header/>
                <SubHeader/>
                <Slick/>
            </div>
        </>
    )
}


export default Index


// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IIndex>> => {
//
//     const apolloClient = initializeApollo()
//
//
//     return {
//         props: {
//             id: 1
//         },
//         revalidate: 10000000 //주기 몇초로 할거임 ?
//     }
// }