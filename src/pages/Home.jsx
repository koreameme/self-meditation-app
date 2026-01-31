import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="section" style={{
                background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--spacing-md)' }}>
                            self-명상
                        </h1>
                        <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                            뇌과학 기반 마음 근력 훈련
                        </p>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-xl)' }}>
                            편도체 안정화 × 전전두피질 활성화 (편안전활)
                        </p>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/training">
                                <button className="btn-primary" style={{ fontSize: 'var(--font-size-lg)', padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    12주 훈련 시작하기
                                </button>
                            </Link>
                            <Link to="/about">
                                <button className="btn-outline" style={{ fontSize: 'var(--font-size-lg)', padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                                    뇌과학 원리 알아보기
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Brain Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ marginTop: 'var(--spacing-2xl)' }}
                        className="animate-float"
                    >
                        <img
                            src="/assets/images/brain-balance.png"
                            alt="Brain Balance Visualization"
                            style={{
                                maxWidth: '600px',
                                width: '100%',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: 'var(--shadow-glow)'
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Three Pillars Section */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
                <div className="container">
                    <motion.h2
                        className="text-center mb-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        마음 근력의 3대 요소
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-lg)'
                    }}>
                        <motion.div
                            className="card"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 style={{ color: 'var(--color-mpfc-gold)' }}>🧘 자기 조절력</h3>
                            <p>감정을 인식하고 조절하는 능력. 편도체를 안정시키고 충동적 반응을 억제합니다.</p>
                            <ul style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                                <li>신체 이완 기법</li>
                                <li>호흡 조절 (사띠)</li>
                                <li>감정 관찰 명상</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="card"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 style={{ color: 'var(--color-mpfc-gold)' }}>💞 대인 관계력</h3>
                            <p>자기 연민과 타인 공감 능력. 건강한 관계를 맺고 유지하는 힘입니다.</p>
                            <ul style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                                <li>자기 연민 명상</li>
                                <li>오렌지 나뭇가지 비유</li>
                                <li>용서와 화해</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h3 style={{ color: 'var(--color-mpfc-gold)' }}>🚀 자기 동기력</h3>
                            <p>역경을 극복하고 성장하는 회복탄력성. 목적을 향해 나아가는 힘입니다.</p>
                            <ul style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
                                <li>회복탄력성 훈련</li>
                                <li>성장 마인드셋</li>
                                <li>목적과 의미 찾기</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section" style={{ background: 'var(--gradient-bg)' }}>
                <div className="container">
                    <motion.h2
                        className="text-center mb-xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        어떻게 작동하나요?
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-xl)' }}>
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: 'var(--spacing-md)',
                                filter: 'drop-shadow(0 0 20px rgba(244, 162, 97, 0.5))'
                            }}>
                                🧠
                            </div>
                            <h3>편도체 안정화</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                스트레스 반응을 담당하는 편도체를 진정시켜 감정적 안정을 찾습니다.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: 'var(--spacing-md)',
                                filter: 'drop-shadow(0 0 20px rgba(244, 162, 97, 0.5))'
                            }}>
                                ✨
                            </div>
                            <h3>전전두피질 활성화</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                이성과 통찰을 담당하는 mPFC를 활성화하여 현명한 선택을 가능하게 합니다.
                            </p>
                        </motion.div>

                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: 'var(--spacing-md)',
                                filter: 'drop-shadow(0 0 20px rgba(244, 162, 97, 0.5))'
                            }}>
                                🌱
                            </div>
                            <h3>신경 가소성</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                12주 훈련을 통해 뇌 회로를 긍정적으로 재배선하여 지속적인 변화를 만듭니다.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Scientific Disclaimer */}
            <section className="section" style={{ background: 'var(--color-bg-secondary)', minHeight: 'auto', padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    <div className="glass-strong" style={{ padding: 'var(--spacing-lg)', borderLeft: '4px solid var(--color-warning)' }}>
                        <h3 style={{ color: 'var(--color-warning)', marginBottom: 'var(--spacing-sm)' }}>⚠️ 중요 안내</h3>
                        <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <strong>과학적 근거:</strong> 이 앱은 100% 뇌과학과 심리학 논문에 입증된 데이터를 기반으로 합니다. 신비주의나 종교가 아닙니다.
                        </p>
                        <p style={{ marginBottom: 'var(--spacing-sm)' }}>
                            <strong>치료와의 구분:</strong> 우울증이나 불안장애가 심한 경우, 이 앱은 예방 및 재활 수단일 뿐이며 반드시 전문의의 진료와 약물 치료를 병행해야 합니다.
                        </p>
                        <p style={{ marginBottom: 0 }}>
                            <strong>지속성:</strong> 뇌의 신경망 변화에는 최소 3개월(12주)의 꾸준한 훈련이 필요합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section" style={{ background: 'var(--gradient-bg)' }}>
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-md">오늘부터 시작하세요</h2>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                            매일 10분, 12주 동안 당신의 뇌를 변화시킬 수 있습니다.
                        </p>
                        <Link to="/training">
                            <button className="btn-primary" style={{ fontSize: 'var(--font-size-xl)', padding: 'var(--spacing-lg) var(--spacing-2xl)' }}>
                                12주 여정 시작하기 →
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default Home;
