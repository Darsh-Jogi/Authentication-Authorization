import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailstemplates.js"
import { Mailtrapclient, sender } from "./mailtrap.config.js"

export const SendVerificationEmail = async (email, verificationcode) => {
    const receiver = [{ email }]
    try {
        const response = await Mailtrapclient.send({
            from: sender,
            to: receiver,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationcode),
            category: "Email verification"
        })
        console.log("Verification email sent successfully", response)
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

export const SendWelcomeEmail = async (email, firstname, lastname) => {
    const receiver = [{ email }]
    try {
        const response = await Mailtrapclient.send({
            from: sender,
            to: receiver,
            template_uuid: "2d95851d-530a-4af3-8557-233eb5d2a46a",
            template_variables: {
                "company_info_name": "Auth Test Company",
                "name": `${firstname} ${lastname}`
            }
        })
        console.log("Welcome email sent successfully", response)
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

export const SendForgotPasswordEmail = async (email, resetURL) => {
    const receiver = [{ email }]
    try {
        const response = await Mailtrapclient.send({
            from: sender,
            to: receiver,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset Email"
        })
        console.log("Forgot Password email sent successfully", response)
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

export const SendResetPasswordConfimation = async (email) =>{
    const receiver = [{ email }]
    try {
        const response = await Mailtrapclient.send({
            from: sender,
            to: receiver,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Confirmation"
        })
        console.log("Reset Password confirmation email sent successfully", response)
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}