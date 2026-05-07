import { useState, useEffect } from "react";

const questions = [
  {
    q: "집에서 새 영어 단어를 알려줬을 때, 아이가 제일 먼저 하는 행동은?",
    options: [
      { text: "바로 소리 내서 따라 말하거나 문장에 써봐요", type: "talker" },
      { text: '"무슨 뜻이에요?" 하고 설명을 요청해요', type: "thinker" },
      { text: "전에 본 영상이나 그림이랑 연결하려 해요", type: "taster" },
      { text: "노트에 받아 적거나 직접 써서 확인해요", type: "tactician" },
    ],
  },
  {
    q: "학원 다녀온 날, 아이에게 '오늘 뭐 배웠어?'라고 물으면?",
    options: [
      { text: "선생님이랑 나눈 대화나 친구 얘기를 해요", type: "talker" },
      { text: "배운 문법이나 규칙을 설명하려 해요", type: "thinker" },
      { text: "재미있었던 영상이나 활동 얘기를 해요", type: "taster" },
      { text: "오늘 몇 개 맞았는지, 레벨이 어떤지 말해요", type: "tactician" },
    ],
  },
  {
    q: "아이가 모르는 걸 알게 됐을 때 반응은?",
    options: [
      { text: "소리 내어 따라 하거나 바로 써먹으려 해요", type: "talker" },
      { text: "왜 그런지 이유를 알 때까지 물어봐요", type: "thinker" },
      { text: "그림이나 예시로 보여주면 금방 이해해요", type: "taster" },
      { text: "메모하거나 다음엔 틀리지 않겠다고 다짐해요", type: "tactician" },
    ],
  },
  {
    q: "주말에 아이를 그냥 놔두면 뭘 하고 있나요?",
    options: [
      { text: "친구들이랑 수다 떨거나 뭔가 설명하고 있어요", type: "talker" },
      { text: "혼자 책 읽거나 퍼즐, 문제 풀기를 해요", type: "thinker" },
      { text: "유튜브, 음악, 그림 그리기, 게임에 빠져 있어요", type: "taster" },
      { text: "뭔가 계획을 짜거나 목표를 정해서 하고 있어요", type: "tactician" },
    ],
  },
  {
    q: "모둠 활동이나 놀이에서 아이는 주로 어떤 모습인가요?",
    options: [
      { text: "제일 먼저 말 꺼내고 분위기를 주도해요", type: "talker" },
      { text: "조용히 있다가 정확한 의견을 내요", type: "thinker" },
      { text: "자기만의 아이디어로 독특한 걸 제안해요", type: "taster" },
      { text: "역할을 나누거나 순서를 정하려 해요", type: "tactician" },
    ],
  },
  {
    q: "학교에서 칭찬받거나 상 받는 건 주로 어떤 활동인가요?",
    options: [
      { text: "발표, 토론, 친구들을 설득할 때", type: "talker" },
      { text: "수학, 과학, 문제 분석할 때", type: "thinker" },
      { text: "미술, 음악, 창작 활동할 때", type: "taster" },
      { text: "계획 세우기, 프로젝트 완성할 때", type: "tactician" },
    ],
  },
  {
    q: "영어로 실수했을 때 아이 반응은?",
    options: [
      { text: "웃으며 넘기고 바로 다시 시도해요", type: "talker" },
      { text: "속상해하고 다음엔 더 준비하려 해요", type: "thinker" },
      { text: "크게 신경 쓰지 않아요", type: "taster" },
      { text: "분석하고 같은 실수 안 하려 전략을 세워요", type: "tactician" },
    ],
  },
  {
    q: "처음 보는 사람과 영어로 대화해야 할 때 아이는?",
    options: [
      { text: "별로 긴장 안 하고 먼저 말 걸어요", type: "talker" },
      { text: "많이 긴장하고 미리 할 말을 생각해요", type: "thinker" },
      { text: "분위기에 따라 달라요", type: "taster" },
      { text: "준비가 됐다고 느끼면 자신 있게 해요", type: "tactician" },
    ],
  },
  {
    q: "영어 시험이나 발표를 앞두고 아이 모습은?",
    options: [
      { text: "평소와 별 차이 없어요", type: "talker" },
      { text: "꼼꼼히 준비하면 오히려 자신감이 올라가요", type: "thinker" },
      { text: "재미있는 주제면 괜찮고, 아니면 싫어해요", type: "taster" },
      { text: "철저히 준비하고 결과로 증명하려 해요", type: "tactician" },
    ],
  },
  {
    q: "아이의 영어 공부, 어떻게 시작됐나요?",
    options: [
      { text: "친구나 선생님이 재미있다고 해서요", type: "talker" },
      { text: "부모님이 시켜서 시작했어요", type: "thinker" },
      { text: "좋아하는 콘텐츠 때문에 자연스럽게요", type: "taster" },
      { text: "스스로 목표를 세우고 시작했어요", type: "tactician" },
    ],
  },
  {
    q: "영어든 뭐든, 아이가 뭔가에 푹 빠질 때 계기는 주로 뭐예요?",
    options: [
      { text: "친구나 주변 사람이 하는 걸 보고요", type: "talker" },
      { text: "궁금한 게 생겨서 파고들다 보면요", type: "thinker" },
      { text: "우연히 접했는데 너무 재미있어서요", type: "taster" },
      { text: "목표나 이유가 생겼을 때요", type: "tactician" },
    ],
  },
  {
    q: "영어 공부를 오래 지속하게 만드는 건?",
    options: [
      { text: "함께 하는 친구나 선생님의 격려", type: "talker" },
      { text: "실력이 느는 게 눈에 보일 때", type: "thinker" },
      { text: "콘텐츠 자체가 재미있을 때", type: "taster" },
      { text: "목표에 가까워지고 있다는 느낌", type: "tactician" },
    ],
  },
  {
    q: "영어가 너무 어려울 때 아이는?",
    options: [
      { text: "친구나 선생님한테 바로 물어봐요", type: "talker" },
      { text: "혼자 끝까지 이해하려 해요", type: "thinker" },
      { text: "그냥 넘기고 재미있는 걸 찾아요", type: "taster" },
      { text: "더 쉬운 단계부터 다시 시작해요", type: "tactician" },
    ],
  },
  {
    q: "새 영어 교재를 시작했을 때 아이 반응은?",
    options: [
      { text: "선생님이나 친구랑 같이 풀면서 잘 따라가요", type: "talker" },
      { text: "처음부터 끝까지 흐름을 파악하고 시작하려 해요", type: "thinker" },
      { text: "재미있어 보이는 페이지부터 먼저 펼쳐봐요", type: "taster" },
      { text: "몇 단원인지, 언제 끝낼 수 있는지 확인해요", type: "tactician" },
    ],
  },
  {
    q: "아이가 영어를 못 하겠다고 할 때, 어떻게 해줬을 때 가장 효과적이었나요?",
    options: [
      { text: "같이 앉아서 대화하듯 풀어줬을 때", type: "talker" },
      { text: "이유와 원리를 차근차근 설명해줬을 때", type: "thinker" },
      { text: "재미있는 영상이나 방법으로 흥미를 다시 붙여줬을 때", type: "taster" },
      { text: "작은 목표를 세워주고 스스로 해보게 뒀을 때", type: "tactician" },
    ],
  },
];

const typeInfo = {
  talker: {
    emoji: "🗣️", name: "Talker", label: "언어 발산형",
    tagline: '"일단 말해요. 틀려도 괜찮아요."',
    color: "#00BFA6", gradient: "linear-gradient(135deg, #00BFA6, #00D4B8)",
    glow: "rgba(0,191,166,0.3)", heroAccent: "#00BFA6", heroAccent2: "#7FFFEF",
    character: `<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
      <style>
        .t-body{animation:t-sing 0.7s ease-in-out infinite alternate;transform-origin:60px 100px}
        .t-n1{animation:n-fly 1s ease-in-out infinite}
        .t-n2{animation:n-fly 1.3s 0.3s ease-in-out infinite}
        .t-n3{animation:n-fly 0.9s 0.6s ease-in-out infinite}
        @keyframes t-sing{from{transform:rotate(-4deg) translateY(0)}to{transform:rotate(4deg) translateY(-4px)}}
        @keyframes n-fly{0%{transform:translate(0,0);opacity:1}100%{transform:translate(0,-30px);opacity:0}}
      </style>
      <g class="t-body">
        <ellipse cx="60" cy="157" rx="20" ry="5" fill="rgba(0,0,0,0.1)"/>
        <rect x="45" y="108" width="13" height="36" rx="6" fill="#3D8B7A"/>
        <rect x="62" y="108" width="13" height="36" rx="6" fill="#3D8B7A"/>
        <ellipse cx="51" cy="144" rx="11" ry="6" fill="#222"/>
        <ellipse cx="68" cy="144" rx="11" ry="6" fill="#222"/>
        <rect x="37" y="66" width="46" height="44" rx="18" fill="#00BFA6"/>
        <line x1="53" y1="72" x2="53" y2="104" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="72" x2="60" y2="104" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round"/>
        <rect x="54" y="60" width="12" height="11" rx="4" fill="#FFDBB5"/>
        <circle cx="60" cy="40" r="25" fill="#FFDBB5"/>
        <!-- 풍성한 머리카락 -->
        <ellipse cx="60" cy="16" rx="26" ry="14" fill="#5C3317"/>
        <ellipse cx="36" cy="26" rx="10" ry="18" fill="#5C3317"/>
        <ellipse cx="84" cy="26" rx="10" ry="18" fill="#5C3317"/>
        <ellipse cx="46" cy="14" rx="10" ry="12" fill="#5C3317"/>
        <ellipse cx="74" cy="14" rx="10" ry="12" fill="#5C3317"/>
        <ellipse cx="60" cy="13" rx="20" ry="8" fill="#7A4828"/>
        <!-- 앞머리 -->
        <path d="M36 28 Q42 20 52 22 Q60 18 68 22 Q78 20 84 28" fill="#5C3317"/>
        <!-- 눈 (반짝) -->
        <circle cx="50" cy="39" r="6" fill="white"/>
        <circle cx="70" cy="39" r="6" fill="white"/>
        <circle cx="51" cy="39" r="3.5" fill="#222"/>
        <circle cx="71" cy="39" r="3.5" fill="#222"/>
        <circle cx="52.5" cy="37.5" r="1.5" fill="white"/>
        <circle cx="72.5" cy="37.5" r="1.5" fill="white"/>
        <!-- 반달눈 (신나게) -->
        <path d="M44 37 Q50 32 56 37" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M64 37 Q70 32 76 37" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <!-- 뺨 위 반짝이 -->
        <circle cx="47" cy="41" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="73" cy="41" r="1.5" fill="white" opacity="0.8"/>
        <!-- 노래하는 입 -->
        <ellipse cx="60" cy="51" rx="9" ry="7" fill="#C0392B"/>
        <ellipse cx="60" cy="48" rx="9" ry="4" fill="#E07050"/>
        <ellipse cx="41" cy="46" rx="7" ry="5" fill="#FFB3A0" opacity="0.55"/>
        <ellipse cx="79" cy="46" rx="7" ry="5" fill="#FFB3A0" opacity="0.55"/>
        <rect x="19" y="66" width="17" height="26" rx="8" fill="#00BFA6" transform="rotate(-38 27 79)"/>
        <circle cx="13" cy="54" r="7" fill="#FFDBB5"/>
        <rect x="84" y="66" width="17" height="26" rx="8" fill="#00BFA6" transform="rotate(38 93 79)"/>
        <circle cx="107" cy="54" r="7" fill="#FFDBB5"/>
      </g>
      <text class="t-n1" x="26" y="28" fontSize="18" fill="#00BFA6">♪</text>
      <text class="t-n2" x="56" y="16" fontSize="16" fill="#7FFFEF">♫</text>
      <text class="t-n3" x="80" y="22" fontSize="14" fill="#00D4B8">♩</text>
    </svg>`,
    traits: [
      { icon: "🙋", title: "틀려도 일단 손 들고 말하려 해요.", desc: "완벽하지 않아도 일단 내뱉는 용기가 이 아이의 가장 큰 무기예요." },
      { icon: "👫", title: "혼자보다 같이할 때 훨씬 집중해요.", desc: "혼자 문제집 풀 때보다 친구나 선생님과 대화할 때 2배로 빨리 배워요." },
      { icon: "🎤", title: "영어 노래나 대사를 흥얼거리다 통째로 외워버려요.", desc: "소리와 리듬으로 언어를 흡수하는 능력이 탁월해요." },
    ],
    paths: ["화상 영어", "영어 토론 수업", "역할극 수업", "영어 캠프", "스피킹 위주 학원"],
    warning: { title: "혼자 조용히 푸는 문법 문제집", desc: "Talker형은 반응과 상호작용이 없으면 에너지가 급격히 떨어져요. 일주일 안에 '영어 지루해'가 나와요. 누군가와 함께하는 환경이 반드시 필요해요." },
  },
  thinker: {
    emoji: "🧠", name: "Thinker", label: "논리 분석형",
    tagline: '"이해가 되어야 입이 열려요."',
    color: "#4A90D9", gradient: "linear-gradient(135deg, #4A90D9, #6C9BCE)",
    glow: "rgba(74,144,217,0.3)", heroAccent: "#4A90D9", heroAccent2: "#A8D4FF",
    character: `<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
      <style>
        .k-body{animation:k-think 2s ease-in-out infinite alternate;transform-origin:60px 100px}
        .k-b1{animation:k-pop 1.2s ease-in-out infinite alternate;transform-origin:90px 28px}
        .k-b2{animation:k-pop 1.6s 0.3s ease-in-out infinite alternate;transform-origin:104px 14px}
        .k-b3{animation:k-pop 1s 0.6s ease-in-out infinite alternate;transform-origin:114px 6px}
        .k-sweat{animation:k-sw 1s ease-in-out infinite alternate}
        @keyframes k-think{from{transform:rotate(-2deg)}to{transform:rotate(2deg)}}
        @keyframes k-pop{from{transform:scale(0.9);opacity:0.7}to{transform:scale(1.15);opacity:1}}
        @keyframes k-sw{from{transform:translateY(0);opacity:1}to{transform:translateY(5px);opacity:0.3}}
      </style>
      <g class="k-body">
        <ellipse cx="60" cy="157" rx="20" ry="5" fill="rgba(0,0,0,0.1)"/>
        <rect x="41" y="110" width="13" height="34" rx="6" fill="#2C5F8A" transform="rotate(8 47 127)"/>
        <rect x="66" y="108" width="13" height="36" rx="6" fill="#2C5F8A"/>
        <ellipse cx="48" cy="145" rx="11" ry="6" fill="#1A1A2E" transform="rotate(8 48 145)"/>
        <ellipse cx="72" cy="144" rx="11" ry="6" fill="#1A1A2E"/>
        <rect x="37" y="66" width="46" height="44" rx="18" fill="#4A90D9"/>
        <rect x="44" y="74" width="13" height="10" rx="4" fill="rgba(255,255,255,0.2)"/>
        <rect x="54" y="60" width="12" height="11" rx="4" fill="#FFDBB5"/>
        <circle cx="60" cy="40" r="25" fill="#FFDBB5"/>
        <!-- 단정하고 풍성한 머리카락 -->
        <ellipse cx="60" cy="16" rx="27" ry="15" fill="#2C1810"/>
        <ellipse cx="36" cy="28" rx="9" ry="16" fill="#2C1810"/>
        <ellipse cx="84" cy="28" rx="9" ry="16" fill="#2C1810"/>
        <ellipse cx="60" cy="13" rx="22" ry="9" fill="#3D2314"/>
        <!-- 단정한 앞머리 -->
        <path d="M36 26 Q50 16 60 18 Q70 16 84 26 Q76 18 60 20 Q44 18 36 26Z" fill="#2C1810"/>
        <!-- 안경 -->
        <circle cx="49" cy="39" r="9" fill="rgba(200,230,255,0.2)" stroke="#555" strokeWidth="2.2"/>
        <circle cx="71" cy="39" r="9" fill="rgba(200,230,255,0.2)" stroke="#555" strokeWidth="2.2"/>
        <line x1="58" y1="39" x2="62" y2="39" stroke="#555" strokeWidth="2.2"/>
        <line x1="40" y1="36" x2="35" y2="33" stroke="#555" strokeWidth="2"/>
        <line x1="80" y1="36" x2="85" y2="33" stroke="#555" strokeWidth="2"/>
        <!-- 눈 (초롱초롱) -->
        <circle cx="49" cy="39" r="4.5" fill="#222"/>
        <circle cx="71" cy="39" r="4.5" fill="#222"/>
        <circle cx="51" cy="37.5" r="1.5" fill="white"/>
        <circle cx="73" cy="37.5" r="1.5" fill="white"/>
        <!-- 눈 위 반짝이 -->
        <circle cx="46" cy="36" r="1.2" fill="white" opacity="0.7"/>
        <circle cx="68" cy="36" r="1.2" fill="white" opacity="0.7"/>
        <!-- 살짝 올라간 눈썹 (귀여운 고민) -->
        <path d="M43 31 Q49 28 55 31" stroke="#5C3317" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M65 31 Q71 28 77 31" stroke="#5C3317" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <!-- 귀여운 웃음 -->
        <path d="M51 50 Q60 57 69 50" stroke="#E07050" strokeWidth="2.5" fill="#FFD4B8" strokeLinecap="round"/>
        <ellipse cx="41" cy="45" rx="6" ry="4" fill="#FFB3A0" opacity="0.4"/>
        <ellipse cx="79" cy="45" rx="6" ry="4" fill="#FFB3A0" opacity="0.4"/>
        <ellipse class="k-sweat" cx="84" cy="28" rx="3" ry="5" fill="#A8D8FF" opacity="0.8"/>
        <rect x="21" y="76" width="17" height="22" rx="8" fill="#4A90D9" transform="rotate(28 29 87)"/>
        <circle cx="30" cy="72" r="7" fill="#FFDBB5"/>
        <rect x="82" y="68" width="17" height="26" rx="8" fill="#4A90D9"/>
        <circle cx="91" cy="68" r="7" fill="#FFDBB5"/>
        <rect x="79" y="54" width="22" height="28" rx="3" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5"/>
        <rect x="79" y="54" width="3" height="28" rx="1" fill="#F9A825"/>
        <line x1="85" y1="62" x2="99" y2="62" stroke="#FBC02D" strokeWidth="1.5"/>
        <line x1="85" y1="67" x2="99" y2="67" stroke="#FBC02D" strokeWidth="1.5"/>
        <line x1="85" y1="72" x2="97" y2="72" stroke="#FBC02D" strokeWidth="1.5"/>
      </g>
      <circle class="k-b1" cx="90" cy="28" r="9" fill="white" stroke="#4A90D9" strokeWidth="2"/>
      <text x="90" y="32" textAnchor="middle" fontSize="10" fill="#4A90D9">🤔</text>
      <circle class="k-b2" cx="104" cy="14" r="12" fill="white" stroke="#4A90D9" strokeWidth="2"/>
      <text x="104" y="19" textAnchor="middle" fontSize="13" fill="#4A90D9">💭</text>
      <circle class="k-b3" cx="115" cy="5" r="7" fill="white" stroke="#4A90D9" strokeWidth="1.5"/>
      <text x="115" y="9" textAnchor="middle" fontSize="8" fill="#4A90D9">?</text>
    </svg>`,
    traits: [
      { icon: "🔍", title: "단어 뜻뿐 아니라 어원과 쓰임새까지 물어봐요.", desc: "'왜 이렇게 써요?'가 해결되어야 다음으로 넘어가는 신중한 아이예요." },
      { icon: "💭", title: "말이 느린 게 아니라 머릿속에서 조립 중이에요.", desc: "완벽한 문장을 만들고 나서야 말을 꺼내요. 생각이 깊은 거예요." },
      { icon: "📝", title: "틀린 문장을 다시 고쳐 쓰는 걸 귀찮아하지 않아요.", desc: "정확성에 대한 욕구가 강해서 장기적으로 문법과 독해가 탄탄해져요." },
    ],
    paths: ["문장 구조 시각화 수업", "원리 설명 중심 강의", "논리적 리딩 교재", "어휘 어원 학습", "문법 기반 커리큘럼"],
    warning: { title: "준비 안 된 상태에서 갑자기 '영어로 말해봐!'", desc: "Thinker형은 실수에 대한 두려움이 커요. 단 한 번의 강요가 몇 달의 거부감으로 이어질 수 있어요. 충분히 이해하고 준비됐다는 느낌을 먼저 줘야 해요." },
  },
  taster: {
    emoji: "🎨", name: "Taster", label: "오감 탐색형",
    tagline: '"좋아하는 걸로 영어가 들어와요."',
    color: "#FF6B35", gradient: "linear-gradient(135deg, #FF6B35, #FF8C42)",
    glow: "rgba(255,107,53,0.3)", heroAccent: "#FF6B35", heroAccent2: "#FFB347",
    character: `<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
      <style>
        .p-body{animation:p-bob 1s ease-in-out infinite alternate;transform-origin:60px 100px}
        .p-brush{animation:p-paint 0.7s ease-in-out infinite alternate;transform-origin:96px 62px}
        .p-dot1{animation:p-d 0.9s ease-in-out infinite alternate}
        .p-dot2{animation:p-d 1.1s 0.2s ease-in-out infinite alternate}
        .p-dot3{animation:p-d 0.8s 0.4s ease-in-out infinite alternate}
        @keyframes p-bob{from{transform:translateY(0)}to{transform:translateY(-5px)}}
        @keyframes p-paint{from{transform:rotate(-12deg) translate(-2px,2px)}to{transform:rotate(8deg) translate(4px,-4px)}}
        @keyframes p-d{from{transform:scale(0.8);opacity:0.6}to{transform:scale(1.3);opacity:1}}
      </style>
      <rect x="5" y="52" width="48" height="38" rx="5" fill="white" stroke="#ddd" strokeWidth="1.5"/>
      <circle class="p-dot1" cx="18" cy="65" r="5" fill="#FF6B35"/>
      <circle class="p-dot2" cx="30" cy="73" r="6" fill="#4ECDC4"/>
      <circle class="p-dot3" cx="43" cy="62" r="4" fill="#FFE66D"/>
      <path d="M10 83 Q22 76 36 83 Q44 86 50 80" stroke="#9B59B6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <g class="p-body">
        <ellipse cx="60" cy="157" rx="20" ry="5" fill="rgba(0,0,0,0.1)"/>
        <rect x="45" y="108" width="13" height="36" rx="6" fill="#C0392B"/>
        <rect x="62" y="108" width="13" height="36" rx="6" fill="#C0392B"/>
        <ellipse cx="51" cy="144" rx="11" ry="6" fill="#1A1A2E"/>
        <ellipse cx="68" cy="144" rx="11" ry="6" fill="#1A1A2E"/>
        <rect x="37" y="66" width="46" height="44" rx="18" fill="#FF6B35"/>
        <rect x="43" y="70" width="34" height="36" rx="12" fill="#FF8C42"/>
        <rect x="53" y="60" width="12" height="11" rx="5" fill="#FFD4A8"/>
        <circle cx="60" cy="40" r="25" fill="#FFD4A8"/>
        <!-- 풍성하고 자유로운 머리카락 -->
        <ellipse cx="60" cy="15" rx="27" ry="15" fill="#8B4513"/>
        <ellipse cx="34" cy="26" rx="10" ry="19" fill="#8B4513"/>
        <ellipse cx="86" cy="26" rx="10" ry="19" fill="#8B4513"/>
        <ellipse cx="44" cy="12" rx="12" ry="11" fill="#A0522D"/>
        <ellipse cx="76" cy="12" rx="12" ry="11" fill="#A0522D"/>
        <ellipse cx="60" cy="11" rx="20" ry="8" fill="#A0522D"/>
        <!-- 삐죽 앞머리 -->
        <path d="M38 26 Q44 14 52 18 Q56 12 60 16 Q64 12 68 18 Q76 14 82 26" fill="#8B4513"/>
        <!-- 눈 (초롱초롱) -->
        <circle cx="49" cy="39" r="6.5" fill="white"/>
        <circle cx="71" cy="39" r="6.5" fill="white"/>
        <circle cx="50" cy="39" r="4" fill="#222"/>
        <circle cx="72" cy="39" r="4" fill="#222"/>
        <circle cx="52" cy="37" r="2" fill="white"/>
        <circle cx="74" cy="37" r="2" fill="white"/>
        <!-- 반달 웃음눈 -->
        <path d="M44 38 Q50 32 56 38" stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M64 38 Q70 32 76 38" stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <!-- 눈 반짝이 -->
        <circle cx="47" cy="40" r="2" fill="white" opacity="0.9"/>
        <circle cx="69" cy="40" r="2" fill="white" opacity="0.9"/>
        <!-- 활짝 웃는 입 -->
        <path d="M46 50 Q60 64 74 50" stroke="#E07050" strokeWidth="2.5" fill="#FFB3A0" strokeLinecap="round"/>
        <!-- 볼 (물감 묻음) -->
        <ellipse cx="41" cy="45" rx="7" ry="5" fill="#FFB3A0" opacity="0.6"/>
        <circle cx="37" cy="43" r="3" fill="#4ECDC4" opacity="0.6"/>
        <ellipse cx="79" cy="45" rx="7" ry="5" fill="#FFB3A0" opacity="0.6"/>
        <rect x="21" y="68" width="17" height="24" rx="8" fill="#FF6B35"/>
        <circle cx="24" cy="68" r="7" fill="#FFD4A8"/>
        <ellipse cx="18" cy="59" rx="13" ry="9" fill="#F5F5F5" stroke="#ddd" strokeWidth="1.5"/>
        <circle cx="12" cy="55" r="3" fill="#FF6B35"/>
        <circle cx="19" cy="53" r="3" fill="#4ECDC4"/>
        <circle cx="25" cy="57" r="3" fill="#FFE66D"/>
        <circle cx="24" cy="63" r="3" fill="#9B59B6"/>
        <circle cx="15" cy="63" r="3" fill="#00BFA6"/>
        <g class="p-brush">
          <rect x="83" y="62" width="17" height="24" rx="8" fill="#FF6B35"/>
          <circle cx="96" cy="62" r="7" fill="#FFD4A8"/>
          <rect x="94" y="40" width="5" height="24" rx="2.5" fill="#8B4513"/>
          <ellipse cx="96" cy="40" rx="4.5" ry="6" fill="#FF6B35"/>
          <ellipse cx="96" cy="36" rx="3" ry="2" fill="#FF8C42"/>
        </g>
      </g>
    </svg>`,
    traits: [
      { icon: "📺", title: "좋아하는 영상은 영어여도 몇 번이고 봐요.", desc: "팝송 가사는 통째로 외우는데 교과서 단어는 기억 못 하는 게 이 아이예요." },
      { icon: "⚡", title: "흥미가 생기면 몰입도가 폭발해요.", desc: "책상 공부는 20분도 못 버티지만, 관심 있는 건 2시간도 집중할 수 있어요." },
      { icon: "🌈", title: "4T 중 '의외의 경로'로 가장 극적으로 성장하는 유형이에요.", desc: "올바른 입구만 찾아주면 부모도 놀랄 속도로 달려가요." },
    ],
    paths: ["넷플릭스 영어 자막", "관심 분야 유튜브", "팝송 따라 부르기", "게임 영어 인터페이스", "스포츠 영어 중계"],
    warning: { title: "관심사와 무관한 교재로 억지로 앉히기", desc: "'왜 이걸 배워야 해?'가 해결되지 않으면 Taster형은 아예 닫혀버려요. 반대로 영어가 놀이처럼 느껴지는 순간, 누가 시키지 않아도 스스로 파고드는 시너지가 터져요." },
  },
  tactician: {
    emoji: "♟️", name: "Tactician", label: "전략적 구조형",
    tagline: '"목표가 보여야 움직여요."',
    color: "#9B59B6", gradient: "linear-gradient(135deg, #9B59B6, #C77DFF)",
    glow: "rgba(155,89,182,0.3)", heroAccent: "#C77DFF", heroAccent2: "#E8BAFF",
    character: `<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg">
      <style>
        .e-body{animation:e-walk 0.6s ease-in-out infinite alternate;transform-origin:60px 110px}
        .e-map{animation:e-mwave 1.2s ease-in-out infinite alternate;transform-origin:96px 66px}
        .e-ll{animation:e-legl 0.6s ease-in-out infinite alternate;transform-origin:50px 110px}
        .e-lr{animation:e-legr 0.6s ease-in-out infinite alternate;transform-origin:70px 110px}
        .e-star{animation:e-twink 0.8s ease-in-out infinite alternate}
        @keyframes e-walk{from{transform:rotate(-2deg) translateY(0)}to{transform:rotate(2deg) translateY(-4px)}}
        @keyframes e-mwave{from{transform:rotate(-8deg)}to{transform:rotate(6deg)}}
        @keyframes e-legl{from{transform:rotate(-14deg)}to{transform:rotate(8deg)}}
        @keyframes e-legr{from{transform:rotate(14deg)}to{transform:rotate(-8deg)}}
        @keyframes e-twink{from{transform:scale(1);opacity:0.7}to{transform:scale(1.5);opacity:1}}
      </style>
      <ellipse cx="22" cy="155" rx="5" ry="3" fill="rgba(155,89,182,0.3)" transform="rotate(-15 22 155)"/>
      <ellipse cx="36" cy="161" rx="5" ry="3" fill="rgba(155,89,182,0.3)"/>
      <ellipse cx="50" cy="156" rx="5" ry="3" fill="rgba(155,89,182,0.3)" transform="rotate(5 50 156)"/>
      <g class="e-body">
        <g class="e-ll">
          <rect x="45" y="108" width="13" height="36" rx="6" fill="#6C3483"/>
          <ellipse cx="51" cy="144" rx="11" ry="6" fill="#1A1A2E"/>
        </g>
        <g class="e-lr">
          <rect x="62" y="108" width="13" height="36" rx="6" fill="#6C3483"/>
          <ellipse cx="68" cy="144" rx="11" ry="6" fill="#1A1A2E"/>
        </g>
        <rect x="37" y="66" width="46" height="44" rx="18" fill="#9B59B6"/>
        <rect x="43" y="74" width="12" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>
        <rect x="65" y="74" width="12" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="52" cy="83" r="7" fill="#FFD700" stroke="#F39C12" strokeWidth="1.5"/>
        <text x="52" y="87" textAnchor="middle" fontSize="7" fill="#8B6914" fontWeight="900">1st</text>
        <rect x="54" y="64" width="12" height="11" rx="5" fill="#FFDBB5"/>
        <!-- 머리 -->
        <circle cx="60" cy="46" r="25" fill="#FFDBB5"/>
        <!-- 모자 아래 삐져나온 머리카락 -->
        <ellipse cx="36" cy="36" rx="8" ry="10" fill="#3D2314"/>
        <ellipse cx="84" cy="36" rx="8" ry="10" fill="#3D2314"/>
        <!-- 탐험가 모자 (머리 위로) -->
        <ellipse cx="60" cy="24" rx="30" ry="9" fill="#8B4513"/>
        <rect x="38" y="16" width="44" height="16" rx="6" fill="#A0522D"/>
        <ellipse cx="60" cy="16" rx="22" ry="6" fill="#8B4513"/>
        <!-- 모자 밴드 -->
        <rect x="38" y="28" width="44" height="4" rx="2" fill="#FFD700"/>
        <!-- 눈 (모자와 분리) -->
        <circle cx="49" cy="48" r="6.5" fill="white"/>
        <circle cx="71" cy="48" r="6.5" fill="white"/>
        <circle cx="50.5" cy="48" r="4" fill="#1A1A2E"/>
        <circle cx="72.5" cy="48" r="4" fill="#1A1A2E"/>
        <circle cx="52" cy="46.5" r="1.8" fill="white"/>
        <circle cx="74" cy="46.5" r="1.8" fill="white"/>
        <circle cx="48" cy="45" r="1" fill="white" opacity="0.6"/>
        <circle cx="70" cy="45" r="1" fill="white" opacity="0.6"/>
        <!-- 볼터치 -->
        <ellipse cx="40" cy="55" rx="7" ry="5" fill="#FFB3A0" opacity="0.55"/>
        <ellipse cx="80" cy="55" rx="7" ry="5" fill="#FFB3A0" opacity="0.55"/>
        <!-- 활짝 웃는 입 -->
        <path d="M48 58 Q60 70 72 58" stroke="#E07050" strokeWidth="2.5" fill="#FFB3A0" strokeLinecap="round"/>
        <!-- 보조개 -->
        <circle cx="43" cy="59" r="2" fill="#FFB3A0" opacity="0.5"/>
        <circle cx="77" cy="59" r="2" fill="#FFB3A0" opacity="0.5"/>
        <circle cx="24" cy="70" r="7" fill="#FFDBB5"/>
        <rect x="14" y="60" width="5" height="38" rx="2.5" fill="#8B4513"/>
        <ellipse cx="16" cy="60" rx="5" ry="4" fill="#A0522D"/>
        <rect x="83" y="66" width="17" height="26" rx="8" fill="#9B59B6"/>
        <circle cx="96" cy="66" r="7" fill="#FFDBB5"/>
      </g>
      <g class="e-map">
        <rect x="86" y="50" width="28" height="22" rx="3" fill="#FFF9C4" stroke="#F9A825" strokeWidth="1.5"/>
        <path d="M90 58 Q96 54 102 58 Q108 62 112 57" stroke="#4A90D9" strokeWidth="1.5" fill="none"/>
        <circle cx="112" cy="55" r="3" fill="#FF4444"/>
        <line x1="112" y1="52" x2="112" y2="47" stroke="#FF4444" strokeWidth="1.5"/>
        <text x="91" y="67" fontSize="8" fill="#E07050" fontWeight="900">×</text>
        <line x1="96" y1="61" x2="109" y2="69" stroke="#bbb" strokeWidth="1" strokeDasharray="2,2"/>
      </g>
      <text class="e-star" x="5" y="22" fontSize="18" fill="#FFD700">★</text>
      <text class="e-star" x="108" y="112" fontSize="12" fill="#C77DFF" style="animation-delay:0.4s">✦</text>
    </svg>`,
    traits: [
      { icon: "🏆", title: "레벨, 점수, 뱃지 같은 보상 시스템에 강하게 반응해요.", desc: "'이걸 하면 뭐가 돼요?'를 먼저 묻는 아이예요. 목표가 명확하면 무섭게 달려가요." },
      { icon: "📋", title: "공부 계획표를 스스로 만들고 지키는 걸 뿌듯해해요.", desc: "전체 로드맵을 파악하고 스스로 전략을 세울 때 가장 유능감을 느껴요." },
      { icon: "🔥", title: "경쟁 상황에서 갑자기 집중력이 올라가요.", desc: "승부욕과 성취욕이 강해서 도전 과제가 생기면 자발적으로 몰입해요." },
    ],
    paths: ["레벨업 시스템 어학원", "듀오링고 등 앱 학습", "자기주도 루틴 설계", "영어 자격증 준비", "레벨 테스트 있는 반"],
    warning: { title: "일일이 체크하고 간섭하는 것", desc: "Tactician형은 스스로 전략을 짤 때 가장 빛나요. '내가 알아서 할게요'라는 말이 나왔다면 이미 반발이 시작된 거예요. 방향만 잡아주고 주도권은 아이에게 넘기세요." },
  },
};
function Intro({ onStart }) {
  return (
    <div style={{ background: "#1A1A2E", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2.5, background: "#FF6B6B" }} />
          <div style={{ width: 10, height: 10, borderRadius: 2.5, background: "#4ECDC4" }} />
          <div style={{ width: 10, height: 10, borderRadius: 2.5, background: "#FFE66D" }} />
          <div style={{ width: 10, height: 10, borderRadius: 2.5, background: "#4A90D9" }} />
        </div>
        <span style={{ fontSize: 15, color: "white", fontWeight: 900, letterSpacing: -0.3 }}>아이맞춤 <span style={{ color: "#FF6B35" }}>영어설계소</span></span>
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 12 }}>
        우리 아이<br /><span style={{ color: "#FF6B35" }}>영어 성향</span> 테스트
      </div>
      <div style={{ marginBottom: 24, maxWidth: 320, width: "100%" }}>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.8, marginBottom: 16 }}>
          15개 질문으로 아이의 영어 성향을 분석하고<br /><strong style={{ color: "white" }}>최적의 학습 경로</strong>를 알려드려요.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["🔍", "아이 성향 정밀 진단"],
            ["🚀", "유형별 맞춤 학습 경로 제안"],
            ["⚠️", "피해야 할 학습 환경 안내"],
            ["📄", "프리미엄 1:1 맞춤 리포트 연결"],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 14px" }}>
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          ["🗣️", "Talker", "#00BFA6"],
          ["🧠", "Thinker", "#4A90D9"],
          ["🎨", "Taster", "#FF6B35"],
          ["♟️", "Tactician", "#C77DFF"],
        ].map(([emoji, name, color], i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: `1px solid ${color}40`, borderRadius: 20, padding: "7px 14px" }}>
            <span style={{ fontSize: 15 }}>{emoji}</span>
            <span style={{ fontSize: 13, color: color, fontWeight: 700 }}>{name}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "20px", marginBottom: 32, maxWidth: 340, textAlign: "left", width: "100%" }}>
        <div style={{ fontSize: 10, color: "#FF6B35", fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>ACADEMIC BASE</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16 }}>
          언어 교육 분야에서 전 세계적으로 검증된<br /><strong style={{ color: "white" }}>핵심 이론 5가지</strong>를 기반으로 설계했어요.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["VARK", "Fleming", "감각 채널 선호도"],
            ["다중지능 이론", "Gardner", "강점 지능"],
            ["정의적 여과기", "Krashen", "언어 습득 원리"],
            ["자기결정이론", "Deci & Ryan", "내적 동기"],
            ["ZPD", "Vygotsky", "최적 학습 환경"],
          ].map(([name, author, desc], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "8px 12px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6B35", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "white", fontWeight: 700, minWidth: 80 }}>{name}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{author} · {desc}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          단순 분류가 아닌, 아이의 언어 습득 방식을<br />과학적으로 이해하기 위한 진단이에요.
        </div>
      </div>
      <div onClick={onStart} style={{ background: "#FF6B35", color: "white", fontSize: 16, fontWeight: 700, padding: "16px 48px", borderRadius: 14, cursor: "pointer", boxShadow: "0 4px 20px rgba(255,107,53,0.4)" }}>
        테스트 시작하기 →
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 14 }}>약 3분 소요 · 총 15문항</div>
    </div>
  );
}

function Question({ q, qIndex, total, onAnswer, onBack, selected }) {
  const progress = ((qIndex) / total) * 100;
  return (
    <div style={{ background: "#FFF9F2", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* top bar */}
      <div style={{ background: "#1A1A2E", padding: "14px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {qIndex > 0 && (
              <div onClick={onBack} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 12px" }}>
                <span style={{ color: "white", fontSize: 14 }}>‹</span>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600 }}>이전</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", gap: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: 1.5, background: "#FF6B6B" }} />
                <div style={{ width: 6, height: 6, borderRadius: 1.5, background: "#4ECDC4" }} />
                <div style={{ width: 6, height: 6, borderRadius: 1.5, background: "#FFE66D" }} />
                <div style={{ width: 6, height: 6, borderRadius: 1.5, background: "#4A90D9" }} />
              </div>
              <span style={{ fontSize: 12, color: "white", fontWeight: 900 }}>아이맞춤 <span style={{ color: "#FF6B35" }}>영어설계소</span></span>
            </div>
          </div>
          <span style={{ fontSize: 12, color: "#666", fontWeight: 700 }}>{qIndex + 1} / {total}</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#FF6B35", borderRadius: 4, width: `${progress}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "36px 20px 24px" }}>
        <div style={{ fontSize: 13, color: "#aaa", fontWeight: 600, marginBottom: 12 }}>Q{qIndex + 1}</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#1A1A2E", lineHeight: 1.5, marginBottom: 32 }}>{q.q}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <div key={i} onClick={() => onAnswer(i, opt.type)}
                style={{ background: isSelected ? "#1A1A2E" : "white", border: `2px solid ${isSelected ? "#FF6B35" : "#E8E0D8"}`, borderRadius: 14, padding: "18px 18px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 14, boxShadow: isSelected ? "none" : "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", border: `2px solid ${isSelected ? "#FF6B35" : "#ccc"}`, background: isSelected ? "#FF6B35" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, color: "white", fontWeight: 700 }}>
                  {isSelected ? "✓" : ""}
                </div>
                <div style={{ fontSize: 15, color: isSelected ? "white" : "#222", lineHeight: 1.6, fontWeight: isSelected ? 700 : 400 }}>{opt.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Result({ scores, onRetry }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topType = sorted[0][0];
  const t = typeInfo[topType];

  const barData = sorted.map(([key, val]) => ({
    ...typeInfo[key],
    key, pct: Math.round((val / total) * 100),
  }));

  return (
    <div style={{ background: "#FFF9F2", minHeight: "100vh" }}>
      <div style={{ background: "#1A1A2E", padding: "14px 20px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#aaa" }}>아이 맞춤 영어 <span style={{ color: t.color, fontWeight: 700 }}>설계소</span></span>
        <span style={{ fontSize: 11, color: "#666", fontWeight: 700, letterSpacing: 1 }}>4T™ 진단</span>
      </div>

      {/* HERO */}
      <div style={{ background: "#1A1A2E", padding: "44px 24px 52px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 360, height: 360, background: `radial-gradient(circle, ${t.glow} 0%, transparent 70%)`, top: -120, left: "50%", transform: "translateX(-50%)" }} />
        <div style={{ display: "inline-block", background: `${t.glow}`, color: t.color, fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "5px 14px", borderRadius: 20, marginBottom: 14, border: `1px solid ${t.glow}` }}>진단 결과</div>
        <div style={{ width: 140, height: 140, margin: "0 auto 14px", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))" }} dangerouslySetInnerHTML={{ __html: t.character }} />
        <div style={{ fontSize: 62, fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 6, letterSpacing: -2 }}>
          {t.name.charAt(0)}<span style={{ color: t.heroAccent }}>{t.name.slice(1)}</span>
        </div>
        <div style={{ fontSize: 17, color: t.heroAccent2, fontWeight: 600, marginBottom: 12 }}>{t.emoji} {t.label}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{t.tagline}</div>
      </div>

      {/* SCORE BARS */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 14 }}>유형별 성향 분포</div>
        {barData.map((s, i) => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, width: 100, color: "#1A1A2E", flexShrink: 0 }}>{s.emoji} {s.name}</div>
            <div style={{ flex: 1, height: 9, background: "#F0EAE0", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 10, background: s.color, width: animated ? `${s.pct}%` : "0%", transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s` }} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", width: 32, textAlign: "right", flexShrink: 0 }}>{s.pct}%</div>
          </div>
        ))}
      </div>

      {/* TRAITS */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 14 }}>우리 아이의 특징</div>
        {t.traits.map((tr, i) => (
          <div key={i} style={{ background: "white", borderRadius: 14, padding: "18px", marginBottom: 10, borderLeft: `4px solid ${t.color}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{tr.icon}</div>
            <div style={{ fontSize: 14, lineHeight: 1.65, color: "#555" }}>
              <strong style={{ color: "#1A1A2E" }}>{tr.title}</strong> {tr.desc}
            </div>
          </div>
        ))}
      </div>

      {/* PATH */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#888", marginBottom: 14 }}>이 경로에서 폭발해요 🚀</div>
        <div style={{ background: t.gradient, borderRadius: 16, padding: "22px 20px", boxShadow: `0 8px 24px ${t.glow}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 12 }}>{t.name}형 추천 학습 경로</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {t.paths.map((p, i) => (
              <span key={i} style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "5px 13px", fontSize: 13, color: "white", fontWeight: 500 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* WARNING */}
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ background: "#FFF5F2", borderRadius: 14, padding: "18px", border: "1px solid #FFD5C8" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#C0392B", marginBottom: 6 }}>⚠️ 이것만 피하세요 — {t.warning.title}</div>
          <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{t.warning.desc}</div>
        </div>
      </div>

      {/* PREMIUM CTA */}
      <div style={{ padding: "28px 20px" }}>
        <div style={{ background: "#1A1A2E", borderRadius: 20, padding: "26px 22px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 180, height: 180, background: `radial-gradient(circle, ${t.glow}, transparent 70%)`, bottom: -50, right: -30 }} />
          <div style={{ display: "inline-block", background: t.color, color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "4px 12px", borderRadius: 20, marginBottom: 14 }}>PREMIUM REPORT</div>
          <div style={{ fontSize: 19, fontWeight: 900, color: "white", lineHeight: 1.45, marginBottom: 10 }}>우리 아이만을 위한<br />맞춤 설계 리포트</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 20 }}>지금 결과는 입구예요. 프리미엄 리포트에서<br />학원·교재·루틴까지 설계해드려요.</div>
          {[
            ["정밀 성향 분석", "혼합 유형 및 강약점 상세 분석"],
            ["학원 로드맵", `${t.name}형에게 맞는 학원 유형 추천`],
            ["관심사 연계 학습법", `${t.name}형 아이의 관심사로 영어를 익히는 구체적 방법`],
            ["주간 루틴 설계", "아이 성향에 맞는 일주일 영어 루틴"],
          ].map(([title, desc], i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, background: t.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", flexShrink: 0, marginTop: 1 }}>✓</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}><strong style={{ color: "white" }}>{title}</strong> — {desc}</div>
            </div>
          ))}
          <a href="https://forms.gle/W7YeRMADr98HXCVt9" target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 22, background: t.color, borderRadius: 12, padding: "15px", textAlign: "center", cursor: "pointer", boxShadow: `0 4px 18px ${t.glow}`, fontSize: 15, fontWeight: 700, color: "white", textDecoration: "none" }}>
            📋 구글 폼으로 신청하기
          </a>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 10 }}>📄 진단 후 1:1 맞춤 제작 · 보통 48시간 내 발송</div>
        </div>
      </div>

      {/* SHARE */}
      <div style={{ padding: "0 20px 48px", textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>우리 아이 유형, 친구 엄마한테도 알려주세요 😊</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <div onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: '우리 아이 영어 성향 테스트',
                text: `우리 아이 영어 유형은 ${t.name}형이에요! 아이 맞춤 영어 설계소에서 확인해보세요 😊`,
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('링크가 복사됐어요!');
            }
          }} style={{ background: "#F0EAE0", borderRadius: 40, padding: "10px 22px", fontSize: 13, fontWeight: 700, color: "#1A1A2E", cursor: "pointer" }}>🔗 결과 공유하기</div>
          <div onClick={onRetry} style={{ background: "#F0EAE0", borderRadius: 40, padding: "10px 22px", fontSize: 13, fontWeight: 700, color: "#1A1A2E", cursor: "pointer" }}>🔄 다시 테스트</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [scores, setScores] = useState({ talker: 0, thinker: 0, taster: 0, tactician: 0 });

  const handleStart = () => setStep("quiz");

  const handleAnswer = (idx, type) => {
    setSelected(idx);
    setTimeout(() => {
      const newScores = { ...scores, [type]: scores[type] + 1 };
      setScores(newScores);
      setAnswers([...answers, { q: current, a: idx, type }]);
      setSelected(null);
      if (current + 1 >= questions.length) {
        setStep("result");
      } else {
        setCurrent(current + 1);
      }
    }, 400);
  };

  const handleBack = () => {
    if (current === 0) {
      setStep("intro");
    } else {
      const prevAnswers = answers.slice(0, -1);
      const lastAnswer = answers[current - 1];
      const newScores = { ...scores, [lastAnswer.type]: scores[lastAnswer.type] - 1 };
      setScores(newScores);
      setAnswers(prevAnswers);
      setCurrent(current - 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setStep("intro");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setScores({ talker: 0, thinker: 0, taster: 0, tactician: 0 });
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif" }}>
      {step === "intro" && <Intro onStart={handleStart} />}
      {step === "quiz" && (
        <Question
          q={questions[current]}
          qIndex={current}
          total={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
          selected={selected}
        />
      )}
      {step === "result" && <Result scores={scores} onRetry={handleRetry} />}
    </div>
  );
}
