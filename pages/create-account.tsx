import {NextPage} from "next";
import {useForm} from "react-hook-form";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {EMAIL_PATTERN} from "../public/constants";
import {ErrorMessage} from "@hookform/error-message";
import {ILoginForm} from "./login";


interface ICreateAccount {

}

interface ICreateAccountForm extends ILoginForm{
    name : string
    phoneNumber : string
    role : string
}



const CreateAccount : NextPage<ICreateAccount> = () => {
    const {register, handleSubmit, getValues, formState: {errors, isValid}} = useForm<ICreateAccountForm>({
        mode : "onChange",
        criteriaMode : 'all'
    })


    const onSubmit = () => {
        console.log("trigger LoginFunction")
        const {email, password} = getValues();
    }




    return (
        <div className={'w-full mx-auto flex flex-col items-center my-3 lg:w-3/12'} style={{'maxWidth': '1150px'}}>
            <Head>
                <title>Create Account | SeokkaoPage</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Link href={'/'}>
                <a>
                    <Image className={'cursor-pointer'} src={"/logo-kakaopage.svg"} alt={'kakaoPage'} width={'130px'} height={'29px'}/>
                </a>
            </Link>
            <div className="w-full flex flex-col bg-cover bg-center justify-content bg-white p-6 rounded pt-8 pb-8">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("name", {
                                required: "이름을 기입해주세요",
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none"
                            type="text"
                            name={'name'}
                            placeholder="이름을 적어주세요"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className={'errorMessage text-sm'} key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                        <input
                            {...register("phoneNumber", {
                                required: "전화번호를 기입해주세요",
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none"
                            type="text"
                            name={'phoneNumber'}
                            placeholder="전화번호를 기입해주세요"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="phoneNumber"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className={'errorMessage text-sm'} key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                        <input
                            {...register("email", {
                                required: "이메일을 적어주세요",
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: "이메일을 적어주세요"
                                },
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none"
                            type="text"
                            name={'email'}
                            placeholder="이메일을 적어주세요"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className={'errorMessage text-sm'} key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />

                        <input
                            {...register('password', {
                                required: "비밀번호를 적어주세요",
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none"
                            type="password"
                            name={'password'}
                            placeholder="비밀번호를 적어주세요"/>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p className={'errorMessage text-sm'} key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                        <input className={"shadow-lg pt-3 pb-3 mt-2 w-full text-white  cursor-pointer transition-colors rounded-full" + (isValid ? ' bg-amber-400' : ' bg-teal-500')} type="submit" value="회원가입 완료!"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount