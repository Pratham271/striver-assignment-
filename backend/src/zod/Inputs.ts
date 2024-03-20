import zod from "zod";

const languages = ["Cpp", "Java", "Javascript", "Python"] as const;

const formInputSchema = zod.object({
    username: zod.string().min(3),
    codeLanguage: zod.enum(languages),
    stdin: zod.string().min(1),
    sourceCode: zod.string().min(5)
})

export default formInputSchema;