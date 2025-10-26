import {useEffect, useRef, useState} from 'react';
import {ClientMessage, GameState, ServerMessage, Vector2D} from '../../../shared/types';

export const useGameWebSockets = (url: string) => {
    const [isConnected, setIsConnected] = useState(false);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [predatorId, setPredatorId] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            setIsConnected(true);
            console.log('Connected to server');
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            console.log('Disconnected from server');
        };

        ws.current.onmessage = (event) => {
            try {
                const message: ServerMessage = JSON.parse(event.data);

                switch (message.type) {
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

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);

    const sendMessage = (message: ClientMessage) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({...message, playerId}));
        }
    };

    const onChangePosition = (position: Vector2D) => {
        sendMessage({
            type: 'input',
            position
        });
    };

    const startGame = () => {
        sendMessage({
            type: 'start_game'
        });
    };

    return {
        isConnected,
        gameState,
        playerId,
        predatorId,
        onChangePosition,
        startGame
    };
};