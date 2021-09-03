import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {initializeApollo} from "../../../apolloClient";
import {findByIdSeries, findByIdSeriesVariables} from "../../../__generated__/findByIdSeries";


interface IDescription {

}

const Description: NextPage<IDescription> = () => {
    return (
        <div>
            <span>헤븐 헤븐헤븐 ~ 너만의 사랑</span>
        </div>
    )
}

export default Description;



export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IDescription>> => {

    const apolloClient = initializeApollo();

    const {id}: any = context.query;



    // const {data} = await apolloClient.query<findByIdSeries, findByIdSeriesVariables>({
    //     query: FIND_BY_ID_SERIES,
    //     variables: {
    //         seriesId: +id
    //     }
    // })
    //
    // console.log(data.findByIdSeries)

    return {
        props: {

        },
    }


}
