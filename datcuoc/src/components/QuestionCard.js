import { LEVELS, formatMultiplier } from '../data';

const QuestionCard = ({ currentQIdx, question, children }) => {
    const multiplier = question.level === 1 ? 1 : question.level === 2 ? 1.5 : 2;
    return (
        <div>
            <h3>Câu {currentQIdx + 1}/12 - {question.topic} - {LEVELS[question.level]} ({formatMultiplier(multiplier)})</h3>
            <h2>{question.question}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {children}
            </div>
        </div>
    );
};
export default QuestionCard;
