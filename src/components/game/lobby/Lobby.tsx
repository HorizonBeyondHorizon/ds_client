import React, {useState} from 'react';
import {CreateLobbyForm} from '../CreateLobbyForm';
import {JoinLobbyForm} from '../JoinLobbyForm';
import {CreateLobbyRequest, JoinLobbyRequest, LobbyInfo} from "../../../shared/types";
//TODO: fix weird ts error after renaming of a file
// @ts-ignore
import {MainView} from "./MainView";

interface LobbyProps {
    lobbies: LobbyInfo[];
    onCreateLobby?: (request: CreateLobbyRequest) => void;
    onJoinLobby?: (request: JoinLobbyRequest) => void;
    onRefreshLobbies: () => void;
    playerCount: number;
    isConnected: boolean;
    isGameLobby?: boolean;
}

export type ViewMode = 'main' | 'create' | 'join';

//TODO: upd and move to utils
const emptyFunc = (): void => {
};

export const Lobby: React.FC<LobbyProps> = ({
                                                lobbies,
                                                onCreateLobby = emptyFunc,
                                                onJoinLobby = emptyFunc,
                                                onRefreshLobbies,
                                                isConnected,
                                                isGameLobby = false
                                            }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('main');

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            minHeight: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000,
            padding: '20px',
            boxSizing: 'border-box',
            overflowY: 'auto'
        }}>
            <div style={{
                maxWidth: '800px',
                width: '100%'
            }}>
                {viewMode === 'main' &&
                <MainView onJoinLobby={onJoinLobby} isConnected={isConnected} isGameLobby={isGameLobby}
                          lobbies={lobbies} onRefreshLobbies={onRefreshLobbies} setViewMode={setViewMode}/>}

                {viewMode === 'create' && (
                    <CreateLobbyForm
                        onCreateLobby={(request) => {
                            onCreateLobby(request);
                            setViewMode('main');
                        }}
                        onCancel={() => setViewMode('main')}
                    />
                )}

                {viewMode === 'join' && (
                    <JoinLobbyForm
                        onJoinLobby={(request) => {
                            onJoinLobby(request);
                            setViewMode('main');
                        }}
                        onCancel={() => setViewMode('main')}
                    />
                )}
            </div>
        </div>
    );
};