import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';

function App() {
    const [gameState, setGameState] = useState('start');

    if (gameState === 'start') {
        return <StartScreen onStart={() => setGameState('playing')} />;

    } else if (gameState === 'playing') {
        return <GameScreen />;
    }

    return <StartScreen onStart={() => setGameState('playing')} />;
}
export default App;
