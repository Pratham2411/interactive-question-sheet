import { create } from "zustand";

export const useSheetStore = create((set, get) => ({
  sheet: null,

  // ===== LOAD =====
 loadSheet: async () => {
  const res = await fetch("/sample-sheet.json");
  const data = await res.json();
  set({ sheet: data });
},


  // ===== SEARCH =====
  search: "",
  setSearch: (value) => set({ search: value }),

  // ===== TOPICS =====
  addTopic: (title) => {
    if (!title) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: [
          ...s.topics,
          {
            id: crypto.randomUUID(),
            title,
            order: s.topics.length,
            subtopics: [],
          },
        ],
      },
    });
  },

  editTopic: (id, title) => {
    if (!title) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id === id ? { ...t, title } : t
        ),
      },
    });
  },

  deleteTopic: (id) => {
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.filter((t) => t.id !== id),
      },
    });
  },

  reorderTopics: (activeId, overId) => {
    if (!overId || activeId === overId) return;
    const s = get().sheet;

    const topics = [...s.topics];
    const oldIndex = topics.findIndex((t) => t.id === activeId);
    const newIndex = topics.findIndex((t) => t.id === overId);

    const [moved] = topics.splice(oldIndex, 1);
    topics.splice(newIndex, 0, moved);

    topics.forEach((t, i) => (t.order = i));

    set({ sheet: { ...s, topics } });
  },

  // ===== SUBTOPICS =====
  addSubTopic: (topicId, title) => {
    if (!title) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: [
                  ...t.subtopics,
                  {
                    id: crypto.randomUUID(),
                    title,
                    order: t.subtopics.length,
                    questions: [],
                  },
                ],
              }
        ),
      },
    });
  },

  editSubTopic: (topicId, subId, title) => {
    if (!title) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: t.subtopics.map((st) =>
                  st.id === subId ? { ...st, title } : st
                ),
              }
        ),
      },
    });
  },

  deleteSubTopic: (topicId, subId) => {
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: t.subtopics.filter((st) => st.id !== subId),
              }
        ),
      },
    });
  },

  reorderSubTopics: (topicId, activeId, overId) => {
    if (!overId || activeId === overId) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) => {
          if (t.id !== topicId) return t;

          const subs = [...t.subtopics];
          const oldI = subs.findIndex((st) => st.id === activeId);
          const newI = subs.findIndex((st) => st.id === overId);

          const [moved] = subs.splice(oldI, 1);
          subs.splice(newI, 0, moved);

          subs.forEach((st, i) => (st.order = i));

          return { ...t, subtopics: subs };
        }),
      },
    });
  },

  // ===== QUESTIONS =====
  addQuestion: (topicId, subId, title) => {
    if (!title) return;
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: t.subtopics.map((st) =>
                  st.id !== subId
                    ? st
                    : {
                        ...st,
                        questions: [
                          ...st.questions,
                          {
                            id: crypto.randomUUID(),
                            title,
                            solved: false,
                            order: st.questions.length,
                          },
                        ],
                      }
                ),
              }
        ),
      },
    });
  },

  toggleSolved: (topicId, subId, qId) => {
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: t.subtopics.map((st) =>
                  st.id !== subId
                    ? st
                    : {
                        ...st,
                        questions: st.questions.map((q) =>
                          q.id === qId
                            ? { ...q, solved: !q.solved }
                            : q
                        ),
                      }
                ),
              }
        ),
      },
    });
  },

  deleteQuestion: (topicId, subId, qId) => {
    const s = get().sheet;

    set({
      sheet: {
        ...s,
        topics: s.topics.map((t) =>
          t.id !== topicId
            ? t
            : {
                ...t,
                subtopics: t.subtopics.map((st) =>
                  st.id !== subId
                    ? st
                    : {
                        ...st,
                        questions: st.questions.filter(
                          (q) => q.id !== qId
                        ),
                      }
                ),
              }
        ),
      },
    });
  },
}));

/* ===== AUTO SAVE PROGRESS (OUTSIDE STORE) ===== */
useSheetStore.subscribe(
  (state) => state.sheet,
  (sheet) => {
    if (sheet) {
      localStorage.setItem(
        "question-sheet",
        JSON.stringify(sheet)
      );
    }
  }
);
