import {NextPage} from "next";
import {IImages} from "../pages/administrate/[id]/[episodeId]";
import {Draggable} from "react-beautiful-dnd";
import React from "react";


interface IDragbbleCard {
    image: string,
    index: number,
    deleteImage: Function
}

const DragabbleCard: NextPage<IDragbbleCard> = ({image, index, deleteImage}) => {
    return (
        <Draggable key={image} draggableId={image} index={index}>
            {(magic) => (
                <div
                    className={'float-left w-3/12'}
                    ref={magic.innerRef}
                    {...magic.dragHandleProps}
                    {...magic.draggableProps}>
                    <div className={'mt-1.5'}>
                        <img className={'border'} src={image} />
                        <button
                            className={'bg-rose-500 hover:bg-rose-700 mt-1 py-1 text-xs w-4/6 block my-2 mx-auto rounded text-white'}
                            onClick={() => deleteImage(index, image)}>
                            삭제
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default React.memo(DragabbleCard)