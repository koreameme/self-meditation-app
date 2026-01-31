import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Training from './pages/Training';
import Practice from './pages/Practice';
import Emergency from './pages/Emergency';
import Progress from './pages/Progress';
import About from './pages/About';
import './index.css';

function App() {
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('completedDays');
    return saved ? JSON.parse(saved) : [];
  });

  const [diaries, setDiaries] = useState(() => {
    const saved = localStorage.getItem('diaries');
    return saved ? JSON.parse(saved) : {};
  });

  const [showEmergencyButton, setShowEmergencyButton] = useState(true);

  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('diaries', JSON.stringify(diaries));
  }, [diaries]);

  const completeDay = (weekNumber, dayNumber) => {
    const dayId = `${weekNumber}-${dayNumber}`;
    if (!completedDays.includes(dayId)) {
      setCompletedDays([...completedDays, dayId]);
    }
  };

  const saveDiary = (dayId, entry) => {
    setDiaries(prev => ({
      ...prev,
      [dayId]: entry
    }));
  };

  const resetProgress = () => {
    if (window.confirm('모든 수련 기록과 일기를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setCompletedDays([]);
      setDiaries({});
      localStorage.removeItem('completedDays');
      localStorage.removeItem('diaries');
      alert('모든 데이터가 초기화되었습니다.');
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation - Top Header */}
        <nav className="glass" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0.8rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px'
        }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.25rem' }}>self-명상</h3>
          </Link>
          <div className="desktop-only" style={{ gap: '2rem', alignItems: 'center' }}>
            <Link to="/training" className="nav-link">12주 훈련</Link>
            <Link to="/practice" className="nav-link">오늘의 실천</Link>
            <Link to="/progress" className="nav-link">진행 상황</Link>
            <Link to="/about" className="nav-link">뇌과학 소개</Link>
          </div>
        </nav>

        {/* Navigation - Bottom Tab Bar (Mobile Only) */}
        <div className="bottom-nav mobile-only">
          <NavLink to="/training" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            <span style={{ fontSize: '20px' }}>📅</span>
            <span>12주 훈련</span>
          </NavLink>
          <NavLink to="/practice" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            <span style={{ fontSize: '20px' }}>🧘</span>
            <span>오늘의 실천</span>
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            <span style={{ fontSize: '20px' }}>📊</span>
            <span>진행 상황</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'bottom-nav-item active' : 'bottom-nav-item'}>
            <span style={{ fontSize: '20px' }}>🧠</span>
            <span>소개</span>
          </NavLink>
        </div>

        {/* Emergency Button - Always Accessible */}
        {showEmergencyButton && (
          <Link to="/emergency" style={{
            position: 'fixed',
            bottom: '85px', // Raised for mobile bottom nav
            right: '1.5rem',
            zIndex: 999,
            textDecoration: 'none'
          }}>
            <button className="btn-emergency" style={{
              padding: '0.8rem 1.25rem',
              fontSize: '0.9rem',
              borderRadius: '999px',
              whiteSpace: 'nowrap'
            }}>
              🚨 긴급 진정
            </button>
          </Link>
        )}

        {/* Main Content */}
        <div style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/training" element={<Training completedDays={completedDays} />} />
            <Route path="/practice" element={<Practice completeDay={completeDay} completedDays={completedDays} diaries={diaries} saveDiary={saveDiary} />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/progress" element={<Progress completedDays={completedDays} diaries={diaries} saveDiary={saveDiary} resetProgress={resetProgress} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
