import { motion } from 'framer-motion';
import { calculateProgress } from '../data/curriculum';

function Progress({ completedDays }) {
    const totalProgress = calculateProgress(completedDays.length);
    const streak = calculateStreak(completedDays);
    const weeklyStats = getWeeklyStats(completedDays);

    return (
        <div className="progress-page">
            <section className="section">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-center mb-xl">진행 상황</h1>

                        {/* Overall Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>
                            <motion.div
                                className="glass-strong text-center"
                                style={{ padding: 'var(--spacing-xl)' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>📊</div>
                                <h3 className="text-gradient" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                                    {totalProgress}%
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>전체 진행률</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-sm)' }}>
                                    {completedDays.length} / 84일 완료
                                </p>
                            </motion.div>

                            <motion.div
                                className="glass-strong text-center"
                                style={{ padding: 'var(--spacing-xl)' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🔥</div>
                                <h3 className="text-gradient" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                                    {streak}일
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>연속 실천</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-sm)' }}>
                                    {streak >= 7 ? '훌륭합니다! 🎉' : '계속 이어가세요!'}
                                </p>
                            </motion.div>

                            <motion.div
                                className="glass-strong text-center"
                                style={{ padding: 'var(--spacing-xl)' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>🧠</div>
                                <h3 className="text-gradient" style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                                    {Math.floor(completedDays.length / 7)}주
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>완료한 주차</p>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-sm)' }}>
                                    신경 가소성 진행 중
                                </p>
                            </motion.div>
                        </div>

                        {/* Neural Plasticity Progress */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>🌱 신경 가소성 진행도</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                                뇌의 신경망이 변화하는 데는 최소 12주(84일)가 필요합니다.
                                꾸준한 실천으로 편도체는 안정되고 전전두피질은 활성화됩니다.
                            </p>

                            <div className="progress-bar" style={{ height: '20px', marginBottom: 'var(--spacing-md)' }}>
                                <div className="progress-fill" style={{ width: `${totalProgress}%` }}></div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                <span>시작</span>
                                <span>4주 (초기 변화)</span>
                                <span>8주 (습관 형성)</span>
                                <span>12주 (완전 정착)</span>
                            </div>
                        </motion.div>

                        {/* Weekly Breakdown */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-2xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>주차별 완료 현황</h2>
                            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                                {weeklyStats.map((week, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        borderRadius: 'var(--radius-sm)'
                                    }}>
                                        <div style={{ minWidth: '80px', fontWeight: 'bold' }}>
                                            Week {week.week}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div className="progress-bar" style={{ height: '12px' }}>
                                                <div className="progress-fill" style={{ width: `${week.percentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div style={{ minWidth: '80px', textAlign: 'right', color: 'var(--color-text-muted)' }}>
                                            {week.completed} / 7일
                                        </div>
                                        {week.percentage === 100 && (
                                            <span style={{ fontSize: '1.5rem' }}>✅</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>🏆 성취 배지</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                                <AchievementBadge
                                    icon="🌟"
                                    title="첫 걸음"
                                    description="첫 실천 완료"
                                    unlocked={completedDays.length >= 1}
                                />
                                <AchievementBadge
                                    icon="📅"
                                    title="일주일 완주"
                                    description="7일 연속 실천"
                                    unlocked={streak >= 7}
                                />
                                <AchievementBadge
                                    icon="🎯"
                                    title="한 달의 힘"
                                    description="4주 완료"
                                    unlocked={completedDays.length >= 28}
                                />
                                <AchievementBadge
                                    icon="💪"
                                    title="중간 지점"
                                    description="6주 완료"
                                    unlocked={completedDays.length >= 42}
                                />
                                <AchievementBadge
                                    icon="🔥"
                                    title="불타는 의지"
                                    description="21일 연속"
                                    unlocked={streak >= 21}
                                />
                                <AchievementBadge
                                    icon="🎓"
                                    title="졸업 예정"
                                    description="12주 완료"
                                    unlocked={completedDays.length >= 84}
                                />
                            </div>
                        </motion.div>

                        {/* Encouragement Message */}
                        {completedDays.length > 0 && completedDays.length < 84 && (
                            <motion.div
                                className="text-center"
                                style={{ marginTop: 'var(--spacing-2xl)' }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-mpfc-gold)' }}>
                                    {getEncouragementMessage(completedDays.length)}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

function AchievementBadge({ icon, title, description, unlocked }) {
    return (
        <motion.div
            className={`card text-center ${!unlocked ? 'card-locked' : ''}`}
            style={{ padding: 'var(--spacing-md)' }}
            whileHover={unlocked ? { scale: 1.1 } : {}}
        >
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)', filter: unlocked ? 'none' : 'grayscale(1)' }}>
                {icon}
            </div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-xs)' }}>{title}</h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                {description}
            </p>
        </motion.div>
    );
}

function calculateStreak(completedDays) {
    if (completedDays.length === 0) return 0;

    // Simple streak calculation (can be improved)
    return completedDays.length >= 7 ? 7 : completedDays.length;
}

function getWeeklyStats(completedDays) {
    const stats = [];
    for (let week = 1; week <= 12; week++) {
        const weekDays = completedDays.filter(day => day.startsWith(`${week}-`));
        stats.push({
            week,
            completed: weekDays.length,
            percentage: Math.round((weekDays.length / 7) * 100)
        });
    }
    return stats;
}

function getEncouragementMessage(completedCount) {
    if (completedCount < 7) {
        return "훌륭한 시작입니다! 첫 주를 완료하면 변화가 느껴질 거예요. 💪";
    } else if (completedCount < 28) {
        return "멋집니다! 편도체가 안정되기 시작했어요. 계속 이어가세요! 🌟";
    } else if (completedCount < 56) {
        return "대단합니다! 신경 가소성이 활발히 진행 중입니다. 🧠✨";
    } else {
        return "거의 다 왔습니다! 12주 완주까지 조금만 더 힘내세요! 🎯🔥";
    }
}

export default Progress;
