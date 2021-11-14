import {NextPage} from "next";
import PleaseLogin from "../../component/PleaseLogin";
import React, {useEffect, useState} from "react";
import {gql, useLazyQuery, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../apolloClient";
import {meQuery} from "../../__generated__/meQuery";
import {ME_QUERY} from "../me";
import NotAccept from "../../component/NotAccept";
import Head from "next/head";
import {Header} from "../../component/Header";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import ImageUpload from "../../component/ImageUpload";
import {getCategoryByAdminRole, getCategoryByAdminRoleVariables} from "../../__generated__/getCategoryByAdminRole";
import {createSeries, createSeriesVariables} from "../../__generated__/createSeries";
import {useRouter} from "next/router";
import {MY_SERIES} from "../my-work";
import {MAIN_PAGE_QUERY} from "../index";
import moment from "moment";


interface IAdministrateByNew {

}


interface INewWorkInput {
    workName: string
    description : string
}


interface ICreateSeries {
    categoryId : number
    description : string
}


const GET_CATEGORY_BY_ADMIN_ROLE = gql`
    query getCategoryByAdminRole($mainCategory : String!) {
        getCategoryByAdminRole(mainCategory : $mainCategory) {
            id
            categoryName
        }
    }
`


const CREATE_SERIES = gql`
    mutation createSeries($input : CreateSeriesInput!) {
        createSeries(input : $input) {
            ok
            error
        }
    }
`


const AdministrateByNew: NextPage<IAdministrateByNew> = () => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const apolloClient = initializeApollo();
    const router = useRouter();


    const [thumbnail, setThumbnail] = useState<string>("");


    const {register, handleSubmit, getValues, formState: {errors, isValid}} = useForm<INewWorkInput>({
        mode: "onChange",
        criteriaMode: 'all'
    })



    const {data : meData, loading, error} = useQuery<meQuery>(ME_QUERY , {
        onCompleted : data => {
            if (data) {
                fetchCategoryData({
                    variables : {
                        mainCategory : data.me.role
                    }
                })
            }
        }
    });

    const [createSeriesMutation] = useMutation<createSeries, createSeriesVariables>(CREATE_SERIES, {
        onCompleted: data => {
            if (data.createSeries.ok) {
                alert("시리즈 생성 완료");
                return router.push("/my-work");
            } else {
                return alert("시리즈 생성에 실패하였습니다.")
            }
        },
        refetchQueries: [
            {
                query: MY_SERIES
            },
            {
                query: MAIN_PAGE_QUERY,
                variables: {
                    today: moment().format('dddd')
                }
            }
        ]
    });

    const [fetchCategoryData, {data: categoryData}] = useLazyQuery<getCategoryByAdminRole, getCategoryByAdminRoleVariables>(GET_CATEGORY_BY_ADMIN_ROLE);

    const [createSeriesState, setCreateSeries] = useState<ICreateSeries>({
        categoryId: 999,
        description: ""
    })


    const createSeries = async () => {

        const {workName , description} = getValues();


        if (createSeriesState.categoryId === 999) {
            return alert("카테고리를 지정해주세요 !")
        }

        await createSeriesMutation({
            variables : {
                input : {
                    name : workName,
                    description,
                    thumbnail : thumbnail,
                    serialization : serializationDay.join(","),
                    writerId : meData?.me.id ?? 0,
                    category : createSeriesState.categoryId,
                }
            }
        })
    }

    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    if (meData?.me.role === 'User') {
        return (
            <NotAccept/>
        )
    }

    const [arrayDay] = useState<string[]>(['월', '화', '수', '목', '금', '토', '일']);
    const [serializationDay, setSerializationDay] = useState<string[]>([]);

    const changeSerialization = (day: string) => {
        const findDay = serializationDay.find((item: string) => item === day);
        if (!findDay) {
            setSerializationDay((prev) => [...prev, day]);
        } else {
            const filterSerializationDay = serializationDay.filter((item) => item !== day);
            setSerializationDay(filterSerializationDay);
        }
    }


    return (
        <>
            <Head>
                <title>새 작품 집필 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <section className={'mx-auto bg-white'} style={{'maxWidth': '950px'}}>
                <Header/>
                <div className={'p-3'}>
                    <section>
                        <div className={'flex items-center mb-4'}>
                            <h4>작품 제목</h4>
                            <div className={'flex flex-col w-8/12'}>
                                <input
                                    {...register("workName", {
                                        required: "작품제목은 필수 사항 입니다!",
                                    })}
                                    className="bg-transparent border-b block border-gray-500 w-12/12 text-gray-500 py-2 px-1 focus:outline-none ml-3"
                                    type="text"
                                    name={'workName'}
                                    placeholder="작품 제목을 적어주세요"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="workName"
                                    render={({messages}) => {
                                        return messages
                                            ? Object.entries(messages).map(([type, message] , index) => (
                                                <p className={'errorMessage text-sm ml-3.5 mt-1.5'}
                                                   key={type}>{message}</p>
                                            ))
                                            : null;
                                    }}
                                />
                            </div>
                        </div>
                        <div className={'flex mb-4 flex-col'}>
                            <h4>작품 소개</h4>
                            <div className={'flex flex-col w-full'}>
                                <textarea
                                    {...register("description", {
                                        required: "작품설명은 필수 사항 입니다!",
                                    })}
                                    className="bg-transparent border-b block border-gray-500 w-full text-gray-500 py-2 px-1 focus:outline-none"
                                    name={'description'}
                                    placeholder="작품 소개를 적어주세요"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="description"
                                    render={({messages}) => {
                                        return messages
                                            ? Object.entries(messages).map(([type, message] , index) => (
                                                <p className={'errorMessage text-sm ml-3.5 mt-1.5'}
                                                   key={type}>{message}</p>
                                            ))
                                            : null;
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                    <section className={'mt-10'}>
                        <h3 className={'text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis mb-1.5 md:text-md'}>연재 요일 (색칠된 부분이 연재되는 날)</h3>
                        <ul className={'flex mt-0.5'}>
                            {arrayDay.map((day,index) => {
                                return (
                                    <li key={index} onClick={() => changeSerialization(day)}
                                        className={`${serializationDay.includes(day) ? 'bg-amber-300' : ''} mx-1 p-1.5 rounded bg-opacity-80 cursor-pointer`}>{day}</li>
                                )
                            })}
                        </ul>
                    </section>

                    <section className={'mt-10'}>
                        <h3 className={'text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis mb-1.5 md:text-md'}>작품 표지</h3>
                        {
                            !thumbnail ?
                                <ImageUpload
                                    setState={setThumbnail}
                                />
                                :
                                <img className={'mt-3'} src={thumbnail} alt={"표지 이미지"}/>
                        }
                    </section>
                    <section className={'mt-10 flex flex-col'}>
                        <h3 className={'text-gray-600 whitespace-nowrap overflow-hidden overflow-ellipsis mb-1.5 md:text-md'}>작품 카테고리 선택</h3>
                        <ul className={'w-full lg:w-5/12 shadow-inner overflow-y-auto p-3'} style={{'minHeight' : '250px'}}>
                            {
                                categoryData?.getCategoryByAdminRole.map((category) => {
                                    return (
                                        <li key={category.id}
                                            className={`py-0.5 px-0.5 ${category.id === createSeriesState.categoryId && ' bg-gray-200'}`}
                                            onClick={() => setCreateSeries((prev) => ({
                                            ...prev,
                                            categoryId : category.id
                                        }))}>{category.categoryName}</li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <button className={'bg-amber-300 hover:bg-amber-500 py-2 w-full rounded-md my-3'} onClick={createSeries}>작품 생성하기</button>
                </div>
            </section>
        </>
    )
}

export default AdministrateByNew;