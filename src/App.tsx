import { useState } from "react";
import IntervieweeTab from "./components/IntervieweeTab";
import InterviewerTab from "./components/InterviewerTab";

function App() {
  const [activeTab, setActiveTab] = useState<"interviewee" | "interviewer">(
    "interviewee"
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">
          AI Interview Assistant
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setActiveTab("interviewee")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "interviewee"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Interviewee
        </button>
        <button
          onClick={() => setActiveTab("interviewer")}
          className={`px-4 py-2 rounded-md font-medium ${
            activeTab === "interviewer"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Interviewer
        </button>
      </div>

      {/* Content */}
      <main className="p-6">
        {activeTab === "interviewee" ? (
          <IntervieweeTab />
        ) : (
          <InterviewerTab />
        )}
      </main>
    </div>
  );
}

export default App;

