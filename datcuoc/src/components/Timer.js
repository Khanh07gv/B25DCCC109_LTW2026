const Timer = ({ timeLeft }) => {
    return <h3 style={{ color: timeLeft <= 5 ? 'red' : 'black' }}>Còn {timeLeft} giây</h3>;
};
export default Timer;
