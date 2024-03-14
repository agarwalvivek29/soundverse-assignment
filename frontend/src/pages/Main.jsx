import { useRecoilState, useRecoilValue } from "recoil";
import { AudioBoard, Bin } from "../components/AudioBoard"
import { Library } from "../components/Library"
import NavBar from "../components/NavBar"
import { loadingAtom, nowPlayingAtom } from "../store/recoilStore";

export const Main = ()=>{
    
    const [nowPlaying, setNowPlaying] = useRecoilState(nowPlayingAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);

    return(
        loading ? 
        <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
            Loading...
        </div> : 
        (<div className="max-w-screen max-h-screen min-w-screen min-h-screen overflow-y-auto bg-[#090909]">
            <NavBar />
            <div className="flex w-full mt-[107px]">
                <Library />
                <AudioBoard />
                <Bin />               
            </div>
        </div>)
    )
}