import { create } from 'zustand';
import {LobbyInfo} from "../../../shared/types";
import {v4 as uuidv4} from 'uuid';

interface LobbyState {
    currentLobby: LobbyInfo | null;
    availableLobbies: LobbyInfo[];
    playerName: string;
    roomId: string | null;

    setCurrentLobby: (lobby: LobbyInfo | null) => void;
    setAvailableLobbies: (lobbies: LobbyInfo[]) => void;
    setPlayerName: (name: string) => void;
    setRoomId: (id: string | null) => void;
    clearLobby: () => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
    currentLobby: null,
    availableLobbies: [],
    playerName: uuidv4(),
    roomId: null,

    setCurrentLobby: (lobby) => set({ currentLobby: lobby }),
    setAvailableLobbies: (lobbies) => set({ availableLobbies: lobbies }),
    setPlayerName: (name) => set({ playerName: name }),
    setRoomId: (id) => set({ roomId: id }),
    clearLobby: () => set({
        currentLobby: null,
        roomId: null
    }),
}));