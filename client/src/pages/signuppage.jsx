import { InputField } from "../components/input"
import { useState } from "react"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { Spinner } from "../components/spinner.jsx"
import { handleAuthAPIs } from "../redux/slices/userauth.js"
import { useNavigate } from "react-router-dom"

export const SignUpPage = () => {
    const AuthState = useSelector((state) => state.handleauthreducer)
    const navigate = useNavigate()
    const [input_fields, set_input_fields] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch()
    const [isLoading, set_isLoading] = useState(false)

    if (AuthState.isSignUp == true) {
        navigate("/Verify-Email")
    }

    const handleInputChange = (e) => {
        set_input_fields({ ...input_fields, [e.target.name]: e.target.value })
    }

    const handlesignupAPI = () => {
        dispatch(handleAuthAPIs({URL : `${process.env.SERVER_URL}/signup`, reqType : "POST", signupdata : input_fields}))
        set_isLoading(true)
    }
    return (
        <div className="signup-page bg-gradient-to-bl from-rose-600 to-purple-800 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-[30vw] 
            border-2 border-fuchsia-950 rounded-lg min-[320px]:w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw]">
                <h1 className="text-4xl text-white font-bold mt-3 min-[320px]:text-2xl">Create an account</h1>
                <div className="form-content flex flex-col gap-5 m-3">
                    <InputField input_type={"text"} placeholder={"Enter First Name"} field_name={"firstname"} input_value={input_fields.firstname} handleinputchange={handleInputChange} />
                    <InputField input_type={"text"} placeholder={"Enter Last Name"} field_name={"lastname"} input_value={input_fields.lastname} handleinputchange={handleInputChange} />
                    <InputField input_type={"email"} placeholder={"Enter your Email"} field_name={"email"} input_value={input_fields.email} handleinputchange={handleInputChange} />
                    <InputField input_type={"password"} placeholder={"Enter your Password"} field_name={"password"} input_value={input_fields.password} handleinputchange={handleInputChange} />
                </div>
                <div className="password-meter min-[320px]:w-[65vw] md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw]">
                    <PasswordStrengthMeter password={input_fields.password} />
                </div>
                <div className="signup-content">
                    {isLoading ? <button className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] flex justify-center items-center rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]"><Spinner /></button> : <button className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]" onClick={() => handlesignupAPI()}>Sign Up</button>}

                </div>
                <div className="login-link bg-indigo-950 w-[30vw] rounded-b-lg flex justify-center items-center py-2 min-[320px]:w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] min-[320px]:text-[12px]">
                    <p className="text-white">
                        Already have an account? <Link to={"/Login"}> <span className="text-purple-300 hover:cursor-pointer">Login</span></Link>
                    </p>
                </div>
            </div>
        </div>
    )
}