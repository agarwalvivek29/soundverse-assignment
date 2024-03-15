import { useRecoilValue } from "recoil"
import { libraryAtom } from "../store/recoilStore"
import { BaseElement } from "./AudioBoard";
import { Draggable, Droppable } from "react-beautiful-dnd";

export function Library(){

    const library = useRecoilValue(libraryAtom);

    return(
        <Droppable droppableId="library">
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef} className="m-4">
                    <div className="w-[45vw] max-w-[45vw]">
                        <div className="text-2xl p-3 text-white">Library</div>
                        {Array.isArray(library) && library.map((ele,index)=>{
                            return(
                                <Draggable draggableId={'lib'+index} index={index} key={index} >
                                    {(provided)=>(
                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="p-3 inline-block">
                                            <BaseElement link={ele}/>
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                    </div>
                </div>
            )}
        </Droppable>
    )
}