import multer from 'multer';
import path from 'path';
import ErrorResponse from '../utils/errorResponse.js';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_UPLOAD_PATH || `${process.cwd()}/uploads`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new ErrorResponse(
        'Error: Images Only! Please upload an image file (jpeg, jpg, png, gif)',
        400
      ),
      false
    );
  }
};

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: process.env.MAX_FILE_UPLOAD || 1000000 }, // 1MB default
  fileFilter
}).single('file');

// Wrapper middleware to handle errors
export const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return next(
        new ErrorResponse(
          `File upload error: ${err.message}`,
          400
        )
      );
    } else if (err) {
      // An unknown error occurred
      return next(err);
    }
    // Everything went fine
    next();
  });
};
