import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameScreen from './components/GameScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import ModeSelectionScreen from './components/ModeSelectionScreen.jsx';

const MODES = {
    CLASSIC: 'CLASSIC',
    SPRINT: 'SPRINT',
    NOT_SELECTED: 'NOT_SELECTED'
};

function App() {
    const [gameState, setGameState] = useState('start');
    const [isCorrectGuess, setIsCorrectGuess] = useState(false);
    const [gameId, setGameId] = useState(0);
    const [gameMode, setGameMode] = useState(MODES.NOT_SELECTED);

    const handleStartClick = () => {
        setGameState('mode_selection');
        window.scrollTo(0, 0);
    };

    const handleModeSelected = (selectedMode) => {
        setGameMode(selectedMode);
        setGameId(prevId => prevId + 1);
        setGameState('playing');
        window.scrollTo(0, 0);
    };

    const handleBackToModes = () => {
        setGameState('mode_selection');
        window.scrollTo(0, 0);
    };

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

    const handleNextRound = () => {
        setGameId(prevId => prevId + 1);
    };

    if (gameState === 'start') {
        return (
            <StartScreen
                onStart={handleStartClick}
                currentMode={gameMode}
            />
        );
    }

    if (gameState === 'mode_selection') {
        return (
            <ModeSelectionScreen
                setGameMode={handleModeSelected}
                MODES={MODES}
            />
        );
    }

    if (gameState === 'playing') {
        return (
            <GameScreen
                onGuessDone={handleGuessDone}
                gameId={gameId}
                currentMode={gameMode}
                setGameMode={setGameMode}
                MODES={MODES}
                onNextRound={handleNextRound}
                onBackToModes={handleBackToModes}
            />
        );
    }

    else if (gameState === 'result') {
        return (
            <ResultScreen
                isCorrect={isCorrectGuess}
                onPlayAgain={handlePlayAgain}
                currentMode={gameMode}
            />
        );
    }

    return null;
}

export { MODES };
export default App;