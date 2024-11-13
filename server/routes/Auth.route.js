import express from 'express'
import { handleSignup } from '../controllers/Auth.controller.js'

const router = express.Router()


router.post("/signup", handleSignup)

router.get("/login", handleSignup)

router.get("/logout", handleSignup)

export default router