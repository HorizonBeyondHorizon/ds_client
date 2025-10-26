import React, { useState } from 'react';
import {useLobbyStore} from "../../features/sort_game/hooks/useLobbyStore";
import {JoinLobbyRequest} from "../../shared/types";

interface JoinLobbyFormProps {
    onJoinLobby: (request: JoinLobbyRequest) => void;
    onCancel: () => void;
}

export const JoinLobbyForm: React.FC<JoinLobbyFormProps> = ({
                                                                onJoinLobby,
                                                                onCancel
                                                            }) => {
    const { playerName, setPlayerName } = useLobbyStore();
    const [roomId, setRoomId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //TODO: show error
        if (!playerName.trim()) {
            return;
        }

        //TODO: show error
        if (!roomId.trim()) {
            return;
        }

        onJoinLobby({
            playerName: playerName.trim(),
            roomId: roomId.trim()
        });
    };

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0'
        }}>
            <h3>Join Existing Lobby</h3>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Your Name:
                    </label>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Room ID:
                    </label>
                    <input
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                        placeholder="Enter room ID"
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1
                        }}
                    >
                        Join Lobby
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#666',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};