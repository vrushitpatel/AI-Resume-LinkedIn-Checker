interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}

interface InterviewPrep {
  interviewQuestions: {
    behavioralQuestions: {
      question: string;
      why: string;
      starAnswer: {
        situation: string;
        task: string;
        action: string;
        result: string;
      };
    }[];
    technicalQuestions: {
      question: string;
      difficulty: "Easy" | "Easy-Medium" | "Medium" | "Medium-Hard" | "Hard";
      hint: string;
      keyPoints: string[];
    }[];
    companyResearch: {
      overview: string;
      recentNews: string[];
      culture: string;
      talkingPoints: string[];
    };
    questionsToAsk: {
      question: string;
      why: string;
    }[];
    preparationTips: string[];
  };
}