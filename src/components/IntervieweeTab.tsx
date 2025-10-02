

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Upload,
//   Send,
//   Clock,
//   User,
//   Mail,
//   Phone,
//   Award,
// } from "lucide-react";
// import {
//   extractTextFromPDF,
//   extractInfoFromText,
//   generateAIResponse,
//   calculateFinalScore,
//   generateSummary,
// } from "../utils/helpers";
// import { INTERVIEW_QUESTIONS, DIFFICULTY_TIMERS } from "../utils/constants";

// export default function IntervieweeTab() {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [input, setInput] = useState("");
//   const [candidate, setCandidate] = useState<any>(null);
//   const [missingFields, setMissingFields] = useState<string[]>([]);
//   const [interviewState, setInterviewState] = useState<"upload" | "collectInfo" | "interview" | "completed">("upload");
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [isTimerActive, setIsTimerActive] = useState(false);

//   const chatEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (isTimerActive && timer > 0) {
//       const t = setTimeout(() => setTimer((t) => t - 1), 1000);
//       return () => clearTimeout(t);
//     } else if (isTimerActive && timer === 0) {
//       handleSubmitAnswer("⏰ Time is up!");
//     }
//   }, [isTimerActive, timer]);

//   const addMessage = (sender: string, text: string) => {
//     setMessages((prev) => [...prev, { sender, text }]);
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     addMessage("system", `Uploaded: ${file.name}`);
//     addMessage("system", "Processing resume...");

//     const text = await extractTextFromPDF(file);
//     const extracted = extractInfoFromText(text);

//     const missing: string[] = [];
//     if (!extracted.name) missing.push("name");
//     if (!extracted.email) missing.push("email");
//     if (!extracted.phone) missing.push("phone");

//     const newCandidate = {
//       id: Date.now().toString(),
//       ...extracted,
//       questions: [],
//     };
//     setCandidate(newCandidate);

//     if (missing.length > 0) {
//       setMissingFields(missing);
//       setInterviewState("collectInfo");
//       addMessage("system", `I need your ${missing.join(", ")}. Please provide your ${missing[0]}:`);
//     } else {
//       startInterview(newCandidate);
//     }
//   };

//   const handleCollectInfo = (value: string) => {
//     if (!candidate) return;

//     const field = missingFields[0];
//     const updated = { ...candidate, [field]: value };
//     setCandidate(updated);

//     const remaining = missingFields.slice(1);
//     setMissingFields(remaining);

//     if (remaining.length > 0) {
//       addMessage("system", `Thanks! Please provide your ${remaining[0]}:`);
//     } else {
//       startInterview(updated);
//     }
//   };

//   const startInterview = (c: any) => {
//     const questions = [
//       ...INTERVIEW_QUESTIONS.easy.map((q) => ({ question: q, difficulty: "easy" })),
//       ...INTERVIEW_QUESTIONS.medium.map((q) => ({ question: q, difficulty: "medium" })),
//       ...INTERVIEW_QUESTIONS.hard.map((q) => ({ question: q, difficulty: "hard" })),
//     ];
//     const updated = { ...c, questions };
//     setCandidate(updated);
//     setInterviewState("interview");
//     askQuestion(updated, 0);
//   };

//   const askQuestion = (c: any, index: number) => {
//     const q = c.questions[index];
//     addMessage("ai", `Q${index + 1}: ${q.question}`);
//     addMessage("system", `⏱ Time: ${DIFFICULTY_TIMERS[q.difficulty]}s`);
//     setTimer(DIFFICULTY_TIMERS[q.difficulty]);
//     setIsTimerActive(true);
//   };

//   const handleSubmitAnswer = (answer: string) => {
//     if (!candidate) return;

//     setIsTimerActive(false);

//     const q = candidate.questions[questionIndex];
//     const { score, feedback } = generateAIResponse(q.question, answer, q.difficulty);

//     candidate.questions[questionIndex] = { ...q, answer, aiScore: score, feedback };

//     addMessage("user", answer);
//     addMessage("ai", `${feedback} (Score: ${score}/10)`);

//     if (questionIndex < candidate.questions.length - 1) {
//       setTimeout(() => {
//         setQuestionIndex(questionIndex + 1);
//         askQuestion(candidate, questionIndex + 1);
//       }, 1500);
//     } else {
//       finishInterview(candidate);
//     }

//     setCandidate({ ...candidate });
//     setInput("");
//   };

//   const finishInterview = (c: any) => {
//     const finalScore = calculateFinalScore(c.questions);
//     const summary = generateSummary(c, c.questions);

//     addMessage("system", `✅ Interview finished! Final Score: ${finalScore}/10`);
//     addMessage("ai", summary);

//     setInterviewState("completed");
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;
//     if (interviewState === "collectInfo") {
//       handleCollectInfo(input);
//     } else if (interviewState === "interview") {
//       handleSubmitAnswer(input);
//     }
//     setInput("");
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-4">
//       {interviewState === "upload" && (
//         <div className="space-y-4 text-center">
//           <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
//           <p className="text-gray-600">Upload your resume (PDF or DOCX)</p>
//         </div>
//       )}

//       {/* Chat Box */}
//       <div className="h-96 overflow-y-auto border p-2 mt-4 rounded">
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`my-1 ${m.sender === "user" ? "text-blue-600" : m.sender === "ai" ? "text-green-600" : "text-gray-600"
//               }`}
//           >
//             <strong>{m.sender}: </strong> {m.text}
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Timer */}
//       {isTimerActive && (
//         <div className="flex items-center mt-2 text-red-600">
//           <Clock className="w-4 h-4 mr-2" /> {timer}s remaining
//         </div>
//       )}

//       {/* Input */}
//       {(interviewState === "collectInfo" || interviewState === "interview") && (
//         <div className="flex mt-2 space-x-2">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-1 border p-2 rounded"
//             placeholder="Type your answer..."
//           />
//           <button
//             onClick={handleSend}
//             className="bg-indigo-600 text-white px-4 py-2 rounded"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { Upload, Send, Clock } from "lucide-react";
import {
  extractTextFromPDF,
  extractInfoFromText,
  generateAIResponse,
  calculateFinalScore,
  generateSummary,
} from "../utils/helpers";
import { INTERVIEW_QUESTIONS, DIFFICULTY_TIMERS } from "../utils/constants";

export default function IntervieweeTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [candidate, setCandidate] = useState<any>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [interviewState, setInterviewState] = useState<
    "upload" | "collectInfo" | "interview" | "completed"
  >("upload");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const t = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(t);
    } else if (isTimerActive && timer === 0) {
      handleSubmitAnswer("⏰ Time is up!");
    }
  }, [isTimerActive, timer]);

  const addMessage = (sender: string, text: string) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    addMessage("system", `Uploaded: ${file.name}`);
    addMessage("system", "Processing resume...");

    const text = await extractTextFromPDF(file);
    const extracted = extractInfoFromText(text);

    const missing: string[] = [];
    if (!extracted.name) missing.push("name");
    if (!extracted.email) missing.push("email");
    if (!extracted.phone) missing.push("phone");

    const newCandidate = {
      id: Date.now().toString(),
      ...extracted,
      questions: [],
    };
    setCandidate(newCandidate);

    if (missing.length > 0) {
      setMissingFields(missing);
      setInterviewState("collectInfo");
      addMessage(
        "system",
        `I need your ${missing.join(", ")}. Please provide your ${missing[0]}:`
      );
    } else {
      startInterview(newCandidate);
    }
  };

  const handleCollectInfo = (value: string) => {
    if (!candidate) return;

    const field = missingFields[0];
    const updated = { ...candidate, [field]: value };
    setCandidate(updated);

    const remaining = missingFields.slice(1);
    setMissingFields(remaining);

    if (remaining.length > 0) {
      addMessage("system", `Thanks! Please provide your ${remaining[0]}:`);
    } else {
      startInterview(updated);
    }
  };

  const startInterview = (c: any) => {
    const questions = [
      ...INTERVIEW_QUESTIONS.easy.map((q) => ({ question: q, difficulty: "easy" })),
      ...INTERVIEW_QUESTIONS.medium.map((q) => ({ question: q, difficulty: "medium" })),
      ...INTERVIEW_QUESTIONS.hard.map((q) => ({ question: q, difficulty: "hard" })),
    ];
    const updated = { ...c, questions };
    setCandidate(updated);
    setInterviewState("interview");
    askQuestion(updated, 0);
  };

  const askQuestion = (c: any, index: number) => {
    const q = c.questions[index];
    addMessage("ai", `Q${index + 1}: ${q.question}`);
    addMessage("system", `⏱ Time: ${DIFFICULTY_TIMERS[q.difficulty]}s`);
    setTimer(DIFFICULTY_TIMERS[q.difficulty]);
    setIsTimerActive(true);
  };

  const handleSubmitAnswer = (answer: string) => {
    if (!candidate) return;

    setIsTimerActive(false);

    const q = candidate.questions[questionIndex];
    const { score, feedback } = generateAIResponse(
      q.question,
      answer,
      q.difficulty
    );

    candidate.questions[questionIndex] = {
      ...q,
      answer,
      aiScore: score,
      feedback,
    };

    addMessage("user", answer);
    addMessage("ai", `${feedback} (Score: ${score}/10)`);

    if (questionIndex < candidate.questions.length - 1) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        askQuestion(candidate, questionIndex + 1);
      }, 1500);
    } else {
      finishInterview(candidate);
    }

    setCandidate({ ...candidate });
    setInput("");
  };

  const finishInterview = (c: any) => {
    const finalScore = calculateFinalScore(c.questions);
    const summary = generateSummary(c, c.questions);

    addMessage("system", `✅ Interview finished! Final Score: ${finalScore}/10`);
    addMessage("ai", summary);

    // 🔹 Save candidate into localStorage
    const candidateData = {
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      finalScore,
      summary,
      questions: c.questions,
    };

    const prev = JSON.parse(localStorage.getItem("candidates") || "[]");
    prev.push(candidateData);
    localStorage.setItem("candidates", JSON.stringify(prev));

    setInterviewState("completed");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (interviewState === "collectInfo") {
      handleCollectInfo(input);
    } else if (interviewState === "interview") {
      handleSubmitAnswer(input);
    }
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-4">
      {interviewState === "upload" && (
        <div className="space-y-4 text-center">
          <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
          <p className="text-gray-600">Upload your resume (PDF or DOCX)</p>
        </div>
      )}

      {/* Chat Box */}
      <div className="h-96 overflow-y-auto border p-2 mt-4 rounded">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`my-1 ${
              m.sender === "user"
                ? "text-blue-600"
                : m.sender === "ai"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            <strong>{m.sender}: </strong> {m.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Timer */}
      {isTimerActive && (
        <div className="flex items-center mt-2 text-red-600">
          <Clock className="w-4 h-4 mr-2" /> {timer}s remaining
        </div>
      )}

      {/* Input */}
      {(interviewState === "collectInfo" || interviewState === "interview") && (
        <div className="flex mt-2 space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type your answer..."
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
