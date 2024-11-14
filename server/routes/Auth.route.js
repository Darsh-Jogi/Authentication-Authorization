import express from 'express'
import { handleSignup, handleverifyemail, handlelogout, handlelogin, handleforgotpassword, handleresetpassword, handleauthuser } from '../controllers/Auth.controller.js'
import { AuthUserToken } from '../middlewares/AuthUserToken.js'

const router = express.Router()

router.get('/check-user', AuthUserToken, handleauthuser)

router.post("/signup", handleSignup)

router.post("/verify-email", handleverifyemail)

router.post("/logout", handlelogout)

router.post("/login", handlelogin)

router.post("/forgot-password", handleforgotpassword)

router.post("/reset-password/:token", handleresetpassword)

export default router