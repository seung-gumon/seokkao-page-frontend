import React from 'react';
import {useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import {NextPage} from "next";
import {Header} from "../component/Header";
import {meQuery} from "../__generated__/meQuery";




interface IMe {

}

const ME_QUERY = gql`
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

const me  : NextPage<IMe> = () => {


    const {data} = useQuery<meQuery>(ME_QUERY);

    useEffect(() => {
        console.log(data, "DATA")
    }, [data])


    return (
        <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>

        </div>
    )
}

export default me;