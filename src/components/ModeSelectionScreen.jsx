import React from 'react';
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'sans-serif',
        backgroundColor: '#f8f9fa',
    },
    heading: {
        fontSize: '3.5em',
        marginBottom: '10px',
        color: '#000000',
    },
    subHeading: {
        fontSize: '1.4em',
        marginBottom: '40px',
        color: '#343a40',
        fontWeight: '500',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        marginTop: '20px',
    },
    modeButton: {
        padding: '20px 30px',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        width: '300px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    classicButton: {
        backgroundColor: '#e9ecef',
        color: '#343a40',
        border: '2px solid #adb5bd',
    },
    sprintButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: '2px solid #0056b3',
    },
    buttonHover: {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
    },
    title: {
        margin: '0 0 5px 0',
        fontSize: '1.7em',
        fontWeight: 'bold',
    },
    description: {
        margin: 0,
        fontSize: '1.3em',
        opacity: 1,
        color: '#343a40',
    }
};

function ModeSelectionScreen({ setGameMode, MODES }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🤖 Gerçek mi Yapay Zeka mı? 🧐</h1>
            <p style={styles.subHeading}>Lütfen bir oyun modu seçerek zorluğa karar verin:</p>

            <div style={styles.buttonContainer}>

                <button
                    style={{...styles.modeButton, ...styles.classicButton}}
                    onClick={() => setGameMode(MODES.CLASSIC)}
                >
                    <h4 style={styles.title}>Klasik Mod</h4>
                    <p style={styles.description}>Süre sınırı yok. Her resim için detaylı analiz yapın.</p>
                </button>

                <button
                    style={{...styles.modeButton, ...styles.sprintButton}}
                    onClick={() => setGameMode(MODES.SPRINT)}
                >
                    <h4 style={styles.title}>⏱️ 60 Saniye Süre Modu</h4>
                    <p style={styles.description}>Hız önemlidir! Süre bitene kadar bilmeye çalışın.Her doğru cevabınız skor olarak yansıyacaktır</p>
                </button>
            </div>
        </div>
    );
}

export default ModeSelectionScreen;