const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  patchContact,
  deleteContact
} = require('../controllers/contactController');

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .patch(patchContact)
  .delete(deleteContact);

module.exports = router;
