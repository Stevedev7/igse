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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.postUser = void 0;
const user_service_1 = require("../services/user.service");
const postUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email, balance, bedrooms, address, propertyType } = req.body;
        const user = yield (0, user_service_1.findUser)('email', email);
        if (user == null) {
            const newUser = yield (0, user_service_1.createUser)({
                name,
                password,
                email,
                balance,
                bedrooms,
                address,
                propertyType
            });
            yield (0, user_service_1.setPassword)(newUser);
            yield (0, user_service_1.saveUser)(newUser);
            res.json(newUser);
            return next();
        }
        throw new Error('User Exists');
    }
    catch ({ message }) {
        res.status(400).json({
            error: message
        });
    }
});
exports.postUser = postUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, user_service_1.findAllUsers)();
        res.json(allUsers);
    }
    catch (err) {
        res.json(err);
        console.log(err);
    }
});
exports.getUsers = getUsers;
exports.default = {
    postUser: exports.postUser,
    getUsers: exports.getUsers
};
