import { useState } from 'react';
import { formatScore } from '../data';

const History = ({ history, setHistory }) => {
    const [filterName, setFilterName] = useState('Tất cả');

    if (!history || history.length === 0) {
        return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>Chưa có lượt chơi nào.</div>;
    }

    const names = ['Tất cả', ...new Set(history.map(h => h.name))];
    const filtered = filterName === 'Tất cả' ? history : history.filter(h => h.name === filterName);

    const sorted = [...filtered].sort((a, b) => b.finalScore - a.finalScore);
    const totalPlayed = sorted.length;
    const maxScore = totalPlayed > 0 ? Math.max(...sorted.map(h => h.finalScore)) : 0;
    const bankrupts = sorted.filter(h => h.finalScore === 0).length;

    return (
        <div>
            <h2>Lịch sử các lượt chơi</h2>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <label>Người chơi: </label>
                <select value={filterName} onChange={e => setFilterName(e.target.value)} style={{ padding: '5px' }}>
                    {names.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <button onClick={() => setHistory([])} style={{ marginLeft: 'auto', backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
                    Xóa lịch sử
                </button>
            </div>
            
            <div style={{ marginBottom: '20px', display: 'flex', gap: '30px', backgroundColor: '#f0f8ff', padding: '15px', borderRadius: '8px' }}>
                <p style={{ margin: 0 }}><strong>Số lượt chơi:</strong> {totalPlayed}</p>
                <p style={{ margin: 0 }}><strong>Điểm cao nhất:</strong> {formatScore(maxScore)}</p>
                <p style={{ margin: 0 }}><strong>Số lần cháy túi:</strong> {bankrupts}</p>
            </div>
            
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }} border="1">
                <thead style={{ backgroundColor: '#f9f9f9' }}>
                    <tr>
                        <th style={{ padding: '10px' }}>Người chơi</th>
                        <th style={{ padding: '10px' }}>Số câu đúng</th>
                        <th style={{ padding: '10px' }}>Điểm cuối</th>
                        <th style={{ padding: '10px' }}>Đánh giá</th>
                        <th style={{ padding: '10px' }}>Thời gian</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {sorted.map(h => (
                        <tr key={h.id}>
                            <td style={{ padding: '10px' }}>{h.name}</td>
                            <td style={{ padding: '10px' }}>{h.correctCount}/{h.played}</td>
                            <td style={{ padding: '10px', fontWeight: 'bold' }}>{formatScore(h.finalScore)}</td>
                            <td style={{ padding: '10px' }}>{h.result}</td>
                            <td style={{ padding: '10px', color: '#666' }}>{h.playedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default History;
