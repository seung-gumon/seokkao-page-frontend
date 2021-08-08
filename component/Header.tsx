import {NextPage} from "next";

interface IHeader {

}


export const Header : NextPage<IHeader> = () => {
    return (
        <div className={'w-full mx-auto'} style={{'maxWidth':'1150px'}}>
            Hello Im Header
        </div>
    )
}
