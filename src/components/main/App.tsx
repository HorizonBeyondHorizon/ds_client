import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage} from '../../pages/HomePage';
import {GameRoomPage} from '../../pages/GameRoomPage';

export const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/room/:roomId" element={<GameRoomPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}