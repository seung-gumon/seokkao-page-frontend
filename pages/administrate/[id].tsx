import {gql, useLazyQuery, useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../apolloClient";
import {meQuery} from "../../__generated__/meQuery";
import {ME_QUERY} from "../me";
import {mySeries} from "../../__generated__/mySeries";
import {Header} from "../../component/Header";
import PleaseLogin from "../../component/PleaseLogin";
import {MY_SERIES} from "../my-work";
import Head from "next/head";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import {forwardRef, useEffect, useState} from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko'
import {getDashBoardData, getDashBoardDataVariables} from "../../__generated__/getDashBoardData";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {findByIdSeries, findByIdSeriesVariables} from "../../__generated__/findByIdSeries";
import {FIND_BY_ID_SERIES} from "../series/[id]";


interface IAdministrate {
    id : number
}


interface IChartDatasets {
    label : string,
    data : number[],
    backgroundColor : string,
    borderColor : string,
    fill : boolean
}

interface IChart {
    labels : string[],
    datasets : IChartDatasets[]
}

const GET_DASHBOARD_DATA = gql`
    query getDashBoardData($purchaseInput : PurChaseHistoryInput! , $seriesId : Float!) {
        seriesDashBoardData(purChaseInput : $purchaseInput) {
            date
            count    
        }
        totalPurchase(seriesId : $seriesId)
    }
`



const AdministrateById : NextPage<IAdministrate> = ({id}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const [DashBoardStartDate, setDashBoardStartDate] = useState(new Date(moment().add(-7, 'days').format('YYYY/MM/DD')));
    const [DashBoardEndDate, setDashBoardEndDate] = useState(new Date(moment().format('YYYY/MM/DD')));
    const [chartData , setChartData] = useState<IChart>({
        labels: [],
        datasets: [
            {
                label: "요일별 열람된 개수",
                data: [],
                fill: true,
                backgroundColor: "rgba(252, 211, 77,0.2)",
                borderColor: "rgba(252, 211, 77,1)"
            },
        ]
    })


    const [fetching, {loading: SeriesFetchLoading}] = useLazyQuery<getDashBoardData , getDashBoardDataVariables>(GET_DASHBOARD_DATA , {
        variables : {
            seriesId : id,
            purchaseInput : {
                seriesId : id,
                startDate : moment(DashBoardStartDate).format('YYYY-MM-DD'),
                endDate: moment(DashBoardEndDate).format('YYYY-MM-DD')
            }
        },
        onCompleted: data => {
            setChartData((prev) => ({
                labels : data.seriesDashBoardData.date,
                datasets : [{
                    label: "요일별 열람된 개수",
                    data: data.seriesDashBoardData.count,
                    fill: true,
                    backgroundColor: "rgba(252, 211, 77,0.2)",
                    borderColor: "rgba(252, 211, 77,1)"
                }]
            }))
        }
    });


    const {loading, error} = useQuery<meQuery>(ME_QUERY, {
        onCompleted: data => {
            if (data) {
                fetching();
            }
        }
    });






    const CalenderCustomInput = forwardRef(({ value, onClick } : any, ref : any ) => (
        <button className="bg-amber-300 py-0.5 px-1 rounded text-white mx-1" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));


    if (loading || SeriesFetchLoading) {
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
                <title>나의 작품 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'p-3'}>
                    <Line data={chartData} />
                    <div className={'flex pl-6 text-xs md:text-sm mt-2 items-center justify-center'}>
                        <div>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={DashBoardStartDate}
                                onChange={(date : Date) =>setDashBoardStartDate(date)} //only when value has changed
                                customInput={<CalenderCustomInput />}
                                disabledKeyboardNavigation={true}
                                locale={ko}
                            />
                        </div>
                        <span>~</span>
                        <div>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={DashBoardEndDate}
                                onChange={(date: Date) =>setDashBoardEndDate(date)} //only when value has changed
                                customInput={<CalenderCustomInput />}
                                disabledKeyboardNavigation={true}
                                locale={ko}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdministrateById


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IAdministrate>> => {

    const apolloClient = initializeApollo();

    const {id}: any = context.query;


    return {
        props: {
            id : +id
        },
    }
}