import {NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {initializeApollo, isLoggedInVar} from "../apolloClient";
import {ApolloQueryResult, gql, useReactiveVar} from '@apollo/client'
import {hello} from "../__generated__/hello";
import {Header} from "../component/Header";


export const HELLO = gql`
    query hello {
        hello
    }
`


interface IIndex {
    id: number
}


const Index: NextPage<IIndex> = () => {


    // const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <>
            <Header/>
        </>
    )

}


export default Index


// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IHomeProps>> => {
//
//     const apolloClient = initializeApollo()
//
//     const { data } : ApolloQueryResult<hello> = await apolloClient.query({
//         query: HELLO,
//     })
//
//
//
//     return {
//         props: {
//             id: 1
//         },
//         revalidate: 10000000 //주기 몇초로 할거임 ?
//     }
// }