import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Check, 
  BookOpen, 
  GraduationCap, 
  Briefcase,
  School,
  FlaskConical,
  Stethoscope,
  LineChart,
  Palette,
  Music,
  Film,
  DollarSign,
  Calculator,
  BookCheck,
  BookText,
  Building2
} from 'lucide-react';

type CareerStage = {
  id: number;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  color: string;
};

type CareerPath = {
  id: string;
  title: string;
  stages: CareerStage[];
};

const careerPaths: CareerPath[] = [
  {
    id: 'engineering',
    title: 'Engineering',
    stages: [
      {
        id: 1,
        title: 'High School (10+2)',
        description: 'Focus on Physics, Chemistry, and Mathematics',
        duration: '2 years',
        icon: <BookOpen className="h-5 w-5" />,
        color: 'bg-blue-500'
      },
      {
        id: 2,
        title: 'Entrance Exams',
        description: 'JEE Main, JEE Advanced, State CETs',
        duration: '1-2 years',
        icon: <BookCheck className="h-5 w-5" />,
        color: 'bg-blue-600'
      },
      {
        id: 3,
        title: 'Bachelor\'s Degree',
        description: 'B.Tech/B.E. in chosen specialization',
        duration: '4 years',
        icon: <GraduationCap className="h-5 w-5" />,
        color: 'bg-blue-700'
      },
      {
        id: 4,
        title: 'Internships',
        description: 'Gain practical experience in the field',
        duration: '6-12 months',
        icon: <Briefcase className="h-5 w-5" />,
        color: 'bg-blue-800'
      },
      {
        id: 5,
        title: 'Job/GATE',
        description: 'Campus placements or prepare for GATE',
        duration: 'Varies',
        icon: <Building2 className="h-5 w-5" />,
        color: 'bg-blue-900'
      },
      {
        id: 6,
        title: 'Higher Education',
        description: 'M.Tech/MS from IITs/NITs/IIITs or abroad',
        duration: '2 years',
        icon: <School className="h-5 w-5" />,
        color: 'bg-indigo-800'
      },
      {
        id: 7,
        title: 'Specialization',
        description: 'PhD or Industry Specialization',
        duration: '3-5 years',
        icon: <FlaskConical className="h-5 w-5" />,
        color: 'bg-indigo-900'
      }
    ]
  },
  {
    id: 'medical',
    title: 'Medical',
    stages: [
      {
        id: 1,
        title: '10+2 with PCB',
        description: 'Focus on Physics, Chemistry, and Biology',
        duration: '2 years',
        icon: <BookOpen className="h-5 w-5" />,
        color: 'bg-red-500'
      },
      {
        id: 2,
        title: 'NEET Exam',
        description: 'National Eligibility cum Entrance Test',
        duration: '1-2 years',
        icon: <BookCheck className="h-5 w-5" />,
        color: 'bg-red-600'
      },
      {
        id: 3,
        title: 'MBBS',
        description: 'Bachelor of Medicine and Bachelor of Surgery',
        duration: '5.5 years',
        icon: <Stethoscope className="h-5 w-5" />,
        color: 'bg-red-700'
      },
      {
        id: 4,
        title: 'Internship',
        description: 'Compulsory Rotating Medical Internship',
        duration: '1 year',
        icon: <Briefcase className="h-5 w-5" />,
        color: 'bg-red-800'
      },
      {
        id: 5,
        title: 'NEET PG/FMGE',
        description: 'Postgraduate entrance or Foreign Medical Graduate Exam',
        duration: '1-2 years',
        icon: <BookCheck className="h-5 w-5" />,
        color: 'bg-red-900'
      },
      {
        id: 6,
        title: 'MD/MS',
        description: 'Postgraduate medical degree',
        duration: '3 years',
        icon: <Stethoscope className="h-5 w-5" />,
        color: 'bg-pink-700'
      },
      {
        id: 7,
        title: 'Super Specialization',
        description: 'DM/MCh in super specializations',
        duration: '3 years',
        icon: <Stethoscope className="h-5 w-5" />,
        color: 'bg-pink-800'
      }
    ]
  },
  {
    id: 'commerce',
    title: 'Commerce Career Path',
    stages: [
      {
        id: 1,
        title: '10+2 Commerce',
        description: 'Focus on Accountancy, Business Studies, Economics',
        duration: '2 years',
        icon: <LineChart className="h-5 w-5" />,
        color: 'bg-green-500'
      },
      {
        id: 2,
        title: 'Entrance Exams',
        description: 'CUET, IPMAT, SET, etc.',
        duration: '1 year',
        icon: <BookCheck className="h-5 w-5" />,
        color: 'bg-green-600'
      },
      {
        id: 3,
        title: 'Undergraduate Degree',
        description: 'B.Com, BBA, BMS, BBA-LLB',
        duration: '3-5 years',
        icon: <GraduationCap className="h-5 w-5" />,
        color: 'bg-green-700'
      },
      {
        id: 4,
        title: 'Professional Courses',
        description: 'CA, CS, CMA, CFA',
        duration: '3-5 years',
        icon: <BookText className="h-5 w-5" />,
        color: 'bg-green-800'
      },
      {
        id: 5,
        title: 'Post Graduation',
        description: 'MBA, M.Com, LLM',
        duration: '2 years',
        icon: <School className="h-5 w-5" />,
        color: 'bg-emerald-700'
      },
      {
        id: 6,
        title: 'Certifications',
        description: 'FRM, CPA, ACCA, etc.',
        duration: '6 months - 2 years',
        icon: <BookCheck className="h-5 w-5" />,
        color: 'bg-emerald-800'
      },
      {
        id: 7,
        title: 'Industry Experience',
        description: 'Build expertise in chosen field',
        duration: 'Ongoing',
        icon: <Briefcase className="h-5 w-5" />,
        color: 'bg-emerald-900'
      }
    ]
  }
];

interface CareerPathVisualizerProps {
  defaultPath?: string;
}

const pathStyles = {
  engineering: {
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    border: 'border-blue-200',
    hover: 'hover:border-blue-300 hover:bg-blue-50',
    text: 'text-blue-700',
    cardBg: 'bg-blue-50',
    active: 'bg-blue-100 text-blue-700',
    progress: 'bg-blue-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  medicine: {
    gradient: 'bg-gradient-to-r from-rose-600 to-pink-600',
    border: 'border-rose-200',
    hover: 'hover:border-rose-300 hover:bg-rose-50',
    text: 'text-rose-700',
    cardBg: 'bg-rose-50',
    active: 'bg-rose-100 text-rose-700',
    progress: 'bg-rose-600',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  business: {
    gradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    border: 'border-emerald-200',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50',
    text: 'text-emerald-700',
    cardBg: 'bg-emerald-50',
    active: 'bg-emerald-100 text-emerald-700',
    progress: 'bg-emerald-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  arts: {
    gradient: 'bg-gradient-to-r from-violet-600 to-purple-600',
    border: 'border-violet-200',
    hover: 'hover:border-violet-300 hover:bg-violet-50',
    text: 'text-violet-700',
    cardBg: 'bg-violet-50',
    active: 'bg-violet-100 text-violet-700',
    progress: 'bg-violet-600',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600'
  },
  science: {
    gradient: 'bg-gradient-to-r from-amber-600 to-orange-600',
    border: 'border-amber-200',
    hover: 'hover:border-amber-300 hover:bg-amber-50',
    text: 'text-amber-700',
    cardBg: 'bg-amber-50',
    active: 'bg-amber-100 text-amber-700',
    progress: 'bg-amber-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  }
};

const CareerPathVisualizer: React.FC<CareerPathVisualizerProps> = ({ defaultPath = 'engineering' }) => {
  const [selectedPath, setSelectedPath] = useState<string>(defaultPath);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const currentPath = careerPaths.find(path => path.id === selectedPath) || careerPaths[0];
  const totalStages = currentPath?.stages?.length || 0;
  const currentStage = currentPath?.stages?.[currentStageIndex];
  const currentStageId = currentStage?.id || '';

  const nextStage = () => {
    if (currentStageIndex < totalStages - 1) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const prevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };

  const selectPath = (pathId: string) => {
    setSelectedPath(pathId);
    setCurrentStageIndex(0);
  };

  const currentStyle = pathStyles[selectedPath as keyof typeof pathStyles] || pathStyles.engineering;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          Your Career Roadmap
        </h1>
        <p className="text-muted-foreground">Navigate your path to success</p>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8 mb-4">
        {careerPaths.map((path) => (
          <motion.button
            key={path.id}
            onClick={() => selectPath(path.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'px-5 py-2 rounded-lg text-sm font-medium transition-all',
              'shadow-sm border',
              selectedPath === path.id
                ? `${currentStyle.text} bg-white border-${currentStyle.text.split('-')[1]}-200`
                : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
            )}
          >
            {path.title}
          </motion.button>
        ))}
      </div>

      {/* Roadmap Container */}
      <div className="relative min-h-[500px] py-6">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-2xl -mx-4" />
        
        {/* Main Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-500 -translate-x-1/2" />
        
        {/* Stages */}
        <div className="relative">
          {currentPath.stages.map((stage, index) => {
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;
            const isUpcoming = index > currentStageIndex;
            const position = index % 2 === 0 ? 'left' : 'right';
            const delay = index * 0.1;
            
            return (
              <motion.div 
                key={stage.id}
                className={cn(
                  'relative mb-12 flex items-center',
                  position === 'left' ? 'justify-start' : 'justify-end',
                  'px-4 md:px-6',
                  'group' // Add group for hover effects
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20">
                  <motion.div 
                    className={cn(
                      'w-5 h-5 rounded-full border-2 border-white',
                      'transition-all duration-300',
                      isCompleted 
                        ? 'bg-green-500 scale-110' 
                        : isActive 
                          ? 'bg-blue-600 scale-125 ring-2 ring-offset-2 ring-blue-300' 
                          : 'bg-white border-gray-300',
                      'group-hover:scale-125 group-hover:shadow-md',
                      'shadow-md',
                      isActive && 'ring-blue-200 ring-opacity-70',
                      'flex items-center justify-center'
                    )}
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                
                {/* Content Card */}
                <motion.div 
                  className={cn(
                    'w-full max-w-[280px] p-4 rounded-xl shadow-sm border',
                    'relative z-10',
                    'backdrop-blur-sm bg-white/95',
                    'transition-all duration-200',
                    isActive 
                      ? 'scale-[1.02] shadow-md border-2 border-opacity-60' 
                      : 'scale-100 border-gray-100 hover:shadow-sm hover:border-opacity-40',
                    'transform-gpu',
                    'overflow-hidden',
                    position === 'left' ? 'mr-[calc(50%+24px)]' : 'ml-[calc(50%+24px)]',
                    isCompleted ? 'border-green-200' : isActive ? 'border-blue-200' : 'border-gray-100',
                    isActive ? 'ring-1 ring-opacity-20 ring-blue-400' : '',
                    'mt-6' // Add margin to separate from the dot
                  )}
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Decorative Accent */}
                  <div 
                    className={cn(
                      'absolute top-0 bottom-0 w-1',
                      isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300',
                      position === 'left' ? 'right-0' : 'left-0'
                    )}
                  />
                  
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white',
                      isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 
                      isActive ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 
                      'bg-gradient-to-br from-gray-400 to-gray-500',
                      'shadow-md',
                      'transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                      isActive && 'ring-2 ring-offset-2 ring-blue-300 ring-opacity-50'
                    )}>
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        React.cloneElement(stage.icon as React.ReactElement, { 
                          className: 'h-5 w-5',
                          strokeWidth: 1.5
                        })
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className={cn(
                          'font-semibold text-lg',
                          isActive ? 'text-blue-700' : 'text-gray-800'
                        )}>
                          {stage.title}
                        </h3>
                        {isCompleted && (
                          <Check className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{stage.description}</p>
                      
                      <div className="flex items-center text-xs mt-1 space-x-2">
                        <p className={cn(
                          'text-xs mt-0.5',
                          isActive ? 'text-gray-600' : 'text-gray-500',
                          isCompleted && 'text-gray-400'
                        )} />
                        <span className={isActive ? 'text-blue-700 font-medium' : 'text-gray-600'}>{stage.duration}</span>
                        
                        {isActive && (
                          <motion.span 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="ml-3 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-xs font-medium border border-blue-100"
                          >
                            {currentStageIndex > 0 && (
                              <span>Current Stage</span>
                            )}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Connector Line */}
                {index < currentPath.stages.length - 1 && (
                  <div className={cn(
                    'absolute left-1/2 w-0.5 h-16 -bottom-16 -translate-x-1/2',
                    'transition-all duration-300',
                    isCompleted 
                      ? 'bg-gradient-to-b from-green-400 to-green-200' 
                      : 'bg-gradient-to-b from-gray-200 to-gray-100',
                    'group-hover:from-blue-300 group-hover:to-blue-100',
                    isActive && 'from-blue-300 to-blue-100',
                    'z-5' // Lower z-index to be behind the dots
                  )} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Stage Details */}
      <div className="px-6">
        <AnimatePresence mode="wait">
          {currentStage && (
            <motion.div
              key={`detail-${currentStageId}`}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mx-auto"
            >
              <Card className={cn(
                "relative overflow-hidden border-0 shadow-2xl backdrop-blur-lg max-w-3xl mx-auto w-full",
                "bg-white/90 border border-gray-200 dark:bg-gray-800/90 dark:border-gray-700",
                "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <motion.div 
                      className="p-4 rounded-2xl bg-white/20 backdrop-blur-md w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center shadow-lg"
                      initial={{ scale: 0.9, opacity: 0, rotate: -5 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1, 
                        rotate: 0,
                        boxShadow: '0 10px 25px -5px rgba(255,255,255,0.1)'
                      }}
                      transition={{ 
                        delay: 0.2, 
                        type: 'spring', 
                        stiffness: 500,
                        damping: 15
                      }}
                    >
                      {currentStage?.icon && React.cloneElement(currentStage.icon as React.ReactElement, {
                        className: "h-8 w-8 sm:h-10 sm:w-10 text-white"
                      })}
                    </motion.div>
                    
                    <div className="flex-1 min-w-0 space-y-5">
                      <div className="space-y-16 md:space-y-24">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                          {currentStage?.title || 'Stage Title'}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl">
                          {currentStage?.description || 'Stage description not available'}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800 transition-colors">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{currentStage?.duration || 'Duration not specified'}</span>
                        </div>
                                                <div className="flex flex-col w-full gap-2">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Progress
                              </span>
                              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {currentStageIndex + 1} of {totalStages} stages
                              </span>
                            </div>
                            <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full w-full overflow-hidden border border-gray-200 dark:border-gray-600">
                              <motion.div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-inner"
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: `${((currentStageIndex + 1) / totalStages) * 100}%`
                                }}
                                transition={{ 
                                  duration: 0.8,
                                  ease: [0.16, 1, 0.3, 1]
                                }}
                              />
                            </div>
                          </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-3">
                        <Button 
                          variant="outline"
                          size="lg"
                          onClick={prevStage}
                          disabled={currentStageIndex === 0}
                          className={cn(
                            "gap-2 px-6 py-3 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600",
                            "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700",
                            "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                            "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
                            currentStageIndex === 0 
                              ? 'opacity-50 cursor-not-allowed hover:bg-white dark:hover:bg-gray-800' 
                              : 'hover:border-blue-400 dark:hover:border-blue-500'
                          )}
                        >
                          <ChevronLeft className="h-5 w-5" />
                          <span className="font-medium">Previous</span>
                        </Button>
                        
                        <Button 
                          variant="default"
                          size="lg"
                          onClick={nextStage}
                          disabled={currentStageIndex === totalStages - 1}
                          className={cn(
                            "gap-2 px-6 py-3 font-medium text-white tracking-wide",
                            "transition-all duration-200 hover:-translate-y-0.5",
                            "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none",
                            currentStageIndex === totalStages - 1 
                              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-md',
                            'flex items-center'
                          )}
                        >
                          {currentStageIndex < totalStages - 1 ? (
                            <span>Next Stage</span>
                          ) : (
                            <span>Complete Journey</span>
                          )}
                          {currentStageIndex < totalStages - 1 && (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CareerPathVisualizer;
