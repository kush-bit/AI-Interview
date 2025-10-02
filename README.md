# 🤖 AI-Powered Interview Assistant  

An AI-driven web app built with **React (Vite + TypeScript) + TailwindCSS** that simulates a technical interview experience.  
It allows candidates to upload their resume, answer timed interview questions, and get AI feedback.  
An interviewer dashboard helps track candidate performance.

---

## 🚀 Features  

### 👩‍💻 Interviewee (Candidate)
- Resume Upload: Supports **PDF/DOCX**.
- Auto-extracts candidate info (Name, Email, Phone).
- Missing fields are requested interactively via chat.
- AI-powered interview flow:
  - **6 Questions Total** → 2 Easy, 2 Medium, 2 Hard.
  - Timer per question (Easy → 20s, Medium → 60s, Hard → 120s).
  - Auto-submit answer when time runs out.
- AI scoring + feedback for each answer.
- Final Score & AI Summary generated after interview.

### 👨‍🏫 Interviewer (Dashboard)
- Candidate list with **name, email, score, and summary**.
- Search candidates by name/email.
- Sort candidates by score.
- Detailed view of all questions, answers, and AI feedback.

### 💾 Persistence
- Uses **localStorage** to save:
  - Candidate progress
  - Interview state
  - Scores and summaries
- Supports **resume after refresh** with a “Welcome Back” modal.

---

## 🛠️ Tech Stack  
- ⚛️ **React (Vite + TypeScript)**  
- 🎨 **TailwindCSS** for styling  
- 🔗 **Lucide Icons** for UI icons  
- 💾 **LocalStorage** for persistence  

---


