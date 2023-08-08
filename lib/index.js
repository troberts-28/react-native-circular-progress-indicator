"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularProgressWithChild = exports.CircularProgressBase = void 0;
const circularProgress_1 = __importDefault(require("./circularProgress"));
const circularProgressBase_1 = __importDefault(require("./circularProgressBase"));
exports.CircularProgressBase = circularProgressBase_1.default;
exports.CircularProgressWithChild = circularProgressBase_1.default;
exports.default = circularProgress_1.default;
