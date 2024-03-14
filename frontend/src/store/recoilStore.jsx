import { atom } from "recoil";

export const audioBoardAtom = atom({
    key : 'audioBoardAtom',
    default : null
});

export const collaboratorsAtom = atom({
    key : 'collaboratorsAtom',
    default : null
});

export const libraryAtom = atom({
    key : 'libraryAtom',
    default : ['', '', '', '','', '', '', '']
});

export const nowPlayingAtom = atom({
    key : 'nowPlaying',
    default : null
})

export const loadingAtom = atom({
    key : 'loadingAtom',
    default : true
})