const express = require('express');
const router = express.Router();
const { getLeads, createLead } = require('../controllers/leadController');

router.route('/')
  .get(getLeads)
  .post(createLead);

module.exports = router;
