import ResumeCard from "~/components/ResumeCard";
import Navbar from "../components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProfileTuner.ai" },
    { name: "description", content: "Transform your resume and LinkedIn profile into achievement-focused career documents that pass ATS filters and land interviews. Free AI-powered optimization in under 5 minutes." },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect( () => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>
          Track Your Applications & Resume Ratings
        </h1>
        <h2>
          Review your submissions and check AI-powered feedback.
        </h2>
      </div>
      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>

  </main>
}
