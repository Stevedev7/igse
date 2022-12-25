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
exports.setPassword = exports.findAllUsers = exports.findUserById = exports.findUser = exports.deleteUser = exports.saveUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUser = ({ email, password, name, balance, bedrooms, address, propertyType }) => __awaiter(void 0, void 0, void 0, function* () {
    return new user_model_1.default({
        password,
        name,
        email,
        balance,
        bedrooms,
        address,
        propertyType
    });
});
exports.createUser = createUser;
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield user.save(); });
exports.saveUser = saveUser;
const deleteUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findByIdAndDelete(user._id); });
exports.deleteUser = deleteUser;
const findUser = (field, value) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findOne({ [field]: value }).select('+password'); });
exports.findUser = findUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findById(id); });
exports.findUserById = findUserById;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.find({}); });
exports.findAllUsers = findAllUsers;
const setPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user.hashPassword();
});
exports.setPassword = setPassword;
exports.default = {
    createUser: exports.createUser,
    saveUser: exports.saveUser,
    deleteUser: exports.deleteUser,
    findUser: exports.findUser,
    findUserById: exports.findUserById,
    setPassword: exports.setPassword
};
