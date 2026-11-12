import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('ltw_cuoc_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('ltw_cuoc_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ltw_cuoc_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('ltw_cuoc_history', JSON.stringify(history));
  }, [history]);

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
        <Route index element={<Home playerName={playerName} setPlayerName={setPlayerName} history={history} />} />
        <Route path="play" element={<Play questions={questions} playerName={playerName} history={history} setHistory={setHistory} />} />
        <Route path="result" element={<Result />} />
        <Route path="history" element={<h2>Lịch sử (Chưa hoàn thiện ở Bài 2)</h2>} />
        <Route path="questions" element={<QuestionBank questions={questions} bookmarks={bookmarks} toggleBookmark={toggleBookmark} loading={loading} error={error} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
