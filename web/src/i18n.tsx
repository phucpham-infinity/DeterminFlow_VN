import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Locale = "zh" | "en" | "vi";

type TranslationKey =
  | "nav.chat" | "nav.dashboard" | "nav.graph" | "nav.roundtable" | "nav.orchestration"
  | "nav.workflow" | "nav.cron" | "nav.marketplace" | "nav.skills" | "nav.rules"
  | "nav.systemPrompt" | "nav.settings" | "nav.extensions" | "nav.main"
  | "status.connected" | "status.disconnected" | "status.websocketConnected"
  | "status.websocketDisconnected" | "loading.page" | "appearance.title" | "appearance.theme"
  | "appearance.dark" | "appearance.light" | "appearance.language" | "appearance.languageHint"
  | "language.zh" | "language.en" | "language.vi";

const messages: Record<Locale, Record<TranslationKey, string>> = {
  zh: {
    "nav.chat": "对话", "nav.dashboard": "看板", "nav.graph": "图谱", "nav.roundtable": "圆桌",
    "nav.orchestration": "编排", "nav.workflow": "工作流", "nav.cron": "定时", "nav.marketplace": "资源广场",
    "nav.skills": "Skills", "nav.rules": "Rules", "nav.systemPrompt": "系统提示词", "nav.settings": "配置",
    "nav.extensions": "插件", "nav.main": "主导航", "status.connected": "已连接", "status.disconnected": "断开",
    "status.websocketConnected": "WebSocket 已连接", "status.websocketDisconnected": "WebSocket 连接断开",
    "loading.page": "正在加载页面...", "appearance.title": "外观", "appearance.theme": "界面主题",
    "appearance.dark": "深色", "appearance.light": "浅色", "appearance.language": "界面语言",
    "appearance.languageHint": "选择控制台显示语言", "language.zh": "简体中文", "language.en": "English", "language.vi": "Tiếng Việt",
  },
  en: {
    "nav.chat": "Chat", "nav.dashboard": "Dashboard", "nav.graph": "Graph", "nav.roundtable": "Roundtable",
    "nav.orchestration": "Orchestration", "nav.workflow": "Workflows", "nav.cron": "Schedules", "nav.marketplace": "Marketplace",
    "nav.skills": "Skills", "nav.rules": "Rules", "nav.systemPrompt": "System prompt", "nav.settings": "Settings",
    "nav.extensions": "Plugins", "nav.main": "Main navigation", "status.connected": "Connected", "status.disconnected": "Disconnected",
    "status.websocketConnected": "WebSocket connected", "status.websocketDisconnected": "WebSocket disconnected",
    "loading.page": "Loading page...", "appearance.title": "Appearance", "appearance.theme": "Interface theme",
    "appearance.dark": "Dark", "appearance.light": "Light", "appearance.language": "Interface language",
    "appearance.languageHint": "Choose console display language", "language.zh": "简体中文", "language.en": "English", "language.vi": "Tiếng Việt",
  },
  vi: {
    "nav.chat": "Trò chuyện", "nav.dashboard": "Tổng quan", "nav.graph": "Đồ thị", "nav.roundtable": "Bàn tròn",
    "nav.orchestration": "Điều phối", "nav.workflow": "Workflow", "nav.cron": "Lịch chạy", "nav.marketplace": "Kho tài nguyên",
    "nav.skills": "Kỹ năng", "nav.rules": "Quy tắc", "nav.systemPrompt": "System prompt", "nav.settings": "Cài đặt",
    "nav.extensions": "Plugin", "nav.main": "Điều hướng chính", "status.connected": "Đã kết nối", "status.disconnected": "Mất kết nối",
    "status.websocketConnected": "WebSocket đã kết nối", "status.websocketDisconnected": "WebSocket mất kết nối",
    "loading.page": "Đang tải trang...", "appearance.title": "Giao diện", "appearance.theme": "Chủ đề giao diện",
    "appearance.dark": "Tối", "appearance.light": "Sáng", "appearance.language": "Ngôn ngữ giao diện",
    "appearance.languageHint": "Chọn ngôn ngữ hiển thị console", "language.zh": "简体中文", "language.en": "English", "language.vi": "Tiếng Việt",
  },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "determinflow-locale";

function readLocale(): Locale {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "zh" || stored === "en" || stored === "vi") return stored;
  return "zh";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  }, []);
  const value = useMemo(() => ({ locale, setLocale, t: (key: TranslationKey) => messages[locale][key] }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export type { Locale, TranslationKey };
