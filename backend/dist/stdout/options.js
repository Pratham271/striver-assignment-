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
exports.judgeO = void 0;
const axios_1 = __importDefault(require("axios"));
const judgeO = (id, code, input) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            await: true,
            fields: '*'
        },
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: id,
            source_code: code,
            stdin: input,
        }
    };
    try {
        const response = yield axios_1.default.request(options);
        console.log(response);
        return response.data.stdout;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.judgeO = judgeO;
// const options = {
//     method: 'GET',
//     url: 'https://judge0-ce.p.rapidapi.com/languages/52',
//     headers: {
//       'X-RapidAPI-Key': '16debb2bccmshdb6b12a196f6591p1348cbjsn572115f71826',
//       'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//     }
//   };
//   export default options
