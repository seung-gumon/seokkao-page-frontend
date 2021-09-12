import {gql, useLazyQuery, useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../apolloClient";
import {meQuery} from "../../__generated__/meQuery";
import {ME_QUERY} from "../me";
import {Header} from "../../component/Header";
import PleaseLogin from "../../component/PleaseLogin";
import Head from "next/head";
import {Line} from "react-chartjs-2";
import DatePicker from "react-datepicker";
import React, {forwardRef, useEffect, useState} from "react";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko'
import {getDashBoardData, getDashBoardDataVariables} from "../../__generated__/getDashBoardData";
import {GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextPage} from "next";
import {addComma, addUnit} from "../../public/constants";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBook, faHeart, faEye} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NotAccept from "../../component/NotAccept";



interface IAdministrate {
    id: number
}


interface IChartDatasets {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    fill: boolean
}

interface IChart {
    labels: string[],
    datasets: IChartDatasets[]
}


const GET_DASHBOARD_DATA = gql`
    query getDashBoardData($purchaseInput : PurChaseHistoryInput!) {
        seriesDashBoardData(purChaseInput : $purchaseInput) {
            date
            count
            series {
                thumbnail
                name
                description
                serialization
                like
                view
                category {
                    id
                    mainCategory
                    categoryName
                }
                episode {
                    id
                }
            }
        }
    }
`


const AdministrateById: NextPage<IAdministrate> = ({id}) => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const [DashBoardStartDate, setDashBoardStartDate] = useState(new Date(moment().add(-30, 'days').format('YYYY/MM/DD')));
    const [DashBoardEndDate, setDashBoardEndDate] = useState(new Date(moment().format('YYYY/MM/DD')));
    const [chartData, setChartData] = useState<IChart>({
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


    const {
        data,
        loading: SeriesFetchLoading,
        error
    } = useQuery<getDashBoardData, getDashBoardDataVariables>(GET_DASHBOARD_DATA, {
        skip: !isLoggedIn,
        variables: {
            purchaseInput: {
                seriesId: id,
                startDate: moment(DashBoardStartDate).format('YYYY-MM-DD'),
                endDate: moment(DashBoardEndDate).format('YYYY-MM-DD')
            }
        },
        onCompleted: data => {
            console.log(data, "SUCCESS")
            setChartData(() => ({
                labels: data.seriesDashBoardData.date,
                datasets: [{
                    label: "일별 열람된 개수",
                    data: data.seriesDashBoardData.count,
                    fill: true,
                    backgroundColor: "rgba(252, 211, 77,0.2)",
                    borderColor: "rgba(252, 211, 77,1)"
                }]
            }))
        }
    });



    const CalenderCustomInput = forwardRef(({value, onClick}: any, ref: any) => (
        <button className="bg-amber-300 py-0.5 px-1 rounded text-white mx-1" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    if(error) {
        return (
            <NotAccept/>
        )
    }



    if (SeriesFetchLoading) {
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


    return (
        <>
            <Head>
                <title>{data?.seriesDashBoardData.series.name} | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'p-3'}>
                    <Line data={chartData}/>
                    <div className={'flex pl-6 text-xs md:text-sm mt-2 items-center justify-center'}>
                        <div>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={DashBoardStartDate}
                                onChange={(date: Date) => setDashBoardStartDate(date)} //only when value has changed
                                customInput={<CalenderCustomInput/>}
                                disabledKeyboardNavigation={true}
                                locale={ko}
                            />
                        </div>
                        <span>~</span>
                        <div>
                            <DatePicker
                                dateFormat="yyyy/MM/dd"
                                selected={DashBoardEndDate}
                                onChange={(date: Date) => setDashBoardEndDate(date)} //only when value has changed
                                customInput={<CalenderCustomInput/>}
                                disabledKeyboardNavigation={true}
                                locale={ko}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap mx-2 my-4">
                    <div className="w-full md:w-2/6 lg:w-4/12 px-2 mb-4">
                        <div
                            className="py-1.5 text-grey-dark flex items-center flex-col justify-center bg-amber-300 border-b-4 border-r-4 border-amber-400 rounded-lg">
                            <div className={'flex items-center'}>
                                <FontAwesomeIcon icon={faEye} className={'mr-1 text-gray-600'}/>
                                <h5 className={'font-bold uppercase text-gray-600'}>열람된 총 횟수</h5>
                            </div>
                            <h3 className={'font-bold text-3xl text-gray-600'}>{addComma(Number(data?.seriesDashBoardData.series.view))}</h3>
                        </div>
                    </div>
                    <div className=" w-full md:w-2/6 lg:w-4/12 px-2 mb-4">
                        <div
                            className="py-1.5 text-grey-dark flex items-center flex-col justify-center bg-amber-300 border-b-4 border-r-4 border-amber-400 rounded-lg">
                            <div className={'flex items-center'}>
                                <FontAwesomeIcon icon={faHeart} className={'mr-1 text-gray-600'}/>
                                <h5 className={'font-bold uppercase text-gray-600'}>좋아요 개수</h5>
                            </div>
                            <h3 className={'font-bold text-3xl text-gray-600'}>{addComma(Number(data?.seriesDashBoardData.series.like))}</h3>
                        </div>
                    </div>
                    <div className="rounded w-full md:w-2/6 lg:w-4/12 px-2 mb-4">
                        <div
                            className="py-1.5 text-grey-dark flex items-center flex-col justify-center bg-amber-300 border-b-4 border-r-4 border-amber-400 rounded-lg">
                            <div className={'flex items-center'}>
                                <FontAwesomeIcon icon={faBook} className={'mr-1 text-gray-600'}/>
                                <h5 className={'font-bold uppercase text-gray-600'}>에피소드 개수</h5>
                            </div>
                            <h3 className={'font-bold text-3xl text-gray-600'}>{addComma(Number(data?.seriesDashBoardData.series.episode.length))}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <section className={'p-4 mx-auto bg-white'} style={{'maxWidth': '950px'}}>
                <h3 className={'text-xs text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis text-lg md:text-md'}>에피소드 관리하기</h3>
                <div className={'flex flex-col max-h-96 overflow-auto'}>
                    {
                        data?.seriesDashBoardData.series.episode.map((episode, index) => {
                            return (
                                <Link href={`/administrate/series/${id}/${episode.id}`} key={index}>
                                    <a>
                                        <div className={'pl-1.5 hover:bg-amber-100 py-1.5 text-xs text-gray-600 '}>
                                            <span
                                                className={'whitespace-nowrap overflow-hidden overflow-ellipsis text-xs md:text-md'}>{data?.seriesDashBoardData.series.name} {episode.id}화</span>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })
                    }
                    <div className={'flex'}>
                        <Link href={`/administrate/series/${id}/new`}>
                            <a className={'w-full'}>
                                <button
                                    className={'w-full bg-yellow-300 text-gray-600 rounded-lg py-2 mt-1.5 font-bold'}>
                                    새 에피소드 작성
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>

            <section className={'p-4 mx-auto bg-white'} style={{'maxWidth': '950px'}}>
                <h3 className={'text-xs text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis text-lg md:text-md'}>대표
                    커버 사진 변경</h3>
                <div className={'flex text-center mx-auto'}>
                    <img src={data?.seriesDashBoardData.series.thumbnail} alt={data?.seriesDashBoardData.series.name}
                         className={'w-2/6 h-auto'}/>
                    <div className={'flex'}>
                        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl cursor-pointer">
                            <div className="md:flex">
                                <div className="w-full p-3 pt-0">
                                    <div
                                        className="relative rounded-lg py-2 cursor-pointer bg-amber-300 border-amber-400 flex justify-center items-center">
                                        <div className="absolute">
                                            <div className="flex flex-col items-center cursor-pointer">
                                                <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                                                <span className="block text-xs text-gray-600 font-normal font-bold">클릭 해서 이미지 업로드<br/>사이즈 : 320*320</span>
                                            </div>
                                        </div>
                                        <input type="file" className="h-full w-full opacity-0" name=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default AdministrateById


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IAdministrate>> => {

    const apolloClient = initializeApollo();

    const {id}: any = context.query;


    return {
        props: {
            id: +id
        },
    }
}