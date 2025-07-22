
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, UploadCloud, FileText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { generateExampleRepoUrl, ExampleRepoUrlOutput } from "@/ai/flows/generate-initial-prompt";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  repoUrl: z.string().url({ message: "Please enter a valid GitHub URL." }).optional().or(z.literal('')),
});

type RepoUploadFormValues = z.infer<typeof formSchema> & { projectFile?: File | null };

interface RepoUploadFormProps {
  onSubmit: (data: RepoUploadFormValues) => void;
  isLoading: boolean;
}

export function RepoUploadForm({ onSubmit, isLoading }: RepoUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exampleUrl, setExampleUrl] = useState<string>('');
  const [hasUserInteractedWithUrlInput, setHasUserInteractedWithUrlInput] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<RepoUploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repoUrl: "",
    },
  });

  useEffect(() => {
    async function fetchExampleUrl() {
      try {
        const result: ExampleRepoUrlOutput = await generateExampleRepoUrl();
        setExampleUrl(result.exampleUrl);
      } catch (error) {
        console.error("Failed to fetch example URL:", error);
      }
    }
    fetchExampleUrl();
  }, []);
  
  const repoUrlValue = watch("repoUrl");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("repoUrl", ""); 
    } else {
      setSelectedFile(null);
    }
  };

  const handleFormSubmit = (data: RepoUploadFormValues) => {
    if (!data.repoUrl && !selectedFile) {
      toast({
        title: "Input Required",
        description: "Please provide a GitHub URL or upload a project file.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ ...data, projectFile: selectedFile });
  };
  
  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue("repoUrl", newValue);
    if (newValue) {
      setHasUserInteractedWithUrlInput(true);
      setSelectedFile(null); 
      const fileInput = document.getElementById('projectFile') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } else {
      // If user clears the input, hasUserInteractedWithUrlInput remains true
    }
  };

  const getPlaceholder = () => {
    // If a file is selected, repoUrl input (which is now empty) should show generic placeholder
    if (selectedFile) {
      return "https://github.com/user/repo";
    }

    // If user has typed in the URL field before (even if it's now empty), show generic
    if (hasUserInteractedWithUrlInput) {
      return "https://github.com/user/repo";
    }

    // If user hasn't interacted with URL input (it's pristine), no file selected,
    // and exampleUrl is available, show it. This covers the initial state.
    if (exampleUrl && !repoUrlValue) { // !repoUrlValue ensures it's empty
      return exampleUrl;
    }
    
    // Fallback generic placeholder
    return "https://github.com/user/repo";
  };

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Analyze Repository</CardTitle>
        <CardDescription>Enter a GitHub repository URL or upload project files to check for plagiarism.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="repoUrl" className="flex items-center gap-2">
              <Github className="h-5 w-5 text-muted-foreground" />
              GitHub Repository URL
            </Label>
            <Controller
              name="repoUrl"
              control={control}
              render={({ field }) => (
                <Input
                  id="repoUrl"
                  placeholder={getPlaceholder()}
                  {...field}
                  onChange={handleUrlInputChange} // Use the custom handler
                  disabled={isLoading}
                  className="text-base"
                />
              )}
            />
            {errors.repoUrl && <p className="text-sm text-destructive">{errors.repoUrl.message}</p>}
          </div>

          <div className="relative flex items-center">
            <span className="flex-shrink px-4 text-muted-foreground">OR</span>
            <div className="flex-grow border-t border-border"></div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectFile" className="flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-muted-foreground" />
              Upload Project File(s)
            </Label>
            <Input
              id="projectFile"
              type="file"
              onChange={handleFileChange}
              disabled={isLoading}
              className="text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              accept=".js,.py,.txt,.md,.java,.c,.cpp,.ts,.tsx,.html,.css,application/zip,application/x-zip-compressed"
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground flex items-center gap-1 pt-1">
                <FileText className="h-4 w-4" /> Selected: {selectedFile.name}
              </p>
            )}
            <p className="text-xs text-muted-foreground">Upload individual files or a ZIP archive of your project.</p>
          </div>

          <Button type="submit" disabled={isLoading || (!repoUrlValue && !selectedFile)} className="w-full text-base py-3">
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
