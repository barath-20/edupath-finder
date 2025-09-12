import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  submitQuiz,
  getQuizResults,
  getQuizResult
} from '../controllers/quizController.js';

const router = express.Router();

// Protect all routes with authentication
router.use(protect);

// Submit quiz answers
router.post('/submit', submitQuiz);

// Get all quiz results for the logged-in user
router.get('/results', getQuizResults);

// Get a specific quiz result by ID
router.get('/results/:id', getQuizResult);

export default router;
