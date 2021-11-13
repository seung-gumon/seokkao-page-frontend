import {NextPage} from "next";
import PleaseLogin from "../../component/PleaseLogin";
import React, {useEffect} from "react";
import {useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../apolloClient";
import {meQuery} from "../../__generated__/meQuery";
import {ME_QUERY} from "../me";
import NotAccept from "../../component/NotAccept";
import Head from "next/head";
import {Header} from "../../component/Header";


interface IAdministrateByNew {

}


const AdministrateByNew: NextPage<IAdministrateByNew> = () => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const apolloClient = initializeApollo();

    const {data, loading, error} = useQuery<meQuery>(ME_QUERY);


    useEffect(() => {
        console.log(data);
    }, [])


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    if (data?.me.role === 'User') {
        return (
            <NotAccept/>
        )
    }


    return (
        <>
            <Head>
                <title>새 작품 집필 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
            </div>
        </>
    )
}

export default AdministrateByNew;