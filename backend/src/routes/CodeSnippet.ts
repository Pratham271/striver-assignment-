import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import formInputSchema from "../zod/Inputs";
import base64 from 'base-64';
import utf8 from 'utf8';
import {judgeO} from "../stdout/options";
import zod from 'zod';

const router = Router();
const prisma = new PrismaClient();

type Input = zod.infer<typeof formInputSchema>

enum StatusCode{
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SUCCESS = 200,
    CREATED = 201,
    NOT_AUTHORIZED = 403,
    INVALID_INPUT = 422,
}

enum LangCode{
    Cpp = 54,
    Java = 91,
    Javascript = 63,
    Python = 92
}



router.post('/submit', async(req,res)=> {
    const body:Input = req.body;
    try {
        console.log(body)
        const parsedData = formInputSchema.safeParse(body)
        console.log(parsedData)
        if(!parsedData.success){
            return res.status(StatusCode.INVALID_INPUT).json({
                message: "Wrong Inputs"
            })
        }
        const user = await prisma.assignment.findUnique({
            where: {
                username: body.username
            }
        })
        if(user){
            return res.status(StatusCode.NOT_AUTHORIZED).json({
                message: "Username already exists"
            })
        }
        const code = base64.encode(utf8.encode(body.sourceCode))
        const stdin = base64.encode(utf8.encode(body.stdin))
        const id = body.codeLanguage
        console.log(id)
        let codeId:number;
        switch (id.trim()) {
            case "Cpp":
                codeId = LangCode.Cpp as number;
                break;  
            case "Java":
                codeId = LangCode.Java as number;
                break;
            case "Javascript":
                codeId = LangCode.Javascript as number;
                break;
            case "Python":
                codeId = LangCode.Python as number;
                break;
            default:
                codeId = LangCode.Cpp as number;
                break;
        }
        console.log(codeId)
        const response = await judgeO(codeId,code,stdin)
        const output = base64.decode(utf8.decode(response))

        let limitedCode = "";
        for (let i = 0; i < body.sourceCode.length && limitedCode.length < 100; i++) {
            let char = body.sourceCode[i];
            limitedCode += char;
        }
        await prisma.assignment.create({
            data: {
                username: body.username,
                codeLanguage: body.codeLanguage,
                stdin: body.stdin,
                sourceCode: limitedCode,
                stdout: output
            }
        })
        return res.status(StatusCode.CREATED).json({
            message: "user added the code successfully",
            
        })
    } catch (error) {
        return res.json({errorMessage: error})
    }
})

router.get('/display', async(req,res)=> {
    try {
        
        const allData = await prisma.assignment.findMany({})
        if(!allData || allData.length===0){
            return res.status(StatusCode.NOT_FOUND).json({
                message: "Nothing found"
            })
        }
        return res.status(StatusCode.SUCCESS).json({
            allData
        })
    } catch (error) {
        return res.json({errorMessage: error})
    }
})

export default router
