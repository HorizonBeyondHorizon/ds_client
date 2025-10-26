import {LobbyList} from "../LobbyList";
import React, {Dispatch, SetStateAction} from "react";
import {JoinLobbyRequest, LobbyInfo} from "../../../shared/types";
import {ViewMode} from "./Lobby";

interface MainViewProps {
    lobbies: LobbyInfo[];
    onJoinLobby: (request: JoinLobbyRequest) => void;
    onRefreshLobbies: () => void;
    isConnected: boolean;
    isGameLobby: boolean;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

export const MainView: React.FC<MainViewProps> = ({
                             isConnected,
                             isGameLobby,
                             setViewMode,
                             lobbies,
                             onJoinLobby,
                             onRefreshLobbies
                         }) => {
    return (
        <>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <h1 style={{
                    color: 'white',
                    fontSize: '3rem',
                    margin: '0 0 10px 0',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Duck Sorter
                </h1>
                <p style={{
                    color: '#ccc',
                    fontSize: '1.2rem',
                    margin: '0 0 20px 0'
                }}>
                    Multiplayer Game
                </p>

                <div style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: isConnected ? '#4CAF50' : '#F44336',
                    color: 'white',
                    borderRadius: '20px',
                    fontSize: '14px',
                    marginBottom: '20px'
                }}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
            </div>

            {
                !isGameLobby && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        marginBottom: '30px'
                    }}>
                        <button
                            onClick={() => setViewMode('create')}
                            style={{
                                padding: '20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            Create Lobby
                        </button>

                        <button
                            onClick={() => setViewMode('join')}
                            style={{
                                padding: '20px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            Join Lobby
                        </button>
                    </div>
                )
            }

            <LobbyList
                lobbies={lobbies}
                onJoinLobby={onJoinLobby}
                onRefresh={onRefreshLobbies}
            />

            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '10px',
                marginTop: '30px'
            }}>
                <h3 style={{color: 'white', marginTop: 0}}>How to Play</h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    color: '#ccc'
                }}>
                    <div>
                        <h4 style={{color: '#4CAF50'}}>Objective</h4>
                        <p>Separate boids into monochromatic groups!</p>
                    </div>

                    <div>
                        <h4 style={{color: '#FF9800'}}>Winning</h4>
                        <p>The game ends when all boids are separated into groups of the same color.</p>
                    </div>
                </div>
            </div>
        </>
    );
};