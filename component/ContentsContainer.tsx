import React from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const ContentsContainer = () => {

    return (
        <>
            <div className="grid grid-flow-row grid-cols-5 grid-rows-5 gap-4 w-full bg-white px-2">
                <div className={'flex flex-col'}>
                    <div className={'bg-black'}>
                        <img
                            src="https://seungseokkakaopage.s3.amazonaws.com/1629819086973222579663_435816184095465_8383383209098632333_n.jpg"
                            alt={"loopy"} className={'w-full h-auto h-full rounded-lg'}/>
                    </div>
                    <span className={'my-1 text-xs text-gray-600'}>루피</span>
                    <span className={'text-gray-800'} style={{'fontSize': '10px'}}>
                        <FontAwesomeIcon icon={faUser} className={'text-gray-400 mr-1'}/>
                        40.1만명
                    </span>
                </div>

            </div>
            <div className={'flex bg-white w-full items-center justify-center'}>
                <span className={'text-black text-center'}>더보기</span>
            </div>
        </>
    )

}


export default ContentsContainer