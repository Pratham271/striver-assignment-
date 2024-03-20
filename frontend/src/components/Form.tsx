// import { SetStateAction, useState } from "react"
import axios from "axios"
import Button from "./Button"
import Input from "./Input"
import Options from "./Options"
import Textarea from "./Textarea"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"




const Form = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username:"",
            options:"",
            code:"",
            stdin:""
        },
        // validationSchema: formSchema,
        onSubmit: values => {

          
            axios.post("https://striver-assignment.onrender.com/api/v1/assignment/striver/submit",
             JSON.stringify({
                username: values.username,
                codeLanguage: values.options,
                stdin: values.stdin,
                sourceCode: values.code
            }),
            {
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            .then((response)=> {
                if(response.status===201){
                    navigate("/display")
                }
                else{
                    console.log(response)
                }
            })
            .catch((e)=> {
                console.log(e.message)
            })
            
        }
    })
    
  return (
    <>
        <form className="max-w-sm mx-auto pt-4 md:max-w-md lg:max-w-xl" onSubmit={formik.handleSubmit}>
            <Input label={formik.errors.username?formik.errors.username:"username"} placeholder={"John Doe"} onChange={formik.handleChange} id="username"/>
            <Options label={formik.errors.options?formik.errors.options:"Code Language"} onChange={formik.handleChange} id="options" value={formik.values.options}/>
            <Textarea label={formik.errors.code?formik.errors.code:"Code"} placeholder={"Write your code..."} onChange={formik.handleChange} id="code"/>
            <Input label={formik.errors.stdin?formik.errors.stdin:"Sdtin"} placeholder={"Input Params"} onChange={formik.handleChange} id="stdin"/>
            <Button label={"Submit"}/>
        </form>
    </>
  )
}

export default Form
