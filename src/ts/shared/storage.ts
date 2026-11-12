import type { BoardSize, Player, Theme } from "./types";

/** Schlüssel, unter denen die Einstellungen im `localStorage` liegen */
type SettingKey = "theme" | "color" | "size";

const SETTING_KEYS: SettingKey[] = ["theme", "color", "size"];

/**
 * Liest das gewählte Theme.
 * @returns Das gespeicherte Theme, sonst `code-vibes`
 */
export function getTheme(): Theme {
  return (localStorage.getItem("theme") as Theme | null) ?? "code-vibes";
}

/**
 * Liest die gewählte Spielerfarbe.
 * @returns Die gespeicherte Farbe, sonst `blue`
 */
export function getStartPlayer(): Player {
  return (localStorage.getItem("color") as Player | null) ?? "blue";
}

/**
 * Liest die gewählte Brettgröße.
 * @returns Die gespeicherte Kartenanzahl, sonst `16`
 */
export function getBoardSize(): BoardSize {
  return Number(localStorage.getItem("size") ?? 16) as BoardSize;
}

/**
 * Speichert eine Einstellung.
 * @param key - Welche Einstellung
 * @param value - Der gewählte Wert
 */
export function saveSetting(key: SettingKey, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Löscht alle gespeicherten Einstellungen.
 */
export function clearSettings() {
  for (const key of SETTING_KEYS) {
    localStorage.removeItem(key);
  }
}
