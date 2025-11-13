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

// GÜNCELLENDİ: Prop'un adı artık 'onGuessDone'
function GameScreen({ onGuessDone, gameId }) {
    const [currentImages, setCurrentImages] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [disabledImages, setDisabledImages] = useState([]);
    const [hint, setHint] = useState(null);

    useEffect(() => {
        setGuessCount(0);
        setDisabledImages([]);
        setHint(null);


        const realImages = gameImages.filter(img => !img.isAI);
        const aiImages = gameImages.filter(img => img.isAI);

        if (aiImages.length < 1 || realImages.length < 2) {
            console.error("Yeterli görsel verisi bulunamadı! Lütfen gameData.js dosyasını kontrol edin.");
            return;
        }


        const shuffledReals = shuffleArray(realImages).slice(0, 2);
        const shuffledAI = shuffleArray(aiImages).slice(0, 1);


        const finalImages = shuffleArray([...shuffledReals, ...shuffledAI]);
        const imagesWithUniqueUrls = finalImages.map(image => {
            let uniqueSrc = image.src;
            if (image.src.includes('picsum.photos')) {
                uniqueSrc = `${image.src}&v=${gameId}-${image.id}`;
            }
            return {
                ...image,
                displaySrc: uniqueSrc
            };
        });

        setCurrentImages(imagesWithUniqueUrls);

    }, [gameId]);

    const handleImageClick = (image) => {
        if (disabledImages.includes(image.id)) {
            return;
        }

        if (image.isAI) {
            onGuessDone(true);

        } else {
            setDisabledImages(prevDisabled => [...prevDisabled, image.id]);

            if (guessCount === 0) {

                setGuessCount(1);
                const aiImageInRound = currentImages.find(img => img.isAI);
                const fallbackHint = 'Bu resimdeki detaylar sence de tuhaf değil mi?';

                if (aiImageInRound && aiImageInRound.hint) {
                    setHint(aiImageInRound.hint);
                } else {
                    setHint(fallbackHint);
                }
            } else {
                onGuessDone(false);
            }
        }
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
        transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.3s',
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
    const hintStyle = {
        fontSize: '1.3em',
        color: '#007bff',
        fontWeight: 'bold',
        height: '30px',
        margin: '20px 0',
        transition: 'opacity 0.5s',
    };
    if (currentImages.length === 0) {
        return <div style={containerStyle}><h1>Görseller yükleniyor...</h1></div>
    }

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Seçimini Yap</h1>
            <p style={subHeadingStyle}>Hangisi yapay zeka tarafından üretilmiştir?</p>

            <div style={imageContainerStyle}>
                {currentImages.map((image) => {
                    const isDisabled = disabledImages.includes(image.id);

                    return (
                        <div
                            key={image.id}
                            style={{
                                ...imageCardStyle,
                                opacity: isDisabled ? 0.4 : 1,
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                            }}
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image.displaySrc}
                                alt="Yapay zeka "
                                style={imageStyle}
                            />
                        </div>
                    );
                })}
            </div>
            <div style={hintStyle}>
                {hint && `İpucu: ${hint}`}
            </div>

        </div>
    );
}

export default GameScreen;