const express = require('express');
const router = express.Router();
const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  addNote,
  updateStatus,
  updateLastContact
} = require('../controllers/clientController');
const { protect, admin } = require('../middleware/auth');

// All routes are protected and require admin role
router.use(protect, admin);

// Main CRUD routes
router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

// Additional functionality routes
router.post('/:id/notes', addNote);
router.patch('/:id/status', updateStatus);
router.patch('/:id/contact', updateLastContact);

module.exports = router;