import {NextPage} from "next";
import Image from "next/image";
import {useForm} from "react-hook-form";
import Link from 'next/link';
import {EMAIL_PATTERN} from "../public/constants";
import Head from 'next/head';
import { ErrorMessage } from "@hookform/error-message";
import {gql, useMutation} from "@apollo/client";
import {login, loginVariables} from "../__generated__/login";
import {authTokenVar, isLoggedInVar, LOCALSTORAGE_TOKEN} from "../apolloClient";



const LOGIN_MUTATION = gql`
    mutation login($loginInput: LoginInput!) {
        Login(input: $loginInput) {
            ok
            error
            token
        }
    }
`



interface ILogin {

}

export interface ILoginForm {
    email: string
    password: string
}


const Login: NextPage<ILogin> = () => {

    const {register, handleSubmit, getValues, formState: {errors, isValid}} = useForm<ILoginForm>({
        mode : "onChange",
        criteriaMode : 'all'
    })


    const [loginMutation , {loading}] = useMutation<login,loginVariables>(LOGIN_MUTATION , {
        onCompleted : data => {
            const {
                Login: {ok, token},
            } = data;

            if (ok && token) {
                localStorage.setItem(LOCALSTORAGE_TOKEN, token);
                authTokenVar(token);
                isLoggedInVar(true);
            }

        }
    });

    const onSubmit = async () => {
        const {email, password} = getValues();
        if (loading){
            return
        };
        console.log("Loading...")
        await loginMutation({
            variables : {
                loginInput : {
                    email,
                    password
                }
            }
        })
    }




    return (
        <div className={'w-full mx-auto flex flex-col items-center my-3 lg:w-3/12'} style={{'maxWidth': '1150px'}}>
            <Head>
                <title>Login | SeokkaoPage</title>
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
                            {...register("email", {
                                required: "이메일은 필수 사항 입니다!",
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: "이메일 형식으로 적어주세요!"
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
                                required: "비밀번호는 필수 사항입니다.",
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
                        <input className={"shadow-lg pt-3 pb-3 mt-2 w-full text-white  cursor-pointer transition-colors rounded-full" + (isValid ? ' bg-amber-400' : ' bg-teal-500')} type="submit" value={!loading ? "로그인" : "Laoding..."}/>
                    </form>
                </div>
                <div>
                    <p className="mt-4 text-gray-500 text-sm">회원이 아니신가요 ?
                        <Link href={'/create-account'}>
                            <a>
                                <span className={"no-underline text-teal-500 font-base hover:text-teal-400 ml-2 cursor-pointer hover:text-amber-400"}>회원가입 하기</span>
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;