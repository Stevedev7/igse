"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reading_controller_1 = require("../controllers/reading.controller");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
router.get('/', authenticateToken_1.default, reading_controller_1.readingGetAll);
exports.default = router;
