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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const Inputs_1 = __importDefault(require("../zod/Inputs"));
const base_64_1 = __importDefault(require("base-64"));
const utf8_1 = __importDefault(require("utf8"));
const options_1 = require("../stdout/options");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["NOT_AUTHORIZED"] = 403] = "NOT_AUTHORIZED";
    StatusCode[StatusCode["INVALID_INPUT"] = 422] = "INVALID_INPUT";
})(StatusCode || (StatusCode = {}));
var LangCode;
(function (LangCode) {
    LangCode[LangCode["Cpp"] = 54] = "Cpp";
    LangCode[LangCode["Java"] = 91] = "Java";
    LangCode[LangCode["Javascript"] = 63] = "Javascript";
    LangCode[LangCode["Python"] = 92] = "Python";
})(LangCode || (LangCode = {}));
router.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        console.log(body);
        const parsedData = Inputs_1.default.safeParse(body);
        console.log(parsedData);
        if (!parsedData.success) {
            return res.status(StatusCode.INVALID_INPUT).json({
                message: "Wrong Inputs"
            });
        }
        const user = yield prisma.assignment.findUnique({
            where: {
                username: body.username
            }
        });
        if (user) {
            return res.status(StatusCode.NOT_AUTHORIZED).json({
                message: "Username already exists"
            });
        }
        const code = base_64_1.default.encode(utf8_1.default.encode(body.sourceCode));
        const stdin = base_64_1.default.encode(utf8_1.default.encode(body.stdin));
        const id = body.codeLanguage;
        console.log(id);
        let codeId;
        switch (id.trim()) {
            case "Cpp":
                codeId = LangCode.Cpp;
                break;
            case "Java":
                codeId = LangCode.Java;
                break;
            case "Javascript":
                codeId = LangCode.Javascript;
                break;
            case "Python":
                codeId = LangCode.Python;
                break;
            default:
                codeId = LangCode.Cpp;
                break;
        }
        console.log(codeId);
        const response = yield (0, options_1.judgeO)(codeId, code, stdin);
        const output = base_64_1.default.decode(utf8_1.default.decode(response));
        console.log("output: ", output);
        let limitedCode = "";
        for (let i = 0; i < body.sourceCode.length && limitedCode.length < 100; i++) {
            let char = body.sourceCode[i];
            limitedCode += char;
        }
        yield prisma.assignment.create({
            data: {
                username: body.username,
                codeLanguage: body.codeLanguage,
                stdin: body.stdin,
                sourceCode: limitedCode,
                stdout: output
            }
        });
        return res.status(StatusCode.CREATED).json({
            message: "user added the code successfully",
        });
    }
    catch (error) {
        return res.json({ errorMessage: error });
    }
}));
router.get('/display', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allData = yield prisma.assignment.findMany({});
        if (!allData || allData.length === 0) {
            return res.status(StatusCode.NOT_FOUND).json({
                message: "Nothing found"
            });
        }
        return res.status(StatusCode.SUCCESS).json({
            allData
        });
    }
    catch (error) {
        return res.json({ errorMessage: error });
    }
}));
exports.default = router;
