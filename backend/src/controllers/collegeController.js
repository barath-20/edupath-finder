import asyncHandler from 'express-async-handler';
import College from '../models/College.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
export const getColleges = asyncHandler(async (req, res) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  
  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = College.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await College.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const colleges = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: colleges.length,
    pagination,
    data: colleges
  });
});

// @desc    Get single college
// @route   GET /api/colleges/:id
// @access  Public
export const getCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return next(
      new ErrorResponse(`College not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: college
  });
});

// @desc    Create new college
// @route   POST /api/colleges
// @access  Private/Admin
export const createCollege = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const college = await College.create(req.body);

  res.status(201).json({
    success: true,
    data: college
  });
});

// @desc    Update college
// @route   PUT /api/colleges/:id
// @access  Private/Admin
export const updateCollege = asyncHandler(async (req, res, next) => {
  let college = await College.findById(req.params.id);

  if (!college) {
    return next(
      new ErrorResponse(`College not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this college`,
        401
      )
    );
  }

  college = await College.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: college });
});

// @desc    Delete college
// @route   DELETE /api/colleges/:id
// @access  Private/Admin
export const deleteCollege = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return next(
      new ErrorResponse(`College not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this college`,
        401
      )
    );
  }

  await college.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Get colleges within a radius
// @route   GET /api/colleges/radius/:zipcode/:distance
// @access  Private
export const getCollegesInRadius = asyncHandler(async (req, res) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const colleges = await College.find({
    'location.coordinates': {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(200).json({
    success: true,
    count: colleges.length,
    data: colleges
  });
});

// @desc    Upload photo for college
// @route   PUT /api/colleges/:id/photo
// @access  Private
export const collegePhotoUpload = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return next(
      new ErrorResponse(`College not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this college`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${college._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await College.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
