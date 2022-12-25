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
exports.PropertyType = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var PropertyType;
(function (PropertyType) {
    PropertyType["DETACHED"] = "detached";
    PropertyType["SEMI_DETACHED"] = "semi-detached";
    PropertyType["TERRACED"] = "terraced";
    PropertyType["FLAT"] = "flat";
    PropertyType["COTTAGE"] = "cottage";
    PropertyType["BUNGALOW"] = "bungalow";
    PropertyType["MANSION"] = "mansion";
})(PropertyType || (PropertyType = {}));
exports.PropertyType = PropertyType;
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128,
        unique: true
    },
    name: {
        firstName: {
            required: true,
            minlength: 3,
            maxlength: 50,
            type: String
        },
        middleName: {
            minlength: 3,
            maxlength: 50,
            type: String
        },
        lastName: {
            minlength: 3,
            maxlength: 50,
            type: String
        }
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 2048,
        required: true,
        select: false
    },
    propertyType: {
        type: String,
        required: true,
        enum: PropertyType
    },
    address: {
        firstLine: {
            type: String,
            required: true
        },
        secondLine: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        postCode: {
            type: String,
            required: true
        }
    },
    balance: {
        type: Number,
        default: 0
    },
    bedrooms: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
UserSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
UserSchema.methods.hashPassword = function () {
    return new Promise((resolve, reject) => {
        bcryptjs_1.default.genSalt(10, (err, salt) => {
            if (err) {
                return reject(err);
            }
            bcryptjs_1.default.hash(this.password, salt, (error, hash) => {
                if (err) {
                    return reject(error);
                }
                this.password = hash;
                return resolve(hash);
            });
        });
    });
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
