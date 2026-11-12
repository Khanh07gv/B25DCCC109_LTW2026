import { LEVELS, formatMultiplier, formatScore } from '../data';

const BetPanel = ({ currentQIdx, question, score, bet, setBet, handleBetSubmit, betError }) => {
    const multiplier = question.level === 1 ? 1 : question.level === 2 ? 1.5 : 2;
    return (
        <div>
            <h3>Câu {currentQIdx + 1}/12 - {question.topic} - {LEVELS[question.level]} ({formatMultiplier(multiplier)})</h3>
            <p>Điểm hiện có: {formatScore(score)}</p>
            
            <div style={{ marginTop: '10px' }}>
                <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} />
                <button onClick={handleBetSubmit} disabled={betError !== ""}>Đặt cược</button>
            </div>
            {betError && <p style={{ color: 'red' }}>{betError}</p>}
        </div>
    );
};
export default BetPanel;
