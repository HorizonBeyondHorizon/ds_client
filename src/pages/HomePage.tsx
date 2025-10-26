import React, {useCallback} from 'react';
import {useGameWebSockets} from "../features/sort_game/hooks/useGameWebSockets";
import {useLobbyStore} from "../features/sort_game/hooks/useLobbyStore";
import {CreateLobbyRequest, JoinLobbyRequest} from "../shared/types";
import {Lobby} from "../components/game/lobby/Lobby";
import {useNavigate} from "react-router-dom";

//TODO: upd to envs
const WS_URL = process.env.NODE_ENV === 'production'
    ? `wss://${window.location.host}`
    : 'ws://localhost:3001/api/ds_socket';

export const HomePage: React.FC = () => {
    const {
        isConnected,
        createLobby,
        joinLobby,
        refreshLobbies
    } = useGameWebSockets(WS_URL);
    const navigate = useNavigate();

    const { availableLobbies, currentLobby } = useLobbyStore();

    React.useEffect(() => {
        if (currentLobby) {
            navigate(`/room/${currentLobby.roomId}`)
        }
    }, [currentLobby]);

    const handleCreateLobby = useCallback((request: CreateLobbyRequest) => {
        createLobby(request);
    }, [createLobby]);

    const handleJoinLobby = useCallback((request: JoinLobbyRequest) => {
        joinLobby(request);
    }, [joinLobby]);

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            minHeight: '100vh'
        }}>
            <Lobby
                lobbies={availableLobbies}
                onCreateLobby={handleCreateLobby}
                onJoinLobby={handleJoinLobby}
                onRefreshLobbies={refreshLobbies}
                playerCount={0}
                isConnected={isConnected}
            />
        </div>
    );
};