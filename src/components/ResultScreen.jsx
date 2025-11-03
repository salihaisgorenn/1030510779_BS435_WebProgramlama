import React from 'react';
function ResultScreen({ isCorrect, onPlayAgain }) {

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

    const titleStyle = {
        fontSize: '3em',
        marginBottom: '10px',
        color: isCorrect ? '#28a745' : '#dc3545',
    };

    const textStyle = {
        fontSize: '1.5em',
        maxWidth: '600px',
        color: '#212529',
        marginBottom: '30px',
    };

    const buttonStyle = {
        padding: '18px 32px',
        fontSize: '22px',
        cursor: 'pointer',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>
                {isCorrect ? 'Tebrikler!' : 'Yanlış Tahmin!'}
            </h1>
            <p style={textStyle}>
                {isCorrect
                    ? 'Yapay zeka tarafından oluşturulan görseli buldun!'
                    : 'Maalesef, bu doğru cevap değil!'
                }
            </p>
            <button style={buttonStyle} onClick={onPlayAgain}>
                Tekrar Oyna
            </button>
        </div>
    );
}
export default ResultScreen;