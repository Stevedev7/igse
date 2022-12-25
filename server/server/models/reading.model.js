"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusType = void 0;
const mongoose_1 = require("mongoose");
var PaymentStatusType;
(function (PaymentStatusType) {
    PaymentStatusType["PENDING"] = "pending";
    PaymentStatusType["PAID"] = "paid";
})(PaymentStatusType || (PaymentStatusType = {}));
exports.PaymentStatusType = PaymentStatusType;
const ReadingSchema = new mongoose_1.Schema({
    customer: {
        _id: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        set: (value) => value.Date.now()
    },
    dayReading: {
        type: Number,
        required: true
    },
    nightReading: {
        type: Number,
        required: true
    },
    gasReading: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: PaymentStatusType.PENDING,
        enum: PaymentStatusType
    }
});
exports.default = (0, mongoose_1.model)('Reading', ReadingSchema);
