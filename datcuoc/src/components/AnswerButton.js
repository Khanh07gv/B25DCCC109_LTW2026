import { LETTERS } from '../data';

const AnswerButton = ({ idx, opt, status, isCorrect, isSelected, processResult }) => {
    let bgColor = 'white';
    if (status === 'revealed') {
        if (isCorrect) bgColor = 'lightgreen';
        else if (isSelected) bgColor = 'salmon';
    }
    return (
        <button 
            disabled={status === 'revealed'}
            style={{ padding: '15px', backgroundColor: bgColor, border: '1px solid #ccc' }}
            onClick={() => processResult(idx)}
        >
            {LETTERS[idx]}. {opt}
        </button>
    );
};
export default AnswerButton;
