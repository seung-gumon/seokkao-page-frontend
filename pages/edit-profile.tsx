import Head from "next/head";
import {Header} from "../component/Header";
import Link from "next/link";
import React, {useEffect} from "react";
import {gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import {ME_QUERY} from "./me";
import {meQuery} from "../__generated__/meQuery";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {EMAIL_PATTERN} from "../public/constants";
import {editProfile, editProfileVariables} from "../__generated__/editProfile";
import {initializeApollo, isLoggedInVar} from "../apolloClient";
import PleaseLogin from "../component/PleaseLogin";
import NotAccept from "../component/NotAccept";
import {useRouter} from "next/router";
import {MY_SERIES} from "./my-work";

interface IMeForm {
    name: string
    email: string
}

const EDIT_PROFILE = gql`
    mutation editProfile($editProfile: UpdateInput!) {
        editProfile(input: $editProfile) {
            ok
            error
        }
    }
`

const EditProfile = () => {


    const {data , error} = useQuery<meQuery>(ME_QUERY);
    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const router = useRouter();

    const {register, handleSubmit, getValues, setValue, formState: {errors, isValid}} = useForm<IMeForm>({
        mode: "onChange",
        criteriaMode: 'all'
    })

    const [editProfileMutation] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE , {
        onCompleted : data => {
            if (!data.editProfile.ok) {
                return alert(data.editProfile.error);
            }
            return alert("프로필 수정을 완료하였습니다");
        },
        refetchQueries: [
            {query: ME_QUERY},
            {query: MY_SERIES}
        ]
    });


    useEffect(() => {
        if (!data) return
        setValue('name', data.me.name)
        setValue('email', data.me.email)
    }, [data])

    const updateMyProfile = async () => {
        const confirm = window.confirm("정보를 업데이트 하시겠습니까 ?");
        if (!confirm) return;

        const {email, name} = getValues()
        await editProfileMutation({
            variables : {
                editProfile : {
                    email,
                    name
                }
            }
        })
    }


    if (!data || !isLoggedIn || error) {
        return (
            <NotAccept/>
        )
    }


    return (
        <>
            <Head>
                <title>나의 프로필 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto bg-white'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={'p-3 flex justify-center'}>
                    <div className={'flex flex-col'}>
                        <div className={'flex w-full items-center'}>
                            <span className={'w-24'}>나의 이름</span>
                            <input {...register('name', {
                                required: true,
                                minLength: {
                                    value: 2,
                                    message: "최소 2글자 이상 적어주세요"
                                },
                            })}
                                   name={'name'}
                                   className="bg-transparent border-b ml-1.5 block border-gray-500 text-gray-500 py-2 px-1 focus:outline-none"
                                   type="text"
                            />

                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({message}) => {
                                return (
                                    <p className={'errorMessage text-sm'}>{message ?? "최소 2글자 이상 적어주세요"}</p>
                                )
                            }}
                        />


                        <div className={'flex w-full items-center mt-3'}>
                            <span className={'w-24'}>나의 이메일</span>
                            <input
                                {...register("email", {
                                    required: "이메일은 필수 사항 입니다!",
                                    pattern: {
                                        value: EMAIL_PATTERN,
                                        message: "이메일 형식으로 적어주세요!"
                                    },
                                })}
                                   name={'email'}
                                   className="bg-transparent border-b ml-1.5 block border-gray-500 text-gray-500 py-2 px-1 focus:outline-none"
                                   type="text"
                            />

                        </div>
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({message}) => {
                                return (
                                    <p className={'errorMessage text-sm'}>{message ?? "이메일 형식으로 적어주세요!"}</p>
                                )
                            }}
                        />
                        <div className={`${isValid ? "bg-amber-300 hover:bg-amber-400 cursor-pointer" : 'bg-gray-200 pointer-events-none'} w-full text-center mt-3 py-2 rounded-md`} onClick={updateMyProfile}>변경하기</div>
                    </div>

                </div>
            </div>
        </>
    )
}


export default EditProfile