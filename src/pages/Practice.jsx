import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '../data/curriculum';
import { meditations } from '../data/meditations';
import { useRef } from 'react';

function Practice({ completeDay, completedDays, diaries, saveDiary }) {
    const location = useLocation();
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);
    const [showDiary, setShowDiary] = useState(false);
    const [diaryEntry, setDiaryEntry] = useState({ plan: '', do: '', see: '' });

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [ttsLoading, setTtsLoading] = useState(false);

    // TTS Mode: 'system' or 'natural'
    const [ttsMode, setTtsMode] = useState('natural');
    const [ttsError, setTtsError] = useState(null);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);

    // Voices & TTS Settings
    const [availableVoices, setAvailableVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [pitch, setPitch] = useState(0.85);
    const [rate, setRate] = useState(0.7);
    const speechTimeout = useRef(null);
    const naturalAudio = useRef(null);
    // Using a reliable raw GitHub URL for Tibetan Singing Bowl
    // and setting up the audio object with looping enabled
    const bellAudio = useRef(null);

    useEffect(() => {
        // High-quality professional meditation bell with clean resonance
        // Using a reliable AWS S3 link known for stability
        const audioUrl = 'https://indiemusicbox.s3.amazonaws.com/downloads/meditation-bell-pack/Meditation+Bell+2.mp3';
        bellAudio.current = new Audio(audioUrl);
        bellAudio.current.loop = true;
        bellAudio.current.volume = 0.8; // Set a clear volume level

        // Preload the audio to ensure it's ready when needed
        bellAudio.current.load();

        return () => {
            if (bellAudio.current) {
                bellAudio.current.pause();
                bellAudio.current.currentTime = 0;
                bellAudio.current = null;
            }
            if (naturalAudio.current) {
                naturalAudio.current.pause();
                naturalAudio.current = null;
            }
            window.speechSynthesis.cancel();
            if (speechTimeout.current) clearTimeout(speechTimeout.current);
        };
    }, []);

    // Load voices & Auto-select natural/neural voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            console.log("SpeechSynthesis: Found voices count =", voices.length);

            const koVoices = voices.filter(v => v.lang.includes('ko'));
            setAvailableVoices(koVoices);

            // AUTO-SELECT PRIORITY:
            // 1. InJoon (Edge Neural Male - High Quality)
            // 2. SunHi (Edge Neural Female - High Quality)
            // 3. Google Neural Voices
            // 4. Minsu (Standard Male)
            // 5. Any Korean Voice
            if (!selectedVoice && koVoices.length > 0) {
                const inJoon = koVoices.find(v => v.name.includes('InJoon'));
                const sunHi = koVoices.find(v => v.name.includes('SunHi'));
                const googleNeural = koVoices.find(v => v.name.includes('Google') && (v.name.includes('Neural') || v.name.includes('Online')));
                const minsu = koVoices.find(v => v.name.includes('Minsu'));
                const anyMale = koVoices.find(v => v.name.includes('Male') || v.name.includes('David')); // General male
                const anyNeuralOrOnline = koVoices.find(v => v.name.includes('Neural') || v.name.includes('Online'));

                let autoSelected = inJoon || sunHi || googleNeural || minsu || anyMale || anyNeuralOrOnline || koVoices[0];
                setSelectedVoice(autoSelected);

                // If it's a known male voice, set a deeper pitch preset
                if (autoSelected && (autoSelected.name.includes('InJoon') || autoSelected.name.includes('Minsu') || autoSelected.name.includes('Male'))) {
                    setPitch(0.8);
                    setRate(0.7);
                }
            }
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
        return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    }, [selectedVoice]);

    // Stop speaking when day/week changes
    useEffect(() => {
        stopSpeaking();
    }, [selectedWeek, selectedDay]);

    // Sync diary entry with saved diaries when selection changes
    useEffect(() => {
        const dayId = `${selectedWeek}-${selectedDay}`;
        const savedEntry = diaries[dayId] || { plan: '', do: '', see: '' };
        setDiaryEntry(savedEntry);
    }, [selectedWeek, selectedDay, diaries]);

    useEffect(() => {
        if (location.state && location.state.week) {
            setSelectedWeek(location.state.week);
            setSelectedDay(1);
        }
    }, [location.state]);

    const playBell = () => {
        if (bellAudio.current) {
            // Reset to beginning just in case
            bellAudio.current.currentTime = 0;
            const playPromise = bellAudio.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Audio playback failed:", error);
                    // Attempt to reload and play as a fallback
                    bellAudio.current.load();
                    bellAudio.current.play().catch(e => console.error("Final playback attempt failed:", e));
                });
            }
        }
    };

    const stopBell = () => {
        if (bellAudio.current) {
            bellAudio.current.pause();
            bellAudio.current.currentTime = 0;
        }
    };

    const startTimer = () => {
        if (!isActive) {
            const initialTime = timeLeft > 0 ? timeLeft : (currentPractice?.duration || 10) * 60;
            setTimeLeft(initialTime);
            setIsActive(true);
            playBell();
        }
    };

    const pauseTimer = () => {
        setIsActive(false);
        stopBell();
    };

    const resetTimer = () => {
        setIsActive(false);
        stopBell();
        stopSpeaking();
        setTimeLeft((currentPractice?.duration || 10) * 60);
    };

    const speakGuide = () => {
        if (!currentPractice?.guide) return;

        stopSpeaking(); // Reset everything
        setTtsError(null); // Clear previous errors

        const rawParts = currentPractice.guide.split(/([.!?]|\n+)/);
        const processedSentences = [];
        for (let i = 0; i < rawParts.length; i += 2) {
            const sentence = (rawParts[i] + (rawParts[i + 1] || '')).trim();
            if (sentence) processedSentences.push(sentence);
        }

        if (processedSentences.length === 0) return;

        setIsSpeaking(true);
        let currentIndex = 0;

        if (ttsMode === 'natural') {
            // Natural Voice Mode (Google Translate)
            const playNextNatural = () => {
                if (currentIndex >= processedSentences.length) {
                    setIsSpeaking(false);
                    setCurrentSentenceIndex(-1);
                    return;
                }

                setCurrentSentenceIndex(currentIndex);
                const text = processedSentences[currentIndex];
                // Google Translate TTS URL - Using ko-KR and gtx for better compatibility
                const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ko-KR&client=tw-ob&ttsspeed=1`;

                setTtsLoading(true);
                if (naturalAudio.current) {
                    naturalAudio.current.pause();
                    naturalAudio.current.src = url;
                } else {
                    naturalAudio.current = new Audio(url);
                }

                naturalAudio.current.oncanplaythrough = () => {
                    setTtsLoading(false);
                    naturalAudio.current.play().catch(e => {
                        console.error("Autoplay blocked:", e);
                        setIsSpeaking(false);
                    });
                };

                naturalAudio.current.onended = () => {
                    currentIndex++;
                    speechTimeout.current = setTimeout(playNextNatural, 1500);
                };

                naturalAudio.current.onerror = (e) => {
                    console.warn("Natural mode failed, switching to System mode silently.", e);
                    setTtsError("자연 보이스 연결 불안정으로 시스템 보이스로 전환합니다.");
                    setTtsMode('system');
                    setTtsLoading(false);
                    // Start from the same sentence in system mode
                    speakNextSystemBase(currentIndex, processedSentences);
                };
            };
            playNextNatural();
        } else {
            speakNextSystemBase(0, processedSentences);
        }
    };

    const speakNextSystemBase = (index, sentences) => {
        let currentIndex = index;
        const speak = () => {
            if (currentIndex >= sentences.length) {
                setIsSpeaking(false);
                setCurrentSentenceIndex(-1);
                return;
            }

            setCurrentSentenceIndex(currentIndex);
            const utterance = new SpeechSynthesisUtterance(sentences[currentIndex]);
            if (selectedVoice) utterance.voice = selectedVoice;
            utterance.rate = rate;
            utterance.pitch = pitch;

            utterance.onend = () => {
                currentIndex++;
                speechTimeout.current = setTimeout(speak, 1500);
            };
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        };
        speak();
    };

    const testVoice = () => {
        stopSpeaking();
        const testText = "차분하고 편안한 명상을 시작합니다.";
        if (ttsMode === 'natural') {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(testText)}&tl=ko-KR&client=tw-ob&ttsspeed=1`;
            const audio = new Audio(url);
            audio.play().catch(e => alert("자연 보이스를 지원하지 않는 환경이거나 연결이 불안정합니다."));
        } else {
            const utterance = new SpeechSynthesisUtterance(testText);
            if (selectedVoice) utterance.voice = selectedVoice;
            utterance.rate = rate;
            utterance.pitch = pitch;
            window.speechSynthesis.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        if (naturalAudio.current) {
            naturalAudio.current.pause();
            naturalAudio.current.currentTime = 0;
        }
        if (speechTimeout.current) clearTimeout(speechTimeout.current);
        setIsSpeaking(false);
        setCurrentSentenceIndex(-1);
    };

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            clearInterval(interval);
            setIsActive(false);
            stopBell();
            // Optional: Show completion alert or auto-open diary
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const currentWeek = curriculum.find(w => w.week === selectedWeek);
    const currentPractice = currentWeek?.practices[selectedDay - 1];
    const dayId = `${selectedWeek}-${selectedDay}`;
    const isCompleted = completedDays.includes(dayId);

    const handleComplete = () => {
        saveDiary(dayId, diaryEntry);
        completeDay(selectedWeek, selectedDay);
        setShowDiary(false);
        alert('일기가 저장되었습니다.');
    };

    return (
        <div className="practice">
            <section className="section">
                <div className="container" style={{ maxWidth: '1000px', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-center mb-lg">오늘의 실천</h1>

                        {/* Week & Day Selector */}
                        <div className="glass" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: 'var(--spacing-sm)'
                            }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
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
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-sm)'
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
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                        일차 선택
                                    </label>
                                    <select
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--spacing-sm)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-sm)'
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

                                {/* Today's Summary Section */}
                                {currentPractice.summary && (
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderLeft: '4px solid var(--color-primary)',
                                        padding: 'var(--spacing-lg)',
                                        borderRadius: 'var(--border-radius-md)',
                                        marginBottom: 'var(--spacing-xl)',
                                        fontStyle: 'italic',
                                        color: 'var(--color-text-muted)'
                                    }}>
                                        <h4 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-md)' }}>
                                            💡 오늘의 마음 근력 요약
                                        </h4>
                                        <p style={{ margin: 0, lineHeight: 1.6 }}>
                                            &ldquo;{currentPractice.summary}&rdquo;
                                        </p>
                                    </div>
                                )}

                                {/* Guided Meditation Script Section */}
                                {currentPractice.guide && (
                                    <div style={{
                                        background: 'rgba(0, 0, 0, 0.2)',
                                        padding: 'var(--spacing-xl)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-xl)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-mpfc-gold)', fontSize: 'var(--font-size-lg)' }}>📜 명상 가이드</h3>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                                                {ttsLoading && (
                                                    <span style={{ fontSize: '11px', color: 'var(--color-mpfc-gold)', animation: 'pulse 1.5s infinite' }}>
                                                        불러오는 중...
                                                    </span>
                                                )}
                                                {isSpeaking ? (
                                                    <button className="btn-outline" onClick={stopSpeaking} style={{ padding: '0.4rem 0.8rem', fontSize: 'var(--font-size-xs)' }}>
                                                        ⏹️ 중지
                                                    </button>
                                                ) : (
                                                    <button className="btn-primary" onClick={speakGuide} style={{ padding: '0.4rem 0.8rem', fontSize: 'var(--font-size-xs)' }}>
                                                        🔊 읽어주기
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Voice Mode Toggle */}
                                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                            <button
                                                onClick={() => setTtsMode('natural')}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid',
                                                    borderColor: ttsMode === 'natural' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                                    background: ttsMode === 'natural' ? 'rgba(52, 168, 83, 0.2)' : 'transparent',
                                                    color: ttsMode === 'natural' ? 'white' : 'var(--color-text-muted)',
                                                    cursor: 'pointer',
                                                    fontSize: 'var(--font-size-sm)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                ✨ 전문 자연 보이스 (추천)
                                            </button>
                                            <button
                                                onClick={() => setTtsMode('system')}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid',
                                                    borderColor: ttsMode === 'system' ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                                                    background: ttsMode === 'system' ? 'rgba(52, 168, 83, 0.2)' : 'transparent',
                                                    color: ttsMode === 'system' ? 'white' : 'var(--color-text-muted)',
                                                    cursor: 'pointer',
                                                    fontSize: 'var(--font-size-sm)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                💻 시스템 기본 보이스
                                            </button>
                                        </div>

                                        {/* Voice Settings */}
                                        <div style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: 'var(--spacing-md)',
                                            borderRadius: 'var(--radius-sm)',
                                            marginBottom: 'var(--spacing-lg)',
                                            fontSize: 'var(--font-size-sm)',
                                            display: 'grid',
                                            gridTemplateColumns: '1fr',
                                            gap: 'var(--spacing-md)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}>
                                            {ttsError && (
                                                <div style={{ color: 'var(--color-mpfc-gold)', fontSize: '11px', marginBottom: '8px', textAlign: 'center' }}>
                                                    ⚠️ {ttsError}
                                                </div>
                                            )}

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'var(--color-text-muted)' }}>
                                                    {ttsMode === 'natural' ? '선택된 모드: ✨ 전문 클라우드 보이스' : '선택된 목소리: ' + (selectedVoice?.name || '기본')}
                                                </label>
                                                <button
                                                    onClick={testVoice}
                                                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    🎧 음성 테스트
                                                </button>
                                            </div>

                                            {ttsMode === 'system' && (
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginTop: '8px' }}>
                                                    <div style={{ gridColumn: 'span 2' }}>
                                                        <select
                                                            value={selectedVoice?.name || ''}
                                                            onChange={(e) => setSelectedVoice(availableVoices.find(v => v.name === e.target.value))}
                                                            style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.4)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}
                                                        >
                                                            {availableVoices.map(v => (
                                                                <option key={v.name} value={v.name}>
                                                                    {v.name.includes('Neural') || v.name.includes('Online') ? '✨ ' : ''}{v.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '5px' }}>속도: {rate.toFixed(1)}x</label>
                                                        <input type="range" min="0.5" max="1.0" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} style={{ width: '100%' }} />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', marginBottom: '5px' }}>톤: {pitch.toFixed(1)}</label>
                                                        <input type="range" min="0.5" max="1.2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} style={{ width: '100%' }} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{
                                            maxHeight: '400px',
                                            overflowY: 'auto',
                                            padding: 'var(--spacing-lg)',
                                            background: 'rgba(0,0,0,0.2)',
                                            borderRadius: 'var(--radius-sm)',
                                            lineHeight: 2.2,
                                            fontSize: 'var(--font-size-lg)',
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            border: '1px solid rgba(255,255,255,0.03)'
                                        }}>
                                            {currentPractice.guide.split(/([.!?]|\n+)/).reduce((acc, part, i, arr) => {
                                                if (i % 2 === 0) {
                                                    const fullSentence = (part + (arr[i + 1] || '')).trim();
                                                    if (fullSentence) {
                                                        const isCurrent = acc.processedCount === currentSentenceIndex;
                                                        acc.elements.push(
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    transition: 'all 0.5s ease',
                                                                    backgroundColor: isCurrent ? 'rgba(52, 168, 83, 0.3)' : 'transparent',
                                                                    color: isCurrent ? 'white' : 'inherit',
                                                                    padding: '2px 4px',
                                                                    borderRadius: '4px',
                                                                    display: fullSentence.length > 5 ? 'inline' : 'inline-block',
                                                                    marginBottom: fullSentence.includes('\n') ? '1rem' : '0'
                                                                }}
                                                            >
                                                                {fullSentence}{' '}
                                                            </span>
                                                        );
                                                        acc.processedCount++;
                                                    }
                                                }
                                                return acc;
                                            }, { elements: [], processedCount: 0 }).elements}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', width: '100%', marginBottom: isActive || timeLeft > 0 ? 'var(--spacing-xl)' : 0 }}>
                                        <button
                                            className="btn-primary"
                                            onClick={() => setShowDiary(true)}
                                            style={{ flex: 1 }}
                                        >
                                            {isCompleted ? '일기 보충/수정하기' : '실천 완료하기 (일기 쓰기)'}
                                        </button>

                                        {!isActive && timeLeft === 0 && (
                                            <button
                                                className="btn-secondary"
                                                onClick={startTimer}
                                                style={{ flex: 1 }}
                                            >
                                                다시 명상 시작
                                            </button>
                                        )}
                                    </div>

                                    {/* Active Timer UI */}
                                    {(isActive || (timeLeft > 0)) && (
                                        <div className="glass" style={{
                                            width: '100%',
                                            padding: 'var(--spacing-xl)',
                                            textAlign: 'center',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '2px solid var(--color-primary)'
                                        }}>
                                            <div className="timer-display" style={{
                                                fontSize: 'clamp(3rem, 15vw, 5rem)',
                                                fontWeight: 'bold',
                                                fontFamily: 'monospace',
                                                color: 'var(--color-primary)',
                                                marginBottom: 'var(--spacing-md)',
                                                lineHeight: 1
                                            }}>
                                                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                            </div>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                                                {isActive ? (
                                                    <button className="btn-outline" onClick={pauseTimer}>일시 정지</button>
                                                ) : (
                                                    <button className="btn-primary" onClick={startTimer}>다시 시작</button>
                                                )}
                                                <button className="btn-secondary" onClick={resetTimer}>초기화</button>
                                            </div>
                                        </div>
                                    )}

                                    {isCompleted && !isActive && timeLeft === 0 && (
                                        <div style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
                                            ✓ 이 날의 수련을 이미 완료했습니다. 언제든 다시 수련하실 수 있습니다.
                                        </div>
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
