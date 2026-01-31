import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum, calculateProgress } from '../data/curriculum';

function Training({ completedDays }) {
    const navigate = useNavigate();
    const progress = calculateProgress(completedDays.length);

    const isWeekUnlocked = (weekNumber) => {
        if (weekNumber === 1) return true;
        // Check if previous week is completed (all 7 days)
        const previousWeekDays = completedDays.filter(day => day.startsWith(`${weekNumber - 1}-`));
        return previousWeekDays.length >= 7;
    };

    const getWeekProgress = (weekNumber) => {
        const weekDays = completedDays.filter(day => day.startsWith(`${weekNumber}-`));
        return Math.round((weekDays.length / 7) * 100);
    };

    return (
        <div className="training">
            {/* Header */}
            <section className="section" style={{ minHeight: 'auto', paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>12주 마음 근력 훈련</h1>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                            매일 10분, 당신의 뇌를 변화시키는 여정
                        </p>

                        {/* Overall Progress */}
                        <div className="glass" style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                <span>전체 진행률</span>
                                <span className="text-gradient" style={{ fontWeight: 'bold' }}>{progress}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p style={{ marginTop: 'var(--spacing-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                {completedDays.length} / 84일 완료
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Curriculum Grid */}
            <section style={{ padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    {/* Phase 1: 자기 조절력 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-center mb-lg" style={{ color: 'var(--color-mpfc-gold)' }}>
                            1-4주차: 자기 조절력
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-2xl)'
                        }}>
                            {curriculum.slice(0, 4).map((week, index) => (
                                <RouterLink
                                    key={week.week}
                                    to={isWeekUnlocked(week.week) ? "/practice" : "#"}
                                    state={isWeekUnlocked(week.week) ? { week: week.week } : null}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={(e) => !isWeekUnlocked(week.week) && e.preventDefault()}
                                >
                                    <WeekCard
                                        week={week}
                                        isUnlocked={isWeekUnlocked(week.week)}
                                        progress={getWeekProgress(week.week)}
                                        delay={index * 0.1}
                                    />
                                </RouterLink>
                            ))}
                        </div>
                    </motion.div>

                    {/* Phase 2: 대인 관계력 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-center mb-lg" style={{ color: 'var(--color-mpfc-gold)' }}>
                            5-8주차: 대인 관계력
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-2xl)'
                        }}>
                            {curriculum.slice(4, 8).map((week, index) => (
                                <RouterLink
                                    key={week.week}
                                    to={isWeekUnlocked(week.week) ? "/practice" : "#"}
                                    state={isWeekUnlocked(week.week) ? { week: week.week } : null}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={(e) => !isWeekUnlocked(week.week) && e.preventDefault()}
                                >
                                    <WeekCard
                                        week={week}
                                        isUnlocked={isWeekUnlocked(week.week)}
                                        progress={getWeekProgress(week.week)}
                                        delay={index * 0.1}
                                    />
                                </RouterLink>
                            ))}
                        </div>
                    </motion.div>

                    {/* Phase 3: 자기 동기력 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-center mb-lg" style={{ color: 'var(--color-mpfc-gold)' }}>
                            9-12주차: 자기 동기력
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 'var(--spacing-lg)'
                        }}>
                            {curriculum.slice(8, 12).map((week, index) => (
                                <RouterLink
                                    key={week.week}
                                    to={isWeekUnlocked(week.week) ? "/practice" : "#"}
                                    state={isWeekUnlocked(week.week) ? { week: week.week } : null}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={(e) => !isWeekUnlocked(week.week) && e.preventDefault()}
                                >
                                    <WeekCard
                                        week={week}
                                        isUnlocked={isWeekUnlocked(week.week)}
                                        progress={getWeekProgress(week.week)}
                                        delay={index * 0.1}
                                    />
                                </RouterLink>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function WeekCard({ week, isUnlocked, progress, delay }) {
    return (
        <motion.div
            className={`card ${!isUnlocked ? 'card-locked' : ''} ${progress > 0 && progress < 100 ? 'card-active' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={isUnlocked ? { y: -10 } : {}}
            style={{ position: 'relative', cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
        >
            {/* Lock Icon */}
            {!isUnlocked && (
                <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    fontSize: '2rem'
                }}>
                    🔒
                </div>
            )}

            {/* Week Number */}
            <div style={{
                display: 'inline-block',
                background: 'var(--gradient-primary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--spacing-sm)',
                fontWeight: 'bold',
                color: 'var(--color-bg-primary)'
            }}>
                Week {week.week}
            </div>

            {/* Title */}
            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{week.title}</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                {week.subtitle}
            </p>

            {/* Description */}
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                {week.description}
            </p>

            {/* Progress */}
            {isUnlocked && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>
                        <span>진행률</span>
                        <span className="text-gradient" style={{ fontWeight: 'bold' }}>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}

            {/* Practice Count */}
            <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                📅 {week.practices.length}일 프로그램
            </p>
        </motion.div>
    );
}

export default Training;
