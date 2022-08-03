const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { addTransaction, getAllTransaction } = require('../controller/transactionController');

router.route('/addTransaction').post(addTransaction);
router.route('/allTransaction').get(getAllTransaction);

module.exports = router;