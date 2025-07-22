// Summarize the plagiarism report
'use server';
/**
 * @fileOverview Summarizes the plagiarism report, highlighting the most significant instances of potential plagiarism.
 *
 * - summarizePlagiarismReport - A function that summarizes the plagiarism report.
 * - SummarizePlagiarismReportInput - The input type for the summarizePlagiarismReport function.
 * - SummarizePlagiarismReportOutput - The return type for the summarizePlagiarismReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePlagiarismReportInputSchema = z.object({
  report: z.string().describe('The plagiarism report to summarize.'),
});

export type SummarizePlagiarismReportInput = z.infer<typeof SummarizePlagiarismReportInputSchema>;

const SummarizePlagiarismReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the plagiarism findings.'),
});

export type SummarizePlagiarismReportOutput = z.infer<typeof SummarizePlagiarismReportOutputSchema>;

export async function summarizePlagiarismReport(input: SummarizePlagiarismReportInput): Promise<SummarizePlagiarismReportOutput> {
  return summarizePlagiarismReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePlagiarismReportPrompt',
  input: {schema: SummarizePlagiarismReportInputSchema},
  output: {schema: SummarizePlagiarismReportOutputSchema},
  prompt: `You are an expert at summarizing plagiarism reports.

  Please provide a concise summary of the following plagiarism report, highlighting the most significant instances of potential plagiarism.

  Report: {{{report}}}`,
});

const summarizePlagiarismReportFlow = ai.defineFlow(
  {
    name: 'summarizePlagiarismReportFlow',
    inputSchema: SummarizePlagiarismReportInputSchema,
    outputSchema: SummarizePlagiarismReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
