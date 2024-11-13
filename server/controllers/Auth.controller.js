import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { GenerateVerificationToken } from "../utils/Generateverificationtoken.js";
import { GenerateJWTTokenandSetCookie } from "../utils/GenerateJWTtokenandSetcookie.js";

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
                    verificationtoken : verificationToken,
                    verificationtokenexpires : Date.now() + 24 * 60 * 60 * 1000
                })
                GenerateJWTTokenandSetCookie(res, newUser._id)
                res.json({ success: true, message: "User registered successfully", user: newUser })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, message: "Server Error please try again" })
            }
        });


    } catch (error) {
        res.status(404).json({ success: false, errors: error.message })
    }
}

export { handleSignup }