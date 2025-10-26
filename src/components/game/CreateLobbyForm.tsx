import React, { useState } from 'react';
import {useLobbyStore} from "../../features/sort_game/hooks/useLobbyStore";
import {CreateLobbyRequest} from "../../shared/types";

interface CreateLobbyFormProps {
    onCreateLobby: (request: CreateLobbyRequest) => void;
    onCancel: () => void;
}

export const CreateLobbyForm: React.FC<CreateLobbyFormProps> = ({
                                                                    onCreateLobby,
                                                                    onCancel
                                                                }) => {
    const { playerName, setPlayerName } = useLobbyStore();
    const [formData, setFormData] = useState({
        roomName: '',
        boidGroups: 4,
        boidsPerGroup: 2,
        maxPlayers: 4
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //TODO: show error
        if (!playerName.trim()) {
            return;
        }

        onCreateLobby({
            playerName: playerName.trim(),
            ...formData
        });
    };

    const handleChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0'
        }}>
            <h3>Create New Lobby</h3>

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

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Room Name (optional):
                    </label>
                    <input
                        type="text"
                        value={formData.roomName}
                        onChange={(e) => handleChange('roomName', e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                        placeholder="Enter room name"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Number of Boid Colors:
                    </label>
                    <select
                        value={formData.boidGroups}
                        onChange={(e) => handleChange('boidGroups', parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value={2}>2 Colors</option>
                        <option value={3}>3 Colors</option>
                        <option value={4}>4 Colors</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Boids per Color:
                    </label>
                    <select
                        value={formData.boidsPerGroup}
                        onChange={(e) => handleChange('boidsPerGroup', parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value={2}>2 boids</option>
                        <option value={3}>3 boids</option>
                        <option value={4}>4 boids</option>
                        <option value={10}>10 boids</option>
                    </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'white' }}>
                        Max Players:
                    </label>
                    <select
                        value={formData.maxPlayers}
                        onChange={(e) => handleChange('maxPlayers', parseInt(e.target.value))}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value={1}>1 Player</option>
                        <option value={2}>2 Players</option>
                        <option value={3}>3 Players</option>
                        <option value={4}>4 Players</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1
                        }}
                    >
                        Create Lobby
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