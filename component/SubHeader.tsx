import {NextPage} from "next";
import Link from "next/link";
import {useRouter} from "next/router";


const SubHeader : NextPage = () => {


    const router = useRouter();
    const path = router.pathname;


    return (
        <div className={'flex w-full bg-white'}>
            <Link href={"/"}>
                <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm' + (path === "/" ? ' border-amber-200' : ' border-gray-200')}>홈</h3>
            </Link>
            <Link href={"/webtoon"}>
                <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm' + (path === "/webtoon" ? ' border-amber-200' : ' border-gray-200')}>웹툰</h3>
            </Link>
            <Link href={'novel'}>
                <h3 className={'text-center flex-1 border-b-4 border-gray-200 text-sm' + (path === "/novel" ? ' border-amber-200' : ' border-gray-200')}>소설</h3>
            </Link>
        </div>
    )
}

export default SubHeader