import React from 'react';
import {useGameWebSockets} from "../../features/sort_game/hooks/useGameWebSockets";
import {Lobby} from "../game/Lobby";
import {GameCanvas} from "../game/GameCanvas";

//TODO: upd to envs
const WS_URL = process.env.NODE_ENV === 'production'
    ? `wss://${window.location.host}`
    : 'ws://localhost:3001/api/ds_socket';

export const App: React.FC = () => {
    const {
        isConnected,
        gameState,
        playerId,
        predatorId,
        onChangePosition,
        startGame
    } = useGameWebSockets(WS_URL);

    const showLobby = !gameState?.gameStarted || !isConnected;

    return (
        <div style={{
            backgroundColor: '#1a1a1a',
            minHeight: '100vh',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: 'white', margin: 0 }}>Duck Sorter Multiplayer</h1>
                <p style={{ color: isConnected ? '#4CAF50' : '#F44336', margin: '5px 0' }}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                    {playerId && `Player: ${playerId.slice(0, 8)}`}
                </p>
            </header>

            <main>
                {showLobby && (
                    <Lobby
                        playerCount={gameState?.predators.length || 0}
                        isConnected={isConnected}
                        onStartGame={startGame}
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
}