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

function GameScreen({ onGuessDone, gameId, currentMode, setGameMode, MODES, onNextRound }) {
    const [currentImages, setCurrentImages] = useState([]);
    const [guessCount, setGuessCount] = useState(0);
    const [disabledImages, setDisabledImages] = useState([]);
    const [hint, setHint] = useState(null);

    const INITIAL_TIME_MS = 60 * 1000;
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_MS);
    const [timerRunning, setTimerRunning] = useState(false);
    const [score, setScore] = useState(0);

    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        let interval = null;

        if (currentMode === MODES.SPRINT && timerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 10);
            }, 10);
        } else if (timeLeft <= 0 && currentMode === MODES.SPRINT) {
            clearInterval(interval);
            setTimerRunning(false);
        }

        return () => clearInterval(interval);
    }, [currentMode, timerRunning, timeLeft, MODES.SPRINT]);

    useEffect(() => {
        if (feedback && currentMode === MODES.SPRINT) {
            const timeout = setTimeout(() => {
                setFeedback(null);

                if (feedback === 'correct' || feedback === 'secondWrong') {
                    onNextRound();
                }
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [feedback, currentMode, MODES.SPRINT, onNextRound]);


    useEffect(() => {
        if (gameId === 1 && currentMode === MODES.SPRINT) {
            setTimeLeft(INITIAL_TIME_MS);
            setTimerRunning(true);
            setScore(0);
        } else if (currentMode === MODES.CLASSIC) {
            setTimerRunning(false);
        }

        setGuessCount(0);
        setDisabledImages([]);
        setHint(null);
        setFeedback(null);

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

    }, [gameId, currentMode]);


    const handleImageClick = (image) => {
        if (disabledImages.includes(image.id) || (currentMode === MODES.SPRINT && timeLeft <= 0)) {
            return;
        }

        if (image.isAI) {
            if (currentMode === MODES.SPRINT) {
                setFeedback('correct');
                setScore(prev => prev + 1);
            } else {
                onGuessDone(true);
            }

        } else {
            setDisabledImages(prevDisabled => [...prevDisabled, image.id]);

            if (currentMode === MODES.SPRINT) {
                if (guessCount === 0) {
                    setFeedback('wrong');
                    setGuessCount(1);
                    const aiImageInRound = currentImages.find(img => img.isAI);
                    const fallbackHint = 'Bu resimdeki detaylar sence de tuhaf değil mi?';

                    if (aiImageInRound && aiImageInRound.hint) {
                        setHint(aiImageInRound.hint);
                    } else {
                        setHint(fallbackHint);
                    }
                } else {
                    setFeedback('secondWrong');
                }

            } else {
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
        marginBottom: '10px',
        color: '#555',
        minHeight: '27px',
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

    const timerStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: timeLeft <= 10000 && currentMode === MODES.SPRINT ? '#dc3545' : '#28a745',
        marginBottom: '15px',
    };


    const feedbackStyle = {
        fontSize: '2em',
        fontWeight: 'bolder',
        marginBottom: '15px',
        height: '40px',
        transition: 'opacity 0.3s',
    };

    const getFeedbackText = () => {
        switch(feedback) {
            case 'correct':
                return { text: ' 🎉 Doğru Bildin!', color: '#28a745' };
            case 'wrong':
                return { text: ' 💡 Yanlış Tahmin, İpucuna bak !', color: '#ffc107' };
            case 'secondWrong':
                return { text: '❌ Yanlış Bildin', color: '#dc3545' };
            default:
                return { text: '', color: 'transparent' };
        }
    }
    const currentFeedback = getFeedbackText();

    const modeTitle = currentMode === MODES.SPRINT ? `⏱️ 60 Saniye Sprint | Skor: ${score}` : 'Seçimini Yap';

    if (currentImages.length === 0) {
        return <div style={containerStyle}><h1>Görseller yükleniyor...</h1></div>
    }

    const formatTime = (ms) => {
        if (ms < 0) return "0.00 sn";
        const seconds = Math.floor(ms / 1000);
        const remainderMs = ms % 1000;
        return `${seconds}.${String(remainderMs).padStart(3, '0').substring(0, 2)} sn`;
    };

    return (
        <div style={containerStyle}>

            <h1 style={headingStyle}>{modeTitle}</h1>

            {currentMode === MODES.SPRINT && timeLeft > 0 && (
                <div style={timerStyle}>
                    Kalan Süre: {formatTime(timeLeft)}
                </div>
            )}

            {((currentMode === MODES.CLASSIC) || (currentMode === MODES.SPRINT && timeLeft > 0)) && !feedback ? (
                <p style={subHeadingStyle}>Hangisi yapay zeka tarafından üretilmiştir?</p>
            ) : (
                <div style={{...feedbackStyle, color: currentFeedback.color, opacity: feedback ? 1 : 0}}>
                    {currentFeedback.text}
                </div>
            )}

            {currentMode === MODES.SPRINT && timeLeft <= 0 && (
                <div style={{ ...timerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    SÜRE BİTTİ! Toplam Skor: {score}

                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>

                        <button
                            onClick={() => {
                                setGameMode(currentMode);
                                onNextRound();
                            }}
                            style={{
                                padding: '12px 25px',
                                fontSize: '1em',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Tekrar Oyna (60 sn)
                        </button>

                        <button
                            onClick={() => setGameMode(MODES.NOT_SELECTED)}
                            style={{
                                padding: '12px 25px',
                                fontSize: '1em',
                                backgroundColor: '#343a40',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Ana Menüye Dön
                        </button>
                    </div>
                </div>
            )}

            <div style={imageContainerStyle}>
                {currentImages.map((image) => {
                    const isDisabled = disabledImages.includes(image.id) || (currentMode === MODES.SPRINT && timeLeft <= 0);

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