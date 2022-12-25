"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLoginInput = (user) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(128).email().required(),
        password: joi_1.default.string().min(8).max(2048).required()
    });
    return schema.validate(user);
};
exports.validateLoginInput = validateLoginInput;
exports.default = {
    validateLoginInput: exports.validateLoginInput
};
