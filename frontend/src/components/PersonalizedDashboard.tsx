import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Target, 
  BookOpen, 
  MapPin, 
  Calendar,
  TrendingUp,
  Award,
  Clock
} from "lucide-react";

interface DashboardProps {
  quizResult?: {
    stream: string;
    scores: Record<string, number>;
  };
  userName?: string;
}

const PersonalizedDashboard = ({ quizResult, userName = "Student" }: DashboardProps) => {
  if (!quizResult) return null;

  const streamInfo = {
    science: {
      title: "Science Stream",
      color: "bg-career-blue",
      nextSteps: ["Complete Class 12", "Prepare for JEE/NEET", "Apply to Engineering/Medical Colleges"],
      timeline: ["10+2 Science", "Entrance Exams", "Bachelor's Degree", "Specialization"]
    },
    arts: {
      title: "Arts/Humanities",
      color: "bg-career-green", 
      nextSteps: ["Complete Class 12", "Prepare for CLAT/other exams", "Apply to Liberal Arts Colleges"],
      timeline: ["10+2 Arts", "Bachelor's Degree", "Competitive Exams", "Professional Career"]
    },
    commerce: {
      title: "Commerce Stream",
      color: "bg-career-orange",
      nextSteps: ["Complete Class 12", "Prepare for CA/CS exams", "Apply to Commerce Colleges"],
      timeline: ["10+2 Commerce", "CA Foundation", "Bachelor's + CA", "Professional Practice"]
    },
    vocational: {
      title: "Vocational Training",
      color: "bg-career-purple",
      nextSteps: ["Choose skill certification", "Complete portfolio", "Apply for internships"],
      timeline: ["Skill Training", "Certification", "Portfolio Building", "Job/Freelancing"]
    }
  };

  const currentStream = streamInfo[quizResult.stream as keyof typeof streamInfo];
  const progress = Math.round((Object.values(quizResult.scores).reduce((a, b) => a + b, 0) / 48) * 100);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your Personalized Career Dashboard
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your progress and next steps, {userName}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="p-6 border-0 shadow-card">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-hero p-3 rounded-full">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Welcome back, {userName}!</h3>
                  <p className="text-muted-foreground">Career Explorer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <Target className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <div className="text-sm font-medium">Quiz Completed</div>
                  <div className="text-xs text-muted-foreground">✓ Done</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <BookOpen className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-sm font-medium">Courses Explored</div>
                  <div className="text-xs text-muted-foreground">Next Step</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommended Stream */}
          <Card className="p-6 border-0 shadow-card lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Recommended Path</h3>
                  <Badge className={`${currentStream.color} text-white text-lg px-4 py-2`}>
                    {currentStream.title}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{progress}%</div>
                  <div className="text-sm text-muted-foreground">Match Score</div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Your Career Timeline
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {currentStream.timeline.map((step, index) => (
                    <div key={index} className="relative">
                      <div className={`p-3 rounded-lg border-2 ${index === 0 ? 'border-primary bg-primary/10' : 'border-muted'}`}>
                        <div className="text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="text-sm font-medium">{step}</div>
                        </div>
                      </div>
                      {index < currentStream.timeline.length - 1 && (
                        <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-muted transform -translate-y-1/2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Your Next Steps
                </h4>
                <div className="space-y-3">
                  {currentStream.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="flex-1">{step}</span>
                      <Button size="sm" variant="outline">
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 border-0 shadow-card lg:col-span-3">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Explore Courses</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <MapPin className="h-6 w-6" />
                <span className="text-sm">Find Colleges</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">View Deadlines</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Award className="h-6 w-6" />
                <span className="text-sm">Scholarships</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedDashboard;