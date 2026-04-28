import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Bereinigt Text für die Sprachausgabe (Text-to-Speech).
 * Entfernt Markdown-Sonderzeichen, Emojis, Code-Blöcke und andere Symbole,
 * die der Sprachsynthesizer sonst falsch oder als "Sternchen", "Hashtag" etc. vorliest.
 */
export function sanitizeForSpeech(text: string): string {
  if (!text) return "";

  let cleaned = text;

  // Code-Blöcke komplett entfernen (```...```)
  cleaned = cleaned.replace(/```[\s\S]*?```/g, " ");
  // Inline-Code (`...`)
  cleaned = cleaned.replace(/`([^`]+)`/g, "$1");

  // Markdown-Bilder ![alt](url) entfernen
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
  // Markdown-Links [text](url) -> nur "text"
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // Fett/Kursiv: **text**, __text__, *text*, _text_ -> text
  cleaned = cleaned.replace(/\*\*([^*]+)\*\*/g, "$1");
  cleaned = cleaned.replace(/__([^_]+)__/g, "$1");
  cleaned = cleaned.replace(/\*([^*]+)\*/g, "$1");
  cleaned = cleaned.replace(/(^|\s)_([^_]+)_(?=\s|$|[.,!?;:])/g, "$1$2");

  // Überschriften: # ## ### am Zeilenanfang
  cleaned = cleaned.replace(/^#{1,6}\s+/gm, "");

  // Blockquotes: > am Zeilenanfang
  cleaned = cleaned.replace(/^>\s+/gm, "");

  // Listen-Marker am Zeilenanfang: -, *, +, 1.
  cleaned = cleaned.replace(/^[\s]*[-*+]\s+/gm, "");
  cleaned = cleaned.replace(/^[\s]*\d+\.\s+/gm, "");

  // Horizontale Linien: ---, ***, ___
  cleaned = cleaned.replace(/^[-*_]{3,}$/gm, "");

  // Tabellen-Pipes
  cleaned = cleaned.replace(/\|/g, " ");

  // URLs entfernen (werden sonst Buchstabe für Buchstabe vorgelesen)
  cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, "");
  cleaned = cleaned.replace(/www\.[^\s]+/g, "");

  // E-Mail-Adressen entfernen
  cleaned = cleaned.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "");

  // Emojis und andere Symbol-Zeichen entfernen (Unicode-Bereiche)
  cleaned = cleaned.replace(
    /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{200D}]|[\u{2640}-\u{2642}]|[\u{2300}-\u{23FF}]|[\u{FE0F}]/gu,
    " "
  );

  // Restliche markdown-/syntax-typische Sonderzeichen entfernen
  cleaned = cleaned.replace(/[*_~`#<>{}\[\]\\^|]/g, " ");

  // Mehrere Whitespaces zu einem zusammenfassen
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  return cleaned;
}
