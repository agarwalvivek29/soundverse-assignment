import { useRecoilState } from 'recoil';
import './App.css'
import { Main } from './pages/Main'
import ContextProvider, { SocketContext } from './store/SocketContext'
import { DragDropContext } from 'react-beautiful-dnd';
import { audioBoardAtom, libraryAtom } from './store/recoilStore';
import { useContext } from 'react';

function App() {

    const change = useContext(SocketContext);

    const [audioBoard,setAudioBoard] = useRecoilState(audioBoardAtom);
    const [library,setLibrary] = useRecoilState(libraryAtom);

    function handleDragDrop(res){
        console.log('Event Occured');
        console.log(res);

        if(res.source.droppableId === res.destination.droppableId && res.source.index=== res.destination.index){
            console.log('No Change');
            return;
        }

        if(res.draggableId.includes('head') && res.destination.droppableId !== 'AudioBoard'){
            console.log("Segment can't be moved to the library altogether");
            return;
        }

        if(res.destination.droppableId==='AudioBoard'){
            let newAudioBoard = [...audioBoard];
            const srcIndex = res.source.index;
            const destIndex = res.destination.index;

            let [deleted] = newAudioBoard.splice(srcIndex,1);
            newAudioBoard.splice(destIndex, 0, deleted);

            setAudioBoard(newAudioBoard);     
            change(newAudioBoard);
            return console.log('Change Completed');
        }

        if(res.source.droppableId==='library'){
            if(res.destination.droppableId==='library'){
                return console.log('Not Required ATP');
            }
            else if(res.destination.droppableId==='Bin'){
                let newLibrary = [...library];
                newLibrary.splice(res.source.index,1);
                setLibrary(newLibrary);
                return console.log('Element deleted - Library');
            }
            else{
                let newLibrary = [...library];
                const ele = newLibrary[res.source.index];

                let newAudioBoard = [...audioBoard];
                let destArray = [...newAudioBoard[res.destination.droppableId]];
                destArray.splice(res.destination.index,0,ele);
                newAudioBoard.splice(res.destination.droppableId, 1, destArray);      
                setAudioBoard(newAudioBoard);
                change(newAudioBoard);
                return console.log('Element added - Library -> AudioDashBoard');                
            }
        }

        if(res.destination.droppableId==='Bin'){
            let newAudioBoard = [...audioBoard];
            let srcArray = [...newAudioBoard[res.source.droppableId]];
            const [deleted] = srcArray.splice(res.source.index,1);
            newAudioBoard.splice(res.source.droppableId, 1, srcArray);
            setAudioBoard(newAudioBoard);
            change(newAudioBoard);
            return console.log('Element Deleted - AudioBoard');
        }

        if(res.destination.droppableId==='library'){
            let newAudioBoard = [...audioBoard];
            let srcArray = [...newAudioBoard[res.source.droppableId]];
            const ele = srcArray[res.source.index];

            let newLibrary = [...library];
            newLibrary.splice(res.destination.index,0,ele);
            setLibrary(newLibrary);
            return console.log('Element added - Library');
        }

        let newAudioBoard = [...audioBoard];
        let srcArray = [...newAudioBoard[res.source.droppableId]];
        let destArray = [...newAudioBoard[res.destination.droppableId]];

        const [deleted] = srcArray.splice(res.source.index,1);
        destArray.splice(res.destination.index,0,deleted);

        newAudioBoard.splice(res.source.droppableId, 1, srcArray);
        newAudioBoard.splice(res.destination.droppableId, 1, destArray);

        setAudioBoard(newAudioBoard);
        change(newAudioBoard);
        console.log('Change Complete-level 0');

    }

    return(
        <DragDropContext onDragEnd={handleDragDrop}>
                <Main />
        </DragDropContext>
    )
}

export default App;