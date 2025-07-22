
"use client";

import { useState } from "react";
import { AppHeader } from "@/components/repwatch/app-header";
import { RepoUploadForm } from "@/components/repwatch/repo-upload-form";
import { PlagiarismReportDisplay } from "@/components/repwatch/plagiarism-report-display";
import { SystemLimitations } from "@/components/repwatch/system-limitations";
import { LoadingSpinner } from "@/components/repwatch/loading-spinner";
import { summarizePlagiarismReport, SummarizePlagiarismReportInput, SummarizePlagiarismReportOutput } from "@/ai/flows/summarize-plagiarism-report";
import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button"; // For potential theme toggle
// import { Moon, Sun } from "lucide-react"; // For potential theme toggle

interface AnalysisResult {
  reportContent: string;
  summary: string;
  repoName?: string;
}

// Mock report generation
function generateMockReport(sourceName: string): string {
  const isUrl = sourceName.startsWith("http");
  const baseName = isUrl ? new URL(sourceName).pathname.split('/').pop() : sourceName;

  const randomNumber = Math.random();
  if (randomNumber < 0.3) { // 30% chance of no plagiarism
    return `Plagiarism Scan Results for ${baseName || 'project'}
--------------------------------------------------
Overall Similarity: 0%

All files scanned. No significant plagiarism detected.
--------------------------------------------------`;
  } else if (randomNumber < 0.7) { // 40% chance of some plagiarism
    return `Plagiarism Scan Results for ${baseName || 'project'}
--------------------------------------------------
Overall Similarity: 25%

File: src/utils.js
 - Lines 10-25 (15 lines) show 85% similarity with https://example.com/some-library/utils.js (lines 50-65)
 - Lines 30-40 (10 lines) show 70% similarity with internal file src/helpers.js (lines 5-15)

File: README.md
 - No significant plagiarism detected.
--------------------------------------------------`;
  } else { // 30% chance of higher plagiarism
     return `Plagiarism Scan Results for ${baseName || 'project'}
--------------------------------------------------
Overall Similarity: 60%

File: src/core/main.py
 - Lines 5-120 (115 lines) show 92% similarity with https://github.com/another-repo/main.py (lines 10-130)

File: src/components/ui.ts
 - Lines 1-50 (50 lines) show 75% similarity with https://example-framework.com/ui-components.ts (lines 1-50)

File: assets/config.json
 - Lines 2-10 (8 lines) show 30% similarity with internal file old_config.json (lines 2-10)
--------------------------------------------------`;
  }
}


export default function AppPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  // const [theme, setTheme] = useState("light");

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  // };


  const handleAnalyze = async (data: { repoUrl?: string; projectFile?: File | null }) => {
    setIsLoading(true);
    setAnalysisResult(null);

    const sourceName = data.repoUrl || data.projectFile?.name || "Uploaded Project";
    
    // Simulate delay for analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const mockReportContent = generateMockReport(sourceName);
      
      const summaryInput: SummarizePlagiarismReportInput = { report: mockReportContent };
      const summaryOutput: SummarizePlagiarismReportOutput = await summarizePlagiarismReport(summaryInput);

      setAnalysisResult({
        reportContent: mockReportContent,
        summary: summaryOutput.summary,
        repoName: sourceName,
      });

      toast({
        title: "Analysis Complete",
        description: "Plagiarism report is ready.",
      });

    } catch (error: any) {
      console.error("Analysis failed:", error);
      let errorMessage = "An error occurred during plagiarism analysis. Please try again.";
      if (error instanceof Error && (error.message.includes("overloaded") || error.message.includes("Service Unavailable") || error.message.includes("503"))) {
        errorMessage = "The AI model is currently overloaded. Please try again in a few moments.";
      }
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-blue-900/30">
      <AppHeader />
      {/* Theme toggle button - optional
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>
      */}
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <RepoUploadForm onSubmit={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && (
          <div className="mt-12 text-center">
            <LoadingSpinner size={48} />
            <p className="mt-4 text-lg font-medium text-primary">Analyzing your repository...</p>
            <p className="text-muted-foreground">This might take a few moments.</p>
          </div>
        )}

        {analysisResult && !isLoading && (
          <PlagiarismReportDisplay
            reportContent={analysisResult.reportContent}
            summary={analysisResult.summary}
            repoName={analysisResult.repoName}
          />
        )}
        
        <SystemLimitations />
      </main>
      {/* Footer is inherited from RootLayout */}
    </div>
  );
}
