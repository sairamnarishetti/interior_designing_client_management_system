const express = require('express');
const router = express.Router();
const {
  createProject,
  getClientProjects,
  getProject,
  updateProject,
  deleteProject,
  getAllProjects
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/auth');

// Client routes
router.post('/', protect, createProject);
router.get('/my-projects', protect, getClientProjects);
router.get('/:id', protect, getProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

// Admin routes
router.get('/', protect, admin, getAllProjects);

module.exports = router; 