import {NextPage} from "next";
import Image from 'next/image'
import {useForm} from "react-hook-form";
import {
    faSearch,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import {useRouter} from "next/router";
import {useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../apolloClient";


interface IHeader {

}


interface IForm {
    keyword: string;
}

export const Header: NextPage<IHeader> = () => {


    const {register, handleSubmit, getValues, formState,} = useForm<IForm>({
        mode: 'onChange'
    })

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);


    const submit = () => {
        const {keyword} = getValues();
    }

    const router = useRouter();


    const onClickWay = () => {
        if (isLoggedIn) {
            return router.push("/me");
        } else {
            return router.push("/login");
        }
    }


    return (
        <header className={'bg-white'}>
            <div className={'w-full sticky flex justify-between px-3 items-center'}>
                <Link href={"/"}>
                    <a className={'mt-3'}>
                        <Image src={"/logo-kakaopage.svg"} alt={'kakaopage'} width={'130px'} height={'29px'}/>
                    </a>
                </Link>
                <div className="p-4 pb-3 pr-0 flex justify-center items-center">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="bg-white flex items-center rounded-full border border-gray-200">
                            <input {...register('keyword')}
                                   className="rounded-l-full w-full px-3 text-gray-700 leading-tight focus:outline-none text-xs"
                                   type={'text'} placeholder={'작품명을 검색하세요'}/>
                            <div className="p-1">
                                <button
                                    className="bg-amber-300 text-white rounded-full p-3 hover:bg-amber-500 focus:outline-none w-6 h-6 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faSearch} className={'far text-grey-800 text-sm'}/>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className={'ml-2'} onClick={() => onClickWay()}>
                        <FontAwesomeIcon icon={faUser} className={'red-300 text-3xl hover:text-amber-500'}/>
                    </div>
                </div>
            </div>
        </header>
    )
}


