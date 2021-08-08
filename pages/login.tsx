import {NextPage} from "next";
import Image from "next/image";
import {useForm} from "react-hook-form";
import Link from 'next/link';

interface ILogin {

}

interface ILoginForm {
    id: string
    password: string
}


const Login: NextPage<ILogin> = () => {

    const {register, handleSubmit, getValues, formState,} = useForm<ILoginForm>({
        mode: 'onChange'
    })

    const login = () => {
        const {id, password} = getValues();
        console.log(id, password)
    }

    return (
        <div className={'w-full mx-auto flex flex-col items-center my-3 lg:w-3/12'} style={{'maxWidth': '1150px'}}>
            <Image src={"/logo-kakaopage.svg"} alt={'kakaopage'} width={'130px'} height={'29px'}/>
            <div
                className="w-full flex flex-col bg-cover bg-center justify-content bg-white p-6 rounded pt-8 pb-8">
                <div className="text-left text-gray-500 mb-6">
                    <h2 className={'font-bold'}>어서오세요 석카오페이지 입니다</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit(login)}>
                        <input
                            {...register('id', {
                                required: true
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-6 text-gray-500 py-2 px-1 focus:outline-none"
                            type="text"
                            placeholder="ID를 적어주세요"/>
                        <input
                            {...register('password', {
                                required: true
                            })}
                            className="bg-transparent border-b m-auto block border-gray-500 w-full mb-2 text-gray-500 py-2 px-1 focus:outline-none"
                            type="password"
                            placeholder="비밀번호를 적어주세요"/>
                        <input
                            className="shadow-lg pt-3 pb-3 mt-2 w-full text-white bg-teal-500 cursor-pointer transition-colors hover:bg-amber-400 rounded-full "
                            type="submit" value="로그인"/>
                    </form>
                </div>
                <div>
                    <p className="mt-4 text-gray-500 text-sm">아이디가 아직 없으신가요 ?
                        <Link href={'/create-account'}>
                            <span
                                className={"no-underline text-teal-500 font-bold hover:text-teal-400 ml-2 cursor-pointer hover:text-amber-400"}>회원가입 하기</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;