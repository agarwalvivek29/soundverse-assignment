import { createContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { io } from 'socket.io-client';
import { audioBoardAtom, collaboratorsAtom, loadingAtom } from './recoilStore';

const socket = io('http://localhost:3000');
// const socket = io('https://soundverse-task.onrender.com/');

export const SocketContext = createContext();

function ContextProvider({children}){

    const [audioBoard, setAudioBoard] = useRecoilState(audioBoardAtom);
    const [collaborators, setCollaborators] = useRecoilState(collaboratorsAtom);
    const [loading,setLoading] = useRecoilState(loadingAtom);
    
    useEffect(()=>{

        socket.on('change',(data)=>{
            if(data.sender!==socket.id){
                console.log(data.data);
                setAudioBoard(data.data);
                console.log('Change');
            }            
        });

        socket.on('init',(data)=>{
            setAudioBoard(data.data);
            console.log('init');
            setLoading(false);

        })

        socket.on('collab-update',(data)=>{
            setCollaborators(data);
            console.log('collabs')
        })

        return()=>{
            socket.off('change');
            socket.off('init');
            socket.off('collab-update');
        }
    },[])

    const change = (data)=>{
        console.log('Change Emitted')
        console.log(audioBoard);
        socket.emit('change',{
            data,
            sender : socket.id
        },
        () => {
            console.log('Change event emitted with updated audioBoard data:', audioBoard);
        })
    };

    return(
        <SocketContext.Provider value={ change }>
            {children}
        </SocketContext.Provider>
    )
}

export default ContextProvider;