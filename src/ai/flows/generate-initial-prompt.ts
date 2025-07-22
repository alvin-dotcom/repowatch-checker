'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate an example repository URL for new users.
 *
 * - generateExampleRepoUrl - A function that returns a static example URL to help new users understand the service.
 * - ExampleRepoUrlOutput - The output type for the generateExampleRepoUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExampleRepoUrlOutputSchema = z.object({
  exampleUrl: z.string().describe('A URL of an example repository to help new users.'),
});

export type ExampleRepoUrlOutput = z.infer<typeof ExampleRepoUrlOutputSchema>;

const exampleRepoUrl = 'https://github.com/firebaseopensource/functions-samples';

export async function generateExampleRepoUrl(): Promise<ExampleRepoUrlOutput> {
  return generateExampleRepoUrlFlow();
}

const generateExampleRepoUrlFlow = ai.defineFlow(
  {
    name: 'generateExampleRepoUrlFlow',
    outputSchema: ExampleRepoUrlOutputSchema,
  },
  async () => {
    return {exampleUrl: exampleRepoUrl};
  }
);
