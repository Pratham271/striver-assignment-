"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CodeSnippet_1 = __importDefault(require("./routes/CodeSnippet"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
(0, dotenv_1.configDotenv)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/assignment/striver', CodeSnippet_1.default);
app.listen(3000, () => {
    console.log("Listening to port 3000");
});
