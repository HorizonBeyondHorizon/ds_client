import React from 'react';

interface LobbyProps {
    playerCount: number;
    isConnected: boolean;
    onStartGame: () => void;
}

export const Lobby: React.FC<LobbyProps> = ({playerCount, isConnected, onStartGame}) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000
        }}>
            <h1>Duck Sorter Multiplayer</h1>

            <div style={{margin: '20px 0'}}>
                <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
                <p>Players: {playerCount}/4</p>
            </div>

            <div style={{margin: '20px 0', textAlign: 'center', maxWidth: '400px'}}>
                <h3>Objective:</h3>
                <p>Separate the ducks into monochromatic groups!</p>
            </div>

            {playerCount > 0 && (
                <button
                    onClick={onStartGame}
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
        </div>
    );
};