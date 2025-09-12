import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Compass, MapPin, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Perfect
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Career Path</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover your ideal stream, explore career opportunities, and find the best government colleges near you. 
                Make informed decisions about your future with our comprehensive career guidance platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:shadow-hero transition-all"
                onClick={() => {
                  const quizSection = document.getElementById('quiz');
                  if (quizSection) {
                    quizSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Take Aptitude Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const careersSection = document.getElementById('careers');
                  if (careersSection) {
                    careersSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Careers
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">500+</div>
                <div className="text-sm text-muted-foreground">Government Colleges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all">
              <div className="space-y-3">
                <div className="bg-career-blue/10 p-3 rounded-lg w-fit">
                  <Target className="h-6 w-6 text-career-blue" />
                </div>
                <h3 className="font-semibold">Aptitude Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Discover your strengths and ideal academic stream
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all">
              <div className="space-y-3">
                <div className="bg-career-green/10 p-3 rounded-lg w-fit">
                  <BookOpen className="h-6 w-6 text-career-green" />
                </div>
                <h3 className="font-semibold">Course Mapping</h3>
                <p className="text-sm text-muted-foreground">
                  See clear paths from courses to careers
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all">
              <div className="space-y-3">
                <div className="bg-career-orange/10 p-3 rounded-lg w-fit">
                  <MapPin className="h-6 w-6 text-career-orange" />
                </div>
                <h3 className="font-semibold">College Finder</h3>
                <p className="text-sm text-muted-foreground">
                  Find nearby government colleges and admission details
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card border-0 shadow-card hover:shadow-hero transition-all">
              <div className="space-y-3">
                <div className="bg-career-purple/10 p-3 rounded-lg w-fit">
                  <Compass className="h-6 w-6 text-career-purple" />
                </div>
                <h3 className="font-semibold">Personalized Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Get recommendations tailored to your profile
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;