// // utils/helpers.ts

// export const extractTextFromPDF = async (file: File): Promise<string> => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       resolve((e.target?.result as string) || "");
//     };
//     reader.readAsText(file);
//   });
// };

// export const extractInfoFromText = (text: string) => {
//   const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
//   const phoneRegex = /(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
//   const nameRegex = /^([A-Z][a-z]+ [A-Z][a-z]+)/m;

//   const email = text.match(emailRegex)?.[0] || "";
//   const phone = text.match(phoneRegex)?.[0] || "";
//   const name = text.match(nameRegex)?.[0] || "";

//   return { name, email, phone };
// };

// export const generateAIResponse = (
//   question: string,
//   answer: string,
//   difficulty: "easy" | "medium" | "hard"
// ) => {
//   const answerLength = answer.trim().split(" ").length;
//   let score = 0;

//   if (answerLength < 5) {
//     score = Math.random() * 3;
//   } else if (answerLength < 20) {
//     score = 3 + Math.random() * 4;
//   } else {
//     score = 7 + Math.random() * 3;
//   }

//   const feedback =
//     score >= 7
//       ? "Excellent answer! You demonstrated strong understanding."
//       : score >= 5
//       ? "Good answer, but could be more detailed."
//       : "The answer needs more depth and examples.";

//   return { score: Math.round(score * 10) / 10, feedback };
// };

// export const calculateFinalScore = (questions: { aiScore?: number }[]) => {
//   const totalScore = questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
//   return Math.round((totalScore / questions.length) * 10) / 10;
// };

// export const generateSummary = (
//   candidate: { name: string },
//   questions: { answer?: string; aiScore?: number }[]
// ) => {
//   const finalScore = calculateFinalScore(questions);
//   const performance =
//     finalScore >= 7
//       ? "excellent"
//       : finalScore >= 5
//       ? "good"
//       : "needs improvement";

//   return (
//     `${candidate.name} demonstrated ${performance} performance with a final score of ${finalScore}/10. ` +
//     `Completed ${questions.filter((q) => q.answer).length} out of ${
//       questions.length
//     } questions. ` +
//     `Strengths in ${
//       questions.filter((q) => (q.aiScore || 0) >= 7).length > 0
//         ? "problem-solving and technical knowledge"
//         : "basic concepts"
//     }. ` +
//     `Recommended for ${
//       finalScore >= 7
//         ? "next round"
//         : finalScore >= 5
//         ? "further evaluation"
//         : "additional training"
//     }.`
//   );
// };


// Utility functions

export const extractTextFromPDF = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text || "");
    };
    reader.readAsText(file);
  });
};

export const extractInfoFromText = (text: string) => {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/;
  const nameRegex = /^([A-Z][a-z]+ [A-Z][a-z]+)/m;

  const email = text.match(emailRegex)?.[0] || "";
  const phone = text.match(phoneRegex)?.[0] || "";
  const name = text.match(nameRegex)?.[0] || "";

  return { name, email, phone };
};

export const generateAIResponse = (
  _question: string,
  answer: string,
  difficulty: "easy" | "medium" | "hard"
) => {
  const answerLength = answer.trim().split(" ").length;
  let score = 0;

  if (answerLength < 5) {
    score = Math.random() * 3;
  } else if (answerLength < 20) {
    score = 3 + Math.random() * 4;
  } else {
    score = 7 + Math.random() * 3;
  }

  const feedback =
    score >= 7
      ? "Excellent answer! You demonstrated strong understanding."
      : score >= 5
      ? "Good answer, but could be more detailed."
      : "The answer needs more depth and examples.";

  return { score: Math.round(score * 10) / 10, feedback };
};

export const calculateFinalScore = (questions: any[]) => {
  const totalScore = questions.reduce((sum, q) => sum + (q.aiScore || 0), 0);
  return Math.round((totalScore / questions.length) * 10) / 10;
};

export const generateSummary = (candidate: any, questions: any[]) => {
  const finalScore = calculateFinalScore(questions);
  const performance =
    finalScore >= 7 ? "excellent" : finalScore >= 5 ? "good" : "needs improvement";

  return `${candidate.name} demonstrated ${performance} performance with a final score of ${finalScore}/10. ` +
    `Completed ${questions.filter((q) => q.answer).length} out of ${questions.length} questions. ` +
    `Strengths in ${
      questions.filter((q) => q.aiScore >= 7).length > 0
        ? "problem-solving and technical knowledge"
        : "basic concepts"
    }. ` +
    `Recommended for ${
      finalScore >= 7 ? "next round" : finalScore >= 5 ? "further evaluation" : "additional training"
    }.`;
};
