import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, formatMultiplier } from '../data';

const QuestionBank = ({ questions, bookmarks, toggleBookmark, loading, error }) => {
    const [levels, setLevels] = useState([1, 2, 3]);
    const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
    const [search, setSearch] = useState('');

    if (loading) return <div>Đang tải câu hỏi...</div>;
    if (error) return <div>Không tải được câu hỏi.</div>;

    const filtered = questions.filter(q => {
        const matchLevel = levels.includes(q.level);
        const matchBookmark = bookmarkedOnly ? bookmarks.includes(q.id) : true;
        const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
        return matchLevel && matchBookmark && matchSearch;
    });

    const toggleLevel = (l) => {
        setLevels(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l]);
    };

    return (
        <div>
            <h2>Ngân hàng câu hỏi</h2>
            <div style={{ marginBottom: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ marginRight: '10px' }}><input type="checkbox" checked={levels.includes(1)} onChange={() => toggleLevel(1)} /> Dễ</label>
                    <label style={{ marginRight: '10px' }}><input type="checkbox" checked={levels.includes(2)} onChange={() => toggleLevel(2)} /> Trung bình</label>
                    <label style={{ marginRight: '10px' }}><input type="checkbox" checked={levels.includes(3)} onChange={() => toggleLevel(3)} /> Khó</label>
                </div>
                <label>
                    <input type="checkbox" checked={bookmarkedOnly} onChange={() => setBookmarkedOnly(!bookmarkedOnly)} /> Chỉ hiện câu đã đánh dấu
                </label>
                <input type="text" placeholder="Tìm kiếm theo nội dung..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            
            <p>Có {filtered.length} câu hỏi | Đã đánh dấu: {bookmarks.length} câu.</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} border="1">
                <thead>
                    <tr>
                        <th style={{ padding: '8px' }}>STT</th>
                        <th style={{ padding: '8px' }}>Chủ đề</th>
                        <th style={{ padding: '8px' }}>Mức độ</th>
                        <th style={{ padding: '8px' }}>Hệ số</th>
                        <th style={{ padding: '8px' }}>Câu hỏi</th>
                        <th style={{ padding: '8px', textAlign: 'center' }}>Đánh dấu</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((q, i) => (
                        <tr key={q.id}>
                            <td style={{ padding: '8px' }}>{i + 1}</td>
                            <td style={{ padding: '8px' }}>{q.topic}</td>
                            <td style={{ padding: '8px' }}>{LEVELS[q.level]}</td>
                            <td style={{ padding: '8px' }}>{formatMultiplier(q.level === 1 ? 1 : q.level === 2 ? 1.5 : 2)}</td>
                            <td style={{ padding: '8px' }}><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
                            <td style={{ textAlign: 'center', padding: '8px' }}>
                                <button onClick={() => toggleBookmark(q.id)}>{bookmarks.includes(q.id) ? '★' : '☆'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default QuestionBank;
