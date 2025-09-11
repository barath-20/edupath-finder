import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";
import CareerPathsSection from "@/components/CareerPathsSection";  
import CollegeFinderSection from "@/components/CollegeFinderSection";
import PersonalizedDashboard from "@/components/PersonalizedDashboard";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [quizResult, setQuizResult] = useState<{
    stream: string;
    scores: Record<string, number>;
  } | null>(null);

  const handleQuizComplete = (result: { stream: string; scores: Record<string, number> }) => {
    setQuizResult(result);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main id="home">
        <Hero />
        <QuizSection onQuizComplete={handleQuizComplete} />
        {quizResult && <PersonalizedDashboard quizResult={quizResult} />}
        <CareerPathsSection />
        <CollegeFinderSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
