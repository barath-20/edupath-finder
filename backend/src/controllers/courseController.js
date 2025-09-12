import asyncHandler from 'express-async-handler';
import College from '../models/College.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get courses
// @route   GET /api/colleges/:collegeId/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.collegeId) {
    const courses = await College.findById(req.params.collegeId).select('courses');
    return res.status(200).json({
      success: true,
      count: courses.courses.length,
      data: courses.courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single course
// @route   GET /api/colleges/:collegeId/courses/:id
// @access  Public
export const getCourse = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(`No college with the id of ${req.params.collegeId}`, 404)
    );
  }

  const course = college.courses.find(
    course => course._id.toString() === req.params.id
  );

  if (!course) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id} in college ${req.params.collegeId}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc    Add course
// @route   POST /api/colleges/:collegeId/courses
// @access  Private/Admin
export const addCourse = asyncHandler(async (req, res, next) => {
  req.body.college = req.params.collegeId;
  req.body.user = req.user.id;

  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(`No college with the id of ${req.params.collegeId}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a course to college ${college._id}`,
        401
      )
    );
  }

  college.courses.push(req.body);
  await college.save();

  res.status(201).json({
    success: true,
    data: college.courses[college.courses.length - 1]
  });
});

// @desc    Update course
// @route   PUT /api/colleges/:collegeId/courses/:id
// @access  Private/Admin
export const updateCourse = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(`No college with the id of ${req.params.collegeId}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update course in college ${college._id}`,
        401
      )
    );
  }

  const courseIndex = college.courses.findIndex(
    course => course._id.toString() === req.params.id
  );

  if (courseIndex === -1) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id} in college ${req.params.collegeId}`,
        404
      )
    );
  }

  // Update the course
  college.courses[courseIndex] = {
    ...college.courses[courseIndex].toObject(),
    ...req.body,
    _id: college.courses[courseIndex]._id
  };

  await college.save();

  res.status(200).json({
    success: true,
    data: college.courses[courseIndex]
  });
});

// @desc    Delete course
// @route   DELETE /api/colleges/:collegeId/courses/:id
// @access  Private/Admin
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const college = await College.findById(req.params.collegeId);

  if (!college) {
    return next(
      new ErrorResponse(`No college with the id of ${req.params.collegeId}`, 404)
    );
  }

  // Make sure user is college owner or admin
  if (college.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete course from college ${college._id}`,
        401
      )
    );
  }

  const courseIndex = college.courses.findIndex(
    course => course._id.toString() === req.params.id
  );

  if (courseIndex === -1) {
    return next(
      new ErrorResponse(
        `No course with the id of ${req.params.id} in college ${req.params.collegeId}`,
        404
      )
    );
  }

  college.courses.splice(courseIndex, 1);
  await college.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});
