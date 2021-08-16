import {NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {isLoggedInVar} from "../apolloClient";
import {useReactiveVar} from '@apollo/client'
import {Header} from "../component/Header";


interface IIndex {
    id: number
}


const Index: NextPage<IIndex> = () => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    return (
        <>
            <div className={'mx-auto'} style={{'maxWidth': '1150px'}}>
                <Header
                    isLoggedIn={isLoggedIn}
                />
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