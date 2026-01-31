import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '../data/curriculum';
import { meditations } from '../data/meditations';

function Practice({ completeDay, completedDays }) {
    const location = useLocation();
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [showDiary, setShowDiary] = useState(false);
    const [diaryEntry, setDiaryEntry] = useState({ plan: '', do: '', see: '' });

    useEffect(() => {
        if (location.state && location.state.week) {
            setSelectedWeek(location.state.week);
            setSelectedDay(1);
        }
    }, [location.state]);

    const currentWeek = curriculum.find(w => w.week === selectedWeek);
    const currentPractice = currentWeek?.practices[selectedDay - 1];
    const dayId = `${selectedWeek}-${selectedDay}`;
    const isCompleted = completedDays.includes(dayId);

    const handleComplete = () => {
        completeDay(selectedWeek, selectedDay);
        setShowDiary(false);
        // Move to next day
        if (selectedDay < 7) {
            setSelectedDay(selectedDay + 1);
        } else if (selectedWeek < 12) {
            setSelectedWeek(selectedWeek + 1);
            setSelectedDay(1);
        }
    };

    return (
        <div className="practice">
            <section className="section" style={{ minHeight: '100vh' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-center mb-lg">오늘의 실천</h1>

                        {/* Week & Day Selector */}
                        <div className="glass" style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>
                                        주차 선택
                                    </label>
                                    <select
                                        value={selectedWeek}
                                        onChange={(e) => {
                                            setSelectedWeek(Number(e.target.value));
                                            setSelectedDay(1);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)'
                                        }}
                                    >
                                        {curriculum.map(week => (
                                            <option key={week.week} value={week.week} style={{ background: 'var(--color-bg-primary)' }}>
                                                Week {week.week}: {week.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>
                                        일차 선택
                                    </label>
                                    <select
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)'
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                            <option key={day} value={day} style={{ background: 'var(--color-bg-primary)' }}>
                                                Day {day}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Current Practice */}
                        {currentPractice && (
                            <motion.div
                                key={dayId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-strong"
                                style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}
                            >
                                {isCompleted && (
                                    <div style={{
                                        display: 'inline-block',
                                        background: 'var(--color-success)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        marginBottom: 'var(--spacing-md)',
                                        fontWeight: 'bold'
                                    }}>
                                        ✓ 완료됨
                                    </div>
                                )}

                                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>{currentPractice.title}</h2>
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                                    <span style={{
                                        background: 'var(--gradient-primary)',
                                        color: 'var(--color-bg-primary)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: 'var(--font-size-sm)',
                                        fontWeight: 'bold'
                                    }}>
                                        {currentPractice.type}
                                    </span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>
                                        ⏱️ {currentPractice.duration}분
                                    </span>
                                </div>

                                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, marginBottom: 'var(--spacing-xl)' }}>
                                    {currentPractice.content}
                                </p>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                                    {currentPractice?.youtubeId && (
                                        <a
                                            href={`https://www.youtube.com/watch?v=${currentPractice.youtubeId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary"
                                            style={{
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                background: '#FF0000',
                                                color: 'white'
                                            }}
                                        >
                                            📺 오늘의 가이드 영상
                                        </a>
                                    )}
                                    {!isCompleted && (
                                        <>
                                            <button
                                                className="btn-primary"
                                                onClick={() => setShowDiary(true)}
                                            >
                                                실천 완료하기
                                            </button>
                                            <button className="btn-secondary">
                                                타이머 시작
                                            </button>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Plan-Do-See Diary */}
                        {showDiary && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass"
                                style={{ padding: 'var(--spacing-xl)' }}
                            >
                                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Plan-Do-See 다이어리</h3>

                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 'bold' }}>
                                        Plan (계획): 오늘 무엇을 실천할 계획인가요?
                                    </label>
                                    <textarea
                                        value={diaryEntry.plan}
                                        onChange={(e) => setDiaryEntry({ ...diaryEntry, plan: e.target.value })}
                                        placeholder="예: 10분 동안 턱과 어깨 근육을 이완하는 명상을 하겠습니다."
                                        style={{
                                            width: '100%',
                                            minHeight: '80px',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)',
                                            fontFamily: 'var(--font-primary)',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 'bold' }}>
                                        Do (실행): 어떻게 실천했나요?
                                    </label>
                                    <textarea
                                        value={diaryEntry.do}
                                        onChange={(e) => setDiaryEntry({ ...diaryEntry, do: e.target.value })}
                                        placeholder="예: 조용한 방에서 앉아 턱의 힘을 빼고 어깨를 내리는 연습을 했습니다."
                                        style={{
                                            width: '100%',
                                            minHeight: '80px',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)',
                                            fontFamily: 'var(--font-primary)',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: 'bold' }}>
                                        See (성찰): 어떤 변화나 느낌이 있었나요?
                                    </label>
                                    <textarea
                                        value={diaryEntry.see}
                                        onChange={(e) => setDiaryEntry({ ...diaryEntry, see: e.target.value })}
                                        placeholder="예: 턱의 긴장이 풀리니 머리가 가벼워지고 마음이 편안해졌습니다."
                                        style={{
                                            width: '100%',
                                            minHeight: '80px',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)',
                                            fontFamily: 'var(--font-primary)',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    <button className="btn-primary" onClick={handleComplete}>
                                        저장하고 완료하기
                                    </button>
                                    <button className="btn-outline" onClick={() => setShowDiary(false)}>
                                        취소
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Meditation Library */}
                        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                            <h2 className="text-center mb-lg">명상 라이브러리</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                                {Object.values(meditations).map((meditation, index) => (
                                    <motion.div
                                        key={index}
                                        className="card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{meditation.title}</h4>
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                                ⏱️ {meditation.duration}분
                                            </span>
                                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-mpfc-gold)' }}>
                                                {meditation.category}
                                            </span>
                                        </div>
                                        <button className="btn-secondary" style={{ width: '100%' }}>
                                            시작하기
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Practice;
