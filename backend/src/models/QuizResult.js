import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stream: {
    type: String,
    required: true,
    enum: ['science', 'arts', 'commerce', 'vocational']
  },
  scores: {
    type: Map,
    of: Number,
    required: true
  },
  answers: [{
    questionId: {
      type: Number,
      required: true
    },
    selectedOption: {
      stream: String,
      weight: Number
    }
  }],
  completedAt: {
    type: Date,
    default: Date.now
  },
  recommendations: {
    careers: [{
      title: String,
      description: String,
      educationPath: [String],
      salaryRange: {
        min: Number,
        max: Number,
        currency: String
      }
    }],
    nextSteps: [String],
    resources: [{
      title: String,
      url: String,
      type: String // 'book', 'course', 'website', etc.
    }]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster querying
quizResultSchema.index({ userId: 1, completedAt: -1 });

// Virtual for formatted date
quizResultSchema.virtual('formattedDate').get(function() {
  return this.completedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to get user's quiz history
quizResultSchema.statics.findByUserId = async function(userId) {
  return await this.find({ userId })
    .sort({ completedAt: -1 })
    .select('-__v -updatedAt');
};

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;
