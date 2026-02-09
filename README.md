# Interactive Question Management Sheet

An interactive, single-page web application to manage a structured set of questions organized by **topics** and **subtopics**, inspired by platforms like Striver SDE Sheet and Codolio.

The application allows users to add, edit, delete, reorder, search, and mark questions as solved, all through a clean and intuitive UI.

---

## ✨ Features

- 📚 Topic → Subtopic → Question hierarchy
- ➕ Add / Edit / Delete Topics, Subtopics, and Questions
- 🔀 Drag-and-drop reordering (within topics and subtopics)
- 🔍 Real-time search for questions
- ✅ Mark questions as Solved / Unsolved
- 🌙 Dark mode UI (Striver-style)
- 🎨 Clean card-based design with subtle shadows
- ⚡ Fast and responsive single-page app

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Drag & Drop:** dnd-kit
- **Deployment:** Vercel

---

## 🧠 Design Decisions

- The application is **frontend-only** and does not require authentication.
- State is managed entirely using **Zustand** for simplicity and performance.
- Persistence was intentionally kept out of scope to maintain deterministic behavior.
- Drag-and-drop is supported within logical containers to ensure stability and UX clarity.

---

## 🚀 Getting Started (Run Locally)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Pratham2411/interactive-question-sheet.git
