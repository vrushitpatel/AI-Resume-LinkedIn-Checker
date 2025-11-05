import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "~/components/Navbar";
import InterviewFAQ from "~/components/InterviewFAQ";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: 'ProfileTuner.ai" | Prepare for Interview' },
  { name: "description", content: "Prepare for Interview Questions" },
];

const Interview = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [interviewQues, setInterviewQues] = useState<
    InterviewPrep["interviewQuestions"] | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      console.log(data.interviewQuestions);
      setInterviewQues(data.interviewQuestions);
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0 bg-[url('/images/bg-main2.svg')] bg-cover">
      <br />
      <Navbar />
      <div className="w-full px-10">
        <section className="feedback-section">
          <h2 className="text-4xl font-bold">
            Interview Preparation Questions
          </h2>
        </section>
        {interviewQues ? (
          <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
            <InterviewFAQ data={interviewQues} />
          </div>
        ) : (
          <img src="/images/resume-scan-2.gif" alt="Analysising..." />
        )}
      </div>
    </main>
  );
};

export default Interview;
