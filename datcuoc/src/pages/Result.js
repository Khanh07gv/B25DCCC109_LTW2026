import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { getResult } from '../utils';
import { formatScore } from '../data';
import ScoreChart from '../components/ScoreChart';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    if (!location.state) return <Navigate to="/" replace />;
    const { playerName, rounds, finalScore, correctCount, reason } = location.state;
    const resultInfo = getResult(finalScore);

    return (
        <div>
            <h2>{reason === 'chaytui' ? 'Bạn đã cháy túi!' : 'Bạn đã hoàn thành 12 câu'}</h2>
            <p>Người chơi: {playerName}</p>
            <p>Số câu trả lời đúng: {correctCount}/{rounds.length}</p>
            <p>Điểm cuối: {formatScore(finalScore)}</p>
            <p>Đánh giá: {resultInfo.title}</p>
            
            <ScoreChart rounds={rounds} />

            <button onClick={() => navigate('/play', { replace: true })}>Chơi lại</button>
            <button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>Về trang chủ</button>
        </div>
    );
};
export default Result;
