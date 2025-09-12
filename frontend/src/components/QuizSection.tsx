import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Brain, ArrowLeft, ArrowRight, RotateCcw, BookOpen, FlaskConical, BarChart3, Palette, Code2, Leaf, Users, Calculator, Globe, Music, Microscope, Laptop, Scale, Briefcase, Camera, Atom, BookText, Building2, PenTool } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLocalStorage from "@/hooks/useLocalStorage";

interface QuestionOption {
  text: string;
  stream: string;
  weight: number;
  nextQuestionId?: number;
  personalityTrait?: string[];
  skillArea?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  followUpQuestionId?: number;
  feedback?: string;
}

interface Question {
  id: number;
  question: string;
  description?: string;
  icon?: React.ReactNode;
  options: QuestionOption[];
  dependsOn?: {
    questionId: number;
    answerValue: string;
  };
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: 'aptitude' | 'interest' | 'personality' | 'skill';
  isFollowUp?: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which of these best describes your learning style?",
    description: "This helps us understand how you process information best",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    options: [
      { 
        text: "I enjoy hands-on learning and practical applications", 
        stream: "vocational", 
        weight: 3,
        nextQuestionId: 2,
        personalityTrait: ["practical", "kinesthetic"]
      },
      { 
        text: "I prefer logical reasoning and problem-solving", 
        stream: "science", 
        weight: 3,
        nextQuestionId: 3,
        personalityTrait: ["analytical", "logical"]
      },
      { 
        text: "I like exploring ideas and creative expression", 
        stream: "arts", 
        weight: 3,
        nextQuestionId: 4,
        personalityTrait: ["creative", "expressive"]
      },
      { 
        text: "I'm interested in business and financial concepts", 
        stream: "commerce", 
        weight: 3,
        nextQuestionId: 5,
        personalityTrait: ["business-oriented", "pragmatic"]
      }
    ]
  },
  {
    id: 2,
    question: "What type of hands-on activities interest you most?",
    description: "This helps us tailor practical career suggestions",
    icon: <Laptop className="w-6 h-6 text-primary" />,
    options: [
      { text: "Building or fixing things with tools", stream: "vocational", weight: 4, personalityTrait: ["mechanical", "practical"] },
      { text: "Designing graphics or digital content", stream: "vocational", weight: 4, personalityTrait: ["creative", "visual"] },
      { text: "Working with technology and electronics", stream: "vocational", weight: 4, personalityTrait: ["technical", "analytical"] },
      { text: "Cooking or food preparation", stream: "vocational", weight: 4, personalityTrait: ["creative", "practical"] }
    ]
  },
  {
    id: 3,
    question: "Which scientific field excites you the most?",
    description: "This helps us identify your specific interests in science",
    icon: <FlaskConical className="w-6 h-6 text-primary" />,
    options: [
      { text: "Physics and Engineering", stream: "science", weight: 4, personalityTrait: ["analytical", "problem-solver"] },
      { text: "Biology and Medicine", stream: "science", weight: 4, personalityTrait: ["caring", "detail-oriented"] },
      { text: "Computer Science and Technology", stream: "science", weight: 4, personalityTrait: ["logical", "innovative"] },
      { text: "Environmental Science", stream: "science", weight: 4, personalityTrait: ["environmentally-conscious", "analytical"] }
    ]
  },
  {
    id: 4,
    question: "Which form of creative expression do you enjoy most?",
    description: "This helps us understand your creative preferences",
    icon: <Palette className="w-6 h-6 text-primary" />,
    options: [
      { text: "Writing and literature", stream: "arts", weight: 4, personalityTrait: ["expressive", "imaginative"] },
      { text: "Visual arts and design", stream: "arts", weight: 4, personalityTrait: ["visual", "creative"] },
      { text: "Performing arts (theater, music, dance)", stream: "arts", weight: 4, personalityTrait: ["expressive", "performer"] },
      { text: "Social sciences and psychology", stream: "arts", weight: 4, personalityTrait: ["empathetic", "analytical"] }
    ]
  },
  {
    id: 5,
    question: "Which business area interests you most?",
    description: "This helps us understand your commercial interests",
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    options: [
      { text: "Finance and investment", stream: "commerce", weight: 4, personalityTrait: ["analytical", "number-savvy"] },
      { text: "Marketing and advertising", stream: "commerce", weight: 4, personalityTrait: ["creative", "persuasive"] },
      { text: "Entrepreneurship and startups", stream: "commerce", weight: 4, personalityTrait: ["risk-taker", "innovative"] },
      { text: "International business and trade", stream: "commerce", weight: 4, personalityTrait: ["global-minded", "adaptable"] }
    ]
  },
  {
    id: 6,
    question: "How do you prefer to work?",
    description: "Understanding your work style helps us recommend suitable careers",
    icon: <Users className="w-6 h-6 text-primary" />,
    options: [
      { text: "Independently, with clear goals", stream: "science", weight: 3, personalityTrait: ["independent", "self-motivated"] },
      { text: "In a team, collaborating with others", stream: "arts", weight: 3, personalityTrait: ["collaborative", "sociable"] },
      { text: "In a structured, organized environment", stream: "commerce", weight: 3, personalityTrait: ["organized", "methodical"] },
      { text: "In a dynamic, changing environment", stream: "vocational", weight: 3, personalityTrait: ["adaptable", "flexible"] }
    ]
  },
  {
    id: 7,
    question: "Which of these skills comes most naturally to you?",
    description: "We all have natural strengths - which of these is yours?",
    icon: <Brain className="w-6 h-6 text-primary" />,
    options: [
      { text: "Mathematical and analytical thinking", stream: "science", weight: 4, personalityTrait: ["analytical", "logical"] },
      { text: "Creative thinking and imagination", stream: "arts", weight: 4, personalityTrait: ["creative", "imaginative"] },
      { text: "Communication and persuasion", stream: "commerce", weight: 4, personalityTrait: ["persuasive", "communicative"] },
      { text: "Practical problem-solving", stream: "vocational", weight: 4, personalityTrait: ["practical", "resourceful"] }
    ]
  },
  {
    id: 8,
    question: "What type of work environment do you prefer?",
    description: "This helps us match you with suitable work settings",
    icon: <Building2 className="w-6 h-6 text-primary" />,
    options: [
      { text: "Laboratory or research facility", stream: "science", weight: 3 },
      { text: "Creative studio or workshop", stream: "arts", weight: 3 },
      { text: "Corporate office or business setting", stream: "commerce", weight: 3 },
      { text: "Field work or hands-on environment", stream: "vocational", weight: 3 }
    ]
  },
  {
    id: 9,
    question: "Which of these achievements would make you most proud?",
    description: "This helps us understand what motivates you",
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    options: [
      { text: "Making an important scientific discovery", stream: "science", weight: 5 },
      { text: "Creating a beautiful work of art or literature", stream: "arts", weight: 5 },
      { text: "Building a successful business", stream: "commerce", weight: 5 },
      { text: "Mastering a valuable practical skill", stream: "vocational", weight: 5 }
    ]
  },
  {
    id: 10,
    question: "How do you approach problem-solving?",
    description: "Your problem-solving style can indicate your career strengths",
    icon: <Calculator className="w-6 h-6 text-primary" />,
    options: [
      { text: "I analyze the data and find logical solutions", stream: "science", weight: 4 },
      { text: "I think outside the box for creative solutions", stream: "arts", weight: 4 },
      { text: "I consider the financial and practical implications", stream: "commerce", weight: 4 },
      { text: "I try different approaches until something works", stream: "vocational", weight: 4 }
    ]
  }
];

interface QuizResult {
  stream: string;
  scores: Record<string, number>;
  personalityInsights?: string[];
  timeTaken?: number;
}

interface QuizSectionProps {
  onQuizComplete?: (result: QuizResult) => void;
}

interface UserProfile {
  strengths: Record<string, number>;
  interests: Record<string, number>;
  skillLevel: Record<string, number>;
  personalityTraits: Record<string, number>;
  responses: Array<{
    questionId: number;
    option: QuestionOption;
    timestamp: number;
    timeSpent: number;
  }>;
}

const QuizSection = ({ onQuizComplete }: QuizSectionProps) => {
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [answers, setAnswers] = useLocalStorage<Record<number, {stream: string; traits: string[]; option: QuestionOption}>>('quiz-answers', {});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [progress, setProgress] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    strengths: {},
    interests: {},
    skillLevel: {},
    personalityTraits: {},
    responses: []
  });
  const { toast } = useToast();
  
  // Get current question based on ID
  const currentQuestion = questions.find(q => q.id === currentQuestionId) || questions[0];
  const totalQuestions = Object.keys(questions).length;
  
  // Filter questions based on user profile and previous answers
  const getFilteredQuestions = useCallback(() => {
    return questions.filter(question => {
      // Skip questions that have dependencies not met
      if (question.dependsOn) {
        const answer = answers[question.dependsOn.questionId];
        if (!answer || answer.option.text !== question.dependsOn.answerValue) {
          return false;
        }
      }
      
      // Skip follow-up questions if not triggered
      if (question.isFollowUp) {
        const parentAnswer = Object.values(answers).find(ans => 
          ans.option.followUpQuestionId === question.id
        );
        if (!parentAnswer) return false;
      }
      
      return true;
    });
  }, [answers]);
  
  // Get next question based on user profile and previous answers
  const getNextQuestionId = useCallback((currentId: number, selectedOption?: QuestionOption) => {
    const currentIndex = questions.findIndex(q => q.id === currentId);
    
    // If there's a specific next question from the selected option
    if (selectedOption?.nextQuestionId) {
      return selectedOption.nextQuestionId;
    }
    
    // If there's a follow-up question for this option
    if (selectedOption?.followUpQuestionId) {
      return selectedOption.followUpQuestionId;
    }
    
    // Otherwise, go to next question in sequence
    if (currentIndex < questions.length - 1) {
      return questions[currentIndex + 1].id;
    }
    
    return null; // End of quiz
  }, [answers]);

  // Initialize quiz start time and restore selected option
  useEffect(() => {
    if (!quizStartTime) {
      setQuizStartTime(Date.now());
    }
    
    // Update progress
    const answeredQuestions = Object.keys(answers).length;
    setProgress(Math.round((answeredQuestions / totalQuestions) * 100));
    
    // Restore selected option for current question
    const currentAnswer = answers[currentQuestionId];
    if (currentAnswer) {
      const option = currentQuestion?.options.find(opt => opt.stream === currentAnswer.stream);
      setSelectedOption(option?.text || "");
    } else {
      setSelectedOption("");
    }
  }, [currentQuestionId, answers, quizStartTime, currentQuestion, totalQuestions]);

  const updateUserProfile = useCallback((option: QuestionOption) => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    
    setUserProfile(prev => {
      const newProfile = { ...prev };
      
      // Update responses
      newProfile.responses = [
        ...prev.responses,
        {
          questionId: currentQuestionId,
          option,
          timestamp: Date.now(),
          timeSpent
        }
      ];
      
      // Update personality traits
      if (option.personalityTrait) {
        option.personalityTrait.forEach(trait => {
          newProfile.personalityTraits[trait] = (newProfile.personalityTraits[trait] || 0) + 1;
        });
      }
      
      // Update skill levels
      if (option.skillArea) {
        option.skillArea.forEach(skill => {
          newProfile.skillLevel[skill] = (newProfile.skillLevel[skill] || 0) + (option.weight || 1);
        });
      }
      
      return newProfile;
    });
    
    // Reset question timer
    setQuestionStartTime(Date.now());
  }, [currentQuestionId, questionStartTime]);

  const handleAnswer = (option: QuestionOption) => {
    const answer = {
      stream: option.stream,
      traits: option.personalityTrait || [],
      option: { ...option } // Store the full option for reference
    };
    
    setSelectedOption(option.text);
    setAnswers(prev => ({
      ...prev,
      [currentQuestionId]: answer
    }));
    
    // Update user profile with this response
    updateUserProfile(option);
    
    // Determine next question
    const nextId = getNextQuestionId(currentQuestionId, option);
    
    if (nextId) {
      setCurrentQuestionId(nextId);
    } else {
      // If no next question, show results
      calculateResult();
    }
  };

  const nextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestionId(questions[currentIndex + 1].id);
      setSelectedOption("");
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
    if (currentIndex > 0) {
      setCurrentQuestionId(questions[currentIndex - 1].id);
      const prevAnswer = answers[questions[currentIndex - 1].id];
      setSelectedOption(prevAnswer ? prevAnswer.stream : "");
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = { science: 0, arts: 0, commerce: 0, vocational: 0 };
    const allTraits: string[] = [];
    const skillAreas: Record<string, number> = {};
    
    // Calculate scores and collect personality traits
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.stream === answer.stream);
      
      if (option) {
        // Base score from option weight
        let finalWeight = option.weight;
        
        // Adjust weight based on question difficulty
        if (question?.difficulty === 'hard') finalWeight *= 1.5;
        else if (question?.difficulty === 'easy') finalWeight *= 0.8;
        
        scores[answer.stream] += finalWeight;
        
        // Track personality traits and skills
        if (option.personalityTrait) {
          allTraits.push(...option.personalityTrait);
        }
        
        if (option.skillArea) {
          option.skillArea.forEach(skill => {
            skillAreas[skill] = (skillAreas[skill] || 0) + finalWeight;
          });
        }
      }
    });
    
    // Get top 3 skill areas
    const topSkills = Object.entries(skillAreas)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([skill]) => skill);

    const result = getRecommendedStreamFromScores(scores);
    const personalityInsights = getPersonalityInsights(allTraits);
    const timeTaken = quizStartTime ? Math.round((Date.now() - quizStartTime) / 1000) : 0;
    
    // Get personalized feedback based on responses
    const feedback = generatePersonalizedFeedback({
      scores,
      personalityInsights,
      topSkills,
      responses: Object.values(answers),
      questions
    });
    
    setShowResult(true);
    onQuizComplete?.({
      ...result,
      personalityInsights,
      timeTaken,
      topSkills,
      feedback,
      userProfile: {
        ...userProfile,
        topSkills
      }
    });
    
    toast({
      title: "Quiz Completed! 🎉",
      description: `Your personalized career analysis is ready!`,
      duration: 3000
    });
  };
  
  const generatePersonalizedFeedback = ({
    scores,
    personalityInsights,
    topSkills,
    responses,
    questions
  }: {
    scores: Record<string, number>;
    personalityInsights: string[];
    topSkills: string[];
    responses: Array<{stream: string; traits: string[]; option: QuestionOption}>;
    questions: Question[];
  }) => {
    const feedback: string[] = [];
    
    // Add feedback based on top skills
    if (topSkills.length > 0) {
      feedback.push(`Your top skills are: ${topSkills.join(', ')}.`);
    }
    
    // Add feedback based on personality insights
    if (personalityInsights.length > 0) {
      feedback.push(`Your key strengths include being ${personalityInsights.join(', ')}.`);
    }
    
    // Add feedback based on response patterns
    const responseTimes = responses.map(r => r.option.timeSpent || 0);
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    if (avgResponseTime < 10) {
      feedback.push("You tend to make quick decisions, showing confidence in your choices.");
    } else {
      feedback.push("You take your time to consider options carefully, showing thoughtful consideration.");
    }
    
    // Add stream-specific feedback
    const recommendedStream = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    feedback.push(`Based on your responses, you show strong alignment with the ${recommendedStream} stream.`);
    
    return feedback;
  };
  
  const getPersonalityInsights = (traits: string[]): string[] => {
    const traitCounts = traits.reduce((acc, trait) => {
      acc[trait] = (acc[trait] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const sortedTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => trait);
    
    return sortedTraits;
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
    const allTraits: string[] = [];
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      const option = question?.options.find(opt => opt.stream === answer.stream);
      
      if (option) {
        scores[answer.stream] += option.weight;
        if (option.personalityTrait) {
          allTraits.push(...option.personalityTrait);
        }
      }
    });

    const result = getRecommendedStreamFromScores(scores);
    const streamDetails = streamInfo[result.stream as keyof typeof streamInfo];
    const personalityInsights = getPersonalityInsights(allTraits);

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
                <p className="text-muted-foreground mb-6">{streamDetails.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Your Top Career Matches</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {streamDetails.careers.map((career, index) => (
                      <div key={index} className="bg-card p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="mr-3 p-2 bg-primary/10 rounded-full">
                            {index === 0 && <Briefcase className="h-5 w-5 text-primary" />}
                            {index === 1 && <Laptop className="h-5 w-5 text-primary" />}
                            {index === 2 && <FlaskConical className="h-5 w-5 text-primary" />}
                            {index === 3 && <Palette className="h-5 w-5 text-primary" />}
                          </div>
                          <span className="font-medium">{career}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {personalityInsights.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Your Key Strengths</h3>
                      <div className="flex flex-wrap gap-2">
                        {personalityInsights.map((trait, index) => (
                          <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                            {trait.charAt(0).toUpperCase() + trait.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestionId(1); // Reset to first question
                    setAnswers({});
                    setSelectedOption("");
                    setProgress(0);
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
                Question {questions.findIndex(q => q.id === currentQuestionId) + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3 bg-primary/5 p-4 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-full">
                {currentQuestion.icon || <BookOpen className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
                {currentQuestion.description && (
                  <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestion?.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === option.text ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-4 px-6 transition-all ${selectedOption === option.text ? 'bg-primary/90 hover:bg-primary shadow-md' : 'hover:bg-accent hover:translate-x-1'}`}
                  onClick={() => handleAnswer(option)}
                >
                  <span className="text-left">{option.text}</span>
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={questions.findIndex(q => q.id === currentQuestionId) === 0}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={!selectedOption}
                className="gap-1 bg-gradient-hero hover:opacity-90"
              >
                {questions.findIndex(q => q.id === currentQuestionId) === questions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default QuizSection;