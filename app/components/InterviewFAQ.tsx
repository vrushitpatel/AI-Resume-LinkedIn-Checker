import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const DifficultyBadge = ({
  difficulty,
}: {
  difficulty: "Easy" | "Easy-Medium" | "Medium" | "Medium-Hard" | "Hard";
}) => {
  const color =
    difficulty === "Easy"
      ? "bg-green-100 text-green-700 border-green-200"
      : difficulty === "Easy-Medium"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : difficulty === "Medium"
          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
          : difficulty === "Medium-Hard"
            ? "bg-orange-50 text-orange-700 border-orange-200"
            : "bg-red-50 text-red-700 border-red-200";
  return (
    <span className={cn("text-xs px-2 py-1 rounded-full border", color)}>
      {difficulty}
    </span>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <p className="text-2xl font-semibold py-2">{title}</p>
);

const BehavioralItem = ({
  item,
  index,
}: {
  item: InterviewPrep["interviewQuestions"]["behavioralQuestions"][number];
  index: number;
}) => (
  <div
    className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 bg-white h-full"
    key={index}
  >
    <div className="flex flex-col gap-1 lg:min-h-28">
      <p className="text-lg text-black font-semibold">{item.question}</p>
      <p className="text-sm text-gray-500">Why: {item.why}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-card-blue-50 rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">Situation</p>
        <p className="text-sm text-gray-700">{item.starAnswer.situation}</p>
      </div>
      <div className="bg-card-blue-50 rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">Task</p>
        <p className="text-sm text-gray-700">{item.starAnswer.task}</p>
      </div>
      <div className="bg-card-blue-50 rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">Action</p>
        <p className="text-sm text-gray-700">{item.starAnswer.action}</p>
      </div>
      <div className="bg-card-blue-50 rounded-lg p-3">
        <p className="text-sm font-semibold text-gray-600 mb-1">Result</p>
        <p className="text-sm text-gray-700">{item.starAnswer.result}</p>
      </div>
    </div>
  </div>
);

const TechnicalItem = ({
  item,
  index,
}: {
  item: InterviewPrep["interviewQuestions"]["technicalQuestions"][number];
  index: number;
}) => (
  <div
    className="flex flex-col gap-3 rounded-2xl border border-gray-200 p-4 bg-white h-full"
    key={index}
  >
    <div className="flex flex-col gap-2 lg:min-h-24">
      <div className="flex flex-row items-start justify-between gap-2">
        <p className="text-lg text-black font-semibold">{item.question}</p>
        <DifficultyBadge difficulty={item.difficulty} />
      </div>
      <p className="text-sm text-gray-500">Hint: {item.hint}</p>
    </div>
    <div className="bg-card-blue-50 rounded-lg p-3">
      <p className="text-sm font-semibold text-gray-600 mb-2">Key Points</p>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {item.keyPoints.map((kp, i) => (
          <li key={i}>{kp}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ResearchSection = ({
  data,
}: {
  data: InterviewPrep["interviewQuestions"]["companyResearch"];
}) => (
  <div className="flex flex-col gap-4">
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className="text-base text-gray-700">{data.overview}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card-blue-50 rounded-2xl p-4 border border-gray-200">
        <p className="font-semibold text-gray-700 mb-2">Recent News</p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {data.recentNews.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
      <div className="bg-card-blue-50 rounded-2xl p-4 border border-gray-200">
        <p className="font-semibold text-gray-700 mb-2">Culture</p>
        <p className="text-sm text-gray-700">{data.culture}</p>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <p className="font-semibold text-gray-800 mb-2">Talking Points</p>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2 list-disc list-inside text-sm text-gray-700">
        {data.talkingPoints.map((tp, i) => (
          <li key={i}>{tp}</li>
        ))}
      </ul>
    </div>
  </div>
);

const QuestionsToAsk = ({
  items,
}: {
  items: InterviewPrep["interviewQuestions"]["questionsToAsk"];
}) => (
  <div className="grid grid-cols-1 gap-4">
    {items.map((q, i) => (
      <div className="rounded-2xl border border-gray-200 p-4 bg-white" key={i}>
        <p className="text-base text-black font-semibold">{q.question}</p>
        <p className="text-sm text-gray-500 mt-1">Why: {q.why}</p>
      </div>
    ))}
  </div>
);

const PreparationTips = ({ tips }: { tips: string[] }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4">
    <ul className="grid grid-cols-1 gap-2 list-disc list-inside text-sm text-gray-700">
      {tips.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  </div>
);

const InterviewFAQ = ({
  data,
}: {
  data: InterviewPrep["interviewQuestions"];
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="behavioral">
          <AccordionHeader itemId="behavioral">
            <SectionTitle title="Behavioral Questions (STAR)" />
          </AccordionHeader>
          <AccordionContent itemId="behavioral">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.behavioralQuestions.map((item, i) => (
                <BehavioralItem item={item} index={i} key={i} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="technical">
          <AccordionHeader itemId="technical">
            <SectionTitle title="Technical Questions" />
          </AccordionHeader>
          <AccordionContent itemId="technical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data.technicalQuestions.map((item, i) => (
                <TechnicalItem item={item} index={i} key={i} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="company-research">
          <AccordionHeader itemId="company-research">
            <SectionTitle title="Company Research" />
          </AccordionHeader>
          <AccordionContent itemId="company-research">
            <ResearchSection data={data.companyResearch} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="questions-to-ask">
          <AccordionHeader itemId="questions-to-ask">
            <SectionTitle title="Questions To Ask" />
          </AccordionHeader>
          <AccordionContent itemId="questions-to-ask">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <QuestionsToAsk items={data.questionsToAsk} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="preparation-tips">
          <AccordionHeader itemId="preparation-tips">
            <SectionTitle title="Preparation Tips" />
          </AccordionHeader>
          <AccordionContent itemId="preparation-tips">
            <PreparationTips tips={data.preparationTips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InterviewFAQ;
