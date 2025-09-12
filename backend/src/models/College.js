import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    maxlength: [200, 'College name cannot be more than 200 characters']
  },
  location: {
    address: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      default: 'India',
      trim: true
    },
    pincode: {
      type: String,
      trim: true
    },
    coordinates: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      }
    }
  },
  type: {
    type: String,
    enum: ['Government', 'Private', 'Deemed University', 'Central University', 'State University', 'IIT', 'NIT', 'IIIT', 'IIM', 'AIIMS', 'Other'],
    required: true
  },
  established: {
    type: Number,
    min: [1800, 'Establishment year seems incorrect'],
    max: [new Date().getFullYear(), 'Establishment year cannot be in the future']
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    set: (val) => Math.round(val * 10) / 10 // Round to 1 decimal
  },
  courses: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      enum: ['Certificate', 'Diploma', 'UG', 'PG', 'Doctorate', 'Post-Doctoral'],
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    stream: {
      type: [String],
      enum: ['Science', 'Arts', 'Commerce', 'Engineering', 'Medical', 'Law', 'Management', 'Vocational', 'Other'],
      required: true
    },
    fees: {
      type: {
        amount: {
          type: Number,
          required: true
        },
        currency: {
          type: String,
          default: 'INR'
        },
        period: {
          type: String,
          enum: ['per year', 'per semester', 'total'],
          default: 'per year'
        }
      },
      required: true
    },
    entranceExam: [String]
  }],
  contact: {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
      youtube: String
    }
  },
  facilities: [{
    type: String,
    enum: [
      'Library', 'Hostel', 'Cafeteria', 'Sports', 'Gym', 'Auditorium', 
      'Medical', 'Labs', 'Wi-Fi', 'Transportation', 'Bank', 'Post Office',
      'Guest House', 'Conference Hall', 'Computer Center', 'Placement Cell'
    ]
  }],
  accreditation: [{
    name: {
      type: String,
      required: true,
      enum: ['NAAC', 'NBA', 'AICTE', 'UGC', 'MCI', 'PCI', 'NCTE', 'COA', 'BCI', 'AIMA', 'Other']
    },
    grade: String,
    validUntil: Date
  }],
  images: [{
    url: String,
    caption: String,
    isFeatured: {
      type: Boolean,
      default: false
    }
  }],
  description: {
    type: String,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  admissionProcess: {
    type: String,
    maxlength: [1000, 'Admission process cannot be more than 1000 characters']
  },
  placement: {
    averagePackage: {
      amount: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    highestPackage: {
      amount: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    topRecruiters: [String],
    placementPercentage: Number
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for faster querying
collegeSchema.index({ name: 'text', 'location.city': 'text', 'location.state': 'text' });
collegeSchema.index({ rating: -1 });

// Virtual for getting the full address
collegeSchema.virtual('fullAddress').get(function() {
  return `${this.location.address}, ${this.location.city}, ${this.location.state} ${this.location.pincode}, ${this.location.country}`.trim();
});

// Static method to search colleges
collegeSchema.statics.search = async function(query, filters = {}) {
  const { location, stream, course, minRating, maxFees } = filters;
  
  const searchQuery = {};
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  if (location) {
    searchQuery['location.city'] = new RegExp(location, 'i');
  }
  
  if (stream) {
    searchQuery['courses.stream'] = { $in: [new RegExp(stream, 'i')] };
  }
  
  if (course) {
    searchQuery['courses.name'] = new RegExp(course, 'i');
  }
  
  if (minRating) {
    searchQuery.rating = { $gte: parseFloat(minRating) };
  }
  
  // Note: Fee filtering would require more complex logic based on the fee structure
  
  return await this.find(searchQuery)
    .select('-__v -updatedAt -createdAt')
    .sort({ rating: -1, name: 1 });
};

const College = mongoose.model('College', collegeSchema);

export default College;
