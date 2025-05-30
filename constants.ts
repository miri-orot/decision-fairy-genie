
export const APP_TITLE = "결정 요정 지니";
export const CATCHPHRASE = "고민은 이제 그만! 지니에게 맡겨봐! 🧞";
export const INPUT_PLACEHOLDER = "AI 지니에게 물어보고 싶은 고민을 적어주세요...";
export const BUTTON_TEXT_ACTION = "결정해줘!";
export const BUTTON_TEXT_ASK_AGAIN = "다시 질문하기";

export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';

export const PROMPT_TEMPLATE = `당신은 사용자의 사소한 고민에 대해 짧고 재치 있는 답변을 해주는 AI 요정 '지니'입니다. 답변은 매우 간결하고, 마치 동전을 던져 앞면 또는 뒷면을 알려주듯 명쾌한 **하나의 결정**을 내려주어야 합니다. 긍정적이거나 부정적인 답변, 혹은 중립적이면서도 재미있는 답변을 할 수 있습니다. 답변은 친근한 말투를 사용해주세요. 반드시 하나의 답변만 제공해야 합니다. "또는" 이나 "아니면" 과 같은 선택지를 제공하지 마세요.

예시:
사용자 질문: "오늘 저녁으로 치킨 먹을까?"
지니 답변: "좋아! 오늘 밤 주인공은 치킨 너로 정했다!🍗"

사용자 질문: "지금 당장 운동하러 갈까?"
지니 답변: "레고! 지금이야말로 활력을 불태울 시간!🔥"

사용자 질문: "이 옷 살까 말까?"
지니 답변: "음... 오늘은 지갑을 지키고 다음에 더 멋진 걸 찾아보자! 💸"

사용자 질문: "{USER_QUESTION}"

지니 답변:`;

export const LOADING_MESSAGES = [
  "지니가 신중하게 고민 중입니다...",
  "결정의 순간이 다가옵니다! 두구두구...",
  "요술램프를 문지르는 중... 램프의 요정 지니 소환! ✨",
  "최고의 선택을 위해 별의 기운을 모으고 있어요... 🌟",
  "AI 지니가 당신의 고민을 듣고 마법을 준비 중입니다! 🔮"
];

export const ERROR_MESSAGES = {
  API_ERROR: "앗! 지니가 마법을 부리다 작은 문제가 생겼나 봐요. 잠시 후 다시 시도해 주시겠어요? 램프를 살짝 다시 문질러볼까요? 🧞‍♂️",
  EMPTY_QUESTION: "지니에게 물어볼 고민을 먼저 알려주세요! 어떤 고민을 하고 있나요? 🤔",
  API_KEY_NOT_CONFIGURED: "앗! 지니를 부르기 위한 비밀 열쇠(API 키)가 설정되지 않았어요. 앱 관리자에게 문의해주세요! 🔑",
  EMPTY_RESPONSE_ERROR: "어라? 지니가 답변을 하려다 멈춘 것 같아요. 다시 한 번 물어봐 주시겠어요? 😲"
};