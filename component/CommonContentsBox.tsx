import {NextPage} from "next";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {mainPage_orderByPopular_cartoon} from "../__generated__/mainPage";
import {addUnit} from "../public/constants";

interface ICommonContentsBox {
    content : mainPage_orderByPopular_cartoon
}

const CommonContentsBox: NextPage<ICommonContentsBox> =
    ({
        content
     }) => {

    return (
        <div className={'flex my-2 hover:shadow-lg rounded items-center'}>
            <Link href={"/"}>
                <>
                    <div className={'flex w-3/12 h-3/12 border rounded-xl bg-black'}  style={{'maxWidth':'120px'}}>
                        <img src={content.thumbnail} alt={content.name} className={'w-full h-auto'}/>
                    </div>
                    <div className={'flex w-/7/12 py-1.5 pl-2 font-medium flex-col'}>
                        <h3 className={'text-sm text-gray-700 py-1'}>{content.name}</h3>
                        <h6 className={'text-xs text-gray-500 font-light'}>{content.description}</h6>
                        <p className={'flex items-center mt-1.5 text-xs text-gray-500 font-light'}>
                            <FontAwesomeIcon icon={faUser} className={'text-gray-400 mr-1'}/>
                            {addUnit(content.like)}명 | {content.writer.name}
                        </p>
                    </div>
                </>
            </Link>
        </div>
    )

}

export default CommonContentsBox;