import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { meditations } from '../data/meditations';

function Emergency() {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale
    const bellAudio = useRef(null);

    useEffect(() => {
        // High-quality professional meditation bell with clean resonance
        bellAudio.current = new Audio('https://indiemusicbox.s3.amazonaws.com/downloads/meditation-bell-pack/Meditation+Bell+2.mp3');
        bellAudio.current.loop = true;
        bellAudio.current.volume = 0.8;
        bellAudio.current.load();
        bellAudio.current.volume = 0.8;
        bellAudio.current.load();

        return () => {
            if (bellAudio.current) {
                bellAudio.current.pause();
                bellAudio.current = null;
            }
        };
    }, []);

    const emergency = meditations.emergencyCalm;

    const playBell = () => {
        if (bellAudio.current) {
            bellAudio.current.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    const stopBell = () => {
        if (bellAudio.current) {
            bellAudio.current.pause();
            bellAudio.current.currentTime = 0;
        }
    };

    useEffect(() => {
        if (!isActive) return;

        const timer = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;

        // Find current script step
        const currentScriptStep = emergency.script.findIndex((step, index) => {
            const nextStep = emergency.script[index + 1];
            return elapsedTime >= step.time && (!nextStep || elapsedTime < nextStep.time);
        });

        if (currentScriptStep !== -1 && currentScriptStep !== currentStep) {
            setCurrentStep(currentScriptStep);
        }

        // Breathing animation cycle (4-7-8)
        const cycleTime = elapsedTime % 19; // 4 + 7 + 8 = 19 seconds
        if (cycleTime < 4) {
            setBreathPhase('inhale');
        } else if (cycleTime < 11) {
            setBreathPhase('hold');
        } else {
            setBreathPhase('exhale');
        }

        // Completion check
        if (elapsedTime >= emergency.duration * 60 && isActive) {
            stopBell();
            setIsActive(false);
        }
    }, [elapsedTime, isActive]);

    const startEmergency = () => {
        setIsActive(true);
        setElapsedTime(0);
        setCurrentStep(0);
        playBell();
    };

    const stopEmergency = () => {
        setIsActive(false);
        setElapsedTime(0);
        setCurrentStep(0);
        stopBell();
    };

    const getBreathColor = () => {
        switch (breathPhase) {
            case 'inhale':
                return 'var(--color-mpfc-gold)';
            case 'hold':
                return 'var(--color-transition)';
            case 'exhale':
                return 'var(--color-amygdala-calm)';
            default:
                return 'var(--color-mpfc-gold)';
        }
    };

    const getBreathScale = () => {
        switch (breathPhase) {
            case 'inhale':
                return 1.5;
            case 'hold':
                return 1.5;
            case 'exhale':
                return 0.8;
            default:
                return 1;
        }
    };

    const getBreathText = () => {
        switch (breathPhase) {
            case 'inhale':
                return '들이쉬기 (4초)';
            case 'hold':
                return '멈추기 (7초)';
            case 'exhale':
                return '내쉬기 (8초)';
            default:
                return '';
        }
    };

    return (
        <div className="emergency" style={{
            minHeight: '100vh',
            background: isActive
                ? 'linear-gradient(135deg, var(--color-amygdala-stress) 0%, var(--color-amygdala-calm) 100%)'
                : 'var(--gradient-bg)',
            transition: 'background 2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-xl)'
        }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                {!isActive ? (
                    // Start Screen
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div style={{ fontSize: '5rem', marginBottom: 'var(--spacing-lg)' }}>🚨</div>
                        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>긴급 편도체 안정 모드</h1>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                            극심한 스트레스나 분노를 느낄 때 사용하세요.<br />
                            5분 안에 편도체를 진정시킵니다.
                        </p>

                        <div className="glass" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)', textAlign: 'left' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>이럴 때 사용하세요:</h3>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 2 }}>
                                <li>갑작스러운 분노나 화가 치밀어 오를 때</li>
                                <li>극심한 불안이나 공황 증상이 있을 때</li>
                                <li>스트레스로 호흡이 가빠지고 심장이 두근거릴 때</li>
                                <li>감정이 폭발할 것 같아 즉각적인 진정이 필요할 때</li>
                            </ul>
                        </div>

                        <button
                            className="btn-emergency"
                            onClick={startEmergency}
                            style={{ fontSize: 'var(--font-size-xl)', padding: 'var(--spacing-lg) var(--spacing-2xl)' }}
                        >
                            지금 시작하기
                        </button>
                    </motion.div>
                ) : (
                    // Active Session
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Timer */}
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xs)' }}>
                                경과 시간
                            </div>
                            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', color: 'var(--color-mpfc-light)' }}>
                                {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                            </div>
                        </div>

                        {/* Breathing Circle */}
                        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                            <motion.div
                                animate={{
                                    scale: getBreathScale(),
                                    backgroundColor: getBreathColor()
                                }}
                                transition={{
                                    duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 7 : 8,
                                    ease: 'easeInOut'
                                }}
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '50%',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: `0 0 60px ${getBreathColor()}`,
                                    marginBottom: 'var(--spacing-lg)'
                                }}
                            >
                                <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'white' }}>
                                    {breathPhase === 'inhale' ? '↑' : breathPhase === 'hold' ? '●' : '↓'}
                                </span>
                            </motion.div>
                            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'white' }}>
                                {getBreathText()}
                            </div>
                        </div>

                        {/* Current Instruction */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="glass-strong"
                                style={{
                                    padding: 'var(--spacing-xl)',
                                    marginBottom: 'var(--spacing-xl)',
                                    minHeight: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <p style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, color: 'white' }}>
                                    {emergency.script[currentStep]?.text}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress */}
                        <div className="progress-bar" style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <div
                                className="progress-fill"
                                style={{ width: `${(elapsedTime / (emergency.duration * 60)) * 100}%` }}
                            ></div>
                        </div>

                        {/* Stop Button */}
                        <button
                            className="btn-secondary"
                            onClick={stopEmergency}
                            style={{ fontSize: 'var(--font-size-lg)' }}
                        >
                            중단하기
                        </button>

                        {elapsedTime >= emergency.duration * 60 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ marginTop: 'var(--spacing-xl)' }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>✅</div>
                                <h2 style={{ color: 'var(--color-success)' }}>완료했습니다!</h2>
                                <p style={{ color: 'white', marginTop: 'var(--spacing-md)' }}>
                                    기분이 어떤가요? 필요하면 다시 시작할 수 있습니다.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Emergency;
