

// import React, { useEffect, useState } from "react";
// import { Search, ChevronDown, ChevronUp } from "lucide-react";

// interface Candidate {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   finalScore: number;
//   summary: string;
//   questions: any[];
// }

// export default function InterviewerTab() {
//   const [search, setSearch] = useState("");
//   const [sortDesc, setSortDesc] = useState(true);
//   const [candidates, setCandidates] = useState<Candidate[]>([]);

//   // Load candidates from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("candidates") || "[]");
//     setCandidates(stored);
//   }, []);

//   const filtered = candidates
//     .filter(
//       (c) =>
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) =>
//       sortDesc ? b.finalScore - a.finalScore : a.finalScore - b.finalScore
//     );

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4">
//       <div className="flex items-center mb-4 space-x-2">
//         <Search className="w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search candidates..."
//           className="flex-1 border p-2 rounded"
//         />
//         <button
//           onClick={() => setSortDesc(!sortDesc)}
//           className="flex items-center bg-gray-200 px-3 py-2 rounded"
//         >
//           Sort {sortDesc ? <ChevronDown /> : <ChevronUp />}
//         </button>
//       </div>

//       {filtered.length === 0 ? (
//         <p className="text-gray-500 text-center">No candidates yet.</p>
//       ) : (
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-2 py-1">Name</th>
//               <th className="border px-2 py-1">Email</th>
//               <th className="border px-2 py-1">Score</th>
//               <th className="border px-2 py-1">Summary</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((c) => (
//               <tr key={c.id}>
//                 <td className="border px-2 py-1">{c.name}</td>
//                 <td className="border px-2 py-1">{c.email}</td>
//                 <td className="border px-2 py-1 font-bold">{c.finalScore}</td>
//                 <td className="border px-2 py-1">{c.summary}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }import { useState } from "react";



import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  finalScore: number;
  summary: string;
  questions: any[];
}

export default function InterviewerTab() {
  const [search, setSearch] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // 🔹 Load candidates from localStorage
  const candidates: Candidate[] = JSON.parse(
    localStorage.getItem("candidates") || "[]"
  );

  const filtered = candidates
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortDesc ? b.finalScore - a.finalScore : a.finalScore - b.finalScore
    );

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-4 space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search candidates..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="flex items-center bg-gray-200 px-3 py-2 rounded"
        >
          Sort {sortDesc ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Score</th>
            <th className="border px-2 py-1">Summary</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.name}</td>
              <td className="border px-2 py-1">{c.email}</td>
              <td className="border px-2 py-1 font-bold">{c.finalScore}</td>
              <td className="border px-2 py-1">{c.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
