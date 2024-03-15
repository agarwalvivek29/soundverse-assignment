import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { audioBoardAtom, nowPlayingAtom } from "../store/recoilStore"
import { useContext, useState } from "react";
import Icons from "./Icons";
import { Draggable, Droppable } from "react-beautiful-dnd";
import H5AudioPlayer from "react-h5-audio-player";
import './../../node_modules/react-h5-audio-player/lib/styles.css';
import { SocketContext } from "../store/SocketContext";

export function AudioBoard(){
    const [audios,setAudios] = useRecoilState(audioBoardAtom);
    const nowPlaying = useRecoilValue(nowPlayingAtom);

    return(
        <div className="w-full bg-[#000000] flex flex-col h-full">
            <Droppable droppableId="AudioBoard" type="group">
                {(provided)=>(
                    <div className="flex overflow-x-auto " {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="max-h-[78vh] h-[78vh] overflow-y-auto overflow-y-auto w-max-full w-full overflow-x-auto flex p-4">
                            {
                                Array.isArray(audios) && audios.map((segment, index)=>{
                                    console.log(segment);
                                    return(
                                        <Draggable draggableId={'head'+index} key={index} index={index} >
                                            {(provided)=>(
                                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <HeadElement data={segment} index={index}/>
                                                </div>
                                            )}
                                        </Draggable>
                                        
                                    )
                                })
                            }
                            <AddSegment />
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className=" flex flex-grow"></div>
            <div className=""><H5AudioPlayer style={{backgroundColor : "black"}} src={nowPlaying ? nowPlaying.link : ''} className="bottom-0 flex text-whites" showFilledProgress='true'/></div>
        </div>
    )
}

function HeadElement({data, index}){
    const [isExpanded, setIsExpanded] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    function handleClick(){
        setIsExpanded(!isExpanded);
    }

    let num = 0;
    const parentIndex = index;
    return(
        <Droppable droppableId={index+''}>
            {(provided)=>(
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col justify-center items-center w-fit m-2">
                            <div className="text-white p-2 font-mono">SECTION-{index+1}</div>
                            <div className="w-[118.53px] h-[118.53px] rounded-md bg-[#181A1C] flex flex-col justify-center items-center">
                                <button><Icons who={isPlaying ? 'Pause' : 'Play'} /></button>
                            </div>
                            <button onClick={handleClick} className="w-[33.34px] h-[33.34px] shadow-2xl rounded-full bg-[#181A1C] mt-[-16.5px] text-white flex flex-col justify-center items-center">
                                <Icons who={isExpanded ? 'UpArrow' : 'DownArrow'} />
                            </button>
                        </div>
                        {
                            isExpanded && Array.isArray(data) && data.map((ele,index)=>{
                                console.log(ele);
                                return(
                                    <Draggable draggableId={''+index+parentIndex} index={index} key={index}>
                                        {(provided)=>(
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <BaseElement link={ele} key={index} index={index} parentIndex={index}/>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })
                        }
                        <AddElement />
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export function BaseElement({link,index,parentIndex=9999}){
    console.log(link);
    const [isPlaying, setIsPlaying] = useState(false);
    const [nowPlaying,setNowPlaying] = useRecoilState(nowPlayingAtom);

    function handleClick(){
        setIsPlaying(!isPlaying);
        nowPlaying ? setNowPlaying(null) : setNowPlaying({
            link,
            autoplay : isPlaying
        });        
    }

    return(
        
        <div className="w-[117.18px] h-[117.18px] rounded-md bg-[#131516] flex flex-col justify-center items-center m-1 hover:border hover:border-2">
            <button onClick={handleClick}>
                {/* <Icons who={ nowPlaying ? nowPlaying.link===link ? isPlaying ? 'Pause' : 'Play' : 'Play' : 'Play' } /> */}
                {
                    nowPlaying && nowPlaying.link === link && isPlaying && (
                        <Icons who='Pause' />
                    )
                }
                {
                    (!nowPlaying || nowPlaying.link !== link || !isPlaying) && (
                        <Icons who='Play' />
                    )
                }
            </button>
        </div>
    )
}

export function AddElement({}){
    
    return(
        <div className="w-[117.18px] h-[117.18px] rounded-md bg-[#131516] flex flex-col justify-center items-center m-1">
            <button> <Icons who='Add' /></button>
        </div>
    )
}

export function Bin(){
    return(
        <div className="absolute bottom-[90px] right-0 text-white hover:text-red-700">
            <Droppable droppableId="Bin">
                {(provided)=>(
                    <div className="m-3 p-3" {...provided.droppableProps} ref={provided.innerRef}>
                        <Icons who='Bin' />
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export function AddSegment(){
    
    const change = useContext(SocketContext);
    const setAudioBoard = useSetRecoilState(audioBoardAtom);

    function handleClick(){
        setAudioBoard((prev)=>{
            change([...prev, []]);
            return [...prev, []]
        });
    }

    return(
        <div className="w-fit m-2">
        <div className="text-white p-2 font-mono">Add Section</div>
        <div className="w-[118.53px] h-[118.53px] rounded-md bg-[#181A1C] flex flex-col justify-center items-center">
            <button onClick={handleClick}>
                <Icons who='Add' />
            </button>
        </div>
        </div>
    )
}

<div className="flex flex-col justify-center items-center w-fit m-2">
<div className="text-white p-2 font-mono invisible">SECTION-{+1}</div>
<div className="w-[118.53px] h-[118.53px] rounded-md bg-[#181A1C] flex flex-col justify-center items-center">
    <button><Icons who='Add' /></button>
</div>
</div>