import React from "react";
import Navbar from "~/components/Navbar";

export const meta = () => [
  { title: 'ProfileTuner.ai" | Prepare for Interview' },
  { name: "description", content: "Prepare for Interview Questions" },
];

const Interview = () => {
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
      </div>
    </main>
  );
};

export default Interview;
