const Transaction = require('../models/transaction');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.addTransaction = catchAsyncErrors(async (req,res,next) => {
    // console.log("transaction add - ", req.body);

    const addTransaction = await Transaction.create(req.body);
        // console.log("addTransaction - ", addTransaction);

        return res.status(200).json({
            success: true,
            message: "Transaction added successfully"
        });

});

exports.getAllTransaction = catchAsyncErrors(async (req, res, next) => {
    const allTransaction = await Transaction.find();

    res.status(200).json({
        success: true,
        data: allTransaction
    })
});