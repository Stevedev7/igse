"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const user_service_1 = require("../services/user.service");
const user_validation_1 = require("../validations/user.validation");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = (0, user_validation_1.validateLoginInput)({ email, password });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const user = yield (0, user_service_1.findUser)('email', email);
    if (user == null) {
        return res.status(404).json({ error: 'Username not found' });
    }
    const match = yield user.comparePassword(password);
    if (!match) {
        return res.status(403).json({ error: 'Wrong Password' });
    }
    const accessToken = jsonwebtoken_1.default.sign({
        email
    }, process.env.ACCESS_TOKEN_SECRET);
    const payload = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.json({
        message: 'Logged in',
        accessToken,
        payload
    });
});
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Logout Route');
});
exports.logoutUser = logoutUser;
exports.default = {
    loginUser: exports.loginUser,
    logoutUser: exports.logoutUser
};
