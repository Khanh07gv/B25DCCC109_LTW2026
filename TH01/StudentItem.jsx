import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  const { id, name, score, className } = student;

  const confirmMessage = `Bạn có chắc chắn muốn xóa sinh viên ${name} ra khỏi danh sách?`;

  const handleDeleteClick = () => {
    if (window.confirm(confirmMessage)) {
      onDelete(id);
    }
  };

  return (
    <tr style={{ textAlign: 'center' }}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td>
        <strong style={{ color: score < 5 ? 'red' : score >= 8 ? 'green' : 'black' }}>
          {score}
        </strong>
      </td>
      <td>
        <button 
          onClick={handleDeleteClick} 
          style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;