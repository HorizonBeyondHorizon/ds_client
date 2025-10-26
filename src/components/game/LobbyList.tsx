import React from 'react';
import {useLobbyStore} from "../../features/sort_game/hooks/useLobbyStore";
import {JoinLobbyRequest, LobbyInfo} from "../../shared/types";

interface LobbyListProps {
    lobbies: LobbyInfo[];
    onJoinLobby: (request: JoinLobbyRequest) => void;
    onRefresh: () => void;
}

export const LobbyList: React.FC<LobbyListProps> = ({
                                                        lobbies,
                                                        onJoinLobby,
                                                        onRefresh
                                                    }) => {
    const { playerName } = useLobbyStore();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting': return '#4CAF50';
            case 'in_progress': return '#FF9800';
            case 'finished': return '#F44336';
            default: return '#666';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'waiting': return 'Waiting';
            case 'in_progress': return 'In Progress';
            case 'finished': return 'Finished';
            default: return status;
        }
    };

    if (lobbies.length === 0) {
        return (
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                margin: '20px 0',
                textAlign: 'center'
            }}>
                <p style={{ color: 'white', margin: 0 }}>
                    No active lobbies found. Create one to start playing!
                </p>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px 0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <h3 style={{ margin: 0, color: 'white' }}>Available Lobbies</h3>
                <button
                    onClick={onRefresh}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#666',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Refresh
                </button>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {lobbies.map((lobby) => (
                    <div
                        key={lobby.roomId}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <h4 style={{
                                margin: 0,
                                color: 'white',
                                fontSize: '16px'
                            }}>
                                {lobby.roomName || `Room ${lobby.roomId.slice(0, 8)}`}
                            </h4>

                            <span
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: getStatusColor(lobby.status),
                                    color: 'white',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}
                            >
                {getStatusText(lobby.status)}
              </span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginBottom: '10px',
                            fontSize: '14px',
                            color: '#ccc'
                        }}>
                            <div>Host: {lobby.hostName}</div>
                            <div>Players: {lobby.playerCount}/{lobby.maxPlayers}</div>
                            <div>Boid Colors: {lobby.boidGroups}</div>
                            <div>Boids per Color: {lobby.boidsPerGroup}</div>
                        </div>

                        {lobby.status === 'waiting' && lobby.playerCount < lobby.maxPlayers && (
                            <button
                                onClick={() => {
                                    //TODO: show error
                                    if (!playerName.trim()) {
                                        return;
                                    }
                                    onJoinLobby({roomId: lobby.roomId, playerName});
                                }}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    backgroundColor: '#2196F3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Join Lobby
                            </button>
                        )}

                        {lobby.status === 'in_progress' && (
                            <div style={{
                                padding: '8px',
                                backgroundColor: '#FF9800',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}>
                                Game in progress
                            </div>
                        )}

                        {lobby.status === 'finished' && (
                            <div style={{
                                padding: '8px',
                                backgroundColor: '#F44336',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}>
                                Game finished
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};