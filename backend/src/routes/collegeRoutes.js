import express from 'express';
import {
  getColleges,
  getCollege,
  createCollege,
  updateCollege,
  deleteCollege,
  getCollegesInRadius,
  collegePhotoUpload
} from '../controllers/collegeController.js';

// Include other resource routers
import courseRouter from './courseRoutes.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:collegeId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getCollegesInRadius);

router
  .route('/')
  .get(getColleges)
  .post(createCollege);

router
  .route('/:id')
  .get(getCollege)
  .put(updateCollege)
  .delete(deleteCollege);

router.route('/:id/photo').put(collegePhotoUpload);

export default router;
