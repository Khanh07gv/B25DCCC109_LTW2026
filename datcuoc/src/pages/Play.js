import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MIN_BET, START_SCORE } from '../data';
import { validateBet, calcChange, getResult } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import AnswerButton from '../components/AnswerButton';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';

const Play = ({ questions, playerName, history, setHistory }) => {
    const navigate = useNavigate();
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [score, setScore] = useState(START_SCORE);
    const [bet, setBet] = useState(100);
    const [betError, setBetError] = useState("");
    
    // status: 'betting' -> 'answering' -> 'revealed'
    const [status, setStatus] = useState('betting'); 
    const [timeLeft, setTimeLeft] = useState(25);
    const [rounds, setRounds] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    // Đồng hồ 25 giây
    useEffect(() => {
        if (status !== 'answering') return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    processResult(null); // hết giờ
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [status]);

    // Chuyển câu sau 2 giây
    useEffect(() => {
        if (status === 'revealed') {
            const timerId = setTimeout(() => {
                nextRound();
            }, 2000);
            return () => clearTimeout(timerId);
        }
    }, [status]);

    if (!playerName) return <Navigate to="/" replace />;
    if (!questions || questions.length === 0) return <div>Đang tải...</div>;

    const question = questions[currentQIdx];

    const handleBetSubmit = () => {
        const errorMsg = validateBet(bet, score);
        if (errorMsg) {
            setBetError(errorMsg);
        } else {
            setBetError("");
            setStatus('answering');
            setTimeLeft(25);
        }
    };

    const processResult = (selected) => {
        setSelectedAnswer(selected);
        const isCorrect = selected === question.answer;
        const change = calcChange(bet, question.level, isCorrect);
        
        const scoreAfter = score + change;
        setScore(scoreAfter);
        setRounds(prev => [...prev, { id: question.id, bet, correct: isCorrect, change, scoreAfter }]);
        setStatus('revealed');
    };

    const nextRound = () => {
        const nextIdx = currentQIdx + 1;
        if (nextIdx >= 12 || score < MIN_BET) {
            const finalScore = score;
            const correctCount = rounds.filter(r => r.correct).length;
            const resultObj = getResult(finalScore);
            
            const newRecord = {
                id: Date.now(),
                name: playerName,
                finalScore,
                correctCount,
                played: nextIdx,
                result: resultObj.title,
                playedAt: new Date().toLocaleString("vi-VN")
            };
            setHistory(prev => [...prev, newRecord]);
            
            navigate('/result', { 
                replace: true, 
                state: { playerName, rounds, finalScore, correctCount, reason: score < MIN_BET ? 'chaytui' : 'done' }
            });
        } else {
            setCurrentQIdx(nextIdx);
            setBet(100);
            setBetError("");
            setSelectedAnswer(null);
            setStatus('betting');
        }
    };

    return (
        <div>
            {status === 'betting' ? (
                <BetPanel 
                    currentQIdx={currentQIdx} 
                    question={question} 
                    score={score} 
                    bet={bet} 
                    setBet={setBet} 
                    handleBetSubmit={handleBetSubmit} 
                    betError={betError} 
                />
            ) : (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Timer timeLeft={timeLeft} />
                        <ScoreInfo score={score} bet={bet} />
                    </div>

                    <QuestionCard currentQIdx={currentQIdx} question={question}>
                        {question.options.map((opt, idx) => (
                            <AnswerButton 
                                key={idx} 
                                idx={idx} 
                                opt={opt} 
                                status={status} 
                                isCorrect={idx === question.answer} 
                                isSelected={idx === selectedAnswer} 
                                processResult={processResult} 
                            />
                        ))}
                    </QuestionCard>
                    
                    {status === 'revealed' && (
                        <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
                            <span style={{ color: rounds[rounds.length - 1].correct ? 'green' : 'red' }}>
                                {rounds[rounds.length - 1].correct ? '+' : '-'}{Math.abs(rounds[rounds.length - 1].change)} điểm
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default Play;
