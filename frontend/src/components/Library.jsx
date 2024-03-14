import { useRecoilValue } from "recoil"
import { libraryAtom } from "../store/recoilStore"
import { BaseElement } from "./AudioBoard";
import { Draggable, Droppable } from "react-beautiful-dnd";

export function Library(){

    const library = useRecoilValue(libraryAtom);

    return(
        <Droppable droppableId="library">
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="w-[50vw] max-w-[50vw] border-r border-gray-700">
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