const ScoreChart = ({ rounds }) => {
    const maxScore = Math.max(...rounds.map(r => r.scoreAfter), 1000);
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '250px', gap: '15px', margin: '30px 0', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            {rounds.map((r, idx) => {
                const height = maxScore === 0 ? 0 : (r.scoreAfter / maxScore) * 200;
                return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8em' }}>{r.scoreAfter}</span>
                        <div style={{
                            width: '40px',
                            height: `${height}px`,
                            backgroundColor: r.correct ? 'green' : 'red'
                        }}></div>
                        <span style={{ fontSize: '0.8em', marginTop: '5px' }}>{idx + 1}</span>
                    </div>
                );
            })}
        </div>
    );
};
export default ScoreChart;
