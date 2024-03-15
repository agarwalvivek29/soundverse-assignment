import { atom } from "recoil";

import audio1 from './../assets/audio1.mp3';
import audio2 from './../assets/audio2.mp3';
import audio3 from './../assets/audio3.mp3';
import audio4 from './../assets/audio4.mp3';
import audio5 from './../assets/audio5.mp3';

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
    default : [audio1, audio2, audio3, audio4, audio5]
});

export const nowPlayingAtom = atom({
    key : 'nowPlaying',
    default : null
});

export const loadingAtom = atom({
    key : 'loadingAtom',
    default : true
});