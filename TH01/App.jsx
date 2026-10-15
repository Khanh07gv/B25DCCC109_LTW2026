import { useState } from 'react';
import StudentList from './StudentList';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn A', score: 8.5, className: 'D23CQCN01-B' },
  { id: 2, name: 'Trần Thị B', score: 4.0, className: 'D23CQCN02-B' },
  { id: 3, name: 'Lê Văn C', score: 6.5, className: 'D23CQCN01-B' }
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL');
  const [newStudent, setNewStudent] = useState({ name: '', score: '', className: '' });
  const [error, setError] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, score, className } = newStudent;

    if (!name.trim() || score === '' || !className.trim()) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const numScore = Number(score);
    
    if (!Number.isFinite(numScore) || numScore < 0 || numScore > 10) {
      setError('Điểm số không hợp lệ (phải từ 0 đến 10)!');
      return;
    }

    const student = {
      id: Date.now(),
      name: name.trim(),
      score: numScore,
      className: className.trim()
    };

    setStudents(currentStudents => [...currentStudents, student]);
    setNewStudent({ name: '', score: '', className: '' });
    setError('');
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
  };

  const getFilteredStudents = () => {
    return students.filter(student => {
      if (filterType === 'GIOI') return student.score >= 8;
      if (filterType === 'TRUOT') return student.score < 5;
      return true;
    });
  };

  const filteredStudents = getFilteredStudents();
  
  const totalStudents = students.length;
  const averageScore = totalStudents > 0
    ? (students.reduce((sum, student) => sum + student.score, 0) / totalStudents).toFixed(2)
    : 0;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>Ứng dụng Quản lý Điểm Sinh viên</h2>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <p>Tổng số sinh viên (toàn lớp): <strong>{totalStudents}</strong></p>
        <p>Điểm trung bình (toàn lớp): <strong>{averageScore}</strong></p>
      </div>

      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Họ tên"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Điểm số (0-10)"
          value={newStudent.score}
          onChange={(e) => setNewStudent({ ...newStudent, score: e.target.value })}
        />
        <input
          type="text"
          placeholder="Lớp"
          value={newStudent.className}
          onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
        />
        <button type="submit" style={{ cursor: 'pointer', padding: '5px 15px' }}>Thêm</button>
      </form>
      
      {error && <p style={{ color: 'red', marginTop: '-10px', marginBottom: '20px' }}>{error}</p>}

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setFilterType('ALL')}>Tất cả</button>
        <button onClick={() => setFilterType('GIOI')}>Sinh viên Giỏi (Điểm &gt;= 8)</button>
        <button onClick={() => setFilterType('TRUOT')}>Sinh viên Trượt (Điểm &lt; 5)</button>
      </div>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;