"use client"
import { create } from "zustand"

type Language = "en" | "ko" | "hi"

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: "en",
  setLanguage: (lang) => set({ language: lang }),
}))
