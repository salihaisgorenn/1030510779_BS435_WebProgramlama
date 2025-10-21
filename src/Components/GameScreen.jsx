
function GameScreen() {
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
    const imageBoxStyle = {
        border: '2px solid black',
        padding: '100px 60px',
        fontSize: '1.2em',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'transform 0.2s, box-shadow 0.2s',
    };
    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Seçimini Yap</h1>
            <p style={subHeadingStyle}>Hangi görsel yapay zeka tarafından üretilmiştir?</p>
            <div style={imageContainerStyle}>
                <div style={imageBoxStyle}>Resim 1</div>
                <div style={imageBoxStyle}>Resim 2</div>
                <div style={imageBoxStyle}>Resim 3</div>
            </div>
        </div>
    );
}
export default GameScreen;
