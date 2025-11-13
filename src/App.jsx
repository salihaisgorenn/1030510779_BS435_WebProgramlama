import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';

function App() {
    const [gameState, setGameState] = useState('start');
    const [isCorrectGuess, setIsCorrectGuess] = useState(false);
    const [gameId, setGameId] = useState(0);

    const handleGuessDone = (isCorrect) => {
        if (isCorrect) {
            setIsCorrectGuess(true);
        } else {
            setIsCorrectGuess(false);
        }

        setGameState('result');
    };

    const handlePlayAgain = () => {
        setGameState('playing');
        setGameId(prevId => prevId + 1);
    };

    if (gameState === 'start') {
        const startGame = () => {
            setGameId(prevId => prevId + 1);
            setGameState('playing');
        }
        return <StartScreen onStart={startGame} />;

    } else if (gameState === 'playing') {
        return <GameScreen onGuessDone={handleGuessDone} gameId={gameId} />;

    } else if (gameState === 'result') {
        return <ResultScreen isCorrect={isCorrectGuess} onPlayAgain={handlePlayAgain} />;
    }
}

export default App;