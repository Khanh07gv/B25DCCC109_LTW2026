import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
    const navigate = useNavigate();

    const handlePlay = () => {
        if (playerName.trim()) {
            navigate('/play');
        }
    };

    let recordText = "";
    if (history && history.length > 0) {
        const maxScoreRecord = [...history].sort((a, b) => b.finalScore - a.finalScore)[0];
        recordText = `Kỷ lục: ${formatScore(maxScoreRecord.finalScore)} - ${maxScoreRecord.name}`;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Đặt cược kiến thức</h1>
            
            <div style={{ textAlign: 'left', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>Luật chơi:</h3>
                <ul>
                    <li>Bắt đầu với 1.000 điểm và đi qua 12 câu hỏi.</li>
                    <li>Biết chủ đề và mức độ trước, đặt cược từ 100 đến 500 điểm.</li>
                    <li>Có 25 giây để trả lời. Trả lời đúng được thưởng (mức cược × hệ số).</li>
                    <li>Sai hoặc hết giờ mất đúng số điểm đã cược.</li>
                    <li>Dưới 100 điểm là cháy túi, kết thúc lượt chơi.</li>
                </ul>
            </div>

            {recordText && <h3 style={{ color: 'darkgreen' }}>{recordText}</h3>}

            <div style={{ marginTop: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Nhập tên người chơi..." 
                    value={playerName} 
                    onChange={(e) => setPlayerName(e.target.value)}
                    style={{ padding: '10px', width: '60%', marginRight: '10px' }}
                />
                <button 
                    onClick={handlePlay} 
                    disabled={!playerName.trim()}
                    style={{ padding: '10px 20px', cursor: playerName.trim() ? 'pointer' : 'not-allowed' }}
                >
                    Vào chơi
                </button>
            </div>
        </div>
    );
};
export default Home;
