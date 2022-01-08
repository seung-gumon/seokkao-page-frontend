import {NextPage} from "next";
import {IImages} from "../pages/administrate/[id]/[episodeId]";
import {Draggable} from "react-beautiful-dnd";
import React from "react";


interface IDragbbleCard {
    image: IImages,
    index: number,
    deleteImage: Function
}

const DragabbleCard: NextPage<IDragbbleCard> = ({image, index, deleteImage}) => {
    return (
        <Draggable key={"" + image.id} draggableId={"" + image.id} index={index}>
            {(magic) => (
                <div key={index} ref={magic.innerRef}
                     {...magic.dragHandleProps}
                     {...magic.draggableProps}>
                    <div className={'mt-1.5 w-1/12'}>
                        <img className={'border '} src={image.src}/>
                        <button
                            className={'bg-rose-500 hover:bg-rose-700 mt-1 py-1 text-xs w-4/6 mx-auto rounded text-white'}
                            onClick={() => deleteImage(index, image.src)}>
                            삭제
                        </button>
                    </div>
                </div>


            )}
        </Draggable>
    )
}

export default DragabbleCard