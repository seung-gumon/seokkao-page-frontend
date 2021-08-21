import {NextPage} from "next";
import CommonContentsBox from "./CommonContentsBox";

interface IListContents {
    title : string
}


const CommonListContentsBox: NextPage<IListContents> =
    ({
    title
     }) => {
        return (
            <div className={'bg-white p-2 mt-1'}>
                <div className={'flex justify-between items-center mb-5'}>
                    <span>{title}</span>
                    <span className={'text-xs text-gray-400 cursor-pointer'}>더보기 &rarr;</span>
                </div>
                <CommonContentsBox/>
            </div>
        )
    }

export default CommonListContentsBox