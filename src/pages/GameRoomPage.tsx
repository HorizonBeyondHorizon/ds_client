import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useGameWebSockets} from "../features/sort_game/hooks/useGameWebSockets";
import {useLobbyStore} from "../features/sort_game/hooks/useLobbyStore";
import {GameCanvas} from "../components/game/GameCanvas";
import { Lobby as GameLobby } from "../components/game/lobby/Lobby";

const WS_URL = process.env.REACT_APP_GAME_WS_URL ? process.env.REACT_APP_GAME_WS_URL : 'ws://localhost:3001/api/ds_socket';

export const GameRoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();

    const {
        isConnected,
        gameState,
        onChangePosition,
        startGame,
        leaveLobby,
        refreshLobbies
    } = useGameWebSockets(WS_URL);

    const { currentLobby, availableLobbies, clearLobby } = useLobbyStore();

    React.useEffect(() => {
        if (roomId && (!currentLobby || currentLobby.roomId !== roomId)) {
            // console.log(`Attempting to join room: ${roomId}`);
            navigate('/')
        }
    }, [roomId, currentLobby]);

    const handleLeaveLobby = () => {
        leaveLobby();
        clearLobby();
        navigate('/');
    };

    // const showLobby = !gameState?.gameStarted || !isConnected;
    const showLobby = false;

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <header style={{
                textAlign: 'center',
                marginBottom: '20px',
                position: 'relative'
            }}>
                <button
                    onClick={handleLeaveLobby}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '10px 20px',
                        backgroundColor: '#F44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Leave Room
                </button>

                <h1 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: '2rem'
                }}>
                    Room: {currentLobby?.roomName || `Room ${roomId}`}
                </h1>

                <p style={{
                    color: isConnected ? '#4CAF50' : '#F44336',
                    margin: '5px 0'
                }}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                    {currentLobby && ` | Players: ${currentLobby.playerCount}/${currentLobby.maxPlayers}`}
                </p>
                {currentLobby && currentLobby.playerCount > 0 && !gameState?.gameStarted && (
                    <button
                        onClick={startGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    >
                        Start Game
                    </button>
                )}
            </header>

            <main>
                {showLobby && currentLobby && (
                    <GameLobby
                        lobbies={availableLobbies}
                        onRefreshLobbies={refreshLobbies}
                        playerCount={currentLobby.playerCount}
                        isConnected={isConnected}
                    />
                )}

                {gameState && (
                    <GameCanvas
                        gameState={gameState}
                        onChangePosition={onChangePosition}
                    />
                )}
            </main>
        </div>
    );
};