import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('ltw_cuoc_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ltw_cuoc_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/data/questions.json', { signal: controller.signal })
      .then(res => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(true);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<h2>Trang chủ (Chưa hoàn thiện ở Bài 1)</h2>} />
        <Route path="play" element={<h2>Màn hình chơi (Chưa hoàn thiện ở Bài 1)</h2>} />
        <Route path="result" element={<h2>Kết quả (Chưa hoàn thiện ở Bài 1)</h2>} />
        <Route path="history" element={<h2>Lịch sử (Chưa hoàn thiện ở Bài 1)</h2>} />
        <Route path="questions" element={<QuestionBank questions={questions} bookmarks={bookmarks} toggleBookmark={toggleBookmark} loading={loading} error={error} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
