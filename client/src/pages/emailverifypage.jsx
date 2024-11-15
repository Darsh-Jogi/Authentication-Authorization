import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuthAPIs } from "../redux/slices/userauth.js";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "../components/spinner";

export const EmailVerifyPage = () => {

    const dispatch = useDispatch()
    const AuthState = useSelector((state) => state.handleauthreducer)
    const [isLoading, set_isLoading] = useState(false)
    const navigate = useNavigate();

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        dispatch(handleAuthAPIs({ URL: `${process.env.SERVER_URL}/verify-email`, reqType: "POST", signupdata: { token: verificationCode } }))
        set_isLoading(true)
    };

    // Auto submit when all fields are filled
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    if (AuthState.isEmailVerified) {
        navigate("/dashboard")
    }

    return (
        <div className="Email-verify-container bg-gradient-to-bl from-rose-600 to-purple-800 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <div className="email-verify-content flex flex-col items-center justify-center w-[30vw] 
            border-2 border-fuchsia-950 rounded-lg min-[320px]:w-[85vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] gap-3">
                <div className="verify-heading">
                    <p className="text-4xl text-white font-bold mt-3 min-[320px]:text-2xl">Verify Your Email</p>
                </div>
                <div className="verify-email-message">
                    <p className="text-lg text-white font-bold min-[320px]:text-sm">Enter 6 Digit Code to verify Your Email</p>
                </div>
                <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit}>
                    <div className="code-digits flex justify-center items-center gap-2">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength='6'
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-8 h-8 text-center text-2xl font-bold bg-indigo-950 text-white border-2 border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none'
                            />
                        ))}
                    </div>
                    <div className="submit-button">
                        {isLoading ? <button className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] flex justify-center items-center rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px]"><Spinner /></button> : <input type="submit" className="py-1 border-2 border-indigo-950 bg-purple-950 text-[18px] rounded-md min-[320px]:w-[65vw] w-[25vw] text-white my-4 uppercase hover hover:bg-transparent hover:text-indigo-950 md:w-[45vw] lg:w-[35vw] xl:w-[25vw] 2xl:w-[15vw] min-[320px]:text-[12px] hover:cursor-pointer" />}

                    </div>
                </form>
            </div>
        </div>
    )
}