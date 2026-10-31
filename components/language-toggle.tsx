"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border-2 border-border bg-background p-1",
        className
      )}
      role="group"
      aria-label={t.common.language}
    >
      <Languages className="ml-1 h-4 w-4 text-foreground/60" aria-hidden />
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={cn(
          "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
          language === "en"
            ? "bg-main text-main-foreground"
            : "text-foreground/60 hover:text-foreground"
        )}
      >
        {t.common.english}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("hi")}
        aria-pressed={language === "hi"}
        className={cn(
          "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
          language === "hi"
            ? "bg-main text-main-foreground"
            : "text-foreground/60 hover:text-foreground"
        )}
      >
        {t.common.hindi}
      </button>
    </div>
  );
}
