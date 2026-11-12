import { LEVELS, formatMultiplier, formatScore } from '../data';

const BetPanel = ({ currentQIdx, question, score, bet, setBet, handleBetSubmit, betError, previewActive }) => {
    const multiplier = question.level === 1 ? 1 : question.level === 2 ? 1.5 : 2;
    return (
        <div>
            <h3>Câu {currentQIdx + 1}/12 - {question.topic} - {LEVELS[question.level]} ({formatMultiplier(multiplier)})</h3>
            <p>Điểm hiện có: {formatScore(score)}</p>
            
            {previewActive && (
                <div style={{ padding: '15px', backgroundColor: '#eef', border: '1px dashed #00f', marginBottom: '15px', borderRadius: '4px' }}>
                    <p style={{ fontStyle: 'italic', color: 'blue', margin: 0 }}>{question.question}</p>
                </div>
            )}
            
            <div style={{ marginTop: '10px' }}>
                <input type="number" value={bet} onChange={e => setBet(Number(e.target.value))} style={{ padding: '8px', marginRight: '10px' }} />
                <button onClick={handleBetSubmit} disabled={betError !== ""} style={{ padding: '8px 15px' }}>Đặt cược</button>
                <span style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>(Phím tắt: ↑/↓ để chỉnh cược, Enter để đặt)</span>
            </div>
            {betError && <p style={{ color: 'red', marginTop: '10px' }}>{betError}</p>}
        </div>
    );
};
export default BetPanel;
