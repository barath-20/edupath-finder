import axios from 'axios';
import { ErrorResponse } from '../utils/errorResponse.js';

const GEMINI_API_KEY = "AIzaSyArxJ1eKIyn1Ps-MPZ6bupuJUavft_-CBw";
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const ROLE_PROMPT = `
You are CareerBot, a smart and friendly AI-powered Career & Education Advisor for Indian students in Class 10th and 12th. 
Your role is to guide students, parents, and educators by:
- Suggesting suitable streams (Science, Commerce, Arts, Vocational) after Class 10.
- Explaining career pathways and higher education options after Class 12.
- Mapping degree courses (B.Sc., B.Com., B.A., BBA, etc.) to potential jobs, government exams, and future prospects.
- Recommending skill development, certifications, and scholarships for students.
- Providing clear, short, and student-friendly answers.
- Supporting multi-language queries (but default to English if not specified).
- Avoiding generic 'Google it' type answers — always provide contextual, practical guidance.
- If unsure, give a helpful direction (e.g., "You can check the government's scholarship portal at …") instead of refusing.

Tone: Be supportive, motivating, and practical — like a career counselor who understands student confusion. 
Keep answers concise but informative (2–5 sentences max).
`;

export const chatWithBot = async (req, res, next) => {
  try {
    const { message, language = 'en' } = req.body;

    if (!message) {
      return next(new ErrorResponse('Message is required', 400));
    }

    const langMap = {
      en: 'English',
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu',
      bn: 'Bengali',
      mr: 'Marathi',
      gu: 'Gujarati',
      kn: 'Kannada',
      ml: 'Malayalam',
      pa: 'Punjabi',
      ur: 'Urdu',
      or: 'Odia',
      as: 'Assamese'
    };

    const langName = langMap[language] || language;
    const langInstruction = language !== 'en' 
      ? `\nPlease answer only in ${langName}. Do not use English words. If you know the script, use it.` 
      : '';

    const prompt = `${ROLE_PROMPT}${langInstruction}\nUser: ${message}\nCareerBot:`;

    try {
      let answer;
      try {
        const response = await axios.post(GEMINI_API_URL, {
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000 // 10 seconds timeout
        });

        answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
          "I'm sorry, I couldn't process your request. Please try again.";
      } catch (apiError) {
        console.error('Gemini API error:', apiError);
        // Fallback response when Gemini API is not available
        answer = "I'm currently having trouble connecting to the AI service. Here are some general tips:\n\n" +
          "1. For career guidance, consider taking our career assessment quiz.\n" +
          "2. Explore our college finder to discover institutions that match your interests.\n" +
          "3. Check back later when the AI service is available for personalized advice.";
      }

      res.status(200).json({
        success: true,
        answer: answer.trim()
      });

    } catch (error) {
      console.error('Chat error:', error);
      // Provide a helpful response even when there's an error
      res.status(200).json({
        success: true,
        answer: "I'm having trouble processing your request right now. Please try again later or contact support if the issue persists."
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    next(new ErrorResponse('Error processing your request', 500));
  }
};
