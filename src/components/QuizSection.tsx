import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { CheckCircle, Brain, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Question {
  id: number;
  question: string;
  options: { text: string; stream: string; weight: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of activities do you enjoy most?",
    options: [
      { text: "Solving mathematical problems and puzzles", stream: "science", weight: 3 },
      { text: "Reading literature and creative writing", stream: "arts", weight: 3 },
      { text: "Analyzing business trends and markets", stream: "commerce", weight: 3 },
      { text: "Working with hands-on projects", stream: "vocational", weight: 3 }
    ]
  },
  {
    id: 2,
    question: "Which subject interests you the most?",
    options: [
      { text: "Physics and Chemistry", stream: "science", weight: 4 },
      { text: "History and Political Science", stream: "arts", weight: 4 },
      { text: "Economics and Accounting", stream: "commerce", weight: 4 },
      { text: "Computer Applications", stream: "vocational", weight: 4 }
    ]
  },
  {
    id: 3,
    question: "What career path excites you most?",
    options: [
      { text: "Doctor, Engineer, Scientist", stream: "science", weight: 5 },
      { text: "Teacher, Lawyer, Journalist", stream: "arts", weight: 5 },
      { text: "CA, MBA, Banking", stream: "commerce", weight: 5 },
      { text: "Designer, Technician, Entrepreneur", stream: "vocational", weight: 5 }
    ]
  }
];

interface QuizSectionProps {
  onQuizComplete?: (result: { stream: string; scores: Record<string, number> }) => void;
}

const QuizSection = ({ onQuizComplete }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useLocalStorage<Record<number, string>>('quiz-answers', {});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const { toast } = useToast();

  // Initialize quiz start time and restore selected option
  useEffect(() => {
    if (!quizStartTime) {
      setQuizStartTime(Date.now());
    }
    
    // Restore selected option for current question
    const currentAnswer = answers[questions[currentQuestion]?.id];
    if (currentAnswer) {
      const question = questions[currentQuestion];
      const option = question?.options.find(opt => opt.stream === currentAnswer);
      setSelectedOption(option?.text || "");
    } else {
      setSelectedOption("");
    }
  }, [currentQuestion, answers, quizStartTime]);

  const handleAnswer = (option: { text: string; stream: string; weight: number }) => {
    setSelectedOption(option.text);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: option.stream
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = { science: 0, arts: 0, commerce: 0, vocational: 0 };
    
    Object.entries(answers).forEach(([questionId, stream]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.stream === stream);
      if (option) {
        scores[stream] += option.weight;
      }
    });

    const result = getRecommendedStreamFromScores(scores);
    
    // Calculate time taken
    const timeTaken = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0;
    
    setShowResult(true);
    onQuizComplete?.(result);
    
    toast({
      title: "Quiz Completed! 🎉",
      description: `You completed the quiz in ${Math.floor(timeTaken / 60)}:${(timeTaken % 60)
        .toString()
        .padStart(2, '0')} minutes. Your recommended stream is ${result.stream}.`
    });
  };

  const getRecommendedStreamFromScores = (scores: Record<string, number>) => {
    const maxScore = Math.max(...Object.values(scores));
    const recommendedStream = Object.keys(scores).find(key => scores[key] === maxScore) as keyof typeof streamInfo;
    
    return {
      stream: recommendedStream || 'science',
      scores
    };
  };

  const streamInfo = {
    science: {
      title: "Science Stream",
      description: "Perfect for analytical minds who love problem-solving",
      careers: ["Engineering", "Medicine", "Research", "Technology"],
      color: "bg-career-blue"
    },
    arts: {
      title: "Arts/Humanities Stream", 
      description: "Ideal for creative thinkers and social sciences enthusiasts",
      careers: ["Law", "Teaching", "Journalism", "Psychology"],
      color: "bg-career-green"
    },
    commerce: {
      title: "Commerce Stream",
      description: "Great for business-minded individuals",
      careers: ["CA", "MBA", "Banking", "Finance"],
      color: "bg-career-orange"
    },
    vocational: {
      title: "Vocational Training",
      description: "Perfect for hands-on learners and skill-based careers",
      careers: ["Design", "Technology", "Entrepreneurship", "Skilled Trades"],
      color: "bg-career-purple"
    }
  };

  if (showResult) {
    const scores: Record<string, number> = { science: 0, arts: 0, commerce: 0, vocational: 0 };
    
    Object.entries(answers).forEach(([questionId, stream]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.stream === stream);
      if (option) {
        scores[stream] += option.weight;
      }
    });

    const result = getRecommendedStreamFromScores(scores);
    const streamDetails = streamInfo[result.stream as keyof typeof streamInfo];

    return (
      <section id="quiz" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 shadow-hero border-0">
            <div className="text-center space-y-6">
              <div className="bg-gradient-success p-4 rounded-full w-fit mx-auto">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold">Your Recommended Stream</h2>
              
              <div className="bg-gradient-card p-6 rounded-lg">
                <Badge className={`${streamDetails.color} text-white text-lg px-4 py-2 mb-4`}>
                  {streamDetails.title}
                </Badge>
                <p className="text-muted-foreground mb-4">{streamDetails.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {streamDetails.careers.map((career, index) => (
                    <div key={index} className="bg-card p-3 rounded-lg border text-sm font-medium">
                      {career}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setSelectedOption("");
                    setQuizStartTime(Date.now());
                    toast({
                      title: "Quiz Reset",
                      description: "You can now retake the quiz with fresh questions."
                    });
                  }}
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button className="bg-gradient-hero">
                  Explore Colleges
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Discover Your Ideal Stream</h2>
          <p className="text-lg text-muted-foreground">
            Take our quick aptitude assessment to find the perfect academic path for you
          </p>
        </div>

        <Card className="p-8 shadow-card border-0">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">
              {questions[currentQuestion].question}
            </h3>
            
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`p-4 text-left border-2 rounded-lg transition-all hover:shadow-card ${
                    selectedOption === option.text
                      ? 'border-primary bg-primary/5 shadow-card'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextQuestion}
              disabled={!selectedOption}
              className="bg-gradient-hero"
            >
              {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default QuizSection;