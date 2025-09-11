import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuizSection from "@/components/QuizSection";
import CareerPathsSection from "@/components/CareerPathsSection";
import CollegeFinderSection from "@/components/CollegeFinderSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <QuizSection />
        <CareerPathsSection />
        <CollegeFinderSection />
      </main>
    </div>
  );
};

export default Index;
