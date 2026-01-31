// 12주 마음 근력 훈련 커리큘럼
// 김주환 교수의 편도체 안정화와 전전두피질 활성화(편안전활) 이론 기반

export const curriculum = [
    // ========== 1-4주차: 자기 조절력 (Self-Regulation) ==========
    {
        week: 1,
        phase: "자기 조절력",
        title: "편안전활 입문",
        subtitle: "뇌과학으로 이해하는 마음의 작동 원리",
        description: "편도체와 전전두피질의 관계를 이해하고, 기본적인 신체 이완 기법을 배웁니다.",
        youtubeId: "FmD1lGgH-R8",
        practices: [
            {
                day: 1,
                title: "뇌과학 기초 이해",
                duration: 10,
                type: "교육",
                content: "편도체(감정 중추)와 mPFC(이성 중추)의 역할 학습"
            },
            {
                day: 2,
                title: "신체 스캔 명상",
                duration: 10,
                type: "명상",
                content: "몸의 긴장 부위를 관찰하고 인식하기"
            },
            {
                day: 3,
                title: "자세 정렬 연습",
                duration: 10,
                type: "신체",
                content: "꼬리뼈부터 정수리까지 일직선 유지하기"
            },
            {
                day: 4,
                title: "턱 근육 이완",
                duration: 10,
                type: "신체",
                content: "교근(masseter) 힘 빼기 연습"
            },
            {
                day: 5,
                title: "어깨 긴장 해소",
                duration: 10,
                type: "신체",
                content: "승모근(trapezius) 이완 기법"
            },
            {
                day: 6,
                title: "안구 근육 휴식",
                duration: 10,
                type: "신체",
                content: "눈 주변 근육 이완으로 뇌신경 안정화"
            },
            {
                day: 7,
                title: "주간 복습 & 일기",
                duration: 15,
                type: "복습",
                content: "이번 주 경험 정리 및 Plan-Do-See 다이어리"
            }
        ],
        unlocked: true
    },
    {
        week: 2,
        phase: "자기 조절력",
        title: "신체 자각력 강화",
        subtitle: "몸이 보내는 신호에 귀 기울이기",
        description: "신체 내부 감각을 섬세하게 관찰하는 '격관 명상'을 통해 편도체 활성화를 조기에 감지합니다.",
        youtubeId: "ECNjHpy6ujH",
        practices: [
            {
                day: 1,
                title: "격관 명상 입문",
                duration: 10,
                type: "명상",
                content: "신체 내부 감각 관찰하기"
            },
            {
                day: 2,
                title: "호흡 관찰",
                duration: 10,
                type: "명상",
                content: "자연스러운 호흡의 흐름 느끼기"
            },
            {
                day: 3,
                title: "감정과 신체 연결",
                duration: 10,
                type: "명상",
                content: "감정이 신체에 미치는 영향 관찰"
            },
            {
                day: 4,
                title: "긴장 신호 인식",
                duration: 10,
                type: "명상",
                content: "스트레스 초기 신호 감지 훈련"
            },
            {
                day: 5,
                title: "이완 반응 연습",
                duration: 10,
                type: "신체",
                content: "부교감신경 활성화 기법"
            },
            {
                day: 6,
                title: "통합 연습",
                duration: 10,
                type: "명상",
                content: "자각 → 이완 → 안정 프로세스"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "신체 신호 일지 작성"
            }
        ],
        unlocked: false
    },
    {
        week: 3,
        phase: "자기 조절력",
        title: "호흡 조절 (사띠)",
        subtitle: "편도체를 즉각 안정시키는 호흡법",
        description: "4-7-8 호흡법과 사띠(Sati) 명상으로 스트레스 상황에서 즉각적인 안정을 찾습니다.",
        youtubeId: "GIVfWyqOOKk",
        practices: [
            {
                day: 1,
                title: "4-7-8 호흡법",
                duration: 10,
                type: "호흡",
                content: "4초 들이쉬기, 7초 멈추기, 8초 내쉬기"
            },
            {
                day: 2,
                title: "사띠 명상 기초",
                duration: 10,
                type: "명상",
                content: "현재 순간에 온전히 머물기"
            },
            {
                day: 3,
                title: "복식 호흡",
                duration: 10,
                type: "호흡",
                content: "횡격막을 이용한 깊은 호흡"
            },
            {
                day: 4,
                title: "호흡과 감정 조절",
                duration: 10,
                type: "호흡",
                content: "분노/불안 시 호흡으로 진정하기"
            },
            {
                day: 5,
                title: "일상 속 사띠",
                duration: 10,
                type: "명상",
                content: "걷기, 먹기 등 일상 활동에 집중"
            },
            {
                day: 6,
                title: "긴급 진정 프로토콜",
                duration: 10,
                type: "호흡",
                content: "위기 상황 대응 호흡법"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "호흡 훈련 효과 기록"
            }
        ],
        unlocked: false
    },
    {
        week: 4,
        phase: "자기 조절력",
        title: "감정 관찰자 되기",
        subtitle: "감정에 휩쓸리지 않고 바라보기",
        description: "감정을 판단하지 않고 있는 그대로 관찰하는 연습으로 mPFC를 활성화합니다.",
        youtubeId: "GBaTlirnMLw",
        practices: [
            {
                day: 1,
                title: "감정 라벨링",
                duration: 10,
                type: "명상",
                content: "감정에 이름 붙이기 (화남, 슬픔, 기쁨 등)"
            },
            {
                day: 2,
                title: "비판단적 관찰",
                duration: 10,
                type: "명상",
                content: "좋고 나쁨 없이 감정 바라보기"
            },
            {
                day: 3,
                title: "감정의 파도",
                duration: 10,
                type: "명상",
                content: "감정이 일어났다 사라짐을 관찰"
            },
            {
                day: 4,
                title: "생각과 감정 분리",
                duration: 10,
                type: "명상",
                content: "'나는 화가 났다'가 아닌 '화라는 감정이 있다'"
            },
            {
                day: 5,
                title: "수용 연습",
                duration: 10,
                type: "명상",
                content: "불편한 감정도 있는 그대로 받아들이기"
            },
            {
                day: 6,
                title: "감정 일기",
                duration: 10,
                type: "일기",
                content: "하루 감정 변화 기록 및 패턴 발견"
            },
            {
                day: 7,
                title: "1개월 마일스톤",
                duration: 20,
                type: "복습",
                content: "자기 조절력 향상 점검 및 축하"
            }
        ],
        unlocked: false
    },

    // ========== 5-8주차: 대인 관계력 (Interpersonal Skills) ==========
    {
        week: 5,
        phase: "대인 관계력",
        title: "자기 연민 (Self-Compassion)",
        subtitle: "나를 베스트 프렌드처럼 대하기",
        description: "자신의 실패와 약점을 비난하지 않고, 친구를 대하듯 따뜻하게 받아들이는 연습을 합니다.",
        youtubeId: "GBaTlirnMLw",
        practices: [
            {
                day: 1,
                title: "자기 연민 이해",
                duration: 10,
                type: "교육",
                content: "자기 연민 vs 자기 비난의 차이"
            },
            {
                day: 2,
                title: "베스트 프렌드 명상",
                duration: 10,
                type: "명상",
                content: "나에게 친구처럼 말 걸기"
            },
            {
                day: 3,
                title: "실패 수용",
                duration: 10,
                type: "명상",
                content: "실수를 성장의 기회로 보기"
            },
            {
                day: 4,
                title: "자기 격려",
                duration: 10,
                type: "명상",
                content: "힘든 순간 스스로를 위로하기"
            },
            {
                day: 5,
                title: "완벽주의 내려놓기",
                duration: 10,
                type: "명상",
                content: "있는 그대로의 나 인정하기"
            },
            {
                day: 6,
                title: "자애 명상",
                duration: 10,
                type: "명상",
                content: "'나는 행복하기를, 평화롭기를' 기원"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "자기 연민 실천 사례 기록"
            }
        ],
        unlocked: false
    },
    {
        week: 6,
        phase: "대인 관계력",
        title: "오렌지 나뭇가지 비유",
        subtitle: "타인의 비난으로부터 자유로워지기",
        description: "타인의 부정적 말을 '오렌지 나뭇가지'처럼 받지 않고 흘려보내는 지혜를 배웁니다.",
        youtubeId: "HO8OaZaSW6d",
        practices: [
            {
                day: 1,
                title: "오렌지 나뭇가지 이야기",
                duration: 10,
                type: "교육",
                content: "비난을 받지 않으면 돌아간다는 지혜"
            },
            {
                day: 2,
                title: "비난 관찰 명상",
                duration: 10,
                type: "명상",
                content: "비난받을 때 내 반응 관찰하기"
            },
            {
                day: 3,
                title: "경계선 긋기",
                duration: 10,
                type: "명상",
                content: "타인의 감정과 내 감정 분리하기"
            },
            {
                day: 4,
                title: "반응 vs 대응",
                duration: 10,
                type: "명상",
                content: "즉각 반응 대신 의식적 대응 선택"
            },
            {
                day: 5,
                title: "용서 명상",
                duration: 10,
                type: "명상",
                content: "상처 준 사람을 이해하고 놓아주기"
            },
            {
                day: 6,
                title: "내면의 평화",
                duration: 10,
                type: "명상",
                content: "외부 평가에 흔들리지 않는 중심 찾기"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "비난 대응 사례 분석"
            }
        ],
        unlocked: false
    },
    {
        week: 7,
        phase: "대인 관계력",
        title: "공감과 연민",
        subtitle: "타인의 고통을 이해하고 함께하기",
        description: "다른 사람의 감정을 이해하고 공감하는 능력을 키워 관계의 질을 높입니다.",
        youtubeId: "HO8OaZaSW6d",
        practices: [
            {
                day: 1,
                title: "공감 vs 동정",
                duration: 10,
                type: "교육",
                content: "진정한 공감의 의미 이해"
            },
            {
                day: 2,
                title: "타인 관점 명상",
                duration: 10,
                type: "명상",
                content: "상대방 입장에서 상황 바라보기"
            },
            {
                day: 3,
                title: "경청 연습",
                duration: 10,
                type: "실천",
                content: "판단 없이 온전히 듣기"
            },
            {
                day: 4,
                title: "연민 명상",
                duration: 10,
                type: "명상",
                content: "고통받는 이들을 위한 기원"
            },
            {
                day: 5,
                title: "공감 표현",
                duration: 10,
                type: "실천",
                content: "이해와 위로의 말 전하기"
            },
            {
                day: 6,
                title: "관계 회복",
                duration: 10,
                type: "명상",
                content: "갈등 관계에 연민 보내기"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "공감 실천 경험 나누기"
            }
        ],
        unlocked: false
    },
    {
        week: 8,
        phase: "대인 관계력",
        title: "용서와 화해",
        subtitle: "과거의 상처에서 자유로워지기",
        description: "용서는 상대를 위한 것이 아닌 나를 위한 선물임을 깨닫고 실천합니다.",
        youtubeId: "HO8OaZaSW6d",
        practices: [
            {
                day: 1,
                title: "용서의 의미",
                duration: 10,
                type: "교육",
                content: "용서는 나를 자유롭게 하는 것"
            },
            {
                day: 2,
                title: "상처 인정하기",
                duration: 10,
                type: "명상",
                content: "아픔을 있는 그대로 받아들이기"
            },
            {
                day: 3,
                title: "용서 편지 쓰기",
                duration: 15,
                type: "일기",
                content: "용서하고 싶은 사람에게 편지 (보내지 않음)"
            },
            {
                day: 4,
                title: "자기 용서",
                duration: 10,
                type: "명상",
                content: "과거의 나를 용서하기"
            },
            {
                day: 5,
                title: "원한 놓아주기",
                duration: 10,
                type: "명상",
                content: "분노와 원망을 흘려보내기"
            },
            {
                day: 6,
                title: "감사 전환",
                duration: 10,
                type: "명상",
                content: "상처를 통해 배운 것에 감사하기"
            },
            {
                day: 7,
                title: "2개월 마일스톤",
                duration: 20,
                type: "복습",
                content: "대인 관계력 향상 점검 및 축하"
            }
        ],
        unlocked: false
    },

    // ========== 9-12주차: 자기 동기력 (Self-Motivation) ==========
    {
        week: 9,
        phase: "자기 동기력",
        title: "회복탄력성 (Resilience)",
        subtitle: "역경을 성장의 기회로 전환하기",
        description: "유리공이 땅에 떨어져 더 높이 튀어오르듯, 어려움을 통해 더 강해지는 힘을 기릅니다.",
        youtubeId: "FmD1lGgH-R8",
        practices: [
            {
                day: 1,
                title: "회복탄력성 이해",
                duration: 10,
                type: "교육",
                content: "역경 후 더 강해지는 원리"
            },
            {
                day: 2,
                title: "과거 극복 경험",
                duration: 10,
                type: "명상",
                content: "이겨낸 어려움 떠올리며 자신감 얻기"
            },
            {
                day: 3,
                title: "실패를 배움으로",
                duration: 10,
                type: "명상",
                content: "실패에서 교훈 찾기"
            },
            {
                day: 4,
                title: "유리공 시각화",
                duration: 10,
                type: "명상",
                content: "더 높이 튀어오르는 나를 상상하기"
            },
            {
                day: 5,
                title: "강점 발견",
                duration: 10,
                type: "일기",
                content: "내 안의 숨겨진 강점 찾기"
            },
            {
                day: 6,
                title: "도전 수용",
                duration: 10,
                type: "명상",
                content: "어려움을 성장의 기회로 보기"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "회복탄력성 사례 기록"
            }
        ],
        unlocked: false
    },
    {
        week: 10,
        phase: "자기 동기력",
        title: "성장 마인드셋",
        subtitle: "고정된 능력이 아닌 성장 가능성 믿기",
        description: "뇌의 신경 가소성을 이해하고, 노력을 통해 변화할 수 있다는 믿음을 강화합니다.",
        youtubeId: "FmD1lGgH-R8",
        practices: [
            {
                day: 1,
                title: "신경 가소성 이해",
                duration: 10,
                type: "교육",
                content: "뇌는 평생 변화한다는 과학적 사실"
            },
            {
                day: 2,
                title: "고정 vs 성장 마인드셋",
                duration: 10,
                type: "교육",
                content: "두 마인드셋의 차이 이해"
            },
            {
                day: 3,
                title: "노력 찬양",
                duration: 10,
                type: "명상",
                content: "결과보다 과정에 집중하기"
            },
            {
                day: 4,
                title: "도전 즐기기",
                duration: 10,
                type: "명상",
                content: "어려운 과제를 배움의 기회로 보기"
            },
            {
                day: 5,
                title: "비교 멈추기",
                duration: 10,
                type: "명상",
                content: "타인이 아닌 과거의 나와 비교하기"
            },
            {
                day: 6,
                title: "성장 일지",
                duration: 10,
                type: "일기",
                content: "오늘 배우고 성장한 점 기록"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "성장 마인드셋 실천 사례"
            }
        ],
        unlocked: false
    },
    {
        week: 11,
        phase: "자기 동기력",
        title: "목적과 의미 찾기",
        subtitle: "내 삶의 방향성 명확히 하기",
        description: "진정으로 원하는 것이 무엇인지, 어떤 삶을 살고 싶은지 깊이 탐구합니다.",
        youtubeId: "FmD1lGgH-R8",
        practices: [
            {
                day: 1,
                title: "가치 탐색",
                duration: 10,
                type: "명상",
                content: "내게 중요한 가치 5가지 찾기"
            },
            {
                day: 2,
                title: "비전 명상",
                duration: 10,
                type: "명상",
                content: "5년 후 이상적인 내 모습 그리기"
            },
            {
                day: 3,
                title: "의미 있는 활동",
                duration: 10,
                type: "명상",
                content: "나를 살아있게 하는 것들 발견"
            },
            {
                day: 4,
                title: "목적 선언문",
                duration: 15,
                type: "일기",
                content: "내 삶의 목적을 한 문장으로 쓰기"
            },
            {
                day: 5,
                title: "작은 실천",
                duration: 10,
                type: "실천",
                content: "목적에 맞는 작은 행동 하기"
            },
            {
                day: 6,
                title: "감사 명상",
                duration: 10,
                type: "명상",
                content: "지금 가진 것에 감사하기"
            },
            {
                day: 7,
                title: "주간 복습",
                duration: 15,
                type: "복습",
                content: "목적 실천 경험 나누기"
            }
        ],
        unlocked: false
    },
    {
        week: 12,
        phase: "자기 동기력",
        title: "통합과 지속",
        subtitle: "12주 여정 마무리와 새로운 시작",
        description: "지난 12주간의 변화를 축하하고, 앞으로도 계속 실천할 수 있는 계획을 세웁니다.",
        youtubeId: "FmD1lGgH-R8",
        practices: [
            {
                day: 1,
                title: "12주 회고",
                duration: 15,
                type: "복습",
                content: "처음과 지금의 나 비교하기"
            },
            {
                day: 2,
                title: "변화 축하",
                duration: 10,
                type: "명상",
                content: "성장한 나를 축하하고 격려하기"
            },
            {
                day: 3,
                title: "핵심 실천 선택",
                duration: 10,
                type: "계획",
                content: "계속할 3가지 핵심 습관 정하기"
            },
            {
                day: 4,
                title: "지속 계획",
                duration: 15,
                type: "계획",
                content: "다음 3개월 실천 계획 세우기"
            },
            {
                day: 5,
                title: "감사 편지",
                duration: 15,
                type: "일기",
                content: "12주 전 나에게 감사 편지 쓰기"
            },
            {
                day: 6,
                title: "나눔 명상",
                duration: 10,
                type: "명상",
                content: "배운 것을 다른 이와 나누기"
            },
            {
                day: 7,
                title: "졸업식",
                duration: 20,
                type: "축하",
                content: "12주 완주 축하 및 새로운 시작"
            }
        ],
        unlocked: false
    }
];

// 주차별 잠금 해제 로직
export const unlockWeek = (weekNumber, completedWeeks) => {
    return weekNumber === 1 || completedWeeks.includes(weekNumber - 1);
};

// 진행률 계산
export const calculateProgress = (completedDays) => {
    const totalDays = curriculum.reduce((sum, week) => sum + week.practices.length, 0);
    return Math.round((completedDays / totalDays) * 100);
};
