import React, { useState, useEffect } from 'react';
import { gameImages } from '../data/gameData.jsx';
import { ArrowLeft } from 'lucide-react';

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function GameScreen({ onGuessDone, gameId, currentMode, MODES, onNextRound, onBackToModes }) {
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
        if (currentMode === MODES.SPRINT) {
            setTimerRunning(true);
        }
    }, [currentMode]);


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
        if (currentMode === MODES.CLASSIC) {
            setTimerRunning(false);
        }

        setGuessCount(0);
        setDisabledImages([]);
        setHint(null);
        setFeedback(null);

        const realImages = gameImages.filter(img => !img.isAI);
        const aiImages = gameImages.filter(img => img.isAI);

        if (aiImages.length < 1 || realImages.length < 2) {
            console.error("Yeterli görsel verisi bulunamadı!");
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

    }, [gameId, currentMode, MODES.CLASSIC]);


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
                    setHint(aiImageInRound?.hint || fallbackHint);
                } else {
                    setFeedback('secondWrong');
                }

            } else {
                if (guessCount === 0) {
                    setGuessCount(1);
                    const aiImageInRound = currentImages.find(img => img.isAI);
                    const fallbackHint = 'Bu resimdeki detaylar sence de tuhaf değil mi?';
                    setHint(aiImageInRound?.hint || fallbackHint);
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
        position: 'relative',
    };


    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        zIndex: 100,
        transition: 'all 0.2s ease',
    };

    const headingStyle = {
        fontSize: '2.5em',
        marginBottom: '10px',
        marginTop: '60px',
        fontWeight: '800',
        color: '#1f2937'
    };
    const subHeadingStyle = {
        fontSize: '1.2em',
        marginBottom: '20px',
        color: '#4b5563',
        minHeight: '27px',
    };
    const imageContainerStyle = {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
    };
    const imageCardStyle = {
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        borderRadius: '12px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '350px',
        height: '350px',
        backgroundColor: '#f3f4f6',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden'
    };
    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };
    const hintStyle = {
        fontSize: '1.2em',
        color: '#2563eb',
        fontWeight: '600',
        marginTop: '20px',
        minHeight: '30px',
    };

    const timerStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
        color: timeLeft <= 10000 ? '#dc2626' : '#16a34a',
        marginBottom: '15px',
    };

    const feedbackStyle = {
        fontSize: '1.8em',
        fontWeight: 'bold',
        marginBottom: '15px',
        height: '40px',
        transition: 'opacity 0.3s',
    };

    const getFeedbackText = () => {
        switch(feedback) {
            case 'correct':
                return { text: ' 🎉 Doğru Bildin!', color: '#16a34a' };
            case 'wrong':
                return { text: ' 💡 Yanlış Tahmin, İpucuna bak!', color: '#d97706' };
            case 'secondWrong':
                return { text: '❌ Yanlış Bildin', color: '#dc2626' };
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

            <button
                onClick={onBackToModes}
                style={backButtonStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
            >
                <ArrowLeft size={20} />
                <span>Mod Seçimine Dön</span>
            </button>

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
                <div style={{ ...timerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1f2937' }}>
                    <div>SÜRE BİTTİ!</div>
                    <div style={{fontSize: '0.8em', marginTop: '10px'}}>Toplam Skor: {score}</div>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>

                        <button
                            onClick={() => {
                                setTimeLeft(INITIAL_TIME_MS);
                                setScore(0);
                                setTimerRunning(true);
                                onNextRound();
                            }}
                            style={{
                                padding: '12px 25px',
                                fontSize: '0.6em',
                                backgroundColor: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                            }}
                        >
                            Tekrar Oyna (60 sn)
                        </button>

                        <button
                            onClick={onBackToModes}
                            style={{
                                padding: '12px 25px',
                                fontSize: '0.6em',
                                backgroundColor: '#4b5563',
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
                                opacity: isDisabled ? 0.5 : 1,
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                transform: isDisabled ? 'none' : 'scale(1)',
                            }}
                            onClick={() => handleImageClick(image)}
                            onMouseEnter={(e) => {
                                if(!isDisabled) e.currentTarget.style.transform = 'translateY(-5px)';
                            }}
                            onMouseLeave={(e) => {
                                if(!isDisabled) e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <img
                                src={image.displaySrc}
                                alt="Seçenek"
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