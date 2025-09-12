import asyncHandler from 'express-async-handler';
import QuizResult from '../models/QuizResult.js';
import User from '../models/User.js';

// @desc    Submit quiz answers
// @route   POST /api/quiz/submit
// @access  Private
export const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const userId = req.user._id;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    res.status(400);
    throw new Error('Please provide valid quiz answers');
  }

  // Calculate scores for each stream
  const scores = {
    science: 0,
    arts: 0,
    commerce: 0,
    vocational: 0
  };

  // Process each answer
  const processedAnswers = answers.map(answer => {
    const { questionId, selectedOption } = answer;
    
    // Update score for the selected stream
    if (selectedOption && selectedOption.stream) {
      const stream = selectedOption.stream.toLowerCase();
      const weight = selectedOption.weight || 1;
      
      if (scores.hasOwnProperty(stream)) {
        scores[stream] += weight;
      }
    }

    return {
      questionId,
      selectedOption: {
        stream: selectedOption.stream,
        weight: selectedOption.weight || 1
      }
    };
  });

  // Determine the recommended stream
  let recommendedStream = 'science';
  let maxScore = 0;

  Object.entries(scores).forEach(([stream, score]) => {
    if (score > maxScore) {
      maxScore = score;
      recommendedStream = stream;
    }
  });

  // Generate recommendations based on the stream
  const recommendations = generateRecommendations(recommendedStream);

  // Create quiz result
  const quizResult = await QuizResult.create({
    userId,
    stream: recommendedStream,
    scores,
    answers: processedAnswers,
    recommendations
  });

  // Update user's quiz results
  await User.findByIdAndUpdate(userId, {
    $push: { quizResults: quizResult._id }
  });

  res.status(201).json({
    success: true,
    data: quizResult
  });
});

// @desc    Get user's quiz results
// @route   GET /api/quiz/results
// @access  Private
export const getQuizResults = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const results = await QuizResult.find({ userId })
    .sort({ createdAt: -1 })
    .select('-__v -updatedAt');

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

// @desc    Get a specific quiz result
// @route   GET /api/quiz/results/:id
// @access  Private
export const getQuizResult = asyncHandler(async (req, res) => {
  const result = await QuizResult.findOne({
    _id: req.params.id,
    userId: req.user._id
  }).select('-__v -updatedAt');

  if (!result) {
    res.status(404);
    throw new Error('Quiz result not found');
  }

  res.status(200).json({
    success: true,
    data: result
  });
});

// Helper function to generate recommendations based on stream
const generateRecommendations = (stream) => {
  const recommendations = {
    careers: [],
    nextSteps: [],
    resources: []
  };

  switch (stream) {
    case 'science':
      recommendations.careers = [
        {
          title: 'Engineer',
          description: 'Design and build complex systems and structures',
          educationPath: ['10+2 with PCM', 'JEE Main/Advanced', 'B.Tech/B.E. in chosen field'],
          salaryRange: { min: 500000, max: 2000000, currency: 'INR' }
        },
        {
          title: 'Doctor',
          description: 'Diagnose and treat medical conditions',
          educationPath: ['10+2 with PCB', 'NEET', 'MBBS', 'PG (MD/MS)'],
          salaryRange: { min: 800000, max: 3000000, currency: 'INR' }
        },
        {
          title: 'Data Scientist',
          description: 'Analyze and interpret complex data',
          educationPath: ['10+2 with PCM', 'B.Tech/B.Sc. in CS/IT/Mathematics', 'M.Tech/MS in Data Science'],
          salaryRange: { min: 600000, max: 2500000, currency: 'INR' }
        }
      ];
      recommendations.nextSteps = [
        'Focus on PCM subjects',
        'Prepare for JEE/NEET',
        'Join a coaching institute if needed',
        'Participate in science fairs and Olympiads'
      ];
      recommendations.resources = [
        {
          title: 'NCERT Science Books',
          url: 'https://ncert.nic.in/textbook.php',
          type: 'book'
        },
        {
          title: 'Khan Academy - Science',
          url: 'https://www.khanacademy.org/science',
          type: 'website'
        }
      ];
      break;

    case 'commerce':
      recommendations.careers = [
        {
          title: 'Chartered Accountant',
          description: 'Manage financial accounts and provide financial advice',
          educationPath: ['10+2 with Commerce', 'CA Foundation', 'CA Intermediate', 'CA Final'],
          salaryRange: { min: 600000, max: 2500000, currency: 'INR' }
        },
        {
          title: 'Company Secretary',
          description: 'Ensure company compliance with legal requirements',
          educationPath: ['10+2 with Commerce', 'CS Foundation', 'CS Executive', 'CS Professional'],
          salaryRange: { min: 500000, max: 2000000, currency: 'INR' }
        },
        {
          title: 'Financial Analyst',
          description: 'Analyze financial data and help with investment decisions',
          educationPath: ['10+2 with Commerce/Mathematics', 'B.Com/BBA', 'MBA in Finance'],
          salaryRange: { min: 500000, max: 2200000, currency: 'INR' }
        }
      ];
      recommendations.nextSteps = [
        'Focus on Accountancy and Economics',
        'Start preparing for CA/CS/CMA foundation',
        'Improve mathematical and analytical skills',
        'Stay updated with current business news'
      ];
      recommendations.resources = [
        {
          title: 'ICAI Study Material',
          url: 'https://www.icai.org/',
          type: 'website'
        },
        {
          title: 'Khan Academy - Economics',
          url: 'https://www.khanacademy.org/economics-finance-domain',
          type: 'website'
        }
      ];
      break;

    case 'arts':
      recommendations.careers = [
        {
          title: 'Lawyer',
          description: 'Practice law and represent clients in legal matters',
          educationPath: ['10+2 with any stream', 'CLAT/AILET', 'LLB (5 years)'],
          salaryRange: { min: 400000, max: 2000000, currency: 'INR' }
        },
        {
          title: 'Journalist',
          description: 'Research and report news stories',
          educationPath: ['10+2 with any stream', 'BA in Journalism/Mass Communication', 'MA/Diploma in Journalism'],
          salaryRange: { min: 300000, max: 1500000, currency: 'INR' }
        },
        {
          title: 'Psychologist',
          description: 'Study human behavior and mental processes',
          educationPath: ['10+2 with any stream', 'BA/BSc in Psychology', 'MA/MSc in Psychology', 'M.Phil/PhD'],
          salaryRange: { min: 400000, max: 1800000, currency: 'INR' }
        }
      ];
      recommendations.nextSteps = [
        'Focus on developing communication skills',
        'Read extensively on various subjects',
        'Participate in debates and public speaking events',
        'Consider learning a foreign language'
      ];
      recommendations.resources = [
        {
          title: 'CLAT Official Website',
          url: 'https://consortiumofnlus.ac.in/',
          type: 'website'
        },
        {
          title: 'Coursera - Arts & Humanities',
          url: 'https://www.coursera.org/browse/arts-and-humanities',
          type: 'website'
        }
      ];
      break;

    case 'vocational':
      recommendations.careers = [
        {
          title: 'Chef',
          description: 'Prepare and cook food in restaurants and other eating places',
          educationPath: ['10th/12th', 'Diploma in Culinary Arts', 'Certificate courses in specific cuisines'],
          salaryRange: { min: 300000, max: 1500000, currency: 'INR' }
        },
        {
          title: 'Graphic Designer',
          description: 'Create visual concepts using computer software',
          educationPath: ['10+2 with any stream', 'Diploma/Degree in Graphic Design', 'Certification in design tools'],
          salaryRange: { min: 250000, max: 1200000, currency: 'INR' }
        },
        {
          title: 'Electrician',
          description: 'Install, maintain, and repair electrical systems',
          educationPath: ['10th pass', 'ITI in Electrician', 'NCVT certification'],
          salaryRange: { min: 200000, max: 800000, currency: 'INR' }
        }
      ];
      recommendations.nextSteps = [
        'Identify your area of interest and aptitude',
        'Research vocational training institutes',
        'Look for apprenticeship opportunities',
        'Build a portfolio of your work'
      ];
      recommendations.resources = [
        {
          title: 'National Skill Development Corporation',
          url: 'https://www.nsdcindia.org/',
          type: 'website'
        },
        {
          title: 'Skill India',
          url: 'https://www.skillindia.gov.in/',
          type: 'website'
        }
      ];
      break;
  }

  return recommendations;
};
