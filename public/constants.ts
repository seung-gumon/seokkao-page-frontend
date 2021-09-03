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
            return returnValue = stringLike.substr(0, i-4) + "만";
        }
    }
}

export const addComma = (like : number) => {
    return like.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}