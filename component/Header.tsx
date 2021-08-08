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


    const submit = () => {
        const {keyword} = getValues();
        console.log(keyword);
    }

    const router = useRouter();
    const query = router.query.query;



    const isLoggedIn = useReactiveVar(isLoggedInVar);

    return (
        <>
            <div className={'w-full mx-auto sticky flex justify-between px-3 xl:px-0'} style={{'maxWidth': '1150px'}}>
                <Image src={"/logo-kakaopage.svg"} alt={'kakaopage'} width={'130px'} height={'29px'}/>
                <div className="p-4 pb-3 pr-0 flex justify-center items-center">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="bg-white flex items-center rounded-full border border-gray-200">
                            <input {...register('keyword')}
                                   className="rounded-l-full w-full px-3 text-gray-700 leading-tight focus:outline-none text-sm"
                                   type={'text'} placeholder={'작품명을 검색하세요'}/>
                            <div className="p-1">
                                <button
                                    className="bg-amber-300 text-white rounded-full p-3 hover:bg-amber-500 focus:outline-none w-6 h-6 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faSearch} className={'far text-grey-800 text-sm'}/>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className={'ml-2'}>
                        <Link href={isLoggedIn ? '/me' : '/login'}>
                            <FontAwesomeIcon icon={faUser} className={'red-300 text-3xl hover:text-amber-500'}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'flex w-full'}>
                <Link href={"/"}>
                    <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm' + (!query ? ' border-amber-200' : ' border-gray-200')}>홈</h3>
                </Link>
                <Link href={"/webtoon"}>
                    <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm'}>웹툰</h3>
                </Link>
                <Link href={'novel'}>
                    <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm'}>소설</h3>
                </Link>
            </div>
        </>


    )
}
