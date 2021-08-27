import {NextPage} from "next";
import CommonContentsBox from "./CommonContentsBox";
import {mainPage_orderByPopular_cartoon} from "../__generated__/mainPage";

interface IListContents {
    title : string,
    fetchData : mainPage_orderByPopular_cartoon[]
}


const CommonListContentsBox: NextPage<IListContents> =
    ({
    title,
         fetchData
     }) => {
        return (
            <div className={'bg-white p-2 mt-1'}>
                <div className={'flex justify-between items-center mb-5'}>
                    <span>{title}</span>
                    <span className={'text-xs text-gray-400 cursor-pointer'}>더보기 &rarr;</span>
                </div>
                {
                    fetchData.map((content) => {
                        return (
                            <CommonContentsBox
                                key={content.id}
                                content={content}
                            />
                        )
                    })
                }
            </div>
        )
    }

export default CommonListContentsBox