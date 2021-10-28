import {NextPage} from "next";
import PleaseLogin from "../../../../component/PleaseLogin";
import React, {useCallback, useEffect, useState} from "react";
import {useReactiveVar} from "@apollo/client";
import {initializeApollo, isLoggedInVar} from "../../../../apolloClient";
import Head from "next/head";
import {Header} from "../../../../component/Header";
import {useDropzone} from 'react-dropzone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faList} from "@fortawesome/free-solid-svg-icons";

interface INewWebToonAdmin {

}

const NewWebToonAdmin: NextPage<INewWebToonAdmin> = () => {

    const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
    const apolloClient = initializeApollo();


    const [images , setImages] = useState<string[]>([]);


    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const formBody = new FormData();
            const actualFile = acceptedFiles[0];
            formBody.append('file', actualFile);

            const url = await (await fetch("http://localhost:5001/uploads/", {
                method: "POST",
                body: formBody
            })).json();

            setImages((prev: string[]) => [...prev, url.url]);
            
        } catch(e) {
            return alert("이미지를 올릴 수 없습니다.");
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    if (!isLoggedIn) {
        return (
            <PleaseLogin/>
        )
    }

    return (
        <>
            <Head>
                <title>웹툰 새로올리기 | 석카오페이지</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className={'mx-auto'} style={{'maxWidth': '950px '}}>
                <Header/>
                <div className={`w-full ${isDragActive ? 'bg-amber-500' : 'bg-amber-300'} flex items-center h-28 border rounded-lg mt-5`}>
                    <div {...getRootProps()} className={'w-full h-full flex items-center justify-center'}>
                        <input {...getInputProps()} className={'w-full h-full'}/>
                        {
                            isDragActive ?
                                <p className={'text-xl'}>
                                    <FontAwesomeIcon icon={faFileImage} className={'mr-1.5'}/>
                                    파일이 감지 되었습니다
                                </p> :
                                <p className={'text-xl'}>
                                    <FontAwesomeIcon icon={faFileImage} className={'mr-1.5'}/>
                                    이미지 파일을 드래그 및 클릭해서 올려놔주세요
                                </p>
                        }
                    </div>
                </div>

                <span className={'text-lg'}>
                    미리보기
                </span>

                <div className={'flex flex-col w-full h-10 bg-red-300'}>
                    {
                        images.map((image : string) => {
                            return (
                                <div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </>

    )
}

export default NewWebToonAdmin