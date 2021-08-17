import {NextPage} from "next";

interface IListContents {

}


const CommonListContentsBox: NextPage<IListContents> =
    ({

     }) => {
        return (
            <div className={'bg-white p-2 mt-1'}>
                <span>슈배앰</span>
            </div>
        )
    }

export default CommonListContentsBox