import { motion } from 'framer-motion';

function About() {
    return (
        <div className="about">
            <section className="section">
                <div className="container" style={{ maxWidth: '900px', width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-center mb-xl" style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)' }}>뇌과학으로 이해하는 명상</h1>

                        {/* Brain Science Foundation */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-xl)' }}>🧠 편안전활: 핵심 원리</h2>
                            <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)' }}>
                                <strong className="text-gradient">편안전활</strong>은 <strong>편도체 안정화</strong>와 <strong>전전두피질 활성화</strong>를 결합한 용어입니다.
                                이는 김주환 교수의 연구를 바탕으로 한 과학적 명상 접근법입니다.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 'var(--spacing-md)' }}>
                                <div className="glass-strong" style={{ padding: 'var(--spacing-md)' }}>
                                    <h3 style={{ color: 'var(--color-amygdala-stress)', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-base)' }}>편도체 (Amygdala)</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
                                        감정 중추로, 위협을 감지하고 스트레스 반응을 일으킵니다.
                                        과도하게 활성화되면 불안, 분노, 공포를 느낍니다.
                                    </p>
                                </div>

                                <div className="glass-strong" style={{ padding: 'var(--spacing-md)' }}>
                                    <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-base)' }}>전전두피질 (mPFC)</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.5 }}>
                                        이성과 통찰의 중추로, 감정을 조절하고 현명한 판단을 내립니다.
                                        활성화되면 평화롭고 명료한 상태가 됩니다.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* How It Works */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-xl)' }}>⚙️ 작동 원리</h2>

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>1. 신체 이완으로 편도체 안정화</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    턱 근육(교근), 어깨 근육(승모근), 안구 근육은 뇌신경과 직접 연결되어 있습니다.
                                    이 근육들의 긴장을 풀면 편도체에 "안전하다"는 신호가 전달되어 스트레스 반응이 줄어듭니다.
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>2. 자세 정렬로 부교감신경 활성화</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    꼬리뼈부터 정수리까지 일직선을 유지하면 척추가 바로 서고,
                                    부교감신경계가 활성화되어 '휴식과 회복' 모드로 전환됩니다.
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>3. 호흡 조절로 즉각적 진정</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    4-7-8 호흡법(4초 들이쉬기, 7초 멈추기, 8초 내쉬기)은 과학적으로 입증된
                                    편도체 안정화 기법입니다. 위기 상황에서 즉각 사용할 수 있습니다.
                                </p>
                            </div>

                            <div>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>4. 명상으로 mPFC 활성화</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    자기 연민, 감사, 용서, 연민의 감정은 내측 전전두피질(mPFC)을 활성화합니다.
                                    이 영역이 활성화되면 감정 조절 능력이 향상되고 통찰력이 깊어집니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Neural Plasticity */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-xl)' }}>🌱 신경 가소성</h2>
                            <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)' }}>
                                뇌는 평생 변화할 수 있습니다. 이를 <strong>신경 가소성</strong>이라고 합니다.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-sm)' }}>
                                반복적인 훈련을 통해 뇌의 신경망이 재배선됩니다.
                                마치 근육을 키우듯, 마음의 근력도 훈련으로 강화할 수 있습니다.
                            </p>
                            <div className="glass-strong" style={{ padding: 'var(--spacing-md)', borderLeft: '4px solid var(--color-mpfc-gold)' }}>
                                <p style={{ margin: 0, fontWeight: 'bold', fontSize: 'var(--font-size-sm)' }}>
                                    💡 최소 12주(84일)의 꾸준한 실천이 필요합니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Three Pillars Detail */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>💪 마음 근력의 3대 요소</h2>

                            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>1. 자기 조절력 (Self-Regulation)</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    감정을 인식하고 조절하는 능력입니다. 편도체를 안정시키고 충동적 반응을 억제하여,
                                    스트레스 상황에서도 침착함을 유지할 수 있게 합니다.
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>2. 대인 관계력 (Interpersonal Skills)</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    자기 연민과 타인 공감 능력입니다. 나 자신을 베스트 프렌드처럼 대하고,
                                    타인의 비난으로부터 자유로워지며, 건강한 관계를 맺고 유지하는 힘입니다.
                                </p>
                            </div>

                            <div>
                                <h3 style={{ color: 'var(--color-mpfc-gold)', marginBottom: 'var(--spacing-sm)' }}>3. 자기 동기력 (Self-Motivation)</h3>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                    역경을 극복하고 성장하는 회복탄력성입니다. 실패를 배움의 기회로 보고,
                                    유리공처럼 떨어진 자리에서 더 높이 튀어오르는 힘입니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* Scientific References */}
                        <motion.div
                            className="glass"
                            style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>📚 과학적 근거</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                                이 앱의 모든 내용은 뇌과학과 심리학 연구에 기반합니다:
                            </p>
                            <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 2 }}>
                                <li>편도체와 전전두피질의 상호작용 (Davidson & McEwen, 2012)</li>
                                <li>명상의 신경생물학적 효과 (Tang et al., 2015)</li>
                                <li>자기 연민과 정신 건강 (Neff & Germer, 2013)</li>
                                <li>회복탄력성의 신경과학 (Southwick & Charney, 2012)</li>
                                <li>신경 가소성과 마음챙김 (Hölzel et al., 2011)</li>
                            </ul>
                        </motion.div>

                        {/* Kim Joo-hwan */}
                        <motion.div
                            className="glass-strong"
                            style={{ padding: 'var(--spacing-xl)' }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>👨‍🏫 김주환 교수</h2>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-md)' }}>
                                연세대학교 언론홍보영상학부 교수이자 뇌과학과 명상 연구의 권위자입니다.
                                저서 <strong>『회복탄력성』</strong>, <strong>『내면소통』</strong> 등을 통해
                                과학적 근거에 기반한 마음 훈련법을 대중에게 전파하고 있습니다.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                그의 연구는 신비주의나 종교가 아닌, 100% 뇌과학과 심리학 논문에 입증된
                                데이터를 기반으로 합니다.
                            </p>
                        </motion.div>

                        {/* Disclaimer */}
                        <motion.div
                            className="glass"
                            style={{
                                padding: 'var(--spacing-lg)',
                                marginTop: 'var(--spacing-xl)',
                                borderLeft: '4px solid var(--color-warning)'
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h3 style={{ color: 'var(--color-warning)', marginBottom: 'var(--spacing-sm)' }}>⚠️ 중요 안내</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-sm)' }}>
                                이 앱은 예방 및 재활 도구입니다. 심각한 우울증, 불안장애, 공황장애 등의
                                정신 질환이 있는 경우 반드시 전문의의 진료와 약물 치료를 병행해야 합니다.
                            </p>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: 0 }}>
                                명상은 치료를 대체할 수 없으며, 보완적 수단으로 사용되어야 합니다.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default About;
