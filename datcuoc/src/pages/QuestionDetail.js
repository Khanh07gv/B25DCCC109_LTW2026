import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, formatMultiplier, LETTERS } from '../data';

const QuestionDetail = ({ questions, bookmarks, toggleBookmark }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const question = questions.find(q => q.id === Number(id));

    if (!question) return <div>Không tìm thấy câu hỏi.</div>;

    const isBookmarked = bookmarks.includes(question.id);

    return (
        <div>
            <h2>Câu hỏi số {question.id} - {question.topic} - {LEVELS[question.level]} ({formatMultiplier(question.level === 1 ? 1 : question.level === 2 ? 1.5 : 2)})</h2>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{question.question}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
                {question.options.map((opt, idx) => (
                    <div key={idx} style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        backgroundColor: idx === question.answer ? 'lightgreen' : 'transparent',
                        borderRadius: '4px'
                    }}>
                        {LETTERS[idx]}. {opt} {idx === question.answer && <strong>(Đáp án đúng)</strong>}
                    </div>
                ))}
            </div>

            <p><strong>Gợi ý:</strong> {question.hint}</p>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => toggleBookmark(question.id)} style={{ padding: '10px' }}>
                    {isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
                </button>
                <button onClick={() => navigate(-1)} style={{ padding: '10px', marginLeft: '10px' }}>Quay lại</button>
            </div>
        </div>
    );
};
export default QuestionDetail;
