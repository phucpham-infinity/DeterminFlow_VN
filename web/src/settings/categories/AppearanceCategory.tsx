import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n, type Locale } from "@/i18n";
import { SettingsCategoryPanel } from "../SettingsCategoryPanel";
import type { SettingsSection } from "../types";

export function AppearanceCategory({ section }: { section: SettingsSection }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <SettingsCategoryPanel sectionId={section.id} title={section.title}>
      <div className="flex items-center justify-between gap-4 border-t border-border/50 pt-4">
        <div>
          <p className="text-sm font-medium text-foreground">{t("appearance.language")}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{t("appearance.languageHint")}</p>
        </div>
        <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
          <SelectTrigger className="w-40" aria-label={t("appearance.language")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh">{t("language.zh")}</SelectItem>
            <SelectItem value="en">{t("language.en")}</SelectItem>
            <SelectItem value="vi">{t("language.vi")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </SettingsCategoryPanel>
  );
}
