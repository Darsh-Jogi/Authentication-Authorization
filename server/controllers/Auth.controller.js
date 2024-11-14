import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from "../models/user.model.js";
import { GenerateVerificationToken } from "../utils/Generateverificationtoken.js";
import { GenerateJWTTokenandSetCookie } from "../utils/GenerateJWTtokenandSetcookie.js";
import { SendVerificationEmail, SendWelcomeEmail, SendForgotPasswordEmail, SendResetPasswordConfimation } from "../mailtrap/emails.js";


const handleauthuser = async (req, res) => {
    try {
        const checkuser = await User.findById(req.userID)
        if (!checkuser) {
            return res.status(401).json({ success: false, message: "Unauthorized or User not found" })
        }
        res.status(200).json({ success: true, message: "User data", user: checkuser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error please try again" })
    }
}


const handleSignup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    try {
        if (!firstname || !lastname || !email || !password) {
            throw new Error("All Fields are required")
        }

        const checkuser = await User.findOne({ email: email })

        if (checkuser) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const verificationToken = GenerateVerificationToken(6)
        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                const newUser = await User.create({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: hash,
                    verificationtoken: verificationToken,
                    verificationtokenexpires: Date.now() + 24 * 60 * 60 * 1000
                })
                GenerateJWTTokenandSetCookie(res, newUser._id)
                const emailverifystatus = await SendVerificationEmail(email, newUser.verificationtoken)
                res.json({ success: true, message: "User registered successfully", user: newUser, emailverifystatus: emailverifystatus })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, message: "Server Error please try again" })
            }
        });

    } catch (error) {
        res.status(404).json({ success: false, errors: error.message })
    }
}


const handleverifyemail = async (req, res) => {
    const { token } = req.body
    try {
        const user = await User.findOne({ verificationtoken: token, verificationtokenexpires: { $gt: Date.now() } })

        if (!user) {
            res.status(404).json({ success: false, message: "Invalid or expired token" })
        }

        user.isverified = true
        user.verificationtoken = undefined
        user.verificationtokenexpires = undefined
        await user.save()
        const SendwelComeEmailStatus = await SendWelcomeEmail(user.email, user.firstname, user.lastname)
        res.status(200).json({ success: true, message: "user verified successfully", welcomeemailstatus: SendwelComeEmailStatus })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}


const handlelogout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ success: true, message: "Logged out successfully" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const handlelogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const checkuser = await User.findOne({ email: email })
        if (!checkuser) {
            return res.status(404).json({ success: false, message: "invalid Credentials" })
        }
        const match = await bcrypt.compare(password, checkuser.password)
        if (!match) {
            return res.status(404).json({ success: false, message: "invalid Credentials" })
        }
        GenerateJWTTokenandSetCookie(res, checkuser._id)
        checkuser.lastlogin = new Date()
        await checkuser.save()
        res.json({ success: true, message: "Login Successful", user: checkuser })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const handleforgotpassword = async (req, res) => {
    const { email } = req.body
    try {
        const checkuser = await User.findOne({ email: email })
        if (!checkuser) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const resetToken = crypto.randomBytes(25).toString('hex')
        const resetTokenExpires = Date.now() + 1000 * 60 * 60 // 1 hour

        checkuser.resetpasswordtoken = resetToken
        checkuser.resetpasswordexpires = resetTokenExpires
        await checkuser.save()

        const URL = `${process.env.CLIENT_URL}/auth/resetpassword/${resetToken}`
        const emailResetStatus = await SendForgotPasswordEmail(email, URL)
        res.status(200).json({ success: true, message: "Reset Password Email sent successfully", emailresetstatus: emailResetStatus })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

const handleresetpassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const checkuser = await User.findOne({ resetpasswordtoken: token, resetpasswordexpires: { $gt: Date.now() } })
        if (!checkuser) {
            return res.status(404).json({ success: false, message: "Invalid or expired token" })
        }
        const haspassword = await bcrypt.hash(password, 10)

        checkuser.password = haspassword
        checkuser.resetpasswordtoken = undefined
        checkuser.resetpasswordexpires = undefined
        await checkuser.save()
        const ResetPasswordEmailStatus = await SendResetPasswordConfimation(checkuser.email)
        res.status(200).json({ success: true, message: "Password Reset Successful", resetpasswordemailstatus: ResetPasswordEmailStatus })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: "Internal server Error" })
    }
}

export { handleSignup, handleverifyemail, handlelogout, handlelogin, handleforgotpassword, handleresetpassword, handleauthuser }