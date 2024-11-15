import { useState } from "react"
import { InputField } from "../components/input"
import { Link } from "react-router-dom"
import { handleAuthAPIs } from "../redux/slices/userauth"
import { useSelector, useDispatch } from "react-redux"
import { Spinner } from "../components/spinner"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const Authstate = useSelector((state) => state.handleauthreducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, set_isLoading] = useState(false)
    const [input_fields, set_input_fields] = useState({
        email: "",
        password: ""
    })

    function handleInputChange(e) {
        set_input_fields({ ...input_fields, [e.target.name]: e.target.value })
    }

    function handleloginapi(){
        set_isLoading(true)
        dispatch(handleAuthAPIs({URL : `${process.env.SERVER_URL}/login`, reqType : "POST", signupdata : input_fields}))
    }

    if (Authstate.isLogin) {
        navigate("/dashboard")
    }
    return (
        <div className="login-page-container bg-gradient-to-bl from-rose-600 to-purple-800 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <div className="login-page-content flex flex-col items-center justify-center w-[30vw] 
            border-2 border-fuchsia-950 rounded-lg min-[320px]:w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw]">
                <div className="login-heading">
                    <p className="text-4xl text-white font-bold mt-3 min-[320px]:text-2xl">Welcome Back</p>
                </div>
                <div className=" m-3">
                    <form className="input-fields form-content flex flex-col gap-5">
                        <InputField input_type="email" placeholder="Email" input_value={input_fields.email} handleinputchange={handleInputChange} field_name="email" />
                        <InputField input_type="password" placeholder="Password" input_value={input_fields.password} handleinputchange={handleInputChange} field_name="password" />
                    </form>
                </div>
                <div className="forgot-password min-[320px]:w-[65vw] md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw]">
                    <p>Forgot Password?</p>
                </div>
                <div className="login-button">
                    {isLoading ? <button className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] flex justify-center items-center rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]"><Spinner /></button> : <button className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]" onClick={handleloginapi}>Login</button>}
                </div>
                <div className="signup-link login-link bg-indigo-950 w-[30vw] rounded-b-lg flex justify-center items-center py-2 min-[320px]:w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] min-[320px]:text-[12px]">
                    <p className="text-white">Don't have an account? <Link to={"/"}> <span className="text-purple-300 hover:cursor-pointer">Sign Up</span></Link></p>
                </div>
            </div>
        </div>
    )
}