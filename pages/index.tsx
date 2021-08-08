import {NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {initializeApollo} from "../apolloClient";
import {ApolloQueryResult, gql} from '@apollo/client'
import {hello} from "../__generated__/hello";


export const HELLO = gql`
    query hello {
        hello
    }
`


interface IHomeProps {
    id: number
}


const Home: NextPage<IHomeProps> = () => {
    return (
        <div>
            Home
        </div>
    )
}


export default Home


export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<IHomeProps>> => {

    const apolloClient = initializeApollo()

    const { data } : ApolloQueryResult<hello> = await apolloClient.query({
        query: HELLO,
    })



    return {
        props: {
            id: 1
        },
        revalidate: 10000000 //주기 몇초로 할거임 ?
    }
}