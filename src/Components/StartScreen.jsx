
function StartScreen({ onStart }) {
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
    const rulesStyle = {
        textAlign: 'left',
        maxWidth: '500px',
        margin: '25px 0',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1.1em',
    };
    const modesTextStyle = {
        fontSize: '1.2em',
        maxWidth: '600px',
        margin: '0 0 25px 0',
        color: '#333',
    };
    const buttonStyle = {
        padding: '15px 30px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#55aee7',
        color: 'white',
    };
    return (
        <div style={containerStyle}>
            <h1>Real Or AI?</h1>
            <p style={{ fontSize: '1.3em', maxWidth: '600px' }}>
                Yapay zeka tarafından üretilen görseller her yerde! Peki sen, bir sanat eserini veya fotoğrafı yapay zeka ürününden ayırt edebilir misin? Dikkatini ve sezgilerini test etme zamanı!
            </p>

            <div style={rulesStyle}>
                <h2 style={{ textAlign: 'center', marginTop: 0 }}>Oyun Akışı</h2>
                <ul style={{ listStylePosition: 'inside', paddingLeft: 0, lineHeight: '1.6' }}>
                    <li>Karşına <strong>3 adet görsel</strong> çıkacak. Bunlardan sadece bir tanesi yapay zeka tarafından üretildi.</li>
                    <li>Doğru olduğunu düşündüğün görsele tıkla.</li>
                    <li>Eğer ilk tahminin yanlışsa üzülme! Sana küçük bir <strong>ipucu</strong> vereceğiz.</li>
                    <li>İpucunu değerlendirerek kalan iki görsel arasından <strong>ikinci şansını</strong> kullan.</li>
                    <li>Tur bittiğinde, yeni bir deneme için <strong>"Tekrar Oyna"</strong> seçeneği sunulacak.</li>
                </ul>
            </div>

            <p style={modesTextStyle}>
                Bu, sadece başlangıç! Yakında eklenecek yeni <strong>oyun modları</strong> ve <strong>kategorilerle</strong> yeteneğini farklı alanlarda test etmeye hazır ol.
            </p>

            <button style={buttonStyle} onClick={onStart}>Hadi Başlayalım!</button>
        </div>
    );
}
export default StartScreen;
