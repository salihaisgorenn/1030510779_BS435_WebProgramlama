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

    if (gameMode === MODES.NOT_SELECTED) {
        return (
            <ModeSelectionScreen setGameMode={setGameMode} MODES={MODES} />
        );
    }

    if (gameState === 'start') {
        const startGame = () => {
            setGameId(prevId => prevId + 1);
            setGameState('playing');
        }

        return <StartScreen onStart={startGame} currentMode={gameMode} />;

    } else if (gameState === 'playing') {
        return (
            <GameScreen
                onGuessDone={handleGuessDone}
                gameId={gameId}
                currentMode={gameMode}
                setGameMode={setGameMode}
                MODES={MODES}
                onNextRound={handleNextRound} // YENİ PROP
            />
        );

    } else if (gameState === 'result') {

        return <ResultScreen isCorrect={isCorrectGuess} onPlayAgain={handlePlayAgain} currentMode={gameMode} />;
    }
}

export { MODES };
export default App;