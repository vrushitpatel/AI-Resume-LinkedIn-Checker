import { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { interviewPrepPrompt, prepareInstructions } from "~/constants";

// Extract JSON content from potential Markdown-fenced code blocks
function extractJsonContent(possiblyFenced: string): string {
  const text = (possiblyFenced ?? "").trim();
  // Full fenced block like ```json\n...\n```
  const fullFence = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fullFence && fullFence[1]) {
    return fullFence[1].trim();
  }
  // Inline fences anywhere in text
  if (text.includes("```")) {
    const first = text.indexOf("```");
    const last = text.lastIndexOf("```");
    if (last > first) {
      const inside = text
        .slice(first + 3, last)
        .replace(/^json\s*/i, "")
        .trim();
      if (inside) return inside;
    }
  }
  return text;
}

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file ...");

    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) return setStatusText("Error: Failed to Upload File");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    console.log(imageFile);

    if (!imageFile.file)
      return setStatusText("Error: Failed to Convert PDF to Image");

    setStatusText("Uploading the Image... ");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to Upload Image");

    setStatusText("Preparing data... ");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
      interviewQuestions: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing... ");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) return setStatusText("Error: Failed to Analyze Resume");

    setStatusText("Preparing Interview Questions... ");

    const interviewQuestions = await ai.feedback(
      uploadedFile.path,
      interviewPrepPrompt({ jobTitle, jobDescription, companyName })
    );

    if (!interviewQuestions)
      return setStatusText("Error: Failed to Retrive Interview Prep Questions");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    try {
      data.feedback = JSON.parse(extractJsonContent(feedbackText));
    } catch (err) {
      console.error("Failed to parse feedback JSON:", err, feedbackText);
      setStatusText("Error: Invalid JSON in AI feedback");
      setIsProcessing(false);
      return;
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    const interviewQuestionsText =
      typeof interviewQuestions.message.content === "string"
        ? interviewQuestions.message.content
        : interviewQuestions.message.content[0].text;

    try {
      data.interviewQuestions = JSON.parse(
        extractJsonContent(interviewQuestionsText)
      );
    } catch (err) {
      console.error(
        "Failed to parse interview questions JSON:",
        err,
        interviewQuestionsText
      );
      setStatusText("Error: Invalid JSON in interview response");
      setIsProcessing(false);
      return;
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analysis Complete, Redirecting... ");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    console.log("Inside HandleSubmit - Form");

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    console.log("Inside HandleSubmit - File");

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main2.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="analyse-w-half" />
            </>
          ) : (
            <h2>Drop your Resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Anaylze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
