import { useRecoilValue } from "recoil";
import Icons from "./Icons";
import { collaboratorsAtom } from "../store/recoilStore";
import image from './../assets/image.png'
import random from './../assets/react.svg'

function NavBar(){
    return(
        <div className="absolute w-screen bg-black text-white h-[107px]   border-b border-[#252525] flex justify-between items-center">
            <div>
                <div className=" w-[225px] h-[74px] ml-5 p-2">
                    <img src={image} className=""/>
                </div>
            </div>
            <div className="flex items-center">
                <Collaborators />
                <button className="border rounded-[17px] w-[144px] h-[67px] text-xl m-2">Share</button>
                <button className="border rounded-[17px] w-[144px] h-[67px] text-xl  m-2">Export</button>
                <div>
                    <img src={random} className="w-[47px] h-[47px] rounded-full m-3"/>
                </div>
            </div>
        </div>
    )
}

export default NavBar;

function Collaborators(){

    const collaborators = useRecoilValue(collaboratorsAtom);

    return(
        <div className="flex">
            {Array.isArray(collaborators) && (
                collaborators.map((person,index)=>{
                    return(
                        <div key={index}>
                            {index < 5 && 
                            (
                                <div className="ml-[-1rem] rounded-full bg-gray-700">
                                    {/* {person.image ? <img src={person.image} className="w-10 h-10 p-1"/> : <div className="text-2xl p-1  w-10 h-10 text-center">{person.name[0]}</div>} */}
                                    <div className="text-2xl p-1  w-10 h-10 text-center">{person[0]}</div>
                                </div>
                            )}
                        </div>
                    )
                })                
            )}
            { Array.isArray(collaborators) && (collaborators.length< 5 ? ("") : 
            (
                <div className="ml-[-1rem] rounded-full bg-gray-700">
                    <div className="text-sm p-1 w-10 h-10 flex flex-col justify-center items-center">+   {collaborators.length - 5}</div>
                </div>
            ))}
        </div>
    )
}