import {NextPage} from "next";
import Link from "next/link";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface ICommonContentsBox {

}

const CommonContentsBox: NextPage<ICommonContentsBox> = () => {
    return (
        <div className={'flex my-2 hover:shadow-lg rounded items-center'}>
            <Link href={"/"}>
                <>
                    <div className={'flex w-3/12 h-3/12 border rounded-xl bg-black'}  style={{'maxWidth':'120px'}}>
                        <img src={'https://i.pinimg.com/originals/91/19/23/911923b3743b47d601b801a4531a8823.png '} alt={"루피"} className={'w-full h-auto'}/>
                    </div>
                    <div className={'flex w-/7/12 py-1.5 pl-2 font-medium flex-col'}>
                        <h3 className={'text-sm text-gray-700 py-1'}>루피는 즐겁다</h3>
                        <h6 className={'text-xs text-gray-500 font-light'}>너 우리 루피건들면 다죽어</h6>
                        <p className={'flex items-center mt-1.5 text-xs text-gray-500 font-light'}>
                            <FontAwesomeIcon icon={faUser} className={'text-gray-400 mr-1'}/>
                            40.1만명 | 김승석
                        </p>
                    </div>
                </>
            </Link>
        </div>
    )

}

export default CommonContentsBox;