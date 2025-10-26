import {useCallback, useEffect, useRef, useState} from 'react';
import {
    ClientMessage,
    CreateLobbyRequest,
    GameState,
    JoinLobbyRequest,
    ServerMessage,
    Vector2D
} from '../../../shared/types';
import {useLobbyStore} from "./useLobbyStore";
import {WebSocketService} from "../../../services/WebSocketService";

export const useGameWebSockets = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [predatorId, setPredatorId] = useState<string | null>(null);

    //TODO: refactor / create solid websocket service
    const ws = useRef<WebSocket>(WebSocketService.getInstance(url));
    const {
        setCurrentLobby,
        setAvailableLobbies,
        setRoomId
    } = useLobbyStore();

    const sendMessage = useCallback((message: ClientMessage) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({...message, playerId}));
        }
    }, [playerId]);

    const connect = useCallback(() => {
        // ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            setIsConnected(true);
            console.log('Connected to server');

            sendMessage({type: 'get_lobbies'});
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            console.log('Disconnected from server');
        };

        ws.current.onmessage = (event) => {
            try {
                const message: ServerMessage = JSON.parse(event.data);

                switch (message.type) {
                    case 'lobby_created':
                        if (message.lobby) {
                            setCurrentLobby(message.lobby);
                            setRoomId(message.lobby.roomId);
                        }
                        break;

                    case 'lobby_joined':
                        if (message.lobby) {
                            setCurrentLobby(message.lobby);
                            setRoomId(message.lobby.roomId);
                            setPlayerId(message.playerId || null);
                            setPredatorId(message.predatorId || null);
                        }
                        break;

                    case 'lobby_list':
                        if (message.lobbies) {
                            setAvailableLobbies(message.lobbies);
                        }
                        break;

                    case 'player_joined':
                        setPlayerId(message.playerId || null);
                        setPredatorId(message.predatorId || null);
                        break;

                    case 'game_state':
                        if (message.gameState) {
                            setGameState(message.gameState);
                        }
                        break;

                    case 'error':
                        console.error('Server error:', message.error);
                        break;
                }
            } catch (error) {
                console.error('Error parsing server message:', error);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

    }, [url, sendMessage, setCurrentLobby, setAvailableLobbies, setRoomId]);

    useEffect(() => {
        connect();

        //TODO: handle when to close connection...should be during hook unmount
        // return () => {
        //     if (ws.current) {
        //         ws.current.close();
        //     }
        // };
    }, [connect]);

    const createLobby = useCallback((request: CreateLobbyRequest) => {
        sendMessage({
            type: 'create_lobby',
            payload: request
        });
    }, [sendMessage]);

    const joinLobby = useCallback((request: JoinLobbyRequest) => {
        sendMessage({
            type: 'join_lobby',
            payload: request
        });
    }, [sendMessage]);

    const onChangePosition = useCallback((position: Vector2D) => {
        sendMessage({
            type: 'input',
            payload: {position}
        });
    }, [sendMessage]);

    const startGame = useCallback(() => {
        sendMessage({
            type: 'start_game'
        });
    }, [sendMessage]);

    const leaveLobby = useCallback(() => {
        sendMessage({
            type: 'leave_lobby'
        });
        setGameState(null);
        setPlayerId(null);
        setPredatorId(null);
    }, [sendMessage]);

    const refreshLobbies = useCallback(() => {
        sendMessage({
            type: 'get_lobbies'
        });
    }, [sendMessage]);

    return {
        isConnected,
        gameState,
        playerId,
        predatorId,
        createLobby,
        joinLobby,
        onChangePosition,
        startGame,
        leaveLobby,
        refreshLobbies
    };
};