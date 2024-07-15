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
exports.logout = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = require("../config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const newUser = new user_1.default({ email, password });
        yield newUser.save();
        res.status(201).json({ success: true, data: newUser });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, error: 'User not found' });
        const isMatch = yield user.matchPassword(password);
        if (!isMatch)
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.config.jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ success: true, token });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.status(200).json({ success: true, token: null });
};
exports.logout = logout;
