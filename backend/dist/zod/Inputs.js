"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const languages = ["Cpp", "Java", "Javascript", "Python"];
const formInputSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    codeLanguage: zod_1.default.enum(languages),
    stdin: zod_1.default.string().min(1),
    sourceCode: zod_1.default.string().min(5)
});
exports.default = formInputSchema;
