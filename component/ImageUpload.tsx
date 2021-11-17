import {NextPage} from "next";
import React, {ChangeEvent, useEffect, useState} from "react";
import {uploadImage, uploadNovelProfileSizeCheck} from "../public/constants";


interface IImageUpload {
    setState: Function
}


declare global {
    interface FileList {
        forEach(callback: (f: File) => void) : void;
    }
}



const ImageUpload: NextPage<IImageUpload> =
    ({
        setState
     }) => {

        const [uploadLoading , setUploadLoading] = useState<boolean>(false);

        const uploadProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
            setUploadLoading(() => true);
            const file = e.target.files;
            if (!file) return;

            const base64ImgUrl = await uploadNovelProfileSizeCheck(file);
            const img = new Image();

            img.onload = async () => {
                if (img.naturalWidth === 320 && img.naturalHeight === 320) {
                    try {
                        const novelProfileImage: Promise<string> = await uploadImage(file[0]);
                        setUploadLoading(() => false);
                        return setState(novelProfileImage);
                    } catch (e) {
                        setUploadLoading(() => false);
                        return alert("이미지를 업로드 할 수 없습니다.")
                    }
                } else {
                    setUploadLoading(() => false);
                    return alert("가로 세로 320px 이미지만 업로드 가능합니다.");
                }
            }
            if (base64ImgUrl) {
                img.src = base64ImgUrl.preview;
            } else {
                return;
            }
        }


        if (uploadLoading) {
            return (
                <div className=" flex justify-center flex-col items-center text-gray-600">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500"></div>
                    이미지를 가져오는중입니다..
                </div>
            )
        }


        return (
            <div className="flex">
                <div className="max-w-2xl rounded-lg">
                    <div>
                        <label className="inline-block mb-2 text-gray-500">사이즈 : 320 * 320</label>
                        <div className="flex items-center justify-center w-full">
                            <label
                                className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div className="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                    </svg>
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">이미지 파일을 올려주세요</p>
                                </div>
                                <input type="file" multiple={false} className="opacity-0" accept={'image/*'} onChange={(e) => uploadProfileImage(e) }/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default ImageUpload