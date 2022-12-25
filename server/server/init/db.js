"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB = process.env.DB || 'mongodb://localhost:27017/test';
const initDB = () => {
    mongoose_1.default
        .connect(DB)
        .then(() => console.log('Connected to db'))
        .catch((e) => console.log('Cannot connect'));
};
exports.initDB = initDB;
