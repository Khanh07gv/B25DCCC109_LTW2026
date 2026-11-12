const Supports = ({ supports, status, handleSupportUse }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <button 
                disabled={supports.preview || status !== 'betting'} 
                onClick={() => handleSupportUse('preview')}
                style={{ padding: '8px 15px', cursor: (supports.preview || status !== 'betting') ? 'not-allowed' : 'pointer' }}
            >
                Xem trước
            </button>
            <button 
                disabled={supports.insurance || (status !== 'betting' && status !== 'answering')} 
                onClick={() => handleSupportUse('insurance')}
                style={{ padding: '8px 15px', cursor: (supports.insurance || (status !== 'betting' && status !== 'answering')) ? 'not-allowed' : 'pointer' }}
            >
                {supports.insurance ? 'Đã bảo hiểm' : 'Bảo hiểm'}
            </button>
            <button 
                disabled={supports.hint || status !== 'answering'} 
                onClick={() => handleSupportUse('hint')}
                style={{ padding: '8px 15px', cursor: (supports.hint || status !== 'answering') ? 'not-allowed' : 'pointer' }}
            >
                Gợi ý
            </button>
        </div>
    );
};
export default Supports;
