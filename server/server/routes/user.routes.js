"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const reading_routes_1 = __importDefault(require("./reading.routes"));
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.postUser);
router.post('/login', auth_controller_1.loginUser);
router.get('/', user_controller_1.getUsers);
router.post('/logout', auth_controller_1.logoutUser);
router.use('/reading', reading_routes_1.default);
exports.default = router;
