import React, { useState, useEffect } from 'react';
import { gameImages } from '../data/gameData.jsx';

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function GameScreen({ onGuess, gameId }) {
    const [currentImages, setCurrentImages] = useState([]);

    useEffect(() => {
        const realImages = gameImages.filter(img => !img.isAI);
        const aiImages = gameImages.filter(img => img.isAI);
        const shuffledReals = shuffleArray(realImages).slice(0, 2);
        const shuffledAI = shuffleArray(aiImages).slice(0, 1);
        const finalImages = shuffleArray([...shuffledReals, ...shuffledAI]);
        setCurrentImages(finalImages);
    }, [gameId]);

    const handleImageClick = (image) => {
        onGuess(image.isAI);
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'sans-serif',
    };
    const headingStyle = {
        fontSize: '3em',
        marginBottom: '10px',
    };
    const subHeadingStyle = {
        fontSize: '1.5em',
        marginBottom: '40px',
        color: '#555',
    };
    const imageContainerStyle = {
        display: 'flex',
        gap: '30px',
    };
    const imageCardStyle = {
        border: '3px solid black',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '400px',
        height: '400px',
        backgroundColor: '#eee',
    };
    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '8px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Seçimini Yap</h1>
            <p style={subHeadingStyle}>Hangisi yapay zeka tarafından üretilmiştir?</p>

            <div style={imageContainerStyle}>
                {currentImages.map((image) => {
                    const uniqueTimestamp = new Date().getTime() + image.id;
                    const uniqueSrc = `${image.src}&t=${uniqueTimestamp}`;
                    return (
                        <div
                            key={image.id}
                            style={imageCardStyle}
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={uniqueSrc}
                                alt="Yapay zeka"
                                style={imageStyle}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GameScreen;
