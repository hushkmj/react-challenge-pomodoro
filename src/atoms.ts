import { atom } from "recoil";

export const minutesAtom = atom({
    key: "minute",
    default: 1
});

export const secondAtom = atom({
    key: "second",
    default: 2
});

export const roundAtom = atom({
    key: "round",
    default: 0
});

export const goalAtom = atom({
    key: "goal",
    default: 0
});