import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

const preferencesStore = create()(
  persist(
    (set) => ({
      preferences: {
        answer: { title: "Answer", checked: true },
        entities: { title: "Entities & Sentiment", checked: true },
        debate: { title: "AI Debate", checked: true },
        analysis: { title: "Analysis", checked: true },
        articles: { title: "Articles", checked: true },
      },
      setPreference: (name) =>
        set(
          produce((state) => {
            state.preferences[name].checked = !state.preferences[name].checked;
          })
        ),
    }),
    {
      name: "preferencesStore",
    }
  )
);

export default preferencesStore;
