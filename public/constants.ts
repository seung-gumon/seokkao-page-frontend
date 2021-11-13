export const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PHONE_PATTERN = /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/


export const addUnit = (like: number) => {
    const stringLike = like.toString();
    let returnValue = '';

    if (stringLike.length < 5) {
        return stringLike;
    }

    for (let i = 5; i <= 7; i++) {
        if (stringLike.length === i) {
            return returnValue = stringLike.substr(0, i - 4) + "만";
        }
    }
}

export const addComma = (like: number) => {
    return like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export const uploadImage = async (file: File) => {
    const formBody = new FormData();
    formBody.append('file', file);

    const url = await (await fetch("http://localhost:5001/uploads/", {
        method: "POST",
        body: formBody
    })).json();
    return url.url;
}

export const uploadNovelProfileSizeCheck = (files: FileList) => {
    const preview = Array.from(files).map((file: any) =>
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        })
    )
    preview.forEach((item: any) => {
        const img = new Image();
        img.onload = () => {
            if (img.naturalWidth === 320 && img.naturalHeight === 320) {
                return true;
            } else {
                return alert("이미지 가로 320 * 세로 320만 업로드 가능합니다.");
            }
        };
        img.src = item.preview;
    });
}