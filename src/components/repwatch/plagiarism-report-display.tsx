
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, FileText, Lightbulb, CheckCircle2, Github } from "lucide-react";

interface PlagiarismReportDisplayProps {
  reportContent: string;
  summary: string;
  repoName?: string;
}

interface ParsedFinding {
  file: string;
  lines: string;
  similarity: string;
  sourceFile?: string;
  sourceLines?: string;
  sourceUrl?: string;
  sourceUsername?: string; 
}

// Basic parser for the mock report format
function parseMockReport(reportContent: string): { overallSimilarity: string | null, findings: ParsedFinding[] } {
  const findings: ParsedFinding[] = [];
  let overallSimilarity: string | null = null;

  const lines = reportContent.split('\n');
  let currentFile: string | null = null;

  for (const line of lines) {
    const overallMatch = line.match(/Overall Similarity: (.*)/);
    if (overallMatch) {
      overallSimilarity = overallMatch[1];
      continue;
    }

    const fileMatch = line.match(/File: (.*)/);
    if (fileMatch) {
      currentFile = fileMatch[1].trim();
      continue;
    }

    if (currentFile) {
      const findingMatch = line.match(/-\s*Lines (.*?) \((.*? lines)\) show (.*?) similarity with (.*?)(?: \((lines .*?)\))?$/);
      if (findingMatch) {
        const [, lines, , similarity, source, sourceLinesMatch] = findingMatch;
        const parsedFinding: ParsedFinding = {
          file: currentFile,
          lines: lines.trim(),
          similarity: similarity.trim(),
        };
        if (source.startsWith("http")) {
          const trimmedSourceUrl = source.trim();
          parsedFinding.sourceUrl = trimmedSourceUrl;
          if (sourceLinesMatch) {
             parsedFinding.sourceLines = sourceLinesMatch.replace('lines ', '').trim();
          }
          // Extract GitHub username if applicable
          try {
            const url = new URL(trimmedSourceUrl);
            if (url.hostname === 'github.com') {
              const pathParts = url.pathname.split('/');
              if (pathParts.length > 1 && pathParts[1]) {
                parsedFinding.sourceUsername = pathParts[1];
              }
            }
          } catch (e) {
            // console.warn("Could not parse source URL for username:", trimmedSourceUrl);
            // Silently ignore if URL is malformed for this specific extraction
          }
        } else if (source.startsWith("internal file")) {
          parsedFinding.sourceFile = source.replace('internal file ', '').trim();
           if (sourceLinesMatch) {
             parsedFinding.sourceLines = sourceLinesMatch.replace('lines ', '').trim();
          }
        }
        findings.push(parsedFinding);
      }
    }
  }
  return { overallSimilarity, findings };
}


export function PlagiarismReportDisplay({ reportContent, summary, repoName }: PlagiarismReportDisplayProps) {
  const { overallSimilarity, findings } = parseMockReport(reportContent);
  const hasPlagiarism = findings.length > 0;

  return (
    <Card className="w-full max-w-3xl shadow-xl mt-8">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          {hasPlagiarism ? <AlertTriangle className="h-7 w-7 text-destructive" /> : <CheckCircle2 className="h-7 w-7 text-green-500" />}
          Plagiarism Report {repoName && `for ${repoName}`}
        </CardTitle>
        {overallSimilarity && (
          <CardDescription>
            Overall Estimated Similarity: <span className="font-semibold">{overallSimilarity}</span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-accent/20 rounded-lg border border-accent">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-accent-foreground">
            <Lightbulb className="h-5 w-5" />
            AI Summary
          </h3>
          <p className="text-sm text-accent-foreground/90 whitespace-pre-line">{summary || "No summary available."}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5" />
            Detailed Findings
          </h3>
          {findings.length > 0 ? (
            <ul className="space-y-4">
              {findings.map((finding, index) => (
                <li key={index} className="p-4 border rounded-md bg-card shadow-sm">
                  <p className="font-medium text-primary">
                    <strong className="text-foreground">File:</strong> {finding.file}
                  </p>
                  <p><strong className="text-foreground">Lines:</strong> {finding.lines}</p>
                  <p><strong className="text-foreground">Similarity:</strong> <span className="text-destructive font-semibold">{finding.similarity}</span></p>
                  {finding.sourceUrl && (
                    <p>
                      <strong className="text-foreground">Potential Source:</strong>{" "}
                      <a 
                        href={finding.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline break-all inline-block"
                      >
                        {finding.sourceUrl}
                      </a>
                      {finding.sourceUsername && (
                        <span className="ml-2 text-muted-foreground inline-flex items-center gap-1">
                          (<Github className="h-3.5 w-3.5" /> {finding.sourceUsername})
                        </span>
                      )}
                      {finding.sourceLines && ` (Lines: ${finding.sourceLines})`}
                    </p>
                  )}
                  {finding.sourceFile && (
                     <p><strong className="text-foreground">Potential Internal Source:</strong> {finding.sourceFile} {finding.sourceLines && ` (Lines: ${finding.sourceLines})`}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No significant plagiarism instances detected in the provided details.</p>
          )}
        </div>
        
        {reportContent && !hasPlagiarism && overallSimilarity === null && (
           <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
             <p className="text-sm text-green-700">The raw report indicates no major issues.</p>
           </div>
        )}

      </CardContent>
    </Card>
  );
}
