
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AppHeader } from '@/components/repwatch/app-header';
import { Github, Lightbulb, FileText, ChevronRight, ShieldCheck, UploadCloud, Cpu, Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function LandingPage() {
  const features = [
    {
      icon: <Github className="h-8 w-8 text-primary" />,
      title: "Versatile Source Input",
      description: "Analyze public GitHub repositories simply by pasting a URL, or directly upload your project files, including ZIP archives, for a comprehensive scan."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "AI-Powered Summaries",
      description: "Save time with quick, insightful summaries of plagiarism reports. Our intelligent AI highlights key findings and potential areas of concern, making complex reports easy to digest."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Detailed Breakdowns",
      description: "Receive comprehensive and actionable reports detailing potential plagiarism. See highlighted code blocks, similarity percentages, and direct links to suspected original sources."
    }
  ];

  const howItWorksSteps = [
    {
      icon: <UploadCloud className="h-10 w-10 text-primary mb-3" />,
      title: "Submit Your Code",
      description: "Easily provide a public GitHub URL or upload your project files (ZIP, individual files)."
    },
    {
      icon: <Cpu className="h-10 w-10 text-primary mb-3" />,
      title: "AI-Powered Analysis",
      description: "Our intelligent system thoroughly scans your code against vast databases and internal sources."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary mb-3" />,
      title: "Receive Detailed Report",
      description: "Get a comprehensive breakdown of potential similarities, including source links and matching percentages."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary mb-3" />,
      title: "Instant AI Summary",
      description: "Understand key findings at a glance with a concise, AI-generated summary of the report."
    }
  ];

  return (
    <div className="flex flex-col flex-grow">
      <AppHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10">
          <div className="container mx-auto px-4 text-center">
            <ShieldCheck className="h-16 w-16 md:h-20 md:w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6">
              Ensure Code Integrity with RepoWatch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl md:max-w-3xl mx-auto mb-10">
              Dive deep into your code's originality. RepoWatch offers advanced AI-powered plagiarism detection, helping you scan public GitHub repositories or upload project files effortlessly. Safeguard your intellectual property, maintain academic integrity, and ensure the uniqueness of your software projects with detailed, easy-to-understand reports and AI-generated summaries.
            </p>
            <Link href="/app" passHref>
              <Button
                size="lg"
                className="text-base sm:text-lg py-3 px-4 sm:px-6 md:px-8 shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-100 animate-subtle-pulse"
              >
                Analyze Your Repository Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 md:mb-16">
              Simple Steps to Code Clarity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader>
                    <div className="mx-auto">{step.icon}</div>
                    <CardTitle className="font-headline text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-primary/5 dark:bg-primary/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 md:mb-16">
              Why Choose RepoWatch?
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: features.length > 2, 
              }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-4">
                {features.map((feature, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card
                        className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-lg flex flex-col h-full bg-card"
                      >
                        <CardHeader className="items-center text-center md:items-start md:text-left">
                          <div className="p-3 bg-primary/10 rounded-full mb-4">
                            {feature.icon}
                          </div>
                          <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center md:text-left flex-grow">
                          <CardDescription>
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-[-10px] sm:ml-0" />
              <CarouselNext className="mr-[-10px] sm:mr-0" />
            </Carousel>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-accent/5 via-background to-background dark:from-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
              Ready to Secure Your Code's Originality?
            </h2>
            <p className="text-lg text-muted-foreground max-w-md md:max-w-2xl mx-auto mb-10">
              Start using RepoWatch today and take the first step towards academic integrity and professional code quality.
            </p>
            <Link href="/app" passHref>
              <Button
                size="lg"
                variant="default"
                className="text-base sm:text-lg py-3 px-4 sm:px-6 md:px-8 shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-100"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
